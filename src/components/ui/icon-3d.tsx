import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Icon3DProps {
  icon: LucideIcon;
  size?: number;
  gradient?: 'purple-blue' | 'orange-yellow' | 'gold' | 'cyan';
  glow?: boolean;
  className?: string;
}

const gradientStyles = {
  'purple-blue': {
    background: 'linear-gradient(135deg, #6B2AFF 0%, #00C2FF 100%)',
    filter: 'drop-shadow(0 0 10px rgba(107, 42, 255, 0.6))',
  },
  'orange-yellow': {
    background: 'linear-gradient(135deg, #FF7D3B 0%, #FFD700 100%)',
    filter: 'drop-shadow(0 0 10px rgba(255, 125, 59, 0.6))',
  },
  gold: {
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))',
  },
  cyan: {
    background: 'linear-gradient(135deg, #00C2FF 0%, #00E0FF 100%)',
    filter: 'drop-shadow(0 0 10px rgba(0, 194, 255, 0.6))',
  },
};

export const Icon3D: React.FC<Icon3DProps> = ({
  icon: Icon,
  size = 24,
  gradient = 'purple-blue',
  glow = true,
  className,
}) => {
  const style = gradientStyles[gradient];

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{
        filter: glow ? style.filter : undefined,
      }}
    >
      <div
        className="absolute inset-0 rounded-lg opacity-20 blur-sm"
        style={{ background: style.background }}
      />
      <Icon
        size={size}
        className="relative z-10"
        style={{
          background: style.background,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      />
    </div>
  );
};

// Composant pour icônes avec effet glossy/métallique
export const GlossyIcon: React.FC<{
  icon: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
}> = ({ icon: Icon, size = 24, color = '#FFFFFF', className }) => {
  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 8px rgba(107, 42, 255, 0.4))',
      }}
    >
      <Icon
        size={size}
        style={{
          color,
          filter: 'brightness(1.1) contrast(1.2)',
        }}
      />
    </div>
  );
};

