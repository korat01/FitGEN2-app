import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Trophy, TrendingUp, Flame, Zap, Crown, Target } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { HexagonBadge } from './HexagonBadge';

interface EliteChallengerCardProps {
  userName: string;
  rank: string;
  globalScore: number;
  level: number;
  sportClass?: string;
  streak?: number;
  className?: string;
}

const rankConfig: Record<string, { 
  color: string; 
  gradient: string; 
  glow: string;
  icon: string;
  title: string;
}> = {
  'World': { 
    color: 'text-yellow-400', 
    gradient: 'from-yellow-400 via-amber-500 to-orange-500',
    glow: 'shadow-[0_0_40px_rgba(234,179,8,0.6)]',
    icon: '🏆',
    title: 'World Champion'
  },
  'Nation': { 
    color: 'text-purple-400', 
    gradient: 'from-purple-400 via-violet-500 to-indigo-500',
    glow: 'shadow-[0_0_40px_rgba(168,85,247,0.6)]',
    icon: '🏆',
    title: 'National Elite'
  },
  'S': { 
    color: 'text-rose-400', 
    gradient: 'from-rose-400 via-pink-500 to-purple-500',
    glow: 'shadow-[0_0_35px_rgba(244,63,94,0.5)]',
    icon: '🥇',
    title: 'S-Class'
  },
  'A': { 
    color: 'text-red-400', 
    gradient: 'from-red-400 via-orange-500 to-amber-500',
    glow: 'shadow-[0_0_30px_rgba(239,68,68,0.4)]',
    icon: '🥈',
    title: 'A-Class Hunter'
  },
  'B': { 
    color: 'text-blue-400', 
    gradient: 'from-blue-400 via-cyan-500 to-teal-500',
    glow: 'shadow-[0_0_25px_rgba(59,130,246,0.4)]',
    icon: '🥉',
    title: 'B-Class Warrior'
  },
  'C': { 
    color: 'text-green-400', 
    gradient: 'from-green-400 via-emerald-500 to-teal-500',
    glow: 'shadow-[0_0_20px_rgba(34,197,94,0.4)]',
    icon: '⭐',
    title: 'C-Class Fighter'
  },
  'D': { 
    color: 'text-gray-400', 
    gradient: 'from-gray-400 via-slate-500 to-zinc-500',
    glow: 'shadow-[0_0_15px_rgba(156,163,175,0.3)]',
    icon: '🔰',
    title: 'Rising Challenger'
  },
};

export const EliteChallengerCard: React.FC<EliteChallengerCardProps> = ({
  userName,
  rank,
  globalScore,
  level,
  sportClass = 'Athlète',
  streak = 0,
  className,
}) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const config = rankConfig[rank] || rankConfig['D'];

  useEffect(() => {
    setIsAnimated(true);
    // Animate score
    const duration = 2000;
    const steps = 60;
    const increment = globalScore / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= globalScore) {
        setScoreDisplay(globalScore);
        clearInterval(interval);
      } else {
        setScoreDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [globalScore]);

  return (
    <div className={cn(
      'relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-8',
      'glass-card border border-primary/30',
      config.glow,
      'transition-all duration-500',
      isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      className
    )}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient orbs */}
        <div className={cn(
          'absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30 animate-pulse-slow',
          `bg-gradient-to-br ${config.gradient}`
        )} />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-secondary to-primary animate-pulse-slow" 
          style={{ animationDelay: '1s' }} 
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-secondary/60 animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Left: Avatar and Badge */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <UserAvatar 
                fallback={userName}
                size="xl"
                variant="gradient"
                showGlow
              />
              {/* Crown for top ranks */}
              {['World', 'Nation', 'S'].includes(rank) && (
                <Crown className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 text-yellow-400 animate-bounce-slow" />
              )}
            </div>
            
            <HexagonBadge 
              level={level} 
              variant={
                level >= 50 ? 'diamond' :
                level >= 30 ? 'gold' :
                level >= 15 ? 'platinum' :
                'primary'
              }
              size="lg"
              animated
            />
          </div>

          {/* Center: User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight truncate">
                {userName}
              </h2>
              <span className="text-2xl">{config.icon}</span>
            </div>
            
            <p className="text-muted-foreground text-sm md:text-base mb-3">
              {config.title} • {sportClass} • Niveau {level}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Rank badge */}
              <div className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold',
                'bg-gradient-to-r',
                config.gradient,
                'text-white shadow-lg'
              )}>
                <Trophy className="w-4 h-4" />
                <span>Rang {rank}</span>
              </div>

              {/* Score badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-secondary/30 text-white font-semibold">
                <Target className="w-4 h-4 text-secondary" />
                <span>{scoreDisplay}</span>
                <span className="text-muted-foreground text-sm">/1000</span>
              </div>

              {/* Streak badge */}
              {streak > 0 && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-accent/30 text-white font-semibold">
                  <Flame className="w-4 h-4 text-accent animate-pulse" />
                  <span>{streak}</span>
                  <span className="text-muted-foreground text-sm">jours</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Score circle */}
          <div className="hidden lg:flex flex-col items-center">
            <div className={cn(
              'relative w-28 h-28 rounded-full flex items-center justify-center',
              'bg-gradient-to-br from-card/80 to-card/40',
              'border-4',
              config.glow
            )}
              style={{ borderColor: `rgba(${rank === 'World' ? '234,179,8' : rank === 'S' ? '244,63,94' : '107,42,255'}, 0.5)` }}
            >
              {/* Animated ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-muted/20"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#scoreGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(globalScore / 1000) * 283} 283`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6B2AFF" />
                    <stop offset="100%" stopColor="#00C2FF" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="text-center">
                <span className="text-2xl font-bold text-white">{scoreDisplay}</span>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progression vers le rang suivant</span>
            <span className="text-white font-semibold">
              {Math.round((globalScore % 200) / 2)}%
            </span>
          </div>
          <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
            <div 
              className={cn(
                'absolute inset-y-0 left-0 rounded-full transition-all duration-1000',
                'bg-gradient-to-r',
                config.gradient
              )}
              style={{ width: `${(globalScore % 200) / 2}%` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EliteChallengerCard;
