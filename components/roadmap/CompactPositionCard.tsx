'use client';

import { motion } from 'framer-motion';
import { 
  Briefcase, 
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
  Diamond,
  DollarSign
} from 'lucide-react';
import { CareerPosition } from '@/lib/career-paths';
import { cn } from '@/lib/utils';

interface CompactPositionCardProps {
  position: CareerPosition;
  isActive?: boolean;
  isNext?: boolean;
  isPast?: boolean;
  isHighlighted?: boolean;
  onClick?: () => void;
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
    border: 'border-gray-300',
    icon: 'bg-gray-100 text-gray-600',
    text: 'text-gray-700'
  },
  junior: {
    bg: 'bg-green-50',
    border: 'border-green-300',
    icon: 'bg-green-100 text-green-600',
    text: 'text-green-700'
  },
  middle: {
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    icon: 'bg-blue-100 text-blue-600',
    text: 'text-blue-700'
  },
  senior: {
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    icon: 'bg-purple-100 text-purple-600',
    text: 'text-purple-700'
  },
  lead: {
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    icon: 'bg-purple-100 text-purple-600',
    text: 'text-purple-700'
  },
  'c-level': {
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    icon: 'bg-orange-100 text-orange-600',
    text: 'text-orange-700'
  }
};

export default function CompactPositionCard({ 
  position, 
  isActive = false,
  isNext = false,
  isPast = false,
  isHighlighted = false,
  onClick
}: CompactPositionCardProps) {
  const Icon = iconMap[position.icon] || Briefcase;
  const styles = levelStyles[position.level];
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isPast ? 0.6 : 1, 
        scale: 1
      }}
      className={cn(
        "relative bg-white rounded-lg shadow-sm border-2 p-2 cursor-pointer transition-all duration-200",
        "w-[180px] h-[90px]",
        styles.bg,
        styles.border,
        isActive && "ring-2 ring-purple-500 shadow-lg scale-105",
        isNext && "ring-2 ring-green-500 shadow-md",
        isHighlighted && "ring-2 ring-blue-500",
        isPast && "opacity-60",
        "hover:shadow-md"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-2 h-full">
        {/* Icon */}
        <div className={cn(
          "p-1.5 rounded-md flex-shrink-0",
          styles.icon
        )}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col justify-between h-full">
          {/* Title */}
          <div>
            <h4 className={cn(
              "font-semibold text-xs leading-tight line-clamp-2",
              styles.text
            )}>
              {position.title}
            </h4>
          </div>
          
          {/* Info */}
          <div className="flex items-center gap-2 text-[10px] text-gray-600">
            <div className="flex items-center gap-1">
              <span className="font-medium">
                {position.yearsExperience.min}-{position.yearsExperience.max}
              </span>
              <span className="text-gray-400">лет</span>
            </div>
            <div className="flex items-center gap-0.5">
              <DollarSign className="w-3 h-3" />
              <span className="font-medium">
                {(position.salary.min / 1000).toFixed(0)}-{(position.salary.max / 1000).toFixed(0)}к
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status indicators */}
      {isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
      )}
      {isNext && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      )}
    </motion.div>
  );
}