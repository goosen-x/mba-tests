import { MBAQuestion } from '@/types';

export const mbaQuestions: MBAQuestion[] = [
  // Формат обучения
  {
    id: 'q1',
    category: 'format',
    question: 'Как вы предпочитаете учиться?',
    subtext: 'Подумайте о том, как вы лучше усваиваете информацию',
    likeValue: {
      tags: ['format_online', 'spec_digital'],
      formats: ['online'],
      durations: ['short', 'medium']
    },
    dislikeValue: {
      tags: ['format_offline'],
      formats: ['offline'],
      durations: ['long']
    }
  },
  {
    id: 'q2',
    category: 'format',
    question: 'Важна ли для вас возможность совмещать учебу с работой?',
    subtext: 'Многие программы предлагают гибкий график',
    likeValue: {
      tags: ['format_online', 'format_hybrid'],
      formats: ['online', 'hybrid'],
      types: ['mini', 'executive']
    },
    dislikeValue: {
      tags: ['format_offline'],
      formats: ['offline'],
      types: ['general']
    }
  },

  // Цели образования
  {
    id: 'q3',
    category: 'goals',
    question: 'Что для вас важнее: практические навыки или фундаментальные знания?',
    subtext: 'Оба подхода имеют свои преимущества',
    likeValue: {
      tags: ['skill_project', 'spec_operations', 'career_startup'],
      types: ['specialized', 'mini']
    },
    dislikeValue: {
      tags: ['spec_strategy'],
      types: ['general', 'executive']
    }
  },
  {
    id: 'q4',
    category: 'goals',
    question: 'Хотели бы вы развивать предпринимательские навыки?',
    subtext: 'Создание и развитие собственного бизнеса',
    likeValue: {
      tags: ['career_entrepreneur', 'career_startup', 'spec_innovation'],
      types: ['specialized']
    },
    dislikeValue: {
      tags: ['career_corporate', 'career_consulting'],
      types: ['executive']
    }
  },

  // Стиль обучения
  {
    id: 'q5',
    category: 'style',
    question: 'Предпочитаете ли вы обучение через реальные кейсы и проекты?',
    subtext: 'Практический опыт vs теоретические знания',
    likeValue: {
      tags: ['skill_project', 'spec_operations', 'skill_analytics'],
      types: ['specialized', 'executive']
    },
    dislikeValue: {
      tags: ['spec_strategy'],
      types: ['general']
    }
  },
  {
    id: 'q6',
    category: 'style',
    question: 'Интересует ли вас международный опыт в образовании?',
    subtext: 'Обучение с международными студентами и преподавателями',
    likeValue: {
      tags: ['format_offline', 'career_consulting'],
      types: ['executive', 'general'],
      durations: ['long']
    },
    dislikeValue: {
      tags: ['format_online'],
      types: ['mini'],
      durations: ['short']
    }
  },

  // Нетворкинг
  {
    id: 'q7',
    category: 'networking',
    question: 'Насколько важны для вас новые профессиональные контакты?',
    subtext: 'Нетворкинг - важная часть многих программ',
    likeValue: {
      tags: ['format_offline', 'format_hybrid', 'career_corporate'],
      types: ['executive', 'general'],
      formats: ['offline', 'hybrid']
    },
    dislikeValue: {
      tags: ['format_online'],
      formats: ['online'],
      types: ['mini']
    }
  },
  {
    id: 'q8',
    category: 'networking',
    question: 'Хотели бы вы учиться вместе с топ-менеджерами крупных компаний?',
    subtext: 'Обмен опытом с руководителями высшего звена',
    likeValue: {
      tags: ['career_corporate', 'spec_leadership'],
      types: ['executive'],
      durations: ['long']
    },
    dislikeValue: {
      tags: ['career_startup', 'spec_digital'],
      types: ['mini', 'specialized'],
      durations: ['short']
    }
  },

  // Интенсивность
  {
    id: 'q9',
    category: 'intensity',
    question: 'Готовы ли вы к интенсивному обучению?',
    subtext: 'Некоторые программы требуют полного погружения',
    likeValue: {
      tags: ['format_offline'],
      types: ['general'],
      durations: ['long'],
      formats: ['offline']
    },
    dislikeValue: {
      tags: ['format_online', 'format_hybrid'],
      types: ['mini'],
      durations: ['short'],
      formats: ['online', 'hybrid']
    }
  },
  {
    id: 'q10',
    category: 'intensity',
    question: 'Предпочитаете размеренный темп обучения?',
    subtext: 'Возможность учиться в своем ритме',
    likeValue: {
      tags: ['format_online', 'format_hybrid'],
      types: ['mini', 'specialized'],
      durations: ['medium', 'long'],
      formats: ['online', 'hybrid']
    },
    dislikeValue: {
      tags: ['format_offline'],
      types: ['general'],
      durations: ['short']
    }
  },

  // Фокус
  {
    id: 'q11',
    category: 'focus',
    question: 'Интересует ли вас цифровая трансформация бизнеса?',
    subtext: 'IT, AI, Big Data в современном управлении',
    likeValue: {
      tags: ['spec_digital', 'spec_innovation', 'skill_analytics'],
      types: ['specialized', 'mini']
    },
    dislikeValue: {
      tags: ['spec_hr', 'spec_operations'],
      types: ['general']
    }
  },
  {
    id: 'q12',
    category: 'focus',
    question: 'Важно ли для вас развитие лидерских качеств?',
    subtext: 'Soft skills и управление командами',
    likeValue: {
      tags: ['spec_leadership', 'spec_hr', 'skill_teamwork'],
      types: ['executive', 'general']
    },
    dislikeValue: {
      tags: ['spec_digital', 'skill_analytics'],
      types: ['specialized']
    }
  },
  {
    id: 'q13',
    category: 'focus',
    question: 'Хотели бы вы углубиться в финансовый менеджмент?',
    subtext: 'Управление финансами, инвестиции, оценка бизнеса',
    likeValue: {
      tags: ['spec_finance', 'skill_analytics', 'career_consulting'],
      types: ['specialized', 'executive']
    },
    dislikeValue: {
      tags: ['spec_marketing', 'spec_hr'],
      types: ['mini']
    }
  },
  {
    id: 'q14',
    category: 'goals',
    question: 'Планируете ли вы карьерный переход в новую сферу?',
    subtext: 'Смена индустрии или функции',
    likeValue: {
      tags: ['career_consulting', 'spec_strategy'],
      types: ['general', 'executive'],
      durations: ['long']
    },
    dislikeValue: {
      tags: ['career_corporate'],
      types: ['mini', 'specialized'],
      durations: ['short']
    }
  },
  {
    id: 'q15',
    category: 'style',
    question: 'Привлекает ли вас идея обучения в небольших группах?',
    subtext: 'Персонализированный подход и внимание к каждому студенту',
    likeValue: {
      tags: ['format_offline', 'format_hybrid'],
      types: ['executive', 'specialized'],
      formats: ['offline', 'hybrid']
    },
    dislikeValue: {
      tags: ['format_online'],
      types: ['general', 'mini'],
      formats: ['online']
    }
  }
];

// Функция для получения вопроса по ID
export function getQuestionById(id: string): MBAQuestion | undefined {
  return mbaQuestions.find(q => q.id === id);
}