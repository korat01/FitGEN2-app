import React from 'react';
import { BarChart3, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface StatsPageHeaderProps {
  userName?: string;
  rank?: string;
  rankIcon: string;
  rankColorClass: string;
  globalScore: number;
  scoreLabel?: string;
  rankProgressPercent?: number;
  onRefresh: () => void;
}

export const StatsPageHeader: React.FC<StatsPageHeaderProps> = ({
  userName,
  rank = 'D',
  rankIcon,
  rankColorClass,
  globalScore,
  scoreLabel = 'Score',
  rankProgressPercent = 0,
  onRefresh,
}) => {
  const progress = Math.min(Math.max(rankProgressPercent, 0), 100);

  return (
    <div className="glass-card border border-primary/25 overflow-hidden rounded-2xl md:rounded-3xl">
      <div className="relative p-4 md:p-6">
        <div className="absolute inset-0 gradient-primary opacity-70" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

        <div className="relative z-10 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-white/70 text-xs md:text-sm uppercase tracking-wide">Performances</p>
                <h1 className="text-lg md:text-2xl font-bold text-white truncate">
                  {userName || 'Champion'}
                </h1>
              </div>
            </div>
            <Button
              onClick={onRefresh}
              size="sm"
              variant="ghost"
              className="shrink-0 h-10 px-3 text-white/90 hover:text-white hover:bg-white/15 border border-white/20"
            >
              <RefreshCw className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline text-xs">Actualiser</span>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="rounded-xl bg-black/20 border border-white/10 p-3 md:p-4 text-center">
              <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wide mb-1">Rang</p>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${rankColorClass} text-white text-sm font-semibold`}>
                <span>{rankIcon}</span>
                <span>{rank}</span>
              </div>
            </div>
            <div className="rounded-xl bg-black/20 border border-white/10 p-3 md:p-4 text-center">
              <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wide mb-1">Score</p>
              <p className="text-xl md:text-2xl font-bold text-white tabular-nums">{globalScore}</p>
              <p className="text-[10px] text-white/50 truncate">{scoreLabel}</p>
            </div>
            <div className="rounded-xl bg-black/20 border border-white/10 p-3 md:p-4">
              <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wide mb-2 text-center">Progression</p>
              <Progress value={progress} size="sm" variant="subtle" className="mb-1.5" />
              <p className="text-center text-xs font-semibold text-white tabular-nums">{Math.round(progress)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
