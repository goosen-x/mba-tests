'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTestStore } from '@/lib/store';
import { COMPETENCY_LABELS } from '@/types';
import { getScoreColor, getScoreLabel } from '@/lib/scoring';
import CompetencyRadar from '@/components/results/CompetencyRadar';
import CourseRecommendations from '@/components/results/CourseRecommendations';
import {
  Trophy,
  Target,
  AlertCircle,
  Download,
  Share,
  RotateCcw,
  TrendingUp,
  Calendar
} from 'lucide-react';

export default function ResultsPage() {
  const router = useRouter();
  const { result, resetTest } = useTestStore();

  useEffect(() => {
    if (!result) {
      router.push('/');
    }
  }, [result, router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка результатов...</p>
        </div>
      </div>
    );
  }

  const averageScore = Object.values(result.scores).reduce((sum, score) => sum + score, 0) / 6;

  const handleRetakeTest = () => {
    resetTest();
    router.push('/test');
  };

  const handleDownloadResults = () => {
    // Здесь можно реализовать экспорт в PDF
    alert('Функция экспорта в разработке');
  };

  const handleShareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Мои результаты теста компетенций',
        text: `Я прошел тест бизнес-компетенций! Средний балл: ${averageScore.toFixed(1)}/10`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована в буфер обмена');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Ваши результаты
              </h1>
              <p className="text-gray-600 mt-1">
                Карта компетенций и персональные рекомендации
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleShareResults}>
                <Share className="h-4 w-4 mr-2" />
                Поделиться
              </Button>
              <Button variant="outline" onClick={handleDownloadResults}>
                <Download className="h-4 w-4 mr-2" />
                Скачать PDF
              </Button>
              <Button onClick={handleRetakeTest}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Пройти еще раз
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overall Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                Общий результат
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {averageScore.toFixed(1)}
                  </div>
                  <div className="text-gray-600">Средний балл</div>
                  <Badge className={`mt-2 ${getScoreColor(averageScore)}`}>
                    {getScoreLabel(averageScore)}
                  </Badge>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {result.strongCategories.length}
                  </div>
                  <div className="text-gray-600">Сильных сторон</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Ваши преимущества
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    {result.weakCategories.length}
                  </div>
                  <div className="text-gray-600">Зон роста</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Направления развития
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <div className="font-medium text-blue-900">
                      Тест пройден {new Date(result.completedAt).toLocaleDateString('ru-RU')}
                    </div>
                    <div className="text-sm text-blue-700 mt-1">
                      Результаты актуальны на момент прохождения теста
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-6 w-6 text-blue-500 mr-2" />
                  Паучок компетенций
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CompetencyRadar scores={result.scores} />
                <div className="mt-4 text-sm text-gray-600">
                  <p className="flex items-center mb-2">
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    Ваши результаты
                  </p>
                  <p className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                    Средние показатели
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Detailed Scores */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Детализация по компетенциям</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(result.scores)
                    .sort(([, a], [, b]) => b - a)
                    .map(([category, score]) => (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {COMPETENCY_LABELS[category as keyof typeof COMPETENCY_LABELS]}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${(score / 10) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <div className={`font-bold ${getScoreColor(score)}`}>
                            {score.toFixed(1)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getScoreLabel(score)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Strong and Weak Areas */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Strong Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <TrendingUp className="h-6 w-6 mr-2" />
                  Сильные стороны
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.strongCategories.map((category) => (
                    <div key={category} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-900">
                        {COMPETENCY_LABELS[category]}
                      </span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {result.scores[category].toFixed(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  💡 Используйте эти навыки как основу для дальнейшего роста
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Areas for Improvement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange-600">
                  <AlertCircle className="h-6 w-6 mr-2" />
                  Зоны роста
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.weakCategories.map((category) => (
                    <div key={category} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium text-orange-900">
                        {COMPETENCY_LABELS[category]}
                      </span>
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                        {result.scores[category].toFixed(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  🎯 Рекомендуем сосредоточиться на развитии этих компетенций
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Course Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <CourseRecommendations 
            courses={result.recommendations} 
            weakCategories={result.weakCategories}
          />
        </motion.div>
      </div>
    </div>
  );
}