'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';

interface DragDropItemProps {
  id: string;
  text: string;
  index: number;
}

export default function DragDropItem({ id, text, index }: DragDropItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card 
        className={`cursor-move hover:shadow-md transition-all ${
          isDragging ? 'opacity-50 shadow-lg scale-105' : ''
        }`}
      >
        <CardContent className="flex items-center p-3">
          <div 
            {...listeners}
            className="flex items-center text-gray-400 hover:text-gray-600 mr-3"
          >
            <GripVertical className="h-4 w-4" />
          </div>
          
          <div className="flex items-center flex-1">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold flex items-center justify-center mr-3">
              {index}
            </div>
            <span className="text-gray-800 font-medium">{text}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}