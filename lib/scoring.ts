import { Answer, CompetencyCategory, TestResult } from '@/types';
import { questions } from './questions';
import { getCourseRecommendations } from './recommendations';

export function calculateResults(answers: Answer[]): TestResult {
  // Инициализируем счетчики для каждой категории
  const scores: Record<CompetencyCategory, number> = {
    finance: 0,
    sales: 0,
    marketing: 0,
    hrManagement: 0,
    it: 0,
    analytics: 0
  };

  const categoryCounts: Record<CompetencyCategory, number> = {
    finance: 0,
    sales: 0,
    marketing: 0,
    hrManagement: 0,
    it: 0,
    analytics: 0
  };

  // Подсчитываем баллы по категориям
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question) {
      scores[question.category] += answer.score;
      categoryCounts[question.category]++;
    }
  });

  // Нормализуем баллы (средний балл по каждой категории)
  Object.keys(scores).forEach(category => {
    const cat = category as CompetencyCategory;
    if (categoryCounts[cat] > 0) {
      scores[cat] = Math.round((scores[cat] / categoryCounts[cat]) * 10) / 10;
    }
  });

  // Находим слабые и сильные стороны
  const sortedCategories = Object.entries(scores)
    .sort(([, a], [, b]) => a - b)
    .map(([category]) => category as CompetencyCategory);

  const weakCategories = sortedCategories.slice(0, 2); // Берем 2 самые слабые
  const strongCategories = sortedCategories.slice(-2).reverse(); // Берем 2 самые сильные

  // Получаем рекомендации курсов
  const recommendations = getCourseRecommendations(weakCategories);

  return {
    scores,
    weakCategories,
    strongCategories,
    recommendations,
    completedAt: new Date()
  };
}

export function getScoreColor(score: number): string {
  if (score >= 8) return 'text-green-600';
  if (score >= 6) return 'text-yellow-600';
  if (score >= 4) return 'text-orange-600';
  return 'text-red-600';
}

export function getScoreLabel(score: number): string {
  if (score >= 9) return 'Эксперт';
  if (score >= 7) return 'Продвинутый';
  if (score >= 5) return 'Средний';
  if (score >= 3) return 'Начальный';
  return 'Требует развития';
}

export function calculateProgress(answers: Answer[]): number {
  const totalQuestions = questions.length;
  return Math.round((answers.length / totalQuestions) * 100);
}