'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import QuestionCard from './QuestionCard';
import SwipeControls from './SwipeControls';
import { MBAQuestion, SwipeAction } from '@/types';
import { useMBAStore } from '@/lib/mba-store';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';

interface SwipeStackProps {
  questions: MBAQuestion[];
}

export default function SwipeStack({ questions }: SwipeStackProps) {
  const router = useRouter();
  const { 
    currentCardIndex, 
    swipes,
    addSwipe, 
    nextCard, 
    completeTest,
    getProgress 
  } = useMBAStore();
  
  const [visibleQuestions, setVisibleQuestions] = useState<MBAQuestion[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Показываем до 3 карточек одновременно
    const startIndex = currentCardIndex;
    const endIndex = Math.min(startIndex + 3, questions.length);
    setVisibleQuestions(questions.slice(startIndex, endIndex));
  }, [currentCardIndex, questions]);

  const handleSwipe = (direction: 'left' | 'right', questionId?: string) => {
    if (isAnimating || !visibleQuestions[0]) return;
    
    setIsAnimating(true);
    const action: SwipeAction = direction === 'left' ? 'dislike' : 'like';
    const currentQuestion = questionId ? questions.find(q => q.id === questionId) : visibleQuestions[0];
    
    if (currentQuestion) {
      addSwipe({
        questionId: currentQuestion.id,
        action,
        timestamp: new Date()
      });
    }

    setTimeout(() => {
      nextCard();
      setIsAnimating(false);
      
      // Проверяем, закончились ли вопросы
      if (currentCardIndex + 1 >= questions.length) {
        completeTest();
        router.push('/mba-finder/results');
      }
    }, 300);
  };

  const handleCardSwipe = (direction: 'left' | 'right') => {
    handleSwipe(direction);
  };

  const progress = getProgress();

  // Vibration API для мобильных устройств
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Прогресс */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            {swipes.length} из {questions.length} вопросов
          </span>
          <span className="text-sm font-medium text-gray-800">
            {progress}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Стек карточек */}
      <div className="relative h-[600px] mb-6">
        <AnimatePresence>
          {visibleQuestions.length > 0 ? (
            visibleQuestions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                onSwipe={handleCardSwipe}
                isTop={index === 0 && !isAnimating}
                index={index}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full"
            >
              <div className="text-center">
                <p className="text-xl text-gray-600 mb-4">
                  Спасибо за ваши ответы!
                </p>
                <p className="text-gray-500">
                  Подождите, подбираем программы специально для вас...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Контролы */}
      {visibleQuestions.length > 0 && (
        <SwipeControls
          onDislike={() => {
            triggerHaptic();
            handleSwipe('left');
          }}
          onLike={() => {
            triggerHaptic();
            handleSwipe('right');
          }}
          disabled={isAnimating}
        />
      )}

      {/* Подсказка */}
      <motion.p 
        className="text-center text-sm text-gray-500 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Отвечайте интуитивно, первое впечатление обычно самое верное
      </motion.p>
    </div>
  );
}