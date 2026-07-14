import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Sparkles } from 'lucide-react';

interface StatsGoalsPanelProps {
  userRank: any;
}

const getNextRankTarget = (currentRank?: string) => {
  if (currentRank === 'S') return 'World';
  if (currentRank === 'A') return 'S';
  return 'A';
};

export const StatsGoalsPanel: React.FC<StatsGoalsPanelProps> = ({ userRank }) => (
  <Card className="glass-card border-primary/20">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
        <Target className="w-6 h-6 text-purple-400" />
        Prochain objectif
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="p-8 surface-accent rounded-2xl border border-primary/30 text-center space-y-6">
        <div className="text-6xl animate-bounce">🎯</div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Atteignez le niveau supérieur</h3>
          <div className="text-2xl md:text-4xl font-bold text-purple-400">
            Rang {getNextRankTarget(userRank?.rank)}
          </div>
          <div className="text-lg font-semibold text-muted-foreground">
            Continuez à vous améliorer !
          </div>
        </div>

        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-lg px-8 py-3">
          <Sparkles className="w-5 h-5 mr-2" />
          Accepter le défi
        </Button>
      </div>
    </CardContent>
  </Card>
);
