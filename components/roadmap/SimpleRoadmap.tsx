'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Info,
  GraduationCap
} from 'lucide-react';
import { CareerTrack, getCareerPath } from '@/lib/career-paths';
import PositionCard from './PositionCard';
import TrackSelector from './TrackSelector';

interface SimpleRoadmapProps {
  initialTrack?: CareerTrack;
  currentPositionId?: string;
  onPositionClick?: (positionId: string) => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function SimpleRoadmap({ 
  initialTrack,
  currentPositionId,
  onPositionClick,
  showBackButton = true,
  onBack
}: SimpleRoadmapProps) {
  const [selectedTrack, setSelectedTrack] = useState<CareerTrack | null>(initialTrack || null);
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);

  const careerPath = selectedTrack ? getCareerPath(selectedTrack) : null;

  const handlePositionClick = (positionId: string) => {
    setSelectedPositionId(positionId);
    onPositionClick?.(positionId);
  };

  const handleBackToTracks = () => {
    setSelectedTrack(null);
    setSelectedPositionId(null);
  };

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
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {careerPath.positions.length} позиций
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {new Set(careerPath.positions.map(p => p.level)).size} уровней
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {Math.min(...careerPath.positions.map(p => p.yearsExperience.min))}-{Math.max(...careerPath.positions.map(p => p.yearsExperience.max))} лет опыта
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Информационный блок */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-4xl mx-auto"
      >
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="space-y-2">
            <p className="text-blue-900 font-medium">
              Как читать карьерный путь:
            </p>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Позиции расположены от начального до топового уровня</li>
              <li>Стрелки показывают возможные переходы между позициями</li>
              <li>Для каждой позиции указаны требуемый опыт и примерная зарплата</li>
              <li>Нажмите на карточку для просмотра детальной информации</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Список позиций */}
      <div className="max-w-3xl mx-auto space-y-8">
        {careerPath.positions.map((position, index) => {
          const isActive = position.id === currentPositionId;
          const isSelected = position.id === selectedPositionId;
          const isNext = currentPositionId ? 
            careerPath.positions.find(p => p.id === currentPositionId)?.nextPositions.includes(position.id) || false
            : false;
          const isPast = currentPositionId && !isActive && !isNext ? 
            index < careerPath.positions.findIndex(p => p.id === currentPositionId)
            : false;

          return (
            <motion.div
              key={position.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PositionCard
                position={position}
                isActive={isActive}
                isNext={isNext}
                isPast={isPast}
                onClick={() => handlePositionClick(position.id)}
                showConnector={index < careerPath.positions.length - 1}
              />
              
              {/* MBA рекомендации */}
              {position.recommendedMBA.length > 0 && (isActive || isSelected) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-8 mr-8"
                >
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">
                        Рекомендуемые MBA программы:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {position.recommendedMBA.map((mbaId) => (
                        <Badge key={mbaId} variant="secondary" className="text-xs">
                          {mbaId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

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