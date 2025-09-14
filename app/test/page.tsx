'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useTestStore } from '@/lib/store';
import { questions } from '@/lib/questions';
import { calculateResults, calculateProgress } from '@/lib/scoring';
import { COMPETENCY_LABELS } from '@/types';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import QuestionCard from '@/components/test/QuestionCard';

export default function TestPage() {
  const router = useRouter();
  const { 
    currentQuestionIndex, 
    answers, 
    setCurrentQuestion, 
    addAnswer, 
    nextQuestion, 
    previousQuestion,
    setResult,
    resetTest 
  } = useTestStore();

  const [isStarted, setIsStarted] = useState(false);
  const [startTime] = useState(Date.now());

  const currentQuestion = questions[currentQuestionIndex];
  const progress = calculateProgress(answers);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canGoNext = answers.find(a => a.questionId === currentQuestion?.id);

  useEffect(() => {
    // Сброс теста при загрузке страницы
    resetTest();
  }, [resetTest]);

  const handleStart = () => {
    setIsStarted(true);
    setCurrentQuestion(0);
  };

  const handleAnswer = (questionId: string, value: number | string | string[], score: number) => {
    addAnswer({ questionId, value, score });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleFinish();
    } else {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      previousQuestion();
    }
  };

  const handleFinish = () => {
    const result = calculateResults(answers);
    setResult(result);
    router.push('/results');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentCategory = () => {
    if (!currentQuestion) return '';
    return COMPETENCY_LABELS[currentQuestion.category];
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl mb-2">
                Тест на оценку бизнес-компетенций
              </CardTitle>
              <p className="text-gray-600">
                Пройдите интерактивный тест из {questions.length} вопросов для получения 
                персональной карты компетенций
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center p-3 bg-blue-50 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-600 mr-2" />
                  <span>~5 минут</span>
                </div>
                <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>{questions.length} вопросов</span>
                </div>
                <div className="flex items-center justify-center p-3 bg-purple-50 rounded-lg">
                  <Target className="h-4 w-4 text-purple-600 mr-2" />
                  <span>6 компетенций</span>
                </div>
              </div>

              <div className="text-left space-y-3">
                <h3 className="font-semibold text-gray-900">Что вас ждет:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Интерактивные вопросы с перетаскиванием элементов
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Оценка по 6 ключевым бизнес-компетенциям
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Персональные рекомендации курсов для развития
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Визуализация результатов &quot;паучок компетенций&quot;
                  </li>
                </ul>
              </div>

              <Button 
                onClick={handleStart}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Начать тестирование
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-xs text-gray-500">
                Вы можете остановиться в любой момент. Прогресс будет сохранен.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-xs">
                Вопрос {currentQuestionIndex + 1} из {questions.length}
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                {getCurrentCategory()}
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{formatTime(Math.floor((Date.now() - startTime) / 1000))}</span>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">Прогресс: {progress}%</p>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <QuestionCard
                question={currentQuestion}
                onAnswer={handleAnswer}
                currentAnswer={answers.find(a => a.questionId === currentQuestion.id)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mt-8 flex justify-between items-center"
        >
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>
              {answers.length} из {questions.length} отвечено
            </span>
          </div>

          <Button
            onClick={handleNext}
            disabled={!canGoNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {isLastQuestion ? 'Завершить тест' : 'Далее'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}