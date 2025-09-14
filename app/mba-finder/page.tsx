'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SwipeStack from '@/components/mba-finder/SwipeStack';
import { mbaQuestions } from '@/lib/mba-questions';
import { useMBAStore } from '@/lib/mba-store';
import { 
  Sparkles, 
  Heart, 
  GraduationCap, 
  Smartphone,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function MBAFinderPage() {
  const [isStarted, setIsStarted] = useState(false);
  const { resetTest } = useMBAStore();

  useEffect(() => {
    // Сброс теста при загрузке страницы
    resetTest();
  }, [resetTest]);

  const handleStart = () => {
    setIsStarted(true);
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <Card className="text-center overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1">
              <CardHeader className="bg-white m-0.5 rounded-t-lg pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-3xl mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Найди свой MBA
                </CardTitle>
                <Badge variant="secondary" className="mb-3">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Tinder для образования
                </Badge>
                <p className="text-gray-600 text-lg">
                  Ответьте на вопросы о ваших предпочтениях в образовании
                </p>
              </CardHeader>
            </div>
            
            <CardContent className="space-y-6 pt-6">
              {/* Как это работает */}
              <div className="text-left space-y-3 bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Smartphone className="h-5 w-5 mr-2 text-purple-600" />
                  Как это работает:
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                      ←
                    </div>
                    <div>
                      <p className="font-medium">Свайп влево</p>
                      <p className="text-sm text-gray-600">Если вы не согласны</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                      →
                    </div>
                    <div>
                      <p className="font-medium">Свайп вправо</p>
                      <p className="text-sm text-gray-600">Если вы согласны</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">Получите рекомендации</p>
                      <p className="text-sm text-gray-600">3 идеальные программы для вас</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Преимущества */}
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{mbaQuestions.length} вопросов</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">5 минут на прохождение</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Персональный подбор</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Умный алгоритм</span>
                </div>
              </div>

              <Button 
                onClick={handleStart}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Начать подбор
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-xs text-gray-500">
                Оптимизировано для мобильных устройств
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        {/* Заголовок */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Найди свой MBA
          </h1>
          <p className="text-gray-600">
            Отвечайте на вопросы свайпами
          </p>
        </motion.div>

        {/* Стек карточек */}
        <SwipeStack questions={mbaQuestions} />
      </div>
    </div>
  );
}