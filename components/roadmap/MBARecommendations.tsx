'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap,
  Clock,
  DollarSign,
  Star,
  Users,
  Tag
} from 'lucide-react';
import { getMBAProgram } from '@/lib/mba-programs';

interface MBARecommendationsProps {
  mbaIds: string[];
  positionTitle: string;
}

const formatDuration = {
  'short': 'Короткая',
  'medium': 'Средняя',
  'long': 'Длительная'
};

const formatType = {
  'general': 'Общая MBA',
  'specialized': 'Специализированная',
  'executive': 'Executive MBA',
  'mini': 'Mini MBA'
};

const formatFormat = {
  'online': 'Онлайн',
  'offline': 'Очное',
  'hybrid': 'Смешанный'
};

export default function MBARecommendations({ mbaIds, positionTitle }: MBARecommendationsProps) {
  const programs = mbaIds.map(id => getMBAProgram(id)).filter(Boolean);
  
  if (programs.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-semibold text-purple-900">
            Рекомендуемые MBA программы для позиции &quot;{positionTitle}&quot;
          </h3>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          {programs.map((program, index) => {
            if (!program) return null;
            
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg border border-purple-100 p-4 hover:shadow-md transition-shadow"
              >
                {/* Заголовок программы */}
                <div className="mb-3">
                  <h4 className="font-semibold text-lg text-gray-900">
                    {program.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {program.subtitle}
                  </p>
                </div>
                
                {/* Метаинформация */}
                <div className="flex flex-wrap gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{(program.price / 1000).toFixed(0)}к ₽</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Star className="w-4 h-4" />
                    <span>{program.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{program.graduatesCount}</span>
                  </div>
                </div>
                
                {/* Бейджи */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {formatType[program.type]}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {formatFormat[program.format]}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {formatDuration[program.durationCategory]}
                  </Badge>
                </div>
                
                {/* Ключевые особенности */}
                <div className="border-t pt-3">
                  <p className="text-xs font-medium text-gray-700 mb-2">Ключевые модули:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {program.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-purple-500 mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Университет */}
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500">
                    {program.university}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Примечание о выборе программ */}
        <div className="mt-6 p-4 bg-purple-100 rounded-lg">
          <div className="flex items-start gap-2">
            <Tag className="w-4 h-4 text-purple-700 mt-0.5" />
            <div className="text-sm text-purple-900">
              <p className="font-medium mb-1">Почему эти программы?</p>
              <p className="text-purple-800">
                Данные MBA программы специально подобраны для развития компетенций, 
                необходимых на позиции {positionTitle}. Они помогут вам освоить 
                актуальные инструменты управления и расширить профессиональную сеть.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}