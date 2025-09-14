import { Question } from '@/types';

// Правильный порядок для каждого вопроса
export const correctAnswers: Record<string, string[]> = {
  'fin_1': ['bootstrap', 'friends_family', 'angel', 'vc', 'bank'],
  'fin_2': ['cashflow', 'profitability', 'liquidity', 'growth_rate', 'debt_ratio'],
  'sal_1': ['prospecting', 'qualifying', 'presentation', 'objections', 'closing'],
  'sal_2': ['needs_understanding', 'trust_building', 'value_demonstration', 'perfect_timing', 'competitive_price'],
  'mar_1': ['awareness', 'interest', 'consideration', 'purchase', 'retention'],
  'mar_2': ['referrals', 'content_marketing', 'social_media', 'paid_advertising', 'cold_outreach'],
  'hr_1': ['preparation', 'welcome', 'training', 'mentoring', 'evaluation'],
  'hr_2': ['cultural_fit', 'professional_skills', 'learning_ability', 'communication', 'experience'],
  'it_1': ['assessment', 'strategy', 'pilot', 'scaling', 'optimization'],
  'it_2': ['crm', 'accounting', 'project_management', 'hr_system', 'inventory'],
  'ana_1': ['data_collection', 'data_cleaning', 'analysis', 'insights', 'action'],
  'ana_2': ['ltv_cac', 'conversion_rate', 'average_order', 'traffic_volume', 'bounce_rate']
};

export const questions: Question[] = [
  // Финансы (2 вопроса)
  {
    id: 'fin_1',
    category: 'finance',
    type: 'dragDrop',
    text: 'Расставьте по приоритету источники финансирования для стартапа',
    items: [
      { id: 'bootstrap', text: 'Собственные средства' },
      { id: 'friends_family', text: 'Друзья и семья' },
      { id: 'angel', text: 'Бизнес-ангелы' },
      { id: 'vc', text: 'Венчурный капитал' },
      { id: 'bank', text: 'Банковский кредит' }
    ]
  },
  {
    id: 'fin_2',
    category: 'finance',
    type: 'dragDrop',
    text: 'Расставьте финансовые показатели по важности для оценки компании',
    items: [
      { id: 'cashflow', text: 'Денежный поток' },
      { id: 'profitability', text: 'Рентабельность' },
      { id: 'liquidity', text: 'Ликвидность' },
      { id: 'debt_ratio', text: 'Долговая нагрузка' },
      { id: 'growth_rate', text: 'Темпы роста' }
    ]
  },

  // Продажи (2 вопроса)
  {
    id: 'sal_1',
    category: 'sales',
    type: 'dragDrop',
    text: 'Расставьте этапы продажи в правильном порядке',
    items: [
      { id: 'prospecting', text: 'Поиск потенциальных клиентов' },
      { id: 'qualifying', text: 'Квалификация лида' },
      { id: 'presentation', text: 'Презентация решения' },
      { id: 'objections', text: 'Работа с возражениями' },
      { id: 'closing', text: 'Закрытие сделки' }
    ]
  },
  {
    id: 'sal_2',
    category: 'sales',
    type: 'dragDrop',
    text: 'Приоритизируйте факторы успешной сделки по важности',
    items: [
      { id: 'needs_understanding', text: 'Понимание потребностей клиента' },
      { id: 'trust_building', text: 'Построение доверия' },
      { id: 'value_demonstration', text: 'Демонстрация ценности' },
      { id: 'competitive_price', text: 'Конкурентная цена' },
      { id: 'perfect_timing', text: 'Идеальный тайминг' }
    ]
  },

  // Маркетинг (2 вопроса)
  {
    id: 'mar_1',
    category: 'marketing',
    type: 'dragDrop',
    text: 'Расставьте этапы маркетинговой воронки в правильном порядке',
    items: [
      { id: 'awareness', text: 'Осведомленность' },
      { id: 'interest', text: 'Интерес' },
      { id: 'consideration', text: 'Рассмотрение' },
      { id: 'purchase', text: 'Покупка' },
      { id: 'retention', text: 'Удержание' }
    ]
  },
  {
    id: 'mar_2',
    category: 'marketing',
    type: 'dragDrop',
    text: 'Приоритизируйте каналы привлечения клиентов по эффективности',
    items: [
      { id: 'referrals', text: 'Рекомендации клиентов' },
      { id: 'content_marketing', text: 'Контент-маркетинг' },
      { id: 'social_media', text: 'Социальные сети' },
      { id: 'paid_advertising', text: 'Платная реклама' },
      { id: 'cold_outreach', text: 'Холодные обращения' }
    ]
  },

  // Управление персоналом (2 вопроса)
  {
    id: 'hr_1',
    category: 'hrManagement',
    type: 'dragDrop',
    text: 'Расставьте этапы адаптации нового сотрудника в правильном порядке',
    items: [
      { id: 'preparation', text: 'Подготовка к приходу' },
      { id: 'welcome', text: 'Знакомство с командой' },
      { id: 'training', text: 'Обучение процессам' },
      { id: 'mentoring', text: 'Наставничество' },
      { id: 'evaluation', text: 'Оценка результатов' }
    ]
  },
  {
    id: 'hr_2',
    category: 'hrManagement',
    type: 'dragDrop',
    text: 'Приоритизируйте качества идеального сотрудника по важности',
    items: [
      { id: 'cultural_fit', text: 'Соответствие культуре компании' },
      { id: 'professional_skills', text: 'Профессиональные навыки' },
      { id: 'learning_ability', text: 'Способность к обучению' },
      { id: 'communication', text: 'Коммуникативные навыки' },
      { id: 'experience', text: 'Опыт работы' }
    ]
  },

  // IT (2 вопроса)
  {
    id: 'it_1',
    category: 'it',
    type: 'dragDrop',
    text: 'Расставьте этапы цифровой трансформации в правильном порядке',
    items: [
      { id: 'assessment', text: 'Аудит текущего состояния' },
      { id: 'strategy', text: 'Разработка стратегии' },
      { id: 'pilot', text: 'Пилотный проект' },
      { id: 'scaling', text: 'Масштабирование' },
      { id: 'optimization', text: 'Оптимизация процессов' }
    ]
  },
  {
    id: 'it_2',
    category: 'it',
    type: 'dragDrop',
    text: 'Приоритизируйте системы для автоматизации бизнеса по важности',
    items: [
      { id: 'crm', text: 'CRM - управление клиентами' },
      { id: 'accounting', text: 'Система учета и финансов' },
      { id: 'project_management', text: 'Управление проектами' },
      { id: 'inventory', text: 'Управление складом' },
      { id: 'hr_system', text: 'HR-система' }
    ]
  },

  // Аналитика (2 вопроса)
  {
    id: 'ana_1',
    category: 'analytics',
    type: 'dragDrop',
    text: 'Расставьте этапы аналитического процесса в правильном порядке',
    items: [
      { id: 'data_collection', text: 'Сбор данных' },
      { id: 'data_cleaning', text: 'Очистка и подготовка данных' },
      { id: 'analysis', text: 'Анализ и моделирование' },
      { id: 'insights', text: 'Формулирование выводов' },
      { id: 'action', text: 'Принятие решений' }
    ]
  },
  {
    id: 'ana_2',
    category: 'analytics',
    type: 'dragDrop',
    text: 'Приоритизируйте KPI для интернет-магазина по важности',
    items: [
      { id: 'ltv_cac', text: 'Соотношение LTV к CAC' },
      { id: 'conversion_rate', text: 'Конверсия сайта' },
      { id: 'average_order', text: 'Средний чек' },
      { id: 'traffic_volume', text: 'Объем трафика' },
      { id: 'bounce_rate', text: 'Показатель отказов' }
    ]
  }
];