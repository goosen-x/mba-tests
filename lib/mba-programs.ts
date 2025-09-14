import { MBAProgram, MBAProgramTag } from '@/types';

// Теги для классификации программ
export const mbaTags: MBAProgramTag[] = [
  // Формат
  { id: 'format_online', name: 'Онлайн обучение', category: 'format' },
  { id: 'format_offline', name: 'Очное обучение', category: 'format' },
  { id: 'format_hybrid', name: 'Смешанный формат', category: 'format' },
  
  // Специализация
  { id: 'spec_finance', name: 'Финансы', category: 'specialization' },
  { id: 'spec_marketing', name: 'Маркетинг', category: 'specialization' },
  { id: 'spec_strategy', name: 'Стратегия', category: 'specialization' },
  { id: 'spec_leadership', name: 'Лидерство', category: 'specialization' },
  { id: 'spec_innovation', name: 'Инновации', category: 'specialization' },
  { id: 'spec_digital', name: 'Digital', category: 'specialization' },
  { id: 'spec_hr', name: 'HR', category: 'specialization' },
  { id: 'spec_operations', name: 'Операции', category: 'specialization' },
  { id: 'spec_logistics', name: 'Логистика', category: 'specialization' },
  { id: 'spec_safety', name: 'Безопасность', category: 'specialization' },
  { id: 'spec_analytics', name: 'Аналитика', category: 'specialization' },
  { id: 'spec_investments', name: 'Инвестиции', category: 'specialization' },
  
  // Навыки
  { id: 'skill_analytics', name: 'Аналитика', category: 'skills' },
  { id: 'skill_negotiation', name: 'Переговоры', category: 'skills' },
  { id: 'skill_presentation', name: 'Презентации', category: 'skills' },
  { id: 'skill_teamwork', name: 'Командная работа', category: 'skills' },
  { id: 'skill_project', name: 'Управление проектами', category: 'skills' },
  { id: 'skill_risk', name: 'Управление рисками', category: 'skills' },
  
  // Карьера
  { id: 'career_startup', name: 'Для стартапов', category: 'career' },
  { id: 'career_corporate', name: 'Корпоративная карьера', category: 'career' },
  { id: 'career_entrepreneur', name: 'Предпринимательство', category: 'career' },
  { id: 'career_consulting', name: 'Консалтинг', category: 'career' },
  { id: 'career_government', name: 'Госслужба', category: 'career' },
];

export const mbaPrograms: MBAProgram[] = [
  {
    id: 'mba_1',
    title: 'Управление изменениями и развитием бизнеса',
    subtitle: 'Программа для руководителей, внедряющих изменения',
    type: 'specialized',
    format: 'hybrid',
    duration: '12 месяцев',
    durationCategory: 'medium',
    price: 495000,
    features: [
      'Change management методологии',
      'Управление сопротивлением изменениям',
      'Agile-трансформация организаций',
      'Кейсы успешных трансформаций'
    ],
    tags: ['format_hybrid', 'spec_strategy', 'spec_leadership', 'career_corporate', 'skill_project'],
    university: 'Бизнес-школа управления',
    rating: 4.7,
    graduatesCount: 890
  },
  {
    id: 'mba_2',
    title: 'Управление в энергетике',
    subtitle: 'MBA для руководителей энергетического сектора',
    type: 'specialized',
    format: 'offline',
    duration: '18 месяцев',
    durationCategory: 'long',
    price: 680000,
    features: [
      'Энергетические рынки и регулирование',
      'Зеленая энергетика и ESG',
      'Цифровизация в энергетике',
      'Управление энергоактивами'
    ],
    tags: ['format_offline', 'spec_operations', 'spec_strategy', 'career_corporate', 'spec_innovation'],
    university: 'Энергетический институт',
    rating: 4.8,
    graduatesCount: 420
  },
  {
    id: 'mba_3',
    title: 'Управление малым бизнесом',
    subtitle: 'Практические инструменты для владельцев МСБ',
    type: 'mini',
    format: 'online',
    duration: '6 месяцев',
    durationCategory: 'short',
    price: 180000,
    features: [
      'Финансовое планирование для МСБ',
      'Маркетинг с ограниченным бюджетом',
      'Управление командой до 50 человек',
      'Масштабирование малого бизнеса'
    ],
    tags: ['format_online', 'career_entrepreneur', 'spec_finance', 'spec_marketing', 'skill_project'],
    university: 'Школа предпринимательства',
    rating: 4.6,
    graduatesCount: 2300
  },
  {
    id: 'mba_4',
    title: 'Антикризисное управление',
    subtitle: 'Стратегии выживания и восстановления бизнеса',
    type: 'specialized',
    format: 'hybrid',
    duration: '9 месяцев',
    durationCategory: 'medium',
    price: 520000,
    features: [
      'Диагностика кризисных ситуаций',
      'Реструктуризация бизнеса',
      'Работа с кредиторами',
      'Антикризисные коммуникации'
    ],
    tags: ['format_hybrid', 'spec_strategy', 'spec_finance', 'skill_risk', 'career_consulting'],
    university: 'Институт кризис-менеджмента',
    rating: 4.7,
    graduatesCount: 670
  },
  {
    id: 'mba_5',
    title: 'Управление безопасностью на предприятии',
    subtitle: 'Комплексная безопасность бизнеса',
    type: 'specialized',
    format: 'offline',
    duration: '10 месяцев',
    durationCategory: 'medium',
    price: 450000,
    features: [
      'Экономическая безопасность',
      'Информационная безопасность',
      'Управление рисками',
      'Комплаенс и внутренний контроль'
    ],
    tags: ['format_offline', 'spec_safety', 'skill_risk', 'spec_operations', 'career_corporate'],
    university: 'Академия корпоративной безопасности',
    rating: 4.5,
    graduatesCount: 380
  },
  {
    id: 'mba_6',
    title: 'Менеджмент IT-проектов',
    subtitle: 'Управление цифровыми продуктами и командами',
    type: 'specialized',
    format: 'online',
    duration: '8 месяцев',
    durationCategory: 'medium',
    price: 380000,
    features: [
      'Agile и Scrum на практике',
      'Product management',
      'Управление распределенными командами',
      'DevOps культура'
    ],
    tags: ['format_online', 'spec_digital', 'skill_project', 'career_startup', 'spec_innovation'],
    university: 'IT Business School',
    rating: 4.8,
    graduatesCount: 1450
  },
  {
    id: 'mba_7',
    title: 'Управление логистикой и цепями поставок',
    subtitle: 'Supply Chain Management в эпоху глобализации',
    type: 'specialized',
    format: 'hybrid',
    duration: '12 месяцев',
    durationCategory: 'medium',
    price: 480000,
    features: [
      'Оптимизация логистических процессов',
      'Управление запасами',
      'Международная логистика',
      'Digital SCM решения'
    ],
    tags: ['format_hybrid', 'spec_logistics', 'spec_operations', 'skill_analytics', 'career_corporate'],
    university: 'Логистическая бизнес-школа',
    rating: 4.6,
    graduatesCount: 560
  },
  {
    id: 'mba_8',
    title: 'Управление персоналом',
    subtitle: 'Современный HR-менеджмент и развитие талантов',
    type: 'specialized',
    format: 'offline',
    duration: '10 месяцев',
    durationCategory: 'medium',
    price: 420000,
    features: [
      'HR-стратегия и планирование',
      'Оценка и развитие персонала',
      'Компенсации и benefits',
      'HR-аналитика и метрики'
    ],
    tags: ['format_offline', 'spec_hr', 'spec_leadership', 'skill_teamwork', 'career_corporate'],
    university: 'Школа HR-менеджмента',
    rating: 4.7,
    graduatesCount: 920
  },
  {
    id: 'mba_9',
    title: 'Производственный менеджмент',
    subtitle: 'Эффективное управление производством',
    type: 'specialized',
    format: 'hybrid',
    duration: '14 месяцев',
    durationCategory: 'long',
    price: 550000,
    features: [
      'Бережливое производство',
      'Управление качеством',
      'Промышленная безопасность',
      'Индустрия 4.0'
    ],
    tags: ['format_hybrid', 'spec_operations', 'skill_project', 'spec_innovation', 'career_corporate'],
    university: 'Промышленная академия',
    rating: 4.5,
    graduatesCount: 680
  },
  {
    id: 'mba_10',
    title: 'Управление проектами',
    subtitle: 'PMI и национальные стандарты проектного управления',
    type: 'general',
    format: 'online',
    duration: '9 месяцев',
    durationCategory: 'medium',
    price: 350000,
    features: [
      'PMBOK и методологии PM',
      'Управление портфелем проектов',
      'Риск-менеджмент в проектах',
      'Подготовка к PMP сертификации'
    ],
    tags: ['format_online', 'skill_project', 'skill_risk', 'spec_operations', 'career_corporate'],
    university: 'Проектная школа управления',
    rating: 4.6,
    graduatesCount: 1800
  },
  {
    id: 'mba_11',
    title: 'Управление рисками',
    subtitle: 'Комплексный риск-менеджмент в организации',
    type: 'specialized',
    format: 'hybrid',
    duration: '11 месяцев',
    durationCategory: 'medium',
    price: 480000,
    features: [
      'Идентификация и оценка рисков',
      'Финансовые риски',
      'Операционные риски',
      'Построение системы управления рисками'
    ],
    tags: ['format_hybrid', 'skill_risk', 'spec_finance', 'skill_analytics', 'career_consulting'],
    university: 'Институт риск-менеджмента',
    rating: 4.7,
    graduatesCount: 520
  },
  {
    id: 'mba_12',
    title: 'Управление финансами',
    subtitle: 'CFO-программа для финансовых директоров',
    type: 'executive',
    format: 'offline',
    duration: '15 месяцев',
    durationCategory: 'long',
    price: 720000,
    oldPrice: 850000,
    features: [
      'Корпоративные финансы',
      'Финансовое моделирование',
      'M&A и оценка бизнеса',
      'МСФО и управленческий учет'
    ],
    tags: ['format_offline', 'spec_finance', 'skill_analytics', 'career_corporate', 'spec_strategy'],
    university: 'Финансовая академия',
    rating: 4.9,
    graduatesCount: 780
  },
  {
    id: 'mba_13',
    title: 'Цифровая трансформация в бизнесе',
    subtitle: 'Digital-стратегии и инновации',
    type: 'specialized',
    format: 'online',
    duration: '7 месяцев',
    durationCategory: 'medium',
    price: 390000,
    features: [
      'Digital-стратегия компании',
      'Большие данные и аналитика',
      'Автоматизация процессов',
      'Цифровая культура'
    ],
    tags: ['format_online', 'spec_digital', 'spec_innovation', 'skill_analytics', 'career_startup'],
    university: 'Digital Transformation Institute',
    rating: 4.8,
    graduatesCount: 1100
  },
  {
    id: 'mba_14',
    title: 'Корпоративное управление и стратегическое развитие',
    subtitle: 'Программа для членов советов директоров',
    type: 'executive',
    format: 'hybrid',
    duration: '18 месяцев',
    durationCategory: 'long',
    price: 890000,
    features: [
      'Корпоративное управление',
      'Стратегическое планирование',
      'Слияния и поглощения',
      'Работа совета директоров'
    ],
    tags: ['format_hybrid', 'spec_strategy', 'spec_leadership', 'career_corporate', 'skill_negotiation'],
    university: 'Высшая школа корпоративного управления',
    rating: 4.9,
    graduatesCount: 340
  },
  {
    id: 'mba_15',
    title: 'Бизнес-аналитика',
    subtitle: 'Data-driven подход к управлению',
    type: 'specialized',
    format: 'online',
    duration: '8 месяцев',
    durationCategory: 'medium',
    price: 420000,
    features: [
      'SQL и работа с данными',
      'Визуализация данных',
      'Предиктивная аналитика',
      'BI-системы'
    ],
    tags: ['format_online', 'spec_analytics', 'skill_analytics', 'spec_digital', 'career_corporate'],
    university: 'Школа бизнес-аналитики',
    rating: 4.7,
    graduatesCount: 890
  },
  {
    id: 'mba_16',
    title: 'Государственное и муниципальное управление',
    subtitle: 'Эффективное управление в госсекторе',
    type: 'specialized',
    format: 'hybrid',
    duration: '12 месяцев',
    durationCategory: 'medium',
    price: 380000,
    features: [
      'Государственное регулирование',
      'Бюджетный процесс',
      'ГЧП проекты',
      'Цифровизация госуслуг'
    ],
    tags: ['format_hybrid', 'spec_strategy', 'career_government', 'skill_project', 'spec_operations'],
    university: 'Академия государственной службы',
    rating: 4.5,
    graduatesCount: 1200
  },
  {
    id: 'mba_17',
    title: 'PRODUCT Management',
    subtitle: 'Создание и развитие цифровых продуктов',
    type: 'specialized',
    format: 'online',
    duration: '6 месяцев',
    durationCategory: 'short',
    price: 320000,
    features: [
      'Customer development',
      'Продуктовая стратегия',
      'Метрики и аналитика продукта',
      'Growth hacking'
    ],
    tags: ['format_online', 'spec_digital', 'skill_project', 'career_startup', 'skill_analytics'],
    university: 'Product School',
    rating: 4.8,
    graduatesCount: 1650
  },
  {
    id: 'mba_18',
    title: 'Управление в сфере инвестиций',
    subtitle: 'Инвестиционный анализ и портфельное управление',
    type: 'specialized',
    format: 'offline',
    duration: '14 месяцев',
    durationCategory: 'long',
    price: 680000,
    features: [
      'Оценка инвестиционных проектов',
      'Портфельная теория',
      'Private equity и венчурные инвестиции',
      'Управление инвестиционными фондами'
    ],
    tags: ['format_offline', 'spec_investments', 'spec_finance', 'skill_analytics', 'career_corporate'],
    university: 'Инвестиционная академия',
    rating: 4.8,
    graduatesCount: 450
  },
  {
    id: 'mba_19',
    title: 'Менеджмент в спортивных учреждениях',
    subtitle: 'Управление спортивными организациями и проектами',
    type: 'specialized',
    format: 'hybrid',
    duration: '10 месяцев',
    durationCategory: 'medium',
    price: 380000,
    features: [
      'Спортивный маркетинг',
      'Управление спортивными объектами',
      'Организация соревнований',
      'Спонсорство и партнерства'
    ],
    tags: ['format_hybrid', 'spec_marketing', 'spec_operations', 'skill_project', 'career_corporate'],
    university: 'Спортивная бизнес-школа',
    rating: 4.5,
    graduatesCount: 320
  },
  {
    id: 'mba_20',
    title: 'Управление в торговле',
    subtitle: 'Retail-менеджмент и электронная коммерция',
    type: 'specialized',
    format: 'online',
    duration: '9 месяцев',
    durationCategory: 'medium',
    price: 420000,
    features: [
      'Управление розничными сетями',
      'E-commerce стратегии',
      'Category management',
      'Омниканальные продажи'
    ],
    tags: ['format_online', 'spec_marketing', 'spec_operations', 'spec_digital', 'career_corporate'],
    university: 'Retail Business Academy',
    rating: 4.6,
    graduatesCount: 780
  },
  {
    id: 'mba_21',
    title: 'Менеджмент в гостиничном бизнесе',
    subtitle: 'Управление отелями и гостиничными сетями',
    type: 'specialized',
    format: 'hybrid',
    duration: '11 месяцев',
    durationCategory: 'medium',
    price: 460000,
    features: [
      'Revenue management',
      'Управление качеством сервиса',
      'Международные стандарты гостеприимства',
      'Digital-маркетинг в hospitality'
    ],
    tags: ['format_hybrid', 'spec_operations', 'spec_marketing', 'skill_teamwork', 'career_corporate'],
    university: 'Школа гостиничного бизнеса',
    rating: 4.6,
    graduatesCount: 410
  },
  {
    id: 'mba_22',
    title: 'Менеджмент в ресторанном бизнесе',
    subtitle: 'Создание и управление ресторанами',
    type: 'mini',
    format: 'offline',
    duration: '5 месяцев',
    durationCategory: 'short',
    price: 280000,
    features: [
      'Концепция и позиционирование',
      'Управление кухней и персоналом',
      'Food cost и финансы ресторана',
      'Маркетинг и продвижение'
    ],
    tags: ['format_offline', 'spec_operations', 'spec_marketing', 'career_entrepreneur', 'skill_teamwork'],
    university: 'Ресторанная школа управления',
    rating: 4.5,
    graduatesCount: 520
  }
];

// Функция для получения названия тега
export function getTagName(tagId: string): string {
  const tag = mbaTags.find(t => t.id === tagId);
  return tag ? tag.name : tagId;
}

// Функция для получения программы по ID
export function getMBAProgram(programId: string): MBAProgram | undefined {
  return mbaPrograms.find(program => program.id === programId);
}

// Функция для получения названия программы по ID
export function getMBAProgramTitle(programId: string): string {
  const program = getMBAProgram(programId);
  return program ? program.title : programId;
}

// Функция для фильтрации программ по тегам
export function filterProgramsByTags(programs: MBAProgram[], tagIds: string[]): MBAProgram[] {
  if (tagIds.length === 0) return programs;
  
  return programs.filter(program => 
    tagIds.some(tagId => program.tags.includes(tagId))
  );
}