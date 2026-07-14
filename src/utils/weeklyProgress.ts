const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as const;

export interface WeeklyDayData {
  day: string;
  stats: number;
  rank: number;
}

export interface WeeklyProgressSummary {
  chartData: WeeklyDayData[];
  totalPoints: number;
  weekChangePercent: number;
  activeDays: number;
  weekLabel: string;
  isEmpty: boolean;
}

interface ActivityInput {
  date: string | Date;
  value?: number;
}

interface ValidationInput {
  date: string;
  success?: boolean;
  xp?: number;
}

/** Clé locale YYYY-MM-DD (évite les décalages UTC) */
export function getLocalDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getTodayLocalKey(): string {
  return getLocalDateKey(new Date());
}

/** Normalise une date stockée (ISO ou YYYY-MM-DD) en clé locale */
export function normalizeActivityDateKey(raw: string | Date): string {
  if (raw instanceof Date) return getLocalDateKey(raw);
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  return getLocalDateKey(new Date(raw));
}

/** Début de semaine (lundi 00:00, heure locale) */
export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getWeekKey(date: Date = new Date()): string {
  const start = getWeekStart(date);
  return `${start.getFullYear()}-W${String(getISOWeek(start)).padStart(2, '0')}`;
}

function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function getDayActivity(
  dayStart: Date,
  performances: ActivityInput[],
  validations: ValidationInput[]
): number {
  const dateKey = getLocalDateKey(dayStart);

  const perfOnDay = performances.filter(
    (p) => normalizeActivityDateKey(p.date) === dateKey
  );
  const perfPoints =
    perfOnDay.length * 30 +
    perfOnDay.reduce((sum, p) => sum + Math.min(Number(p.value) || 0, 50), 0);

  const validationPoints = validations
    .filter((v) => normalizeActivityDateKey(v.date) === dateKey && v.success !== false)
    .reduce((sum, v) => sum + (v.xp || 50), 0);

  return Math.round(perfPoints + validationPoints);
}

export function calculateWeeklyProgress(
  performances: ActivityInput[] = [],
  validations: ValidationInput[] = []
): WeeklyProgressSummary {
  const now = new Date();
  const weekStart = getWeekStart(now);
  const prevWeekStart = new Date(weekStart);
  prevWeekStart.setDate(prevWeekStart.getDate() - 7);

  const chartData: WeeklyDayData[] = [];
  let weekTotal = 0;
  let prevWeekTotal = 0;
  let cumulative = 0;

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(weekStart);
    dayDate.setDate(dayDate.getDate() + i);

    const dayStats = getDayActivity(dayDate, performances, validations);
    weekTotal += dayStats;
    cumulative += dayStats;

    chartData.push({
      day: DAY_LABELS[i],
      stats: dayStats,
      rank: cumulative,
    });

    const prevDayDate = new Date(prevWeekStart);
    prevDayDate.setDate(prevDayDate.getDate() + i);
    prevWeekTotal += getDayActivity(prevDayDate, performances, validations);
  }

  const weekChangePercent =
    prevWeekTotal > 0
      ? Math.round(((weekTotal - prevWeekTotal) / prevWeekTotal) * 100)
      : weekTotal > 0
        ? 100
        : 0;

  const weekLabel = `Semaine du ${weekStart.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  })}`;

  return {
    chartData,
    totalPoints: weekTotal,
    weekChangePercent,
    activeDays: chartData.filter((d) => d.stats > 0).length,
    weekLabel,
    isEmpty: weekTotal === 0,
  };
}

export function calculateWeeklyActivityHistory(
  performances: ActivityInput[] = [],
  validations: ValidationInput[] = []
): boolean[] {
  const weekStart = getWeekStart(new Date());
  return DAY_LABELS.map((_, i) => {
    const dayDate = new Date(weekStart);
    dayDate.setDate(dayDate.getDate() + i);
    return getDayActivity(dayDate, performances, validations) > 0;
  });
}

export function calculateActivityStreak(
  performances: ActivityInput[] = [],
  validations: ValidationInput[] = []
): number {
  const activityDates = new Set<string>();

  performances.forEach((p) => activityDates.add(normalizeActivityDateKey(p.date)));
  validations
    .filter((v) => v.success !== false)
    .forEach((v) => activityDates.add(normalizeActivityDateKey(v.date)));

  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (activityDates.has(getLocalDateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
