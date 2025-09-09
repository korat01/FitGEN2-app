import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipe } from '@/hooks/useSwipe';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  className = ''
}) => {
  const swipeRef = useSwipe({
    onSwipeLeft,
    onSwipeRight,
    threshold: 50
  });

  return (
    <div className="relative">
      <Card
        ref={swipeRef}
        className={`touch-pan-y select-none ${className}`}
      >
        <CardContent className="p-4">
          {children}
        </CardContent>
      </Card>
      
      {/* Indicateurs de swipe */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronLeft className="w-6 h-6 text-gray-400" />
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  );
};

export default SwipeableCard; 