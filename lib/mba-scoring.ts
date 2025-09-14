import { SwipeResult, MBATestResult, MBAProgram, MBAFormat, MBAType, MBADuration, MBAQuestion } from '@/types';
import { mbaPrograms, mbaTags } from './mba-programs';
import { mbaQuestions } from './mba-questions';

export function calculateMBAResults(swipes: SwipeResult[]): MBATestResult {
  // Анализируем ответы на вопросы
  const preferences = analyzeQuestionResponses(swipes);
  
  // Получаем рекомендованные программы на основе ответов
  const recommendedPrograms = getRecommendedPrograms(swipes, preferences);
  
  return {
    recommendedPrograms,
    swipeHistory: swipes,
    preferences,
    completedAt: new Date()
  };
}

function analyzeQuestionResponses(swipes: SwipeResult[]) {
  // Подсчитываем теги, форматы, типы и длительности из ответов на вопросы
  const tagCounts: Record<string, number> = {};
  const formatCounts: Record<MBAFormat, number> = {
    online: 0,
    offline: 0,
    hybrid: 0
  };
  const typeCounts: Record<MBAType, number> = {
    executive: 0,
    mini: 0,
    specialized: 0,
    general: 0
  };
  const durationCounts: Record<MBADuration, number> = {
    short: 0,
    medium: 0,
    long: 0
  };

  // Анализируем каждый свайп
  swipes.forEach(swipe => {
    const question = mbaQuestions.find(q => q.id === swipe.questionId);
    if (!question) return;

    const values = swipe.action === 'like' ? question.likeValue : question.dislikeValue;
    const multiplier = swipe.action === 'like' ? 1 : -1;

    // Обрабатываем теги
    values.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + multiplier;
    });

    // Обрабатываем форматы
    values.formats?.forEach(format => {
      formatCounts[format] += multiplier;
    });

    // Обрабатываем типы
    values.types?.forEach(type => {
      typeCounts[type] += multiplier;
    });

    // Обрабатываем длительности
    values.durations?.forEach(duration => {
      durationCounts[duration] += multiplier;
    });
  });

  // Выбираем топ предпочтения (только с положительными значениями)
  const preferredFormats = getTopPositiveItems(formatCounts, 2);
  const preferredTypes = getTopPositiveItems(typeCounts, 2);
  const preferredDurations = getTopPositiveItems(durationCounts, 2);
  const preferredTags = getTopPositiveItems(tagCounts, 5);

  return {
    format: preferredFormats,
    type: preferredTypes,
    duration: preferredDurations,
    tags: preferredTags
  };
}

function getTopPositiveItems<T extends string>(counts: Record<T, number>, limit: number): T[] {
  return Object.entries(counts)
    .filter(([, count]) => (count as number) > 0) // Берем только положительные значения
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, limit)
    .map(([key]) => key as T);
}

function getRecommendedPrograms(
  swipes: SwipeResult[], 
  preferences: MBATestResult['preferences']
): MBAProgram[] {
  // Оцениваем все программы на основе предпочтений
  const scoredPrograms = mbaPrograms.map(program => {
    let score = 0;
    
    // Базовые баллы за совпадение с предпочтениями
    if (preferences.format.includes(program.format)) score += 4;
    if (preferences.type.includes(program.type)) score += 4;
    if (preferences.duration.includes(program.durationCategory)) score += 3;
    
    // Баллы за теги
    program.tags.forEach(tag => {
      if (preferences.tags.includes(tag)) score += 2;
    });

    // Штраф за несоответствие основным предпочтениям
    if (preferences.format.length > 0 && !preferences.format.includes(program.format)) {
      score -= 2;
    }
    if (preferences.type.length > 0 && !preferences.type.includes(program.type)) {
      score -= 2;
    }
    
    return { program, score };
  });
  
  // Сортируем по баллам и берем топ-3
  return scoredPrograms
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.program);
}

// Функция для получения объяснения, почему программа рекомендована
export function getRecommendationReason(
  program: MBAProgram, 
  preferences: MBATestResult['preferences'],
  swipes: SwipeResult[]
): string[] {
  const reasons: string[] = [];
  
  // Анализируем, какие вопросы привели к этой рекомендации
  const relevantSwipes = swipes.filter(swipe => {
    const question = mbaQuestions.find(q => q.id === swipe.questionId);
    if (!question) return false;
    
    const values = swipe.action === 'like' ? question.likeValue : question.dislikeValue;
    
    // Проверяем соответствие программы ответам
    if (values.formats?.includes(program.format)) return true;
    if (values.types?.includes(program.type)) return true;
    if (values.durations?.includes(program.durationCategory)) return true;
    if (values.tags.some(tag => program.tags.includes(tag))) return true;
    
    return false;
  });

  if (preferences.format.includes(program.format)) {
    const formatName = program.format === 'online' ? 'онлайн' : 
                       program.format === 'offline' ? 'очный' : 'гибридный';
    reasons.push(`Подходящий формат обучения: ${formatName}`);
  }
  
  if (preferences.type.includes(program.type)) {
    const typeName = program.type === 'executive' ? 'Executive MBA' :
                     program.type === 'mini' ? 'Mini MBA' :
                     program.type === 'specialized' ? 'специализированная программа' : 'классическая MBA';
    reasons.push(`Интересующий вас тип программы: ${typeName}`);
  }
  
  if (preferences.duration.includes(program.durationCategory)) {
    const durationName = program.durationCategory === 'short' ? 'короткая' :
                        program.durationCategory === 'medium' ? 'средняя' : 'длительная';
    reasons.push(`Оптимальная длительность: ${durationName} программа`);
  }
  
  // Проверяем совпадение тегов
  const matchingTags = program.tags.filter(tag => preferences.tags.includes(tag));
  if (matchingTags.length > 0) {
    const tagNames = matchingTags
      .slice(0, 3)
      .map(tagId => mbaTags.find(t => t.id === tagId)?.name || tagId)
      .join(', ');
    reasons.push(`Соответствует вашим интересам: ${tagNames}`);
  }

  // Добавляем информацию на основе конкретных ответов
  if (relevantSwipes.length > 0) {
    const likedQuestions = relevantSwipes
      .filter(s => s.action === 'like')
      .map(s => mbaQuestions.find(q => q.id === s.questionId))
      .filter(Boolean) as MBAQuestion[];
    
    if (likedQuestions.length > 0) {
      const questionTopics = likedQuestions
        .slice(0, 2)
        .map(q => {
          switch(q.category) {
            case 'format': return 'формат обучения';
            case 'goals': return 'цели образования';
            case 'style': return 'стиль обучения';
            case 'networking': return 'нетворкинг';
            case 'intensity': return 'интенсивность';
            case 'focus': return 'фокус программы';
            default: return q.category;
          }
        })
        .join(' и ');
      reasons.push(`Основано на ваших предпочтениях в вопросах про ${questionTopics}`);
    }
  }
  
  return reasons;
}