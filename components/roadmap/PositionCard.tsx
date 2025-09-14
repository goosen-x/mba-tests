'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Clock, 
  DollarSign,
  Star,
  ChevronRight,
  Calculator, 
  TrendingUp, 
  LineChart, 
  Building2,
  Code2,
  Package,
  Cpu,
  Rocket,
  Users,
  Target,
  Zap,
  UserCheck,
  Users2,
  Award,
  Crown,
  Settings,
  Activity,
  Factory,
  Truck,
  Building,
  Megaphone,
  Tag,
  BarChart3,
  Globe,
  Sparkles,
  Lightbulb,
  Store,
  Diamond
} from 'lucide-react';
import { CareerPosition } from '@/lib/career-paths';
import { cn } from '@/lib/utils';

interface PositionCardProps {
  position: CareerPosition;
  isActive?: boolean;
  isNext?: boolean;
  isPast?: boolean;
  onClick?: () => void;
  showConnector?: boolean;
}

// Маппинг иконок
const iconMap: Record<string, React.ElementType> = {
  Calculator,
  TrendingUp,
  Briefcase,
  LineChart,
  Building2,
  Code2,
  Package,
  Cpu,
  Rocket,
  Users,
  Target,
  Zap,
  UserCheck,
  Users2,
  Award,
  Star,
  Crown,
  Settings,
  Activity,
  Factory,
  Truck,
  Building,
  Megaphone,
  Tag,
  BarChart3,
  Globe,
  Sparkles,
  Lightbulb,
  Store,
  Diamond
};

// Цвета для уровней
const levelStyles = {
  entry: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    icon: 'bg-gray-100 text-gray-600',
    badge: 'bg-gray-100 text-gray-700'
  },
  junior: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: 'bg-green-100 text-green-600',
    badge: 'bg-green-100 text-green-700'
  },
  middle: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'bg-blue-100 text-blue-600',
    badge: 'bg-blue-100 text-blue-700'
  },
  senior: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    icon: 'bg-purple-100 text-purple-600',
    badge: 'bg-purple-100 text-purple-700'
  },
  lead: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    icon: 'bg-purple-100 text-purple-600',
    badge: 'bg-purple-100 text-purple-700'
  },
  'c-level': {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: 'bg-orange-100 text-orange-600',
    badge: 'bg-orange-100 text-orange-700'
  }
};

export default function PositionCard({ 
  position, 
  isActive = false,
  isNext = false,
  isPast = false,
  onClick,
  showConnector = false
}: PositionCardProps) {
  const Icon = iconMap[position.icon] || Briefcase;
  const styles = levelStyles[position.level];
  
  return (
    <div className="relative">
      {/* Коннектор к следующей позиции */}
      {showConnector && (
        <div className="absolute left-1/2 top-full w-0.5 h-16 -translate-x-1/2 z-0">
          <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-200"></div>
          <ChevronRight className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 text-gray-400 rotate-90" />
        </div>
      )}

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "relative z-10",
          onClick && "cursor-pointer"
        )}
        onClick={onClick}
      >
        <Card className={cn(
          "transition-all duration-300",
          styles.bg,
          styles.border,
          "border-2",
          isActive && "ring-2 ring-purple-500 shadow-lg",
          isNext && "ring-2 ring-green-500 shadow-md",
          isPast && "opacity-60",
          onClick && "hover:shadow-lg"
        )}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between mb-3">
              <div className={cn(
                "p-3 rounded-lg",
                styles.icon
              )}>
                <Icon className="w-6 h-6" />
              </div>
              <Badge className={cn(
                "ml-2",
                styles.badge
              )}>
                {position.level === 'c-level' ? 'C-Level' : 
                 position.level.charAt(0).toUpperCase() + position.level.slice(1)}
              </Badge>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
            <p className="text-gray-600 text-sm">{position.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Основная информация */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Опыт</span>
                </div>
                <p className="font-semibold">
                  {position.yearsExperience.min}-{position.yearsExperience.max} лет
                </p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Зарплата</span>
                </div>
                <p className="font-semibold">
                  {(position.salary.min / 1000).toFixed(0)}-{(position.salary.max / 1000).toFixed(0)}к ₽
                </p>
              </div>
            </div>

            {/* Навыки */}
            <div>
              <div className="flex items-center gap-1 text-gray-600 mb-2">
                <Star className="w-4 h-4" />
                <span className="text-sm">Ключевые навыки</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {position.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Статусы */}
            {(isActive || isNext) && (
              <div className="pt-2">
                {isActive && (
                  <Badge className="bg-purple-500 text-white">
                    Текущая позиция
                  </Badge>
                )}
                {isNext && (
                  <Badge className="bg-green-500 text-white">
                    Следующий шаг
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}