'use client';

import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MBAProgram } from '@/types';
import { formatPrice } from '@/lib/recommendations';
import { getTagName } from '@/lib/mba-programs';
import { Clock, Users, Star, GraduationCap, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

interface SwipeCardProps {
  program: MBAProgram;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
  index: number;
}

export default function SwipeCard({ program, onSwipe, isTop, index }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  const controls = useAnimation();

  // Цвет индикатора свайпа
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  useEffect(() => {
    controls.start({ scale: 1, y: 0 });
  }, [controls]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      // Свайп вправо - нравится
      controls.start({ x: 300, opacity: 0 }).then(() => onSwipe('right'));
    } else if (info.offset.x < -threshold) {
      // Свайп влево - не нравится
      controls.start({ x: -300, opacity: 0 }).then(() => onSwipe('left'));
    } else {
      // Возврат на место
      controls.start({ x: 0, rotate: 0 });
    }
  };

  return (
    <motion.div
      className="absolute w-full h-full"
      style={{ 
        x, 
        rotate, 
        opacity,
        zIndex: isTop ? 10 : 10 - index,
        cursor: isTop ? 'grab' : 'default'
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ scale: 1 - index * 0.05, y: index * 10 }}
      whileDrag={{ cursor: 'grabbing' }}
    >
      <Card className="relative h-full w-full overflow-hidden shadow-2xl bg-white">
        {/* Индикаторы свайпа */}
        <motion.div
          className="absolute top-8 left-8 bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-xl rotate-[-25deg] z-20"
          style={{ opacity: nopeOpacity }}
        >
          НЕ ИНТЕРЕСНО
        </motion.div>
        <motion.div
          className="absolute top-8 right-8 bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-xl rotate-[25deg] z-20"
          style={{ opacity: likeOpacity }}
        >
          ИНТЕРЕСНО
        </motion.div>

        {/* Контент карточки */}
        <div className="p-6 h-full flex flex-col">
          {/* Заголовок */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900 flex-1">{program.title}</h2>
              {program.oldPrice && (
                <Badge className="bg-red-100 text-red-800 ml-2">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Скидка
                </Badge>
              )}
            </div>
            <p className="text-gray-600">{program.subtitle}</p>
            {program.university && (
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <GraduationCap className="w-4 h-4 mr-1" />
                {program.university}
              </p>
            )}
          </div>

          {/* Метаинформация */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {program.duration}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {program.format === 'online' ? '🌐 Онлайн' : 
               program.format === 'offline' ? '🏢 Очно' : '🔄 Гибрид'}
            </Badge>
            {program.rating && (
              <Badge variant="outline" className="flex items-center">
                <Star className="w-3 h-3 mr-1 text-yellow-500" />
                {program.rating}
              </Badge>
            )}
            {program.graduatesCount && (
              <Badge variant="outline" className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {program.graduatesCount}+ выпускников
              </Badge>
            )}
          </div>

          {/* Основные преимущества */}
          <div className="flex-1 mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Что вы получите:</h3>
            <ul className="space-y-1">
              {program.features.slice(0, 4).map((feature, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Теги */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {program.tags.slice(0, 5).map(tagId => (
                <Badge key={tagId} variant="secondary" className="text-xs">
                  {getTagName(tagId)}
                </Badge>
              ))}
            </div>
          </div>

          {/* Цена */}
          <div className="border-t pt-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {formatPrice(program.price)}
                </p>
                {program.oldPrice && (
                  <p className="text-sm text-gray-500 line-through">
                    {formatPrice(program.oldPrice)}
                  </p>
                )}
              </div>
              <Badge className={`
                ${program.type === 'executive' ? 'bg-purple-100 text-purple-800' : ''}
                ${program.type === 'mini' ? 'bg-blue-100 text-blue-800' : ''}
                ${program.type === 'specialized' ? 'bg-green-100 text-green-800' : ''}
                ${program.type === 'general' ? 'bg-gray-100 text-gray-800' : ''}
              `}>
                {program.type === 'executive' ? 'Executive' : ''}
                {program.type === 'mini' ? 'Mini MBA' : ''}
                {program.type === 'specialized' ? 'Специализированная' : ''}
                {program.type === 'general' ? 'General MBA' : ''}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}