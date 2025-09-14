'use client';

import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { CompetencyCategory, COMPETENCY_LABELS } from '@/types';

interface CompetencyRadarProps {
  scores: Record<CompetencyCategory, number>;
}

export default function CompetencyRadar({ scores }: CompetencyRadarProps) {
  // Подготавливаем данные для radar chart
  const data = Object.entries(scores).map(([category, score]) => ({
    competency: COMPETENCY_LABELS[category as CompetencyCategory],
    userScore: score,
    avgScore: 5.5, // Средний показатель для сравнения
    fullName: COMPETENCY_LABELS[category as CompetencyCategory]
  }));

  // Функция для сокращения длинных названий
  const formatLabel = (label: string) => {
    const shortLabels: Record<string, string> = {
      'Финансы': 'Финансы',
      'Инвестиции': 'Инвестиции',
      'Продажи': 'Продажи',
      'Психология': 'Психология',
      'IT': 'IT',
      'Юриспруденция': 'Право',
      'Маркетинг': 'Маркетинг',
      'Недвижимость': 'Недвиж.',
      'Безопасность бизнеса': 'Безопасн.',
      'Логистика': 'Логистика',
      'Бухгалтерия': 'Бухучет',
      'Управление персоналом': 'HR',
      'Аналитика': 'Аналитика'
    };
    return shortLabels[label] || label;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomLabel = (props: any) => {
    const { x, y, textAnchor, value } = props;
    return (
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        dominantBaseline="central"
        className="text-xs font-medium fill-gray-700"
      >
        {formatLabel(value)}
      </text>
    );
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid 
            stroke="#e5e7eb" 
            strokeWidth={1}
            radialLines={true}
          />
          <PolarAngleAxis 
            dataKey="competency" 
            tick={CustomLabel}
            className="text-xs"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={false}
            axisLine={false}
          />
          
          {/* Средние показатели */}
          <Radar
            name="Среднее"
            dataKey="avgScore"
            stroke="#d1d5db"
            fill="#d1d5db"
            fillOpacity={0.1}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          
          {/* Результаты пользователя */}
          <Radar
            name="Ваш результат"
            dataKey="userScore"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.2}
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          />
          
          <Legend 
            wrapperStyle={{
              fontSize: '12px',
              paddingTop: '10px'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}