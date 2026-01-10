import React from 'react';
import { cn } from '@/lib/utils';

interface HexagonBadgeProps {
  value: string | number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gold' | 'orange' | 'green';
  className?: string;
  glow?: boolean;
}

const sizeClasses = {
  sm: 'w-12 h-12 text-base',
  md: 'w-16 h-16 text-xl',
  lg: 'w-20 h-20 text-2xl',
};

const variantGradients = {
  default: 'linear-gradient(135deg, #6B2AFF 0%, #00C2FF 100%)',
  gold: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  orange: 'linear-gradient(135deg, #FF7D3B 0%, #FF6B9D 100%)',
  green: 'linear-gradient(135deg, #2ECC71 0%, #00C2FF 100%)',
};

const variantShadows = {
  default: '0 0 20px rgba(107, 42, 255, 0.5)',
  gold: '0 0 20px rgba(255, 215, 0, 0.5)',
  orange: '0 0 20px rgba(255, 125, 59, 0.5)',
  green: '0 0 20px rgba(46, 204, 113, 0.5)',
};

export const HexagonBadge: React.FC<HexagonBadgeProps> = ({
  value,
  size = 'md',
  variant = 'default',
  className,
  glow = true,
}) => {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center font-bold text-white',
        'clip-path-hexagon',
        sizeClasses[size],
        className
      )}
      style={{
        background: variantGradients[variant],
        boxShadow: glow
          ? `${variantShadows[variant]}, inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.3)`
          : 'inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.3)',
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
      }}
    >
      {value}
    </div>
  );
};

