import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, CalendarDays } from 'lucide-react';
import {
  calculateWeeklyProgress,
  WeeklyProgressSummary,
  normalizeActivityDateKey,
} from '@/utils/weeklyProgress';

interface WeeklyProgressChartProps {
  performances?: Array<{ date: string | Date; value?: number }>;
  validations?: Array<{ date: string; success?: boolean; xp?: number }>;
  title?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[rgba(21,25,40,0.95)] border border-[rgba(0,194,255,0.3)] rounded-lg p-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <p className="text-white font-semibold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value} pts
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SummaryBlock: React.FC<{ summary: WeeklyProgressSummary }> = ({ summary }) => {
  const changeLabel =
    summary.weekChangePercent > 0
      ? `+${summary.weekChangePercent}%`
      : summary.weekChangePercent < 0
        ? `${summary.weekChangePercent}%`
        : '—';

  const changeColor =
    summary.weekChangePercent > 0
      ? 'from-[#2ECC71] to-[#00C2FF]'
      : summary.weekChangePercent < 0
        ? 'from-[#ef4444] to-[#f97316]'
        : 'from-[#A0AEC0] to-[#718096]';

  return (
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary/15">
      <div className="text-center flex-1">
        <p className="text-2xl font-bold bg-gradient-to-r from-[#6B2AFF] to-[#00C2FF] bg-clip-text text-transparent tabular-nums">
          {summary.totalPoints}
        </p>
        <p className="text-xs text-muted-foreground">Points cette semaine</p>
      </div>
      <div className="text-center flex-1">
        <p className={`text-2xl font-bold bg-gradient-to-r ${changeColor} bg-clip-text text-transparent tabular-nums`}>
          {changeLabel}
        </p>
        <p className="text-xs text-muted-foreground">vs semaine dernière</p>
      </div>
      <div className="text-center flex-1">
        <p className="text-2xl font-bold bg-gradient-to-r from-[#2ECC71] to-[#00C2FF] bg-clip-text text-transparent tabular-nums">
          {summary.activeDays}/7
        </p>
        <p className="text-xs text-muted-foreground">Jours actifs</p>
      </div>
    </div>
  );
};

export const WeeklyProgressChart: React.FC<WeeklyProgressChartProps> = ({
  performances = [],
  validations = [],
  title = 'Progression hebdomadaire',
}) => {
  const summary = useMemo(() => {
    const normalizedPerformances = performances.map((p) => ({
      ...p,
      date: normalizeActivityDateKey(p.date),
    }));
    return calculateWeeklyProgress(normalizedPerformances, validations);
  }, [performances, validations]);

  return (
    <Card className="glass-card border-primary/20 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              {title}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5" />
              {summary.weekLabel} · reset chaque lundi
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-[#6B2AFF] to-[#00C2FF]" />
              <span className="text-muted-foreground">Jour</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-[#00C2FF] to-[#00E0FF]" />
              <span className="text-muted-foreground">Cumul</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {summary.isEmpty && (
          <div className="mb-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-center">
            <p className="text-sm text-muted-foreground">
              Aucune activité cette semaine — le graphique se remplit quand vous vous entraînez ou ajoutez une performance.
            </p>
          </div>
        )}
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={summary.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradientStats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6B2AFF" stopOpacity={0.8} />
                    <stop offset="50%" stopColor="#00C2FF" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#00C2FF" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="gradientRank" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00C2FF" stopOpacity={0.6} />
                    <stop offset="50%" stopColor="#6B2AFF" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6B2AFF" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A0AEC0', fontSize: 11 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A0AEC0', fontSize: 11 }}
                  dx={-5}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="rank"
                  name="Cumul"
                  stroke="#00C2FF"
                  strokeWidth={2}
                  fill="url(#gradientRank)"
                  animationDuration={800}
                />
                <Area
                  type="monotone"
                  dataKey="stats"
                  name="Activité"
                  stroke="#6B2AFF"
                  strokeWidth={2}
                  fill="url(#gradientStats)"
                  animationDuration={800}
                />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <SummaryBlock summary={summary} />
      </CardContent>
    </Card>
  );
};

export default WeeklyProgressChart;
