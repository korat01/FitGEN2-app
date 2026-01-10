import React from 'react';
import { cn } from '@/lib/utils';

interface HexagonBadgeProps {
  level: number;
  title?: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'gold' | 'diamond' | 'platinum' | 'bronze';
  className?: string;
  animated?: boolean;
}

const sizeClasses = {
  sm: { container: 'w-12 h-14', text: 'text-sm', title: 'text-xs' },
  md: { container: 'w-16 h-[72px]', text: 'text-lg', title: 'text-sm' },
  lg: { container: 'w-20 h-[90px]', text: 'text-2xl', title: 'text-base' },
  xl: { container: 'w-24 h-[108px]', text: 'text-3xl', title: 'text-lg' },
};

const variantStyles = {
  primary: {
    gradient: 'from-[#6B2AFF] via-[#00C2FF] to-[#6B2AFF]',
    glow: 'rgba(0, 194, 255, 0.6)',
    innerGradient: 'from-[#1a1f3a] to-[#0d1020]',
    borderColor: 'rgba(0, 194, 255, 0.5)',
  },
  gold: {
    gradient: 'from-[#FFD700] via-[#FFA500] to-[#FFD700]',
    glow: 'rgba(255, 215, 0, 0.6)',
    innerGradient: 'from-[#2a2510] to-[#1a1808]',
    borderColor: 'rgba(255, 215, 0, 0.5)',
  },
  diamond: {
    gradient: 'from-[#00E0FF] via-[#FFFFFF] to-[#00E0FF]',
    glow: 'rgba(0, 224, 255, 0.7)',
    innerGradient: 'from-[#1a2530] to-[#0d1520]',
    borderColor: 'rgba(0, 224, 255, 0.6)',
  },
  platinum: {
    gradient: 'from-[#E5E4E2] via-[#A0A0A0] to-[#E5E4E2]',
    glow: 'rgba(200, 200, 200, 0.5)',
    innerGradient: 'from-[#252525] to-[#151515]',
    borderColor: 'rgba(200, 200, 200, 0.4)',
  },
  bronze: {
    gradient: 'from-[#CD7F32] via-[#B87333] to-[#CD7F32]',
    glow: 'rgba(205, 127, 50, 0.5)',
    innerGradient: 'from-[#2a1f15] to-[#1a1208]',
    borderColor: 'rgba(205, 127, 50, 0.4)',
  },
};

export const HexagonBadge: React.FC<HexagonBadgeProps> = ({
  level,
  title,
  subtitle,
  size = 'md',
  variant = 'primary',
  className,
  animated = true,
}) => {
  const sizeStyle = sizeClasses[size];
  const variantStyle = variantStyles[variant];

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      {/* Hexagon Container */}
      <div
        className={cn(
          'relative flex items-center justify-center',
          sizeStyle.container,
          animated && 'animate-float'
        )}
        style={{
          filter: `drop-shadow(0 0 15px ${variantStyle.glow})`,
        }}
      >
        {/* Outer Hexagon Border */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br',
            variantStyle.gradient
          )}
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        />
        
        {/* Inner Hexagon */}
        <div
          className={cn(
            'absolute bg-gradient-to-b',
            variantStyle.innerGradient
          )}
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            inset: '3px',
          }}
        />
        
        {/* Shine Effect */}
        <div
          className="absolute opacity-20"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            inset: '3px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, transparent 100%)',
          }}
        />
        
        {/* Level Number */}
        <span
          className={cn(
            'relative z-10 font-bold text-white',
            sizeStyle.text
          )}
          style={{
            textShadow: `0 0 10px ${variantStyle.glow}`,
          }}
        >
          {level}
        </span>
        
        {/* Pulse Ring Animation */}
        {animated && (
          <div
            className="absolute inset-0 animate-ping opacity-20"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: `linear-gradient(135deg, ${variantStyle.borderColor}, transparent)`,
              animationDuration: '2s',
            }}
          />
        )}
      </div>
      
      {/* Title and Subtitle */}
      {(title || subtitle) && (
        <div className="text-center">
          {title && (
            <p
              className={cn(
                'font-bold text-white',
                sizeStyle.title
              )}
              style={{
                textShadow: `0 0 8px ${variantStyle.glow}`,
              }}
            >
              {title}
            </p>
          )}
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Composant pour afficher une rangée de badges (comme les achievements)
interface BadgeRowProps {
  badges: Array<{
    level: number;
    title?: string;
    variant?: HexagonBadgeProps['variant'];
    unlocked?: boolean;
  }>;
  size?: HexagonBadgeProps['size'];
}

export const HexagonBadgeRow: React.FC<BadgeRowProps> = ({ badges, size = 'md' }) => {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {badges.map((badge, index) => (
        <div
          key={index}
          className={cn(
            'transition-all duration-300',
            !badge.unlocked && 'opacity-40 grayscale'
          )}
        >
          <HexagonBadge
            level={badge.level}
            title={badge.title}
            variant={badge.variant || 'primary'}
            size={size}
            animated={badge.unlocked !== false}
          />
        </div>
      ))}
    </div>
  );
};

export default HexagonBadge;
