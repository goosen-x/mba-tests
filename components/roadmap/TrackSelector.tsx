'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Code2, 
  Users, 
  Settings, 
  Megaphone, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { CareerTrack, careerPaths } from '@/lib/career-paths';

interface TrackSelectorProps {
  onSelectTrack: (track: CareerTrack) => void;
}

const trackIcons: Record<CareerTrack, React.ElementType> = {
  finance: TrendingUp,
  it: Code2,
  hr: Users,
  operations: Settings,
  marketing: Megaphone,
  entrepreneurship: Lightbulb
};

const trackColors: Record<CareerTrack, string> = {
  finance: 'from-blue-500 to-blue-600',
  it: 'from-purple-500 to-pink-500',
  hr: 'from-green-500 to-teal-500',
  operations: 'from-orange-500 to-red-500',
  marketing: 'from-pink-500 to-rose-500',
  entrepreneurship: 'from-indigo-500 to-purple-500'
};

export default function TrackSelector({ onSelectTrack }: TrackSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Выберите карьерный трек</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {careerPaths.map((path, index) => {
          const Icon = trackIcons[path.track];
          const gradientColor = trackColors[path.track];
          
          return (
            <motion.div
              key={path.track}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                size="lg"
                className={`w-full h-auto p-6 justify-start hover:scale-105 transition-transform duration-200`}
                onClick={() => onSelectTrack(path.track)}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${gradientColor}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-medium flex-1 text-left">{path.title}</span>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}