import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface GamingStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'gold';
  trend?: { value: number; label: string };
  animated?: boolean;
  delay?: number;
  onClick?: () => void;
}

const variantStyles = {
  primary: {
    gradient: 'from-primary via-primary/80 to-primary/60',
    glow: 'shadow-[0_0_30px_rgba(107,42,255,0.4)]',
    iconBg: 'bg-primary/20',
    iconColor: 'text-primary',
    border: 'border-primary/30',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(107,42,255,0.6)]',
  },
  secondary: {
    gradient: 'from-secondary via-secondary/80 to-secondary/60',
    glow: 'shadow-[0_0_30px_rgba(0,194,255,0.4)]',
    iconBg: 'bg-secondary/20',
    iconColor: 'text-secondary',
    border: 'border-secondary/30',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(0,194,255,0.6)]',
  },
  accent: {
    gradient: 'from-accent via-accent/80 to-accent/60',
    glow: 'shadow-[0_0_30px_rgba(255,125,59,0.4)]',
    iconBg: 'bg-accent/20',
    iconColor: 'text-accent',
    border: 'border-accent/30',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(255,125,59,0.6)]',
  },
  success: {
    gradient: 'from-success via-success/80 to-success/60',
    glow: 'shadow-[0_0_30px_rgba(46,204,113,0.4)]',
    iconBg: 'bg-success/20',
    iconColor: 'text-success',
    border: 'border-success/30',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(46,204,113,0.6)]',
  },
  gold: {
    gradient: 'from-yellow-400 via-yellow-500 to-orange-500',
    glow: 'shadow-[0_0_30px_rgba(234,179,8,0.4)]',
    iconBg: 'bg-yellow-500/20',
    iconColor: 'text-yellow-400',
    border: 'border-yellow-500/30',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(234,179,8,0.6)]',
  },
};

export const GamingStatCard: React.FC<GamingStatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'primary',
  trend,
  animated = true,
  delay = 0,
  onClick,
}) => {
  const [isVisible, setIsVisible] = useState(!animated);
  const [displayValue, setDisplayValue] = useState<string | number>(animated ? 0 : value);
  const styles = variantStyles[variant];

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Animate number if value is numeric
        if (typeof value === 'number') {
          const duration = 1500;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= value) {
              setDisplayValue(value);
              clearInterval(interval);
            } else {
              setDisplayValue(Math.floor(current));
            }
          }, duration / steps);
          return () => clearInterval(interval);
        } else {
          setDisplayValue(value);
        }
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [animated, delay, value]);

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-2xl p-5 transition-all duration-500 cursor-pointer group',
        'glass-card',
        styles.border,
        styles.glow,
        styles.hoverGlow,
        'hover:scale-[1.02] hover:-translate-y-1',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        onClick && 'cursor-pointer'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Background glow effect */}
      <div className={cn(
        'absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-40',
        `bg-gradient-to-br ${styles.gradient}`
      )} />

      {/* Animated border pulse */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={cn(
          'absolute inset-0 rounded-2xl animate-pulse',
          styles.border,
          'border-2'
        )} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-medium">
            {title}
          </p>
          <p className={cn(
            'text-2xl md:text-3xl font-bold text-white tracking-tight',
            animated && 'transition-all duration-300'
          )}>
            {displayValue}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className={cn(
              'flex items-center gap-1 mt-2 text-sm font-medium',
              trend.value >= 0 ? 'text-success' : 'text-destructive'
            )}>
              <span>{trend.value >= 0 ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground text-xs">{trend.label}</span>
            </div>
          )}
        </div>

        {/* Icon container with 3D effect */}
        <div className={cn(
          'relative flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center',
          styles.iconBg,
          'transition-all duration-300 group-hover:scale-110',
          'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br',
          'before:from-white/10 before:to-transparent before:opacity-50'
        )}>
          <Icon className={cn('w-7 h-7', styles.iconColor, 'drop-shadow-lg')} />
          
          {/* Floating particles on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'absolute w-1 h-1 rounded-full animate-float',
                  variant === 'primary' ? 'bg-primary' :
                  variant === 'secondary' ? 'bg-secondary' :
                  variant === 'accent' ? 'bg-accent' :
                  variant === 'success' ? 'bg-success' :
                  'bg-yellow-400'
                )}
                style={{
                  left: `${20 + i * 25}%`,
                  top: `${20 + i * 20}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={cn(
        'absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500',
        `bg-gradient-to-r ${styles.gradient}`
      )} />
    </div>
  );
};

// Grid container for gaming stat cards
interface GamingStatsGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
}

export const GamingStatsGrid: React.FC<GamingStatsGridProps> = ({ 
  children, 
  columns = 4 
}) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-4 md:gap-6', gridCols[columns])}>
      {children}
    </div>
  );
};

export default GamingStatCard;
