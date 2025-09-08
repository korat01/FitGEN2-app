import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  progress?: number;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'cyan';
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  progress,
  color,
  onClick
}) => {
  const colorClasses = {
    blue: 'from-blue-400 to-blue-500',
    green: 'from-emerald-400 to-emerald-500',
    purple: 'from-violet-400 to-violet-500',
    orange: 'from-amber-400 to-amber-500',
    pink: 'from-pink-400 to-pink-500',
    cyan: 'from-cyan-400 to-cyan-500'
  };

  const iconBgClasses = {
    blue: 'bg-blue-100',
    green: 'bg-emerald-100',
    purple: 'bg-violet-100',
    orange: 'bg-amber-100',
    pink: 'bg-pink-100',
    cyan: 'bg-cyan-100'
  };

  const iconColorClasses = {
    blue: 'text-blue-600',
    green: 'text-emerald-600',
    purple: 'text-violet-600',
    orange: 'text-amber-600',
    pink: 'text-pink-600',
    cyan: 'text-cyan-600'
  };

  return (
    <Card 
      className={`bg-gradient-to-br ${colorClasses[color]} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/90 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            {subtitle && (
              <p className="text-white/80 text-xs">{subtitle}</p>
            )}
          </div>
          <div className={`${iconBgClasses[color]} rounded-full p-3`}>
            <Icon className={`h-8 w-8 ${iconColorClasses[color]}`} />
          </div>
        </div>
        {progress !== undefined && (
          <Progress 
            value={progress} 
            className="mt-4 bg-white/20"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard; 