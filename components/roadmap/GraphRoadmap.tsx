'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Info
} from 'lucide-react';
import { CareerTrack, getCareerPath, CareerPosition, CareerLevel } from '@/lib/career-paths';
import CompactPositionCard from './CompactPositionCard';
import TrackSelector from './TrackSelector';
import MobileRoadmap from './MobileRoadmap';
import MBARecommendations from './MBARecommendations';
import { useMediaQuery } from '@/hooks/use-media-query';

interface GraphRoadmapProps {
  initialTrack?: CareerTrack;
  currentPositionId?: string;
  onPositionClick?: (positionId: string) => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

// Определяем позиции по уровням для grid layout
// const levelPositions: Record<CareerLevel, number> = {
//   'entry': 0,
//   'junior': 1,
//   'middle': 2,
//   'senior': 3,
//   'lead': 4,
//   'c-level': 5
// };

// Цвета для уровней
const levelColors: Record<CareerLevel, string> = {
  'entry': 'from-gray-400 to-gray-500',
  'junior': 'from-green-400 to-green-500',
  'middle': 'from-blue-400 to-blue-500',
  'senior': 'from-purple-400 to-purple-500',
  'lead': 'from-purple-500 to-purple-600',
  'c-level': 'from-orange-400 to-orange-500'
};

interface PositionNode {
  position: CareerPosition;
  x: number;
  y: number;
  column: number;
  row: number;
}

// Константы для размеров карточек
const CARD_WIDTH = 180;
const CARD_HEIGHT = 90;

export default function GraphRoadmap({ 
  initialTrack,
  currentPositionId,
  onPositionClick,
  showBackButton = true,
  onBack
}: GraphRoadmapProps) {
  const [selectedTrack, setSelectedTrack] = useState<CareerTrack | null>(initialTrack || null);
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);
  const [nodes, setNodes] = useState<PositionNode[]>([]);
  const [connections, setConnections] = useState<Array<{from: string; to: string}>>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const careerPath = selectedTrack ? getCareerPath(selectedTrack) : null;
  const [graphHeight, setGraphHeight] = useState(600);
  const [existingLevels, setExistingLevels] = useState<{ level: CareerLevel; y: number }[]>([]);

  // Расчет позиций узлов в графе
  useEffect(() => {
    if (!careerPath || isMobile) return;

    const positionNodes: PositionNode[] = [];
    const positionConnections: Array<{from: string; to: string}> = [];
    
    // Группируем позиции по уровням
    const levelGroups: Record<CareerLevel, CareerPosition[]> = {
      'entry': [],
      'junior': [],
      'middle': [],
      'senior': [],
      'lead': [],
      'c-level': []
    };

    careerPath.positions.forEach(position => {
      levelGroups[position.level].push(position);
    });

    // Расчет позиций для каждого уровня (вертикальная компоновка)
    const horizontalGap = 20;
    const verticalGap = 60; // Еще меньше отступ для компактности
    const containerWidth = 1000; // Максимальная ширина контейнера (уменьшена из-за боковой панели)
    const startX = 50;
    const startY = 10; // Минимальный отступ сверху

    // Вертикальная компоновка: уровни сверху вниз
    const levelOrder = ['entry', 'junior', 'middle', 'senior', 'lead', 'c-level'] as CareerLevel[];
    let maxY = 0;
    
    // Отслеживаем, какие уровни реально есть в данном треке
    const levelsData: { level: CareerLevel; positions: CareerPosition[]; y: number }[] = [];
    let currentY = startY;
    
    levelOrder.forEach((level) => {
      const positions = levelGroups[level];
      if (!positions || positions.length === 0) return; // Пропускаем пустые уровни
      
      levelsData.push({ level, positions, y: currentY });
      
      // Расчет позиций для карточек на одном уровне
      const totalWidth = positions.length * CARD_WIDTH + (positions.length - 1) * horizontalGap;
      const startXForLevel = Math.max(startX, (containerWidth - totalWidth) / 2);
      
      positions.forEach((position, posIndex) => {
        const x = startXForLevel + posIndex * (CARD_WIDTH + horizontalGap);
        const y = currentY;
        
        positionNodes.push({
          position,
          x,
          y,
          column: posIndex,
          row: levelsData.length - 1 // Используем индекс в существующих уровнях
        });
        
        // Отслеживаем максимальную Y координату
        maxY = Math.max(maxY, y + CARD_HEIGHT);
      });
      
      // Увеличиваем Y только если добавили уровень
      currentY += CARD_HEIGHT + verticalGap;
    });
    
    // Устанавливаем высоту контейнера на основе контента
    setGraphHeight(maxY + 20); // Минимальный отступ снизу

    // Создаем связи
    careerPath.positions.forEach(position => {
      position.nextPositions.forEach(nextId => {
        positionConnections.push({
          from: position.id,
          to: nextId
        });
      });
    });

    setNodes(positionNodes);
    setConnections(positionConnections);
    setExistingLevels(levelsData.map(({ level, y }) => ({ level, y })));
  }, [careerPath, isMobile]);

  const handlePositionClick = (positionId: string) => {
    setSelectedPositionId(positionId);
    onPositionClick?.(positionId);
  };

  const handleBackToTracks = () => {
    setSelectedTrack(null);
    setSelectedPositionId(null);
  };

  // На мобильных устройствах используем упрощенный компонент
  if (isMobile) {
    return (
      <MobileRoadmap
        initialTrack={selectedTrack || undefined}
        currentPositionId={currentPositionId}
        onPositionClick={onPositionClick}
        showBackButton={showBackButton}
        onBack={onBack}
      />
    );
  }

  // Если трек не выбран, показываем селектор треков
  if (!selectedTrack) {
    return (
      <div>
        {showBackButton && onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
        )}
        <TrackSelector onSelectTrack={setSelectedTrack} />
      </div>
    );
  }

  if (!careerPath) return null;

  // Функция для отрисовки пути между двумя точками (вертикальная компоновка)
  const drawPath = (from: PositionNode, to: PositionNode) => {
    const startX = from.x + CARD_WIDTH / 2; // Центр карточки по горизонтали
    const startY = from.y + CARD_HEIGHT; // Нижняя сторона карточки
    const endX = to.x + CARD_WIDTH / 2; // Центр следующей карточки
    const endY = to.y; // Верхняя сторона следующей карточки
    
    // Кривая Безье для плавной связи
    const controlY = startY + (endY - startY) / 2;
    
    return `M ${startX} ${startY} C ${startX} ${controlY}, ${endX} ${controlY}, ${endX} ${endY}`;
  };

  return (
    <div className="space-y-8">
      {/* Заголовок и навигация */}
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={handleBackToTracks}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Выбрать другой трек
        </Button>

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">{careerPath.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {careerPath.description}
          </p>
          
          {/* Статистика трека */}
          <div className="flex justify-center gap-6 text-sm">
            <Badge variant="secondary">
              {careerPath.positions.length} позиций
            </Badge>
            <Badge variant="secondary">
              {new Set(careerPath.positions.map(p => p.level)).size} уровней
            </Badge>
            <Badge variant="secondary">
              {Math.min(...careerPath.positions.map(p => p.yearsExperience.min))}-{Math.max(...careerPath.positions.map(p => p.yearsExperience.max))} лет опыта
            </Badge>
          </div>
        </div>
      </div>

      {/* Информационный блок */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto"
      >
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="space-y-2">
            <p className="text-blue-900 font-medium">
              Как читать карьерный граф:
            </p>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Позиции расположены по уровням сверху вниз</li>
              <li>Стрелки показывают возможные карьерные переходы</li>
              <li>Разветвления показывают альтернативные пути развития</li>
              <li>Несколько путей могут вести к одной топовой позиции</li>
              <li>Карточки расположены компактно для удобного просмотра</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* График карьерных путей */}
      <div className="relative">
        {/* Метки уровней слева */}
        <div className="absolute left-0 top-0 h-full w-32">
          {existingLevels.map(({ level, y }) => (
            <div 
              key={level} 
              className="absolute left-0 flex items-center gap-2"
              style={{ top: `${y + 2}px`, height: `${CARD_HEIGHT}px` }}
            >
              <div className={`w-1 h-full bg-gradient-to-b ${levelColors[level]}`} />
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                {level === 'c-level' ? 'C-Level' : level.charAt(0).toUpperCase() + level.slice(1)}
              </span>
            </div>
          ))}
        </div>
        
        {/* Основной граф */}
        <div className="bg-gray-50 rounded-xl shadow-inner p-2 ml-32 overflow-visible">
          <div className="relative mx-auto" style={{ maxWidth: '1200px', minHeight: `${graphHeight}px` }}>
            {/* SVG для стрелок */}
            <svg
              ref={svgRef}
              className="absolute inset-0 pointer-events-none"
              style={{ 
                width: '100%', 
                height: '100%',
                zIndex: 1
              }}
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="#6B7280"
                  />
                </marker>
              </defs>
              
              {/* Отрисовка связей */}
              {connections.map((connection, index) => {
                const fromNode = nodes.find(n => n.position.id === connection.from);
                const toNode = nodes.find(n => n.position.id === connection.to);
                
                if (!fromNode || !toNode) return null;
                
                const isHighlighted = selectedPositionId === connection.from || selectedPositionId === connection.to;
                
                return (
                  <motion.path
                    key={`${connection.from}-${connection.to}`}
                    d={drawPath(fromNode, toNode)}
                    fill="none"
                    stroke={isHighlighted ? '#7C3AED' : '#CBD5E1'}
                    strokeWidth={isHighlighted ? 2 : 1.5}
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.1,
                      ease: "easeInOut"
                    }}
                    className={isHighlighted ? 'filter drop-shadow-lg' : ''}
                  />
                );
              })}
            </svg>

            {/* Позиции (карточки) */}
            <div className="relative" style={{ zIndex: 2 }}>
              {nodes.map((node, index) => {
                const isActive = node.position.id === currentPositionId;
                // const isSelected = node.position.id === selectedPositionId;
                const isNext = currentPositionId ? 
                  careerPath.positions.find(p => p.id === currentPositionId)?.nextPositions.includes(node.position.id) || false
                  : false;
                
                return (
                  <motion.div
                    key={node.position.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      position: 'absolute',
                      left: `${node.x}px`,
                      top: `${node.y}px`
                    }}
                  >
                    <CompactPositionCard
                      position={node.position}
                      isActive={isActive}
                      isNext={isNext}
                      isHighlighted={node.position.id === selectedPositionId}
                      onClick={() => handlePositionClick(node.position.id)}
                    />
                  </motion.div>
                );
              })}
              </div>
          </div>
        </div>
      </div>


      {/* MBA рекомендации для выбранной позиции */}
      {selectedPositionId && (() => {
        const selectedPosition = careerPath.positions.find(p => p.id === selectedPositionId);
        if (!selectedPosition || selectedPosition.recommendedMBA.length === 0) return null;
        
        return (
          <MBARecommendations 
            mbaIds={selectedPosition.recommendedMBA}
            positionTitle={selectedPosition.title}
          />
        );
      })()}

      {/* Призыв к действию */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center pt-8 pb-4"
      >
        <p className="text-gray-600 mb-4">
          Готовы начать свой карьерный путь?
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" asChild>
            <a href="/test">
              Пройти тест компетенций
            </a>
          </Button>
          <Button asChild>
            <a href="/mba-finder">
              Найти MBA программу
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}