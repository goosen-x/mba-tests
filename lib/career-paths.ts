export type CareerLevel = 'entry' | 'junior' | 'middle' | 'senior' | 'lead' | 'c-level';
export type CareerTrack = 'finance' | 'it' | 'hr' | 'operations' | 'marketing' | 'entrepreneurship';

export interface CareerPosition {
  id: string;
  title: string;
  track: CareerTrack;
  level: CareerLevel;
  yearsExperience: {
    min: number;
    max: number;
  };
  description: string;
  skills: string[];
  salary: {
    min: number;
    max: number;
  };
  nextPositions: string[]; // IDs of next possible positions
  recommendedMBA: string[]; // IDs of MBA programs
  icon: string; // lucide icon name
}

export interface CareerPath {
  track: CareerTrack;
  title: string;
  description: string;
  color: string; // Tailwind color class
  gradient: string; // Gradient classes
  positions: CareerPosition[];
}

export const careerPaths: CareerPath[] = [
  {
    track: 'finance',
    title: 'Финансовый путь',
    description: 'От финансового аналитика до CFO',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-700',
    positions: [
      {
        id: 'finance-1',
        title: 'Финансовый аналитик',
        track: 'finance',
        level: 'junior',
        yearsExperience: { min: 0, max: 3 },
        description: 'Анализ финансовой отчетности, подготовка отчетов, бюджетирование',
        skills: ['Excel', 'Финансовое моделирование', '1С', 'Английский язык'],
        salary: { min: 80000, max: 150000 },
        nextPositions: ['finance-2', 'it-2'],
        recommendedMBA: ['mba_15'], // Бизнес-аналитика
        icon: 'Calculator'
      },
      {
        id: 'finance-2',
        title: 'Старший финансовый аналитик',
        track: 'finance',
        level: 'middle',
        yearsExperience: { min: 3, max: 6 },
        description: 'Руководство проектами, финансовое планирование, работа с инвесторами',
        skills: ['МСФО', 'SQL', 'Power BI', 'Управление проектами'],
        salary: { min: 150000, max: 250000 },
        nextPositions: ['finance-3', 'finance-4'],
        recommendedMBA: ['mba_12', 'mba_15'], // Управление финансами, Бизнес-аналитика
        icon: 'TrendingUp'
      },
      {
        id: 'finance-3',
        title: 'Финансовый менеджер',
        track: 'finance',
        level: 'senior',
        yearsExperience: { min: 6, max: 10 },
        description: 'Управление финансовым отделом, стратегическое планирование',
        skills: ['Лидерство', 'M&A', 'Риск-менеджмент', 'Презентации'],
        salary: { min: 250000, max: 400000 },
        nextPositions: ['finance-5', 'ops-5'],
        recommendedMBA: ['mba_12', 'mba_11'], // Управление финансами, Управление рисками
        icon: 'Briefcase'
      },
      {
        id: 'finance-4',
        title: 'Инвестиционный менеджер',
        track: 'finance',
        level: 'senior',
        yearsExperience: { min: 5, max: 10 },
        description: 'Управление инвестиционным портфелем, анализ рынков',
        skills: ['Оценка активов', 'Due Diligence', 'Портфельная теория', 'Bloomberg'],
        salary: { min: 300000, max: 500000 },
        nextPositions: ['finance-5', 'entrepreneur-5'],
        recommendedMBA: ['mba_18'], // Управление в сфере инвестиций
        icon: 'LineChart'
      },
      {
        id: 'finance-5',
        title: 'CFO',
        track: 'finance',
        level: 'c-level',
        yearsExperience: { min: 10, max: 20 },
        description: 'Финансовый директор, член совета директоров',
        skills: ['Стратегическое управление', 'IPO', 'Корпоративные финансы', 'Публичные выступления'],
        salary: { min: 500000, max: 2000000 },
        nextPositions: [],
        recommendedMBA: ['mba_12', 'mba_14'], // Управление финансами, Корпоративное управление
        icon: 'Building2'
      }
    ]
  },
  {
    track: 'it',
    title: 'IT/Digital путь',
    description: 'От разработчика до CTO/CPO',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    positions: [
      {
        id: 'it-1',
        title: 'Junior Developer',
        track: 'it',
        level: 'junior',
        yearsExperience: { min: 0, max: 2 },
        description: 'Разработка и поддержка программного обеспечения',
        skills: ['JavaScript', 'React', 'Git', 'Agile'],
        salary: { min: 100000, max: 180000 },
        nextPositions: ['it-2', 'it-3'],
        recommendedMBA: ['mba_6', 'mba_17'], // Менеджмент IT-проектов, Product Management
        icon: 'Code2'
      },
      {
        id: 'it-2',
        title: 'Product Manager',
        track: 'it',
        level: 'middle',
        yearsExperience: { min: 3, max: 6 },
        description: 'Управление продуктом, работа с командой разработки',
        skills: ['Product Management', 'Аналитика', 'UX/UI', 'Scrum'],
        salary: { min: 200000, max: 350000 },
        nextPositions: ['it-4', 'entrepreneur-3'],
        recommendedMBA: ['mba_17', 'mba_6'], // Product Management, IT-проекты
        icon: 'Package'
      },
      {
        id: 'it-3',
        title: 'Tech Lead',
        track: 'it',
        level: 'middle',
        yearsExperience: { min: 4, max: 7 },
        description: 'Техническое лидерство, архитектура решений',
        skills: ['Архитектура ПО', 'DevOps', 'Менторинг', 'Code Review'],
        salary: { min: 250000, max: 400000 },
        nextPositions: ['it-5', 'entrepreneur-3'],
        recommendedMBA: ['mba_6'], // Менеджмент IT-проектов
        icon: 'Cpu'
      },
      {
        id: 'it-4',
        title: 'Head of Product',
        track: 'it',
        level: 'lead',
        yearsExperience: { min: 6, max: 10 },
        description: 'Управление продуктовой командой, стратегия продукта',
        skills: ['Стратегия продукта', 'Growth', 'Управление командой', 'P&L'],
        salary: { min: 400000, max: 700000 },
        nextPositions: ['it-6', 'entrepreneur-5'],
        recommendedMBA: ['mba_17', 'mba_13'], // Product Management, Цифровая трансформация
        icon: 'Rocket'
      },
      {
        id: 'it-5',
        title: 'Engineering Manager',
        track: 'it',
        level: 'lead',
        yearsExperience: { min: 7, max: 12 },
        description: 'Управление инженерной командой, техническая стратегия',
        skills: ['Управление командой', 'Техническая стратегия', 'Найм', 'Процессы разработки'],
        salary: { min: 450000, max: 800000 },
        nextPositions: ['it-7', 'entrepreneur-5'],
        recommendedMBA: ['mba_6', 'mba_10'], // IT-проекты, Управление проектами
        icon: 'Users'
      },
      {
        id: 'it-6',
        title: 'CPO',
        track: 'it',
        level: 'c-level',
        yearsExperience: { min: 10, max: 20 },
        description: 'Chief Product Officer, продуктовая стратегия компании',
        skills: ['Бизнес-стратегия', 'Инновации', 'Data-driven', 'Лидерство'],
        salary: { min: 700000, max: 2500000 },
        nextPositions: [],
        recommendedMBA: ['mba_13', 'mba_14'], // Цифровая трансформация, Корпоративное управление
        icon: 'Target'
      },
      {
        id: 'it-7',
        title: 'CTO',
        track: 'it',
        level: 'c-level',
        yearsExperience: { min: 12, max: 20 },
        description: 'Chief Technology Officer, технологическая стратегия',
        skills: ['Технологическая стратегия', 'Инновации', 'R&D', 'Цифровая трансформация'],
        salary: { min: 800000, max: 3000000 },
        nextPositions: [],
        recommendedMBA: ['mba_13', 'mba_14'], // Цифровая трансформация, Корпоративное управление
        icon: 'Zap'
      }
    ]
  },
  {
    track: 'hr',
    title: 'HR путь',
    description: 'От HR специалиста до CHRO',
    color: 'green',
    gradient: 'from-green-500 to-teal-500',
    positions: [
      {
        id: 'hr-1',
        title: 'HR специалист',
        track: 'hr',
        level: 'junior',
        yearsExperience: { min: 0, max: 3 },
        description: 'Подбор персонала, документооборот, адаптация сотрудников',
        skills: ['Рекрутинг', 'Трудовое право', 'MS Office', 'Коммуникации'],
        salary: { min: 70000, max: 120000 },
        nextPositions: ['hr-2', 'marketing-2'],
        recommendedMBA: ['mba_8'], // Управление персоналом (для будущего HR)
        icon: 'UserCheck'
      },
      {
        id: 'hr-2',
        title: 'HR Business Partner',
        track: 'hr',
        level: 'middle',
        yearsExperience: { min: 3, max: 6 },
        description: 'Поддержка бизнес-подразделений, развитие команд',
        skills: ['Оценка персонала', 'Coaching', 'HR-метрики', 'Управление талантами'],
        salary: { min: 150000, max: 250000 },
        nextPositions: ['hr-3', 'hr-4', 'ops-2'],
        recommendedMBA: ['mba_8'], // Управление персоналом
        icon: 'Users2'
      },
      {
        id: 'hr-3',
        title: 'Head of HR',
        track: 'hr',
        level: 'senior',
        yearsExperience: { min: 6, max: 10 },
        description: 'Руководство HR отделом, HR-стратегия',
        skills: ['HR-стратегия', 'C&B', 'Организационное развитие', 'Change Management'],
        salary: { min: 300000, max: 500000 },
        nextPositions: ['hr-5', 'ops-5'],
        recommendedMBA: ['mba_8', 'mba_1'], // Управление персоналом, Управление изменениями
        icon: 'Award'
      },
      {
        id: 'hr-4',
        title: 'Head of Talent',
        track: 'hr',
        level: 'senior',
        yearsExperience: { min: 5, max: 9 },
        description: 'Управление талантами, развитие лидеров',
        skills: ['Talent Management', 'L&D', 'Succession Planning', 'Leadership Development'],
        salary: { min: 280000, max: 450000 },
        nextPositions: ['hr-5', 'ops-5'],
        recommendedMBA: ['mba_8'], // Управление персоналом
        icon: 'Star'
      },
      {
        id: 'hr-5',
        title: 'CHRO',
        track: 'hr',
        level: 'c-level',
        yearsExperience: { min: 10, max: 20 },
        description: 'Chief Human Resources Officer, HR-стратегия компании',
        skills: ['Корпоративная культура', 'Стратегическое планирование', 'M&A', 'Трансформация'],
        salary: { min: 600000, max: 2000000 },
        nextPositions: [],
        recommendedMBA: ['mba_14', 'mba_1'], // Корпоративное управление, Управление изменениями
        icon: 'Crown'
      }
    ]
  },
  {
    track: 'operations',
    title: 'Операционный путь',
    description: 'От специалиста до COO',
    color: 'orange',
    gradient: 'from-orange-500 to-red-500',
    positions: [
      {
        id: 'ops-1',
        title: 'Операционный специалист',
        track: 'operations',
        level: 'junior',
        yearsExperience: { min: 0, max: 3 },
        description: 'Оптимизация процессов, контроль качества',
        skills: ['Excel', 'Процессное управление', 'Lean', 'Отчетность'],
        salary: { min: 80000, max: 130000 },
        nextPositions: ['ops-2'],
        recommendedMBA: ['mba_10', 'mba_9'], // Управление проектами, Производственный менеджмент
        icon: 'Settings'
      },
      {
        id: 'ops-2',
        title: 'Менеджер по операциям',
        track: 'operations',
        level: 'middle',
        yearsExperience: { min: 3, max: 6 },
        description: 'Управление операционной деятельностью подразделения',
        skills: ['Six Sigma', 'Управление проектами', 'KPI', 'Автоматизация'],
        salary: { min: 150000, max: 280000 },
        nextPositions: ['ops-3', 'ops-4', 'it-3'],
        recommendedMBA: ['mba_10', 'mba_9'], // Управление проектами, Производственный менеджмент
        icon: 'Activity'
      },
      {
        id: 'ops-3',
        title: 'Руководитель производства',
        track: 'operations',
        level: 'senior',
        yearsExperience: { min: 6, max: 10 },
        description: 'Управление производственными процессами',
        skills: ['Бережливое производство', 'Управление качеством', 'ERP', 'Безопасность'],
        salary: { min: 300000, max: 500000 },
        nextPositions: ['ops-5', 'finance-5'],
        recommendedMBA: ['mba_9', 'mba_5'], // Производственный менеджмент, Управление безопасностью
        icon: 'Factory'
      },
      {
        id: 'ops-4',
        title: 'Директор по логистике',
        track: 'operations',
        level: 'senior',
        yearsExperience: { min: 7, max: 12 },
        description: 'Управление цепочками поставок',
        skills: ['SCM', 'WMS', 'Международная логистика', 'Оптимизация затрат'],
        salary: { min: 350000, max: 600000 },
        nextPositions: ['ops-5', 'finance-5'],
        recommendedMBA: ['mba_7'], // Управление логистикой
        icon: 'Truck'
      },
      {
        id: 'ops-5',
        title: 'COO',
        track: 'operations',
        level: 'c-level',
        yearsExperience: { min: 12, max: 20 },
        description: 'Chief Operating Officer, операционная стратегия',
        skills: ['Операционная стратегия', 'Цифровизация', 'M&A', 'Управление изменениями'],
        salary: { min: 700000, max: 2500000 },
        nextPositions: [],
        recommendedMBA: ['mba_14', 'mba_13'], // Корпоративное управление, Цифровая трансформация
        icon: 'Building'
      }
    ]
  },
  {
    track: 'marketing',
    title: 'Маркетинговый путь',
    description: 'От маркетолога до CMO',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-500',
    positions: [
      {
        id: 'marketing-1',
        title: 'Маркетолог',
        track: 'marketing',
        level: 'junior',
        yearsExperience: { min: 0, max: 3 },
        description: 'Digital маркетинг, контент, социальные сети',
        skills: ['SMM', 'Контент-маркетинг', 'Google Ads', 'Аналитика'],
        salary: { min: 80000, max: 140000 },
        nextPositions: ['marketing-2'],
        recommendedMBA: ['mba_20', 'mba_13'], // Управление в торговле, Цифровая трансформация
        icon: 'Megaphone'
      },
      {
        id: 'marketing-2',
        title: 'Brand Manager',
        track: 'marketing',
        level: 'middle',
        yearsExperience: { min: 3, max: 6 },
        description: 'Управление брендом, разработка стратегий продвижения',
        skills: ['Brand Management', 'Market Research', 'P&L', 'Creative Strategy'],
        salary: { min: 180000, max: 300000 },
        nextPositions: ['marketing-3', 'marketing-4', 'it-4'],
        recommendedMBA: ['mba_20'], // Управление в торговле
        icon: 'Tag'
      },
      {
        id: 'marketing-3',
        title: 'Head of Marketing',
        track: 'marketing',
        level: 'senior',
        yearsExperience: { min: 6, max: 10 },
        description: 'Руководство маркетинговым отделом',
        skills: ['Маркетинговая стратегия', 'Performance Marketing', 'Team Management', 'Бюджетирование'],
        salary: { min: 350000, max: 600000 },
        nextPositions: ['marketing-5', 'it-6'],
        recommendedMBA: ['mba_20', 'mba_15', 'mba_13', 'mba_17'], // Управление в торговле, Бизнес-аналитика, Цифровая трансформация, Product Management
        icon: 'BarChart3'
      },
      {
        id: 'marketing-4',
        title: 'Head of Digital',
        track: 'marketing',
        level: 'senior',
        yearsExperience: { min: 5, max: 9 },
        description: 'Управление digital направлением',
        skills: ['Digital Strategy', 'E-commerce', 'MarTech', 'Data Analytics'],
        salary: { min: 300000, max: 550000 },
        nextPositions: ['marketing-5', 'it-6'],
        recommendedMBA: ['mba_13', 'mba_20'], // Цифровая трансформация, Управление в торговле
        icon: 'Globe'
      },
      {
        id: 'marketing-5',
        title: 'CMO',
        track: 'marketing',
        level: 'c-level',
        yearsExperience: { min: 10, max: 20 },
        description: 'Chief Marketing Officer, маркетинговая стратегия компании',
        skills: ['Стратегическое планирование', 'Brand Building', 'Customer Experience', 'Innovation'],
        salary: { min: 600000, max: 2000000 },
        nextPositions: [],
        recommendedMBA: ['mba_14', 'mba_13'], // Корпоративное управление, Цифровая трансформация
        icon: 'Sparkles'
      }
    ]
  },
  {
    track: 'entrepreneurship',
    title: 'Предпринимательский путь',
    description: 'От идеи до серийного предпринимателя',
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-500',
    positions: [
      {
        id: 'entrepreneur-1',
        title: 'Начинающий предприниматель',
        track: 'entrepreneurship',
        level: 'entry',
        yearsExperience: { min: 0, max: 2 },
        description: 'Валидация идеи, MVP, первые продажи',
        skills: ['Customer Development', 'Продажи', 'Питчинг', 'Бутстрэппинг'],
        salary: { min: 0, max: 100000 },
        nextPositions: ['entrepreneur-2'],
        recommendedMBA: ['mba_3'], // Управление малым бизнесом
        icon: 'Lightbulb'
      },
      {
        id: 'entrepreneur-2',
        title: 'Основатель стартапа',
        track: 'entrepreneurship',
        level: 'junior',
        yearsExperience: { min: 1, max: 4 },
        description: 'Привлечение инвестиций, масштабирование',
        skills: ['Fundraising', 'Product-Market Fit', 'Team Building', 'Growth Hacking'],
        salary: { min: 50000, max: 300000 },
        nextPositions: ['entrepreneur-3', 'entrepreneur-4'],
        recommendedMBA: ['mba_3', 'mba_17'], // Управление малым бизнесом, Product Management
        icon: 'Rocket'
      },
      {
        id: 'entrepreneur-3',
        title: 'CEO растущей компании',
        track: 'entrepreneurship',
        level: 'middle',
        yearsExperience: { min: 3, max: 8 },
        description: 'Управление растущим бизнесом, выход на новые рынки',
        skills: ['Стратегия', 'Управление финансами', 'M&A', 'Leadership'],
        salary: { min: 200000, max: 1000000 },
        nextPositions: ['entrepreneur-5', 'it-6', 'marketing-5'],
        recommendedMBA: ['mba_1', 'mba_12'], // Управление изменениями, Управление финансами
        icon: 'TrendingUp'
      },
      {
        id: 'entrepreneur-4',
        title: 'Владелец МСБ',
        track: 'entrepreneurship',
        level: 'middle',
        yearsExperience: { min: 3, max: 10 },
        description: 'Стабильный бизнес с постоянным доходом',
        skills: ['Операционное управление', 'B2B продажи', 'Финансовое планирование', 'Нетворкинг'],
        salary: { min: 300000, max: 2000000 },
        nextPositions: ['entrepreneur-5'],
        recommendedMBA: ['mba_3', 'mba_4'], // Управление малым бизнесом, Антикризисное управление
        icon: 'Store'
      },
      {
        id: 'entrepreneur-5',
        title: 'Серийный предприниматель',
        track: 'entrepreneurship',
        level: 'c-level',
        yearsExperience: { min: 10, max: 25 },
        description: 'Создание и продажа бизнесов, инвестиции',
        skills: ['Венчурные инвестиции', 'Exit стратегии', 'Portfolio Management', 'Менторинг'],
        salary: { min: 1000000, max: 10000000 },
        nextPositions: [],
        recommendedMBA: ['mba_18', 'mba_14'], // Управление инвестициями, Корпоративное управление
        icon: 'Diamond'
      }
    ]
  }
];

// Функция для получения всех позиций
export function getAllPositions(): CareerPosition[] {
  return careerPaths.flatMap(path => path.positions);
}

// Функция для получения позиции по ID
export function getPositionById(id: string): CareerPosition | undefined {
  return getAllPositions().find(pos => pos.id === id);
}

// Функция для получения следующих позиций
export function getNextPositions(positionId: string): CareerPosition[] {
  const position = getPositionById(positionId);
  if (!position) return [];
  
  return position.nextPositions
    .map(id => getPositionById(id))
    .filter(Boolean) as CareerPosition[];
}

// Функция для получения пути карьеры
export function getCareerPath(track: CareerTrack): CareerPath | undefined {
  return careerPaths.find(path => path.track === track);
}

// Функция для построения графа позиций
export function buildCareerGraph() {
  const nodes: { id: string; data: CareerPosition; position: { x: number; y: number } }[] = [];
  const edges: { id: string; source: string; target: string }[] = [];
  
  careerPaths.forEach((path, pathIndex) => {
    path.positions.forEach((position, posIndex) => {
      // Добавляем узел
      nodes.push({
        id: position.id,
        data: position,
        position: {
          x: pathIndex * 300, // Горизонтальное расположение по трекам
          y: posIndex * 150  // Вертикальное расположение по уровням
        }
      });
      
      // Добавляем связи
      position.nextPositions.forEach(nextId => {
        edges.push({
          id: `${position.id}-${nextId}`,
          source: position.id,
          target: nextId
        });
      });
    });
  });
  
  return { nodes, edges };
}