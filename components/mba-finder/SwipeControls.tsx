'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Heart, RotateCcw } from 'lucide-react';

interface SwipeControlsProps {
  onDislike: () => void;
  onLike: () => void;
  onUndo?: () => void;
  canUndo?: boolean;
  disabled?: boolean;
}

export default function SwipeControls({ 
  onDislike, 
  onLike, 
  onUndo, 
  canUndo = false,
  disabled = false 
}: SwipeControlsProps) {
  return (
    <motion.div 
      className="flex justify-center items-center gap-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Кнопка отмены */}
      {onUndo && (
        <Button
          variant="outline"
          size="lg"
          onClick={onUndo}
          disabled={!canUndo || disabled}
          className="rounded-full w-14 h-14 p-0 border-2 transition-all hover:scale-110"
        >
          <RotateCcw className="w-6 h-6 text-gray-600" />
        </Button>
      )}

      {/* Кнопка "Не интересно" */}
      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="lg"
          onClick={onDislike}
          disabled={disabled}
          className="rounded-full w-16 h-16 p-0 border-2 border-red-500 hover:bg-red-50 transition-all hover:scale-110 shadow-lg"
        >
          <X className="w-8 h-8 text-red-500" />
        </Button>
      </motion.div>

      {/* Кнопка "Интересно" */}
      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="lg"
          onClick={onLike}
          disabled={disabled}
          className="rounded-full w-16 h-16 p-0 border-2 border-green-500 hover:bg-green-50 transition-all hover:scale-110 shadow-lg"
        >
          <Heart className="w-8 h-8 text-green-500" />
        </Button>
      </motion.div>
    </motion.div>
  );
}