import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Zap, Star, Trophy, Crown, Sparkles } from 'lucide-react';
import { useExerciseValidation } from '../contexts/ExerciseContext';
import { useParticles } from '../hooks/useParticles';

const clampProgress = (current: number, total: number) => {
  if (!total || total <= 0) return 0;
  return Math.min(Math.max((current / total) * 100, 0), 100);
};

export const XPLevelBar: React.FC = () => {
  const { xpData } = useExerciseValidation();
  const { spawnLevelUpParticles } = useParticles();
  const cardRef = useRef<HTMLDivElement>(null);
  const previousLevel = useRef<number | null>(null);

  useEffect(() => {
    if (xpData && previousLevel.current !== null && xpData.level > previousLevel.current) {
      if (cardRef.current) {
        spawnLevelUpParticles(cardRef.current);
      }
    }
    if (xpData) {
      previousLevel.current = xpData.level;
    }
  }, [xpData?.level, spawnLevelUpParticles]);

  if (!xpData) {
    return (
      <Card className="glass-card border-primary/20">
        <CardContent className="p-5 md:p-6">
          <div className="space-y-3 animate-pulse">
            <div className="h-5 bg-white/10 rounded-md w-1/3" />
            <div className="h-2.5 bg-white/10 rounded-full" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-14 bg-white/10 rounded-lg" />
              <div className="h-14 bg-white/10 rounded-lg" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progressPercentage = clampProgress(xpData.currentXP, xpData.xpToNextLevel);
  const xpRemaining = Math.max(xpData.xpToNextLevel - xpData.currentXP, 0);

  const getLevelIcon = (level: number) => {
    if (level >= 50) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (level >= 25) return <Trophy className="w-5 h-5 text-purple-400" />;
    if (level >= 10) return <Star className="w-5 h-5 text-cyan-400" />;
    return <Zap className="w-5 h-5 text-primary" />;
  };

  const getMotivationMessage = (level: number) => {
    if (level >= 50) return 'Légende du fitness';
    if (level >= 25) return 'Champion en devenir';
    if (level >= 10) return 'Sur la bonne voie';
    return 'Commencez votre aventure';
  };

  return (
    <Card
      ref={cardRef}
      className="glass-card border-primary/20 shadow-[var(--shadow-card)]"
    >
      <CardContent className="p-5 md:p-6 space-y-5">
        {/* En-tête */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              {getLevelIcon(xpData.level)}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
                Niveau {xpData.level}
                <Sparkles className="w-4 h-4 text-secondary shrink-0" />
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {xpData.totalXP.toLocaleString('fr-FR')} XP au total
              </p>
            </div>
          </div>
          <Badge className="shrink-0 bg-primary/15 text-foreground border-primary/30 hover:bg-primary/15">
            <Zap className="w-3 h-3 mr-1 text-secondary" />
            {xpData.currentXP} / {xpData.xpToNextLevel}
          </Badge>
        </div>

        {/* Barre XP principale */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm gap-3">
            <span className="text-muted-foreground">
              Progression vers le niveau {xpData.level + 1}
            </span>
            <span className="font-semibold text-foreground tabular-nums">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress
            value={progressPercentage}
            size="lg"
            variant="default"
            aria-label={`Progression XP niveau ${xpData.level}`}
            aria-valuenow={Math.round(progressPercentage)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
            <span>{xpData.currentXP} XP</span>
            <span>{xpData.xpToNextLevel} XP</span>
          </div>
        </div>

        {/* Stats complémentaires */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">XP restant</p>
            <p className="text-lg font-semibold text-foreground tabular-nums">{xpRemaining}</p>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Prochain niveau</p>
            <p className="text-lg font-semibold text-foreground tabular-nums">{xpData.level + 1}</p>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          {getMotivationMessage(xpData.level)}
        </p>
      </CardContent>
    </Card>
  );
};
