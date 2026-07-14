import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap, Gauge, Heart } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { MainStats } from '@/types/stats';

interface StatCardProps {
  title: string;
  icon: React.ReactNode;
  mainValue: string;
  subValue: string;
  progress: number;
  communityRank: string;
  evolution: number[];
  accentColor: string;
  iconGradient: string;
  chartColor: string;
  performancePoints: number;
  performanceLevel: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  icon,
  mainValue,
  subValue,
  progress,
  communityRank,
  evolution,
  accentColor,
  iconGradient,
  chartColor,
  performancePoints,
  performanceLevel,
}) => {
  const chartData = evolution.map((value, index) => ({ week: index, value }));

  return (
    <Card
      className="glass-card border-primary/20 overflow-hidden hover:border-primary/35 transition-colors"
      style={{ borderLeftWidth: 3, borderLeftColor: accentColor }}
    >
      <CardContent className="p-4 md:p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 bg-gradient-to-br ${iconGradient} rounded-xl flex items-center justify-center shrink-0 shadow-md`}>
              {icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{title}</p>
              <p className="text-lg md:text-xl font-bold text-foreground truncate">{mainValue}</p>
              <p className="text-xs text-muted-foreground">{subValue}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] text-muted-foreground uppercase">Niveau</p>
            <p className="text-sm font-semibold text-foreground">{performanceLevel}</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progression</span>
            <span className="font-semibold tabular-nums" style={{ color: accentColor }}>{progress}%</span>
          </div>
          <Progress value={progress} size="sm" variant="subtle" />
        </div>

        <div className="flex items-end justify-between gap-3 pt-1">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase mb-0.5">Points perf.</p>
            <p className="text-base font-bold tabular-nums" style={{ color: accentColor }}>{performancePoints}</p>
            <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">{communityRank}</p>
          </div>
          <div className="h-12 w-24 rounded-lg bg-white/5 border border-white/10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="value" stroke={chartColor} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MainStatsCardsProps {
  stats: MainStats;
}

export const MainStatsCards: React.FC<MainStatsCardsProps> = ({ stats }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
    <StatCard
      title="Force"
      icon={<Zap className="w-5 h-5 text-white" />}
      mainValue={`${stats.force.total} kg`}
      subValue={`${stats.force.wilks} Wilks`}
      progress={stats.force.weeklyProgress}
      communityRank={stats.force.communityRank}
      evolution={stats.force.evolution}
      accentColor="#00C2FF"
      iconGradient="from-blue-500 to-cyan-500"
      chartColor="#00C2FF"
      performancePoints={stats.force.performancePoints}
      performanceLevel={stats.force.performanceLevel}
    />
    <StatCard
      title="Vitesse"
      icon={<Gauge className="w-5 h-5 text-white" />}
      mainValue={`${stats.speed.time100m}s / 100m`}
      subValue={`${stats.speed.maxSpeed} km/h max`}
      progress={stats.speed.weeklyProgress}
      communityRank={stats.speed.communityRank}
      evolution={stats.speed.evolution}
      accentColor="#2ECC71"
      iconGradient="from-green-500 to-emerald-500"
      chartColor="#2ECC71"
      performancePoints={stats.speed.performancePoints}
      performanceLevel={stats.speed.performanceLevel}
    />
    <StatCard
      title="Endurance"
      icon={<Heart className="w-5 h-5 text-white" />}
      mainValue={`VO₂ ${stats.endurance.vo2max}`}
      subValue={`${stats.endurance.distance30min} km / 30 min`}
      progress={stats.endurance.weeklyProgress}
      communityRank={stats.endurance.communityRank}
      evolution={stats.endurance.evolution}
      accentColor="#6B2AFF"
      iconGradient="from-purple-500 to-violet-500"
      chartColor="#6B2AFF"
      performancePoints={stats.endurance.performancePoints}
      performanceLevel={stats.endurance.performanceLevel}
    />
  </div>
);
