import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Target, TrendingUp } from 'lucide-react';

interface StatsOverviewEmptyProps {
  onAddPerformance: () => void;
  rank?: string;
  globalScore?: number;
}

export const StatsOverviewEmpty: React.FC<StatsOverviewEmptyProps> = ({
  onAddPerformance,
  rank = 'D',
  globalScore = 0,
}) => (
  <Card className="glass-card border-primary/20">
    <CardContent className="p-6 md:p-8 text-center space-y-5">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center">
        <LayoutGrid className="w-7 h-7 text-secondary" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg md:text-xl font-semibold text-foreground">Votre tableau de bord</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Ajoutez vos premières performances pour débloquer records, graphiques et classement sur l&apos;accueil.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 text-sm">
        <span className="surface-panel-sm px-3 py-1.5 rounded-full text-muted-foreground">
          Rang actuel : <strong className="text-foreground">{rank}</strong>
        </span>
        <span className="surface-panel-sm px-3 py-1.5 rounded-full text-muted-foreground">
          Score : <strong className="text-foreground">{globalScore}</strong> / 1000
        </span>
      </div>
      <Button onClick={onAddPerformance} className="gradient-primary text-white font-semibold">
        <Target className="w-4 h-4 mr-2" />
        Ajouter une performance
      </Button>
      <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
        <TrendingUp className="w-3.5 h-3.5" />
        Vos graphiques et records apparaîtront ici automatiquement
      </p>
    </CardContent>
  </Card>
);
