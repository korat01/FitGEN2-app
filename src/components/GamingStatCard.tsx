import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface GamingStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'cyan' | 'purple' | 'orange' | 'green' | 'gold' | 'pink';
  description?: string;
  trend?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  cyan: {
    border: 'border-[#00C2FF]/40',
    glow: 'shadow-[0_0_20px_rgba(0,194,255,0.3)]',
    iconBg: 'from-[#00C2FF]/20 to-[#00C2FF]/5',
    iconColor: 'text-[#00C2FF]',
    iconGlow: 'drop-shadow-[0_0_8px_rgba(0,194,255,0.8)]',
  },
  purple: {
    border: 'border-[#6B2AFF]/40',
    glow: 'shadow-[0_0_20px_rgba(107,42,255,0.3)]',
    iconBg: 'from-[#6B2AFF]/20 to-[#6B2AFF]/5',
    iconColor: 'text-[#6B2AFF]',
    iconGlow: 'drop-shadow-[0_0_8px_rgba(107,42,255,0.8)]',
  },
  orange: {
    border: 'border-[#FF7D3B]/40',
    glow: 'shadow-[0_0_20px_rgba(255,125,59,0.3)]',
    iconBg: 'from-[#FF7D3B]/20 to-[#FF7D3B]/5',
    iconColor: 'text-[#FF7D3B]',
    iconGlow: 'drop-shadow-[0_0_8px_rgba(255,125,59,0.8)]',
  },
  green: {
    border: 'border-[#2ECC71]/40',
    glow: 'shadow-[0_0_20px_rgba(46,204,113,0.3)]',
    iconBg: 'from-[#2ECC71]/20 to-[#2ECC71]/5',
    iconColor: 'text-[#2ECC71]',
    iconGlow: 'drop-shadow-[0_0_8px_rgba(46,204,113,0.8)]',
  },
  gold: {
    border: 'border-[#FFD700]/40',
    glow: 'shadow-[0_0_20px_rgba(255,215,0,0.3)]',
    iconBg: 'from-[#FFD700]/20 to-[#FFD700]/5',
    iconColor: 'text-[#FFD700]',
    iconGlow: 'drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]',
  },
  pink: {
    border: 'border-[#FF6B9D]/40',
    glow: 'shadow-[0_0_20px_rgba(255,107,157,0.3)]',
    iconBg: 'from-[#FF6B9D]/20 to-[#FF6B9D]/5',
    iconColor: 'text-[#FF6B9D]',
    iconGlow: 'drop-shadow-[0_0_8px_rgba(255,107,157,0.8)]',
  },
};

const sizeStyles = {
  sm: {
    padding: 'p-3',
    iconSize: 'w-10 h-10',
    iconInner: 'w-5 h-5',
    labelSize: 'text-xs',
    valueSize: 'text-lg',
  },
  md: {
    padding: 'p-4',
    iconSize: 'w-12 h-12',
    iconInner: 'w-6 h-6',
    labelSize: 'text-xs md:text-sm',
    valueSize: 'text-lg md:text-2xl',
  },
  lg: {
    padding: 'p-5 md:p-6',
    iconSize: 'w-14 h-14 md:w-16 md:h-16',
    iconInner: 'w-7 h-7 md:w-8 md:h-8',
    labelSize: 'text-sm',
    valueSize: 'text-2xl md:text-3xl',
  },
};

export const GamingStatCard: React.FC<GamingStatCardProps> = ({
  label,
  value,
  icon: Icon,
  variant = 'cyan',
  description,
  trend,
  size = 'md',
  className,
}) => {
  const styles = variantStyles[variant];
  const sizes = sizeStyles[size];

  return (
    <div
      className={cn(
        'relative rounded-xl overflow-hidden',
        'bg-gradient-to-br from-card/90 to-card/70',
        'backdrop-blur-md',
        'border',
        styles.border,
        styles.glow,
        'transition-all duration-300',
        'hover:-translate-y-1 hover:scale-[1.02]',
        'group',
        sizes.padding,
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className={cn(
            sizes.labelSize,
            'text-muted-foreground mb-1 truncate font-medium'
          )}>
            {label}
          </p>
          <p className={cn(
            sizes.valueSize,
            'font-bold text-white truncate'
          )}>
            {value}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {description}
            </p>
          )}
          {trend !== undefined && (
            <p className={cn(
              'text-xs mt-1 font-medium',
              trend >= 0 ? 'text-[#2ECC71]' : 'text-red-400'
            )}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </p>
          )}
        </div>
        
        {/* Hexagonal Icon */}
        <div
          className={cn(
            sizes.iconSize,
            'flex items-center justify-center flex-shrink-0',
            'relative'
          )}
        >
          {/* Hexagon background */}
          <div
            className={cn(
              'absolute inset-0',
              'bg-gradient-to-br',
              styles.iconBg
            )}
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          />
          
          {/* Hexagon border */}
          <div
            className="absolute inset-[2px]"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
          />
          
          {/* Icon */}
          <Icon
            className={cn(
              sizes.iconInner,
              styles.iconColor,
              styles.iconGlow,
              'relative z-10',
              'transition-transform duration-300 group-hover:scale-110'
            )}
          />
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-[2px]',
          'opacity-60 group-hover:opacity-100 transition-opacity'
        )}
        style={{
          background: variant === 'cyan' ? 'linear-gradient(90deg, transparent, #00C2FF, transparent)' :
                      variant === 'purple' ? 'linear-gradient(90deg, transparent, #6B2AFF, transparent)' :
                      variant === 'orange' ? 'linear-gradient(90deg, transparent, #FF7D3B, transparent)' :
                      variant === 'green' ? 'linear-gradient(90deg, transparent, #2ECC71, transparent)' :
                      variant === 'gold' ? 'linear-gradient(90deg, transparent, #FFD700, transparent)' :
                      'linear-gradient(90deg, transparent, #FF6B9D, transparent)',
        }}
      />
    </div>
  );
};

export default GamingStatCard;
