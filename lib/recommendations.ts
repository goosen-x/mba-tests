import { Course, CompetencyCategory } from '@/types';

export const courses: Course[] = [
  // Финансы
  {
    id: 'fin_basic',
    title: 'Финансы для руководителей',
    description: 'Основы финансового планирования и анализа для принятия управленческих решений',
    category: 'finance',
    price: 29900,
    oldPrice: 39900,
    duration: '6 недель',
    level: 'beginner',
    features: ['Анализ финансовой отчетности', 'Бюджетирование', 'Финансовое планирование'],
    isSpecialOffer: true
  },
  {
    id: 'fin_advanced',
    title: 'Корпоративные финансы',
    description: 'Продвинутые методы управления корпоративными финансами и оценка инвестиционных проектов',
    category: 'finance',
    price: 49900,
    oldPrice: 59900,
    duration: '8 недель',
    level: 'advanced',
    features: ['Оценка бизнеса', 'M&A', 'Структура капитала']
  },

  // Продажи
  {
    id: 'sal_b2b',
    title: 'B2B продажи высокой сложности',
    description: 'Системный подход к продажам в B2B сегменте и работа с крупными клиентами',
    category: 'sales',
    price: 24900,
    oldPrice: 32900,
    duration: '5 недель',
    level: 'intermediate',
    features: ['SPIN-продажи', 'Работа с ЛПР', 'CRM системы'],
    isSpecialOffer: true
  },
  {
    id: 'sal_team',
    title: 'Управление отделом продаж',
    description: 'Построение эффективной команды продаж и мотивация сотрудников',
    category: 'sales',
    price: 39900,
    duration: '6 недель',
    level: 'advanced',
    features: ['KPI для продаж', 'Система мотивации', 'Воронка продаж']
  },

  // Маркетинг
  {
    id: 'mar_digital',
    title: 'Цифровой маркетинг',
    description: 'Современные инструменты digital-маркетинга для привлечения клиентов',
    category: 'marketing',
    price: 28900,
    oldPrice: 37900,
    duration: '6 недель',
    level: 'intermediate',
    features: ['Performance маркетинг', 'SMM', 'Email маркетинг'],
    isSpecialOffer: true
  },
  {
    id: 'mar_strategy',
    title: 'Стратегический маркетинг',
    description: 'Разработка долгосрочной маркетинговой стратегии и позиционирования бренда',
    category: 'marketing',
    price: 42900,
    duration: '7 недель',
    level: 'advanced',
    features: ['Исследование рынка', 'Бренд-стратегия', 'Конкурентный анализ']
  },

  // Управление персоналом
  {
    id: 'hr_talent',
    title: 'Управление талантами',
    description: 'Привлечение, развитие и удержание ключевых сотрудников',
    category: 'hrManagement',
    price: 35900,
    oldPrice: 43900,
    duration: '7 недель',
    level: 'advanced',
    features: ['Talent Management', 'Оценка персонала', 'Планирование карьеры'],
    isSpecialOffer: true
  },
  {
    id: 'hr_basic',
    title: 'Основы управления персоналом',
    description: 'Базовые навыки HR-менеджера для эффективного управления командой',
    category: 'hrManagement',
    price: 24900,
    duration: '5 недель',
    level: 'beginner',
    features: ['Подбор персонала', 'Адаптация сотрудников', 'Мотивация команды']
  },

  // IT
  {
    id: 'it_digital',
    title: 'Цифровая трансформация бизнеса',
    description: 'Стратегии внедрения цифровых технологий для повышения эффективности бизнеса',
    category: 'it',
    price: 44900,
    oldPrice: 54900,
    duration: '8 недель',
    level: 'advanced',
    features: ['Автоматизация процессов', 'Big Data', 'ИИ в бизнесе'],
    isSpecialOffer: true
  },
  {
    id: 'it_automation',
    title: 'Автоматизация бизнес-процессов',
    description: 'Выбор и внедрение IT-решений для оптимизации рабочих процессов',
    category: 'it',
    price: 32900,
    duration: '6 недель',
    level: 'intermediate',
    features: ['CRM системы', 'ERP внедрение', 'Workflow оптимизация']
  },

  // Аналитика
  {
    id: 'ana_business',
    title: 'Бизнес-аналитика',
    description: 'Принятие решений на основе данных и построение аналитических систем',
    category: 'analytics',
    price: 38900,
    oldPrice: 47900,
    duration: '8 недель',
    level: 'intermediate',
    features: ['Power BI', 'KPI системы', 'Прогнозирование'],
    isSpecialOffer: true
  },
  {
    id: 'ana_data_driven',
    title: 'Data-driven управление',
    description: 'Управление бизнесом на основе данных и метрик',
    category: 'analytics',
    price: 29900,
    duration: '6 недель',
    level: 'beginner',
    features: ['Основы аналитики', 'Метрики эффективности', 'Отчетность']
  }
];

export function getCourseRecommendations(weakCategories: CompetencyCategory[]): Course[] {
  // Находим курсы для слабых категорий
  const recommendedCourses: Course[] = [];
  
  weakCategories.forEach(category => {
    const categoryCourses = courses.filter(course => course.category === category);
    // Добавляем максимум 2 курса на категорию, начиная с базовых
    const sortedCourses = categoryCourses.sort((a, b) => {
      const levelOrder = { beginner: 1, intermediate: 2, advanced: 3 };
      return levelOrder[a.level] - levelOrder[b.level];
    });
    recommendedCourses.push(...sortedCourses.slice(0, 2));
  });

  // Добавляем курсы с акциями для увеличения конверсии
  const specialOfferCourses = courses.filter(course => 
    course.isSpecialOffer && !recommendedCourses.find(rc => rc.id === course.id)
  );
  recommendedCourses.push(...specialOfferCourses.slice(0, 2));

  // Возвращаем топ-5 курсов
  return recommendedCourses.slice(0, 5);
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU') + ' ₽';
}