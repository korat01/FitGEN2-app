import React from 'react';
import { cn } from '@/lib/utils';

interface StatsSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  title,
  description,
  icon,
  children,
  className,
}) => (
  <section className={cn('space-y-4', className)}>
    <div className="flex items-start gap-3 px-0.5">
      {icon && (
        <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
          {icon}
        </div>
      )}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
    </div>
    {children}
  </section>
);
