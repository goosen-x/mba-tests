'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Question, Answer } from '@/types';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DragDropItem from './InteractiveElements/DragDropItem';
import { correctAnswers } from '@/lib/questions';

interface QuestionCardProps {
  question: Question;
  onAnswer: (questionId: string, value: number | string | string[], score: number) => void;
  currentAnswer?: Answer;
}

export default function QuestionCard({ question, onAnswer, currentAnswer }: QuestionCardProps) {
  const [dragItems, setDragItems] = useState(question.items || []);
  const [isInitialized, setIsInitialized] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Функция для расчета баллов на основе правильности расстановки
  const calculateScore = (questionId: string, userOrder: string[]): number => {
    const correctOrder = correctAnswers[questionId];
    if (!correctOrder) return 5; // Средний балл если нет правильного ответа
    
    let correctPositions = 0;
    userOrder.forEach((itemId, index) => {
      const correctIndex = correctOrder.indexOf(itemId);
      if (correctIndex === index) {
        correctPositions += 2; // Полные баллы за точное совпадение
      } else if (Math.abs(correctIndex - index) === 1) {
        correctPositions += 1; // Частичные баллы за близкую позицию
      }
    });
    
    // Преобразуем в шкалу от 0 до 10
    const maxScore = userOrder.length * 2;
    const score = (correctPositions / maxScore) * 10;
    return Math.round(score);
  };

  useEffect(() => {
    setIsInitialized(false);
  }, [question.id]);

  useEffect(() => {
    if (question.items) {
      // Если есть сохраненный ответ, восстанавливаем порядок из него
      if (currentAnswer && Array.isArray(currentAnswer.value)) {
        const savedOrder = currentAnswer.value as string[];
        const orderedItems = savedOrder.map(id => 
          question.items!.find(item => item.id === id)
        ).filter(Boolean) as typeof question.items;
        
        // Проверяем, что все элементы найдены
        if (orderedItems.length === question.items.length) {
          setDragItems(orderedItems);
        } else {
          setDragItems(question.items);
        }
      } else {
        // Иначе используем исходный порядок
        setDragItems(question.items);
        
        // Регистрируем начальный ответ только если его еще нет
        if (!isInitialized) {
          const score = calculateScore(question.id, question.items.map(item => item.id));
          onAnswer(question.id, question.items.map(item => item.id), score);
          setIsInitialized(true);
        }
      }
    }
  }, [question.items, question.id, currentAnswer, isInitialized, onAnswer, question]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = dragItems.findIndex((item) => item.id === active.id);
      const newIndex = dragItems.findIndex((item) => item.id === over?.id);
      const newOrder = arrayMove(dragItems, oldIndex, newIndex);
      setDragItems(newOrder);

      // Оцениваем на основе правильности расстановки
      const score = calculateScore(question.id, newOrder.map(item => item.id));
      onAnswer(question.id, newOrder.map(item => item.id), score);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl leading-tight">
            {question.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-4">
                📋 Перетащите элементы для изменения порядка
              </p>
              
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={dragItems.map(item => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {dragItems.map((item, index) => (
                      <DragDropItem 
                        key={item.id} 
                        id={item.id} 
                        text={item.text}
                        index={index + 1}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}