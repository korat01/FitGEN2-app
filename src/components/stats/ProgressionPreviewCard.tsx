import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, TrendingUp, Medal, ChevronRight, BarChart3 } from 'lucide-react';
import { getRangColor, getRangIcon } from '@/utils/rankingHelpers';

interface ProgressionPreviewCardProps {
  userRank: any;
  performancesCount: number;
}

export const ProgressionPreviewCard: React.FC<ProgressionPreviewCardProps> = ({
  userRank,
  performancesCount,
}) => (
  <Card className="glass-card border-primary/25 overflow-hidden">
    <CardContent className="p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-secondary" />
            Ma progression
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Records, graphiques d&apos;évolution, classement et objectifs — tout au même endroit.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="surface-panel-sm px-2.5 py-1 rounded-full flex items-center gap-1 text-muted-foreground">
              <Trophy className="w-3 h-3" /> Records
            </span>
            <span className="surface-panel-sm px-2.5 py-1 rounded-full flex items-center gap-1 text-muted-foreground">
              <TrendingUp className="w-3 h-3" /> Évolution
            </span>
            <span className="surface-panel-sm px-2.5 py-1 rounded-full flex items-center gap-1 text-muted-foreground">
              <Medal className="w-3 h-3" /> Classement
            </span>
          </div>
          {userRank && (
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${getRangColor(userRank.rank || 'D')} text-white text-sm font-semibold`}>
              <span>{getRangIcon(userRank.rank || 'D')}</span>
              <span>Rang {userRank.rank || 'D'}</span>
              <span className="opacity-80">· {userRank.globalScore || 0} {userRank.scoreLabel || 'pts'}</span>
              <span className="opacity-80">· {performancesCount} perf.</span>
            </div>
          )}
        </div>
        <Button asChild className="gradient-primary text-white font-semibold shrink-0">
          <Link to="/progression">
            Voir records &amp; classement
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);
