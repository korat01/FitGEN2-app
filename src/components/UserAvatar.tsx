import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

interface UserAvatarProps {
  src?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'cyan' | 'gold' | 'gradient';
  className?: string;
  showGlow?: boolean;
}

const sizeClasses = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
  xl: 'h-28 w-28',
};

const glowColors = {
  primary: 'shadow-[0_0_20px_rgba(107,42,255,0.6),0_0_40px_rgba(107,42,255,0.3)]',
  cyan: 'shadow-[0_0_20px_rgba(0,194,255,0.6),0_0_40px_rgba(0,194,255,0.3)]',
  gold: 'shadow-[0_0_20px_rgba(255,215,0,0.6),0_0_40px_rgba(255,215,0,0.3)]',
  gradient: 'shadow-[0_0_20px_rgba(107,42,255,0.5),0_0_40px_rgba(0,194,255,0.3)]',
};

const borderStyles = {
  primary: 'border-[#6B2AFF]',
  cyan: 'border-[#00C2FF]',
  gold: 'border-[#FFD700]',
  gradient: 'border-transparent',
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  fallback,
  size = 'md',
  variant = 'gradient',
  className,
  showGlow = true,
}) => {
  const initials = fallback?.slice(0, 2).toUpperCase() || 'U';

  return (
    <div
      className={cn(
        'relative rounded-full p-[3px]',
        variant === 'gradient' && 'bg-gradient-to-br from-[#6B2AFF] via-[#00C2FF] to-[#6B2AFF]',
        variant !== 'gradient' && borderStyles[variant],
        showGlow && glowColors[variant],
        className
      )}
      style={{
        animation: showGlow ? 'pulse-glow 3s ease-in-out infinite' : undefined,
      }}
    >
      <Avatar
        className={cn(
          sizeClasses[size],
          'border-2 border-background bg-card'
        )}
      >
        {src ? (
          <AvatarImage src={src} alt="User avatar" className="object-cover" />
        ) : null}
        <AvatarFallback
          className={cn(
            'bg-gradient-to-br from-[#1a1a2e] to-[#0d0d1a]',
            'text-white font-bold',
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-sm',
            size === 'lg' && 'text-lg',
            size === 'xl' && 'text-2xl',
          )}
        >
          {src ? initials : <User className={cn(
            size === 'sm' && 'h-4 w-4',
            size === 'md' && 'h-6 w-6',
            size === 'lg' && 'h-8 w-8',
            size === 'xl' && 'h-12 w-12',
          )} />}
        </AvatarFallback>
      </Avatar>
      
      {/* Decorative ring */}
      <div
        className={cn(
          'absolute inset-0 rounded-full pointer-events-none',
          'border border-white/10'
        )}
      />
    </div>
  );
};

export default UserAvatar;
