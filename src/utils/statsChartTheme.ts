export const STATS_CHART = {
  grid: 'rgba(255, 255, 255, 0.08)',
  axis: '#B8B9C3',
  tick: '#B8B9C3',
  tooltipStyle: {
    backgroundColor: 'rgba(30, 35, 53, 0.96)',
    border: '1px solid hsl(var(--primary) / 0.35)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
    color: '#FFFFFF',
  },
  legendStyle: { color: '#B8B9C3' },
} as const;

export const STAT_COLORS = {
  force: '#00C2FF',
  speed: '#2ECC71',
  endurance: '#6B2AFF',
  bench: '#6B2AFF',
  squat: '#00C2FF',
  deadlift: '#FF7D3B',
  '5k': '#2ECC71',
  pullups: '#FF6B9D',
} as const;

export const statsTabTrigger =
  'shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground font-medium rounded-lg md:rounded-xl transition-all duration-300 px-3 md:px-4 py-2 text-xs md:text-sm';

export const statsInputClass =
  'w-full h-11 rounded-xl border border-white/15 bg-background/80 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/50';
