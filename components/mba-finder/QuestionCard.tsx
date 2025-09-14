'use client';

import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MBAQuestion } from '@/types';
import { MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

interface QuestionCardProps {
  question: MBAQuestion;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
  index: number;
}

export default function QuestionCard({ question, onSwipe, isTop, index }: QuestionCardProps) {
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
      // Свайп вправо - да/согласен
      controls.start({ x: 300, opacity: 0 }).then(() => onSwipe('right'));
    } else if (info.offset.x < -threshold) {
      // Свайп влево - нет/не согласен
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
          НЕТ
        </motion.div>
        <motion.div
          className="absolute top-8 right-8 bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-xl rotate-[25deg] z-20"
          style={{ opacity: likeOpacity }}
        >
          ДА
        </motion.div>

        {/* Контент карточки */}
        <div className="p-8 h-full flex flex-col items-center justify-center text-center">
          {/* Иконка */}
          <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-8">
            <MessageCircle className="w-12 h-12 text-purple-600" />
          </div>

          {/* Вопрос */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 max-w-lg">
            {question.question}
          </h2>

          {/* Подтекст */}
          {question.subtext && (
            <p className="text-lg text-gray-600 max-w-md">
              {question.subtext}
            </p>
          )}

          {/* Подсказка внизу */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-sm text-gray-400">
              Свайпните влево для &quot;Нет&quot; или вправо для &quot;Да&quot;
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}