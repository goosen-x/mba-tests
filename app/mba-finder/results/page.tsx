'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMBAStore } from '@/lib/mba-store';
import { calculateMBAResults, getRecommendationReason } from '@/lib/mba-scoring';
import { formatPrice } from '@/lib/recommendations';
import { MBATestResult } from '@/types';
import { 
  Trophy, 
  Star, 
  Clock, 
  GraduationCap, 
  CheckCircle,
  Sparkles,
  Users,
  Heart,
  Share2,
  Download,
  Phone
} from 'lucide-react';

export default function MBAResultsPage() {
  const router = useRouter();
  const { swipes, resetTest } = useMBAStore();
  const [result, setResult] = useState<MBATestResult | null>(null);
  const [selectedProgramIndex, setSelectedProgramIndex] = useState(0);

  useEffect(() => {
    if (swipes.length === 0) {
      router.push('/mba-finder');
      return;
    }

    const testResult = calculateMBAResults(swipes);
    setResult(testResult);
  }, [swipes, router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Анализируем ваши предпочтения...</p>
        </div>
      </div>
    );
  }

  const selectedProgram = result.recommendedPrograms[selectedProgramIndex];
  const likedCount = swipes.filter(s => s.action === 'like').length;
  const totalCount = swipes.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Заголовок */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
            <Trophy className="h-10 w-10 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Ваши идеальные MBA программы найдены!
          </h1>
          <p className="text-gray-600">
            На основе анализа {totalCount} программ, вам понравились {likedCount}
          </p>
        </motion.div>

        {/* Топ-3 программы */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            Рекомендуем эти программы специально для вас:
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {result.recommendedPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all ${
                    selectedProgramIndex === index 
                      ? 'ring-2 ring-purple-600 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedProgramIndex(index)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        #{index + 1} Рекомендация
                      </Badge>
                      {program.rating && (
                        <div className="flex items-center text-sm">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          {program.rating}
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg">{program.title}</CardTitle>
                    <p className="text-sm text-gray-600">{program.subtitle}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {program.duration}
                      </Badge>
                      <p className="font-bold text-lg">
                        {formatPrice(program.price)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Детальная информация о выбранной программе */}
          <motion.div
            key={selectedProgramIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{selectedProgram.title}</CardTitle>
                    <p className="text-gray-600">{selectedProgram.subtitle}</p>
                    {selectedProgram.university && (
                      <p className="text-sm text-gray-500 mt-2 flex items-center">
                        <GraduationCap className="w-4 h-4 mr-1" />
                        {selectedProgram.university}
                      </p>
                    )}
                  </div>
                  {selectedProgram.oldPrice && (
                    <Badge className="bg-red-100 text-red-800">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Скидка {Math.round((1 - selectedProgram.price / selectedProgram.oldPrice) * 100)}%
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Почему эта программа подходит */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Почему эта программа идеально вам подходит:
                  </h3>
                  <ul className="space-y-1">
                    {getRecommendationReason(selectedProgram, result.preferences, result.swipeHistory).map((reason, idx) => (
                      <li key={idx} className="text-sm text-purple-800 flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Информация о программе */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Что вы получите:</h3>
                    <ul className="space-y-2">
                      {selectedProgram.features.map((feature, idx) => (
                        <li key={idx} className="text-sm flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Формат:</span>
                      <Badge variant="outline">
                        {selectedProgram.format === 'online' ? '🌐 Онлайн' : 
                         selectedProgram.format === 'offline' ? '🏢 Очно' : '🔄 Гибрид'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Длительность:</span>
                      <span className="font-medium flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {selectedProgram.duration}
                      </span>
                    </div>
                    {selectedProgram.graduatesCount && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Выпускников:</span>
                        <span className="font-medium flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {selectedProgram.graduatesCount}+
                        </span>
                      </div>
                    )}
                    <div className="pt-2 border-t">
                      <div className="flex items-end justify-between">
                        <span className="text-gray-600">Стоимость:</span>
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            {formatPrice(selectedProgram.price)}
                          </p>
                          {selectedProgram.oldPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              {formatPrice(selectedProgram.oldPrice)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA кнопки */}
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Записаться на консультацию
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Скачать программу
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Дополнительные действия */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Поделиться результатами
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                resetTest();
                router.push('/mba-finder');
              }}
            >
              Пройти заново
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            Ваши результаты сохранены и доступны по уникальной ссылке
          </p>
        </motion.div>
      </div>
    </div>
  );
}