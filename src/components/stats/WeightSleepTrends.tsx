import React, { useMemo, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Scale, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  loadHabitDefinitions,
  loadMetricLog,
  getMetricHistory,
  computeRollingAverage,
  computeSleepScore,
  aggregateMetricHistory,
  formatMetricValue,
  type ChartGranularity,
  type HabitDefinition,
} from '@/utils/habitTracker';

const ROLLING_WINDOW = 10;

const GRANULARITY_OPTIONS: Array<{ key: ChartGranularity; label: string }> = [
  { key: 'day', label: 'Jour' },
  { key: 'week', label: 'Semaine' },
  { key: 'month', label: 'Mois' },
];

const ChartTooltip = ({ active, payload, label, unit }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[rgba(21,25,40,0.95)] border border-[hsl(var(--secondary)/0.3)] rounded-lg px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <p className="text-white text-xs font-semibold">{label}</p>
        <p className="text-xs" style={{ color: 'hsl(var(--secondary))' }}>
          {formatMetricValue(payload[0].value, unit)}
        </p>
      </div>
    );
  }
  return null;
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  weight: Scale,
  sleep: Moon,
};

const MetricTrendCard: React.FC<{ habit: HabitDefinition }> = ({ habit }) => {
  const [granularity, setGranularity] = useState<ChartGranularity>('day');
  const metricLog = useMemo(() => loadMetricLog(), []);
  const history = useMemo(() => getMetricHistory(metricLog, habit.id), [metricLog, habit.id]);
  const average = useMemo(() => computeRollingAverage(history, ROLLING_WINDOW), [history]);
  const chartData = useMemo(() => aggregateMetricHistory(history, granularity), [history, granularity]);
  const sleepScore = habit.id === 'sleep' && average !== undefined ? computeSleepScore(average) : undefined;
  const Icon = ICONS[habit.id] || Scale;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-secondary/15 border border-secondary/25 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-secondary" />
          </div>
          <span className="text-sm font-semibold text-foreground">{habit.label}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground tabular-nums leading-none">
              {average !== undefined ? formatMetricValue(average, habit.unit) : '—'}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Moy. / {ROLLING_WINDOW}</p>
          </div>
          {sleepScore !== undefined && (
            <div className="text-center">
              <p className="text-lg font-bold text-secondary tabular-nums leading-none">{sleepScore}/10</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Qualité</p>
            </div>
          )}
        </div>
      </div>

      {history.length > 0 ? (
        <div>
          <div className="flex justify-end gap-1 mb-1.5">
            {GRANULARITY_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setGranularity(opt.key)}
                className={cn(
                  'px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors',
                  granularity === opt.key
                    ? 'bg-secondary/20 text-secondary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <defs>
                  <linearGradient id={`trend-${habit.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 10 }} dy={6} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 10 }} width={28} domain={['auto', 'auto']} />
                <Tooltip content={<ChartTooltip unit={habit.unit} />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  fill={`url(#trend-${habit.id})`}
                  animationDuration={600}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground text-center py-4">
          Aucune valeur saisie pour l'instant — coche la case correspondante dans le tracker d'habitudes sur l'accueil.
        </p>
      )}
    </div>
  );
};

// Courbes de suivi (poids, sommeil...) — lecture seule, la saisie se fait via le tracker
// d'habitudes de l'accueil (cocher une case ouvre la petite saisie de valeur).
export const WeightSleepTrends: React.FC = () => {
  const metricHabits = useMemo(() => loadHabitDefinitions().filter((h) => h.kind === 'metric'), []);

  if (metricHabits.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        Aucune habitude de suivi (poids, sommeil...) configurée pour l'instant.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {metricHabits.map((habit) => (
        <MetricTrendCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
};

export default WeightSleepTrends;
