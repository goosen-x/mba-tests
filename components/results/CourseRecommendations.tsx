'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Course, CompetencyCategory, COMPETENCY_LABELS } from '@/types';
import { formatPrice } from '@/lib/recommendations';
import {
  GraduationCap,
  Clock,
  Star,
  Zap,
  CheckCircle,
  ArrowRight,
  Target,
  TrendingUp
} from 'lucide-react';

interface CourseRecommendationsProps {
  courses: Course[];
  weakCategories: CompetencyCategory[];
}

export default function CourseRecommendations({ 
  courses, 
  weakCategories 
}: CourseRecommendationsProps) {
  
  const getLevelIcon = (level: Course['level']) => {
    switch (level) {
      case 'beginner':
        return <Star className="h-4 w-4 text-green-500" />;
      case 'intermediate':
        return <TrendingUp className="h-4 w-4 text-yellow-500" />;
      case 'advanced':
        return <Target className="h-4 w-4 text-red-500" />;
    }
  };

  const getLevelLabel = (level: Course['level']) => {
    switch (level) {
      case 'beginner':
        return 'Начальный';
      case 'intermediate':
        return 'Средний';
      case 'advanced':
        return 'Продвинутый';
    }
  };

  const handleEnrollClick = (courseId: string) => {
    // Здесь можно реализовать переход к покупке курса
    alert(`Переход к курсу ${courseId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="h-6 w-6 text-purple-500 mr-2" />
            Персональные рекомендации курсов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-start">
              <Zap className="h-5 w-5 text-purple-600 mt-0.5 mr-3" />
              <div>
                <div className="font-medium text-purple-900 mb-1">
                  Специально подобрано для вас
                </div>
                <div className="text-sm text-purple-700">
                  Курсы для развития компетенций: {' '}
                  {weakCategories.map(cat => COMPETENCY_LABELS[cat]).join(', ')}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              {course.isSpecialOffer && (
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-semibold">
                  🔥 АКЦИЯ
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    {COMPETENCY_LABELS[course.category]}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    {getLevelIcon(course.level)}
                    <span className="ml-1">{getLevelLabel(course.level)}</span>
                  </div>
                </div>
                
                <CardTitle className="text-lg leading-tight">
                  {course.title}
                </CardTitle>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {course.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(course.price)}
                  </span>
                  {course.oldPrice && (
                    <span className="text-lg line-through text-gray-500">
                      {formatPrice(course.oldPrice)}
                    </span>
                  )}
                  {course.oldPrice && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      -{Math.round((1 - course.price / course.oldPrice) * 100)}%
                    </Badge>
                  )}
                </div>

                {/* Duration */}
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{course.duration}</span>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-900">
                    Что изучите:
                  </div>
                  <div className="space-y-1">
                    {course.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {course.features.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{course.features.length - 3} модулей
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  onClick={() => handleEnrollClick(course.id)}
                  className={`w-full ${
                    course.isSpecialOffer 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  } text-white`}
                >
                  {course.isSpecialOffer ? 'Купить со скидкой' : 'Записаться на курс'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {course.isSpecialOffer && (
                  <p className="text-xs text-center text-red-600 font-medium">
                    ⏰ Акция ограничена по времени
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">
            Готовы начать развитие?
          </h3>
          <p className="text-blue-100 mb-4">
            Выберите курс и начните прокачивать свои навыки уже сегодня
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="outline" 
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Посмотреть все курсы
            </Button>
            <Button 
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
            >
              Получить консультацию
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}