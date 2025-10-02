import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'gradient' | 'glass';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  variant = 'default',
  className
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'down':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-muted-foreground bg-muted border-muted';
    }
  };

  return (
    <Card className={cn(
      'transition-all duration-200 hover:shadow-lg hover:-translate-y-1 animate-scale-in',
      variant === 'gradient' && 'gradient-primary text-white border-0',
      variant === 'glass' && 'glass-effect border-white/30',
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          'text-sm font-medium',
          variant === 'gradient' ? 'text-white/90' : 'text-muted-foreground'
        )}>
          {title}
        </CardTitle>
        {icon && (
          <div className={cn(
            'p-2 rounded-lg',
            variant === 'gradient' ? 'bg-white/20' : 'bg-muted/50'
          )}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div>
            <div className={cn(
              'text-2xl font-bold',
              variant === 'gradient' ? 'text-white' : 'text-foreground'
            )}>
              {value}
            </div>
            {subtitle && (
              <p className={cn(
                'text-xs',
                variant === 'gradient' ? 'text-white/70' : 'text-muted-foreground'
              )}>
                {subtitle}
              </p>
            )}
          </div>
          
          {trend && trendValue && (
            <Badge className={cn(
              'flex items-center gap-1 text-xs',
              variant === 'gradient' ? 'bg-white/20 text-white border-white/30' : getTrendColor()
            )}>
              {getTrendIcon()}
              {trendValue}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 