# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

MBA ProfTests - интерактивное приложение для оценки бизнес-компетенций с визуализацией "паучок компетенций" и персонализированными рекомендациями курсов.

## Technology Stack

- **Framework**: Next.js 15.5.3 (App Router) with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts (для radar chart)
- **Animations**: Framer Motion
- **React**: v19.1.0

## Commands

```bash
npm run dev      # Запуск dev-сервера с Turbopack
npm run build    # Production сборка
npm run start    # Запуск production сервера
npm run lint     # Линтинг кода
```

## Project Architecture

### Бизнес-логика
Приложение оценивает компетенции по 13 категориям:
1. Финансы
2. Инвестиции
3. Продажи
4. Психология
5. IT
6. Юриспруденция
7. Маркетинг
8. Недвижимость
9. Безопасность бизнеса
10. Логистика
11. Бухгалтерия
12. Управление персоналом
13. Аналитика

### Структура приложения
```
app/
├── page.tsx              # Лендинг с CTA
├── test/
│   └── page.tsx         # Интерактивный тест
└── results/
    └── page.tsx         # Результаты с визуализацией

components/
├── ui/                  # shadcn компоненты
├── test/               # Компоненты теста
│   ├── TestProgress.tsx
│   ├── QuestionCard.tsx
│   └── InteractiveElements/
└── results/           # Компоненты результатов
    ├── CompetencyRadar.tsx
    └── CourseRecommendations.tsx

lib/
├── questions.ts        # База вопросов (4 на категорию)
├── scoring.ts         # Логика подсчёта баллов
├── recommendations.ts # Алгоритм рекомендаций
└── store.ts          # Zustand store

types/
└── index.ts          # TypeScript типы
```

### Ключевые особенности

1. **Интерактивность**: Различные типы вопросов (слайдеры, карточки, drag & drop)
2. **Визуализация**: Radar chart ("паучок компетенций") с анимацией
3. **Персонализация**: Умный алгоритм рекомендаций курсов
4. **Геймификация**: Прогресс-бар, анимации, достижения
5. **Конверсия**: CTA блоки, urgency элементы, социальные доказательства

## Development Notes

- Использовать shadcn/ui компоненты для UI
- Сохранять прогресс теста в localStorage
- Мобильная адаптивность обязательна
- Анимации через Framer Motion для плавности
- Валидация форм через Zod схемы