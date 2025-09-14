export type CompetencyCategory = 
  | 'finance'
  | 'sales'
  | 'marketing'
  | 'hrManagement'
  | 'it'
  | 'analytics';

export const COMPETENCY_LABELS: Record<CompetencyCategory, string> = {
  finance: 'Финансы',
  sales: 'Продажи',
  marketing: 'Маркетинг',
  hrManagement: 'Управление персоналом',
  it: 'IT',
  analytics: 'Аналитика'
};

export type QuestionType = 'dragDrop';

export interface Question {
  id: string;
  category: CompetencyCategory;
  type: QuestionType;
  text: string;
  description?: string;
  options?: QuestionOption[];
  minValue?: number;
  maxValue?: number;
  items?: DragDropItem[];
}

export interface QuestionOption {
  id: string;
  text: string;
  score: number;
  description?: string;
}

export interface DragDropItem {
  id: string;
  text: string;
}

export interface Answer {
  questionId: string;
  value: number | string | string[];
  score: number;
}

export interface TestResult {
  scores: Record<CompetencyCategory, number>;
  weakCategories: CompetencyCategory[];
  strongCategories: CompetencyCategory[];
  recommendations: Course[];
  completedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CompetencyCategory;
  price: number;
  oldPrice?: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  features: string[];
  isSpecialOffer?: boolean;
}

export interface TestState {
  currentQuestionIndex: number;
  answers: Answer[];
  startedAt: Date;
  progress: number;
}

// MBA Finder Types
export type SwipeAction = 'like' | 'dislike';

export type MBAFormat = 'online' | 'offline' | 'hybrid';
export type MBAType = 'executive' | 'mini' | 'specialized' | 'general';
export type MBADuration = 'short' | 'medium' | 'long'; // short: < 6 мес, medium: 6-12 мес, long: > 12 мес

export type QuestionCategory = 'format' | 'goals' | 'style' | 'networking' | 'intensity' | 'focus';

export interface MBAProgramTag {
  id: string;
  name: string;
  category: 'format' | 'specialization' | 'skills' | 'career';
}

export interface MBAQuestion {
  id: string;
  category: QuestionCategory;
  question: string;
  subtext?: string;
  likeValue: {
    tags: string[];
    formats?: MBAFormat[];
    types?: MBAType[];
    durations?: MBADuration[];
  };
  dislikeValue: {
    tags: string[];
    formats?: MBAFormat[];
    types?: MBAType[];
    durations?: MBADuration[];
  };
}

export interface MBAProgram {
  id: string;
  title: string;
  subtitle: string;
  type: MBAType;
  format: MBAFormat;
  duration: string;
  durationCategory: MBADuration;
  price: number;
  oldPrice?: number;
  features: string[];
  tags: string[]; // tag ids
  imageUrl?: string;
  university?: string;
  rating?: number;
  graduatesCount?: number;
}

export interface SwipeResult {
  questionId: string;
  action: SwipeAction;
  timestamp: Date;
}

export interface MBATestResult {
  recommendedPrograms: MBAProgram[];
  swipeHistory: SwipeResult[];
  preferences: {
    format: MBAFormat[];
    type: MBAType[];
    duration: MBADuration[];
    tags: string[];
  };
  completedAt: Date;
}

export interface MBATestState {
  currentCardIndex: number;
  swipes: SwipeResult[];
  startedAt: Date;
  isCompleted: boolean;
}