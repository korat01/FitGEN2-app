import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3, Weight, MapPin, Flame } from 'lucide-react';
import { GlobalStats } from '@/types/stats';

interface GlobalStatsProps {
  stats: GlobalStats;
}

export const GlobalStatsDisplay: React.FC<GlobalStatsProps> = ({ stats }) => {
  const { totalSessions, totalVolume, totalDistance, totalCalories, evolution } = stats;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toLocaleString('fr-FR');
  };

  const getEvolutionIcon = (value: number) =>
    value >= 0 ? (
      <TrendingUp className="w-4 h-4 text-green-400" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-400" />
    );

  const getEvolutionColor = (value: number) =>
    value >= 0 ? 'text-green-400' : 'text-red-400';

  const statItems = [
    {
      title: 'Total séances',
      value: totalSessions,
      evolution: evolution.sessions,
      icon: <BarChart3 className="w-5 h-5 text-white" />,
      iconGradient: 'from-blue-500 to-indigo-500',
      bgClass: 'from-blue-500/10 to-indigo-500/10 border-blue-500/25',
    },
    {
      title: 'Volume total soulevé',
      value: `${formatNumber(totalVolume)} kg`,
      evolution: evolution.volume,
      icon: <Weight className="w-5 h-5 text-white" />,
      iconGradient: 'from-green-500 to-emerald-500',
      bgClass: 'from-green-500/10 to-emerald-500/10 border-green-500/25',
    },
    {
      title: 'Distance totale',
      value: `${formatNumber(totalDistance)} km`,
      evolution: evolution.distance,
      icon: <MapPin className="w-5 h-5 text-white" />,
      iconGradient: 'from-purple-500 to-violet-500',
      bgClass: 'from-purple-500/10 to-violet-500/10 border-purple-500/25',
    },
    {
      title: 'Calories estimées',
      value: `${formatNumber(totalCalories)} kcal`,
      evolution: evolution.calories,
      icon: <Flame className="w-5 h-5 text-white" />,
      iconGradient: 'from-orange-500 to-red-500',
      bgClass: 'from-orange-500/10 to-red-500/10 border-orange-500/25',
    },
  ];

  const sessionsPerWeek = totalSessions > 0 ? Math.round(totalSessions / 52) : 0;
  const volumePerSession = totalSessions > 0 ? Math.round(totalVolume / totalSessions) : 0;
  const distancePerSession = totalSessions > 0 ? Math.round((totalDistance / totalSessions) * 10) / 10 : 0;

  return (
    <Card className="glass-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl md:text-2xl">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          Statistiques globales
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl p-5 border bg-gradient-to-br ${item.bgClass} transition-all duration-300 hover:border-primary/40`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 bg-gradient-to-r ${item.iconGradient} rounded-xl flex items-center justify-center shadow-md`}>
                  {item.icon}
                </div>
                <div className="flex items-center gap-1">
                  {getEvolutionIcon(item.evolution)}
                  <span className={`text-sm font-semibold tabular-nums ${getEvolutionColor(item.evolution)}`}>
                    {item.evolution > 0 ? '+' : ''}{item.evolution}%
                  </span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 tabular-nums">{item.value}</h3>
              <p className="text-sm text-muted-foreground">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="surface-accent rounded-2xl p-5 md:p-6">
          <h4 className="text-base md:text-lg font-semibold text-foreground mb-4">Résumé de performance</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="surface-panel p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary tabular-nums mb-1">{sessionsPerWeek}</div>
              <div className="text-sm text-muted-foreground">Séances / semaine</div>
            </div>
            <div className="surface-panel p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-400 tabular-nums mb-1">{volumePerSession}</div>
              <div className="text-sm text-muted-foreground">kg / séance</div>
            </div>
            <div className="surface-panel p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-400 tabular-nums mb-1">{distancePerSession}</div>
              <div className="text-sm text-muted-foreground">km / séance</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-base md:text-lg font-semibold text-foreground mb-3">Badges de performance</h4>
          <div className="flex flex-wrap gap-2">
            {totalSessions >= 100 && (
              <Badge className="bg-blue-500/15 text-blue-300 border-blue-500/30">
                <BarChart3 className="w-3 h-3 mr-1" />
                100+ séances
              </Badge>
            )}
            {totalVolume >= 50000 && (
              <Badge className="bg-green-500/15 text-green-300 border-green-500/30">
                <Weight className="w-3 h-3 mr-1" />
                50k+ kg soulevés
              </Badge>
            )}
            {totalDistance >= 1000 && (
              <Badge className="bg-purple-500/15 text-purple-300 border-purple-500/30">
                <MapPin className="w-3 h-3 mr-1" />
                1000+ km parcourus
              </Badge>
            )}
            {totalCalories >= 100000 && (
              <Badge className="bg-orange-500/15 text-orange-300 border-orange-500/30">
                <Flame className="w-3 h-3 mr-1" />
                100k+ calories
              </Badge>
            )}
            {totalSessions < 100 && totalVolume < 50000 && totalDistance < 1000 && totalCalories < 100000 && (
              <p className="text-sm text-muted-foreground">Continuez à vous entraîner pour débloquer des badges.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
