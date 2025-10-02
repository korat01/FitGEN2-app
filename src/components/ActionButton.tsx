import React from 'react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { Loader2 } from 'lucide-react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'gradient' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  variant = 'default',
  size = 'md',
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'gradient-primary text-white border-0 hover:shadow-lg hover:scale-105 transition-all duration-200';
      case 'glass':
        return 'glass-effect border-white/30 hover:bg-white/20 transition-all duration-200';
      case 'outline':
        return 'border-2 border-primary/20 hover:border-primary/40 bg-transparent hover:bg-primary/5 transition-all duration-200';
      default:
        return '';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-8 px-3 text-sm';
      case 'lg':
        return 'h-12 px-8 text-lg';
      default:
        return 'h-10 px-6';
    }
  };

  return (
    <Button
      className={cn(
        'relative overflow-hidden group',
        getVariantClasses(),
        getSizeClasses(),
        loading && 'cursor-not-allowed opacity-70',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {!loading && icon && (
        <span className="mr-2 transition-transform group-hover:scale-110">
          {icon}
        </span>
      )}
      <span className="relative z-10">{children}</span>
      
      {/* Effet de survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </Button>
  );
}; 