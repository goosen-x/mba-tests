'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  GraduationCap
} from 'lucide-react';
import { CareerTrack, getCareerPath, CareerPosition } from '@/lib/career-paths';
import TrackSelector from './TrackSelector';
import { cn } from '@/lib/utils';

interface MobileRoadmapProps {
  initialTrack?: CareerTrack;
  currentPositionId?: string;
  onPositionClick?: (positionId: string) => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

interface PositionItemProps {
  position: CareerPosition;
  isActive?: boolean;
  isNext?: boolean;
  isPast?: boolean;
  onPositionClick?: (positionId: string) => void;
  nextPositions: CareerPosition[];
}

function PositionItem({ 
  position, 
  isActive = false,
  isNext = false,
  isPast = false,
  onPositionClick,
  nextPositions
}: PositionItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const levelColors = {
    entry: 'bg-gray-100 text-gray-700 border-gray-300',
    junior: 'bg-green-100 text-green-700 border-green-300',
    middle: 'bg-blue-100 text-blue-700 border-blue-300',
    senior: 'bg-purple-100 text-purple-700 border-purple-300',
    lead: 'bg-purple-100 text-purple-700 border-purple-300',
    'c-level': 'bg-orange-100 text-orange-700 border-orange-300'
  };

  return (
    <div>
      <motion.div
        className={cn(
          "bg-white rounded-lg border-2 p-4 shadow-sm transition-all",
          isActive && "ring-2 ring-purple-500 shadow-lg",
          isNext && "ring-2 ring-green-500",
          isPast && "opacity-60"
        )}
        onClick={() => {
          setIsExpanded(!isExpanded);
          onPositionClick?.(position.id);
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={cn("text-xs", levelColors[position.level])}>
                {position.level === 'c-level' ? 'C-Level' : 
                 position.level.charAt(0).toUpperCase() + position.level.slice(1)}
              </Badge>
              {isActive && (
                <Badge className="bg-purple-500 text-white text-xs">
                  Текущая
                </Badge>
              )}
              {isNext && (
                <Badge className="bg-green-500 text-white text-xs">
                  Следующая
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-lg">{position.title}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">Опыт:</span>
            <p className="font-medium">{position.yearsExperience.min}-{position.yearsExperience.max} лет</p>
          </div>
          <div>
            <span className="text-gray-600">Зарплата:</span>
            <p className="font-medium">
              {(position.salary.min / 1000).toFixed(0)}-{(position.salary.max / 1000).toFixed(0)}к ₽
            </p>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t space-y-3">
                {/* Description */}
                <p className="text-sm text-gray-600">{position.description}</p>

                {/* Skills */}
                <div>
                  <p className="text-sm font-medium mb-2">Ключевые навыки:</p>
                  <div className="flex flex-wrap gap-1">
                    {position.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* MBA Programs */}
                {position.recommendedMBA.length > 0 && (
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      <p className="text-sm font-medium text-purple-900">
                        Рекомендуемые MBA:
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {position.recommendedMBA.map((mbaId) => (
                        <Badge key={mbaId} variant="secondary" className="text-xs">
                          {mbaId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Next Positions */}
      {nextPositions.length > 0 && (
        <div className="ml-4 mt-4 pl-4 border-l-2 border-gray-300 space-y-4">
          <div className="text-sm text-gray-500 -ml-8 mb-2">
            Возможные пути развития:
          </div>
          {nextPositions.map(nextPos => (
            <PositionItem
              key={nextPos.id}
              position={nextPos}
              isActive={false}
              isNext={isActive}
              isPast={false}
              onPositionClick={onPositionClick}
              nextPositions={[]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MobileRoadmap({ 
  initialTrack,
  currentPositionId,
  onPositionClick,
  showBackButton = true,
  onBack
}: MobileRoadmapProps) {
  const [selectedTrack, setSelectedTrack] = useState<CareerTrack | null>(initialTrack || null);

  const careerPath = selectedTrack ? getCareerPath(selectedTrack) : null;

  const handleBackToTracks = () => {
    setSelectedTrack(null);
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          onClick={handleBackToTracks}
          size="sm"
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Выбрать другой трек
        </Button>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">{careerPath.title}</h2>
          <p className="text-gray-600">{careerPath.description}</p>
        </div>
      </div>

      {/* Position Tree - показываем только начальные позиции */}
      <div className="space-y-4">
        {careerPath.positions
          .filter(pos => pos.level === 'entry' || pos.level === 'junior')
          .map(position => {
            const nextPositions = position.nextPositions
              .map(id => careerPath.positions.find(p => p.id === id))
              .filter(Boolean) as CareerPosition[];

            return (
              <PositionItem
                key={position.id}
                position={position}
                isActive={position.id === currentPositionId}
                isNext={false}
                isPast={false}
                onPositionClick={onPositionClick}
                nextPositions={nextPositions}
              />
            );
          })}
      </div>

      {/* CTA */}
      <div className="text-center pt-6 space-y-3">
        <p className="text-sm text-gray-600">
          Готовы начать свой карьерный путь?
        </p>
        <div className="space-y-2">
          <Button variant="outline" size="sm" asChild className="w-full">
            <a href="/test">
              Пройти тест компетенций
            </a>
          </Button>
          <Button size="sm" asChild className="w-full">
            <a href="/mba-finder">
              Найти MBA программу
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}