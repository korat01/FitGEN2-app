export type HabitIconKey =
  | 'dumbbell'
  | 'droplet'
  | 'moon'
  | 'salad'
  | 'wind'
  | 'book'
  | 'sun'
  | 'heart'
  | 'brain'
  | 'coffee'
  | 'scale';

export type HabitKind = 'check' | 'metric';

export interface HabitDefinition {
  id: string;
  label: string;
  icon: HabitIconKey;
  /** 'check' (par défaut si absent, habitudes existantes avant cette option) = case à cocher.
      'metric' = valeur numérique quotidienne (poids, sommeil...) avec courbe + moyenne glissante. */
  kind?: HabitKind;
  /** Unité affichée pour les habitudes 'metric' (ex: 'kg', 'h'). */
  unit?: string;
}

export const ICON_KEYS: HabitIconKey[] = [
  'dumbbell', 'droplet', 'moon', 'salad', 'wind', 'book', 'sun', 'heart', 'brain', 'coffee',
];

export const isMetricHabit = (habit: HabitDefinition): boolean => habit.kind === 'metric';
export const isCheckHabit = (habit: HabitDefinition): boolean => !isMetricHabit(habit);

// Habitudes par défaut, utilisées pour amorcer la liste au tout premier lancement — ensuite
// la liste vit dans le localStorage et l'utilisateur peut l'éditer (ajout/suppression). Poids et
// Sommeil sont 'metric' (courbe + moyenne glissante sur 10 entrées) plutôt qu'une simple coche.
const DEFAULT_HABITS: HabitDefinition[] = [
  { id: 'training', label: 'Entraînement', icon: 'dumbbell' },
  { id: 'hydration', label: 'Hydratation', icon: 'droplet' },
  { id: 'sleep', label: 'Sommeil', icon: 'moon', kind: 'metric', unit: 'h' },
  { id: 'nutrition', label: 'Nutrition', icon: 'salad' },
  { id: 'mobility', label: 'Étirements', icon: 'wind' },
  { id: 'weight', label: 'Poids', icon: 'scale', kind: 'metric', unit: 'kg' },
];

export type HabitLog = Record<string, string[]>;

const DEFS_STORAGE_KEY = 'habitTrackerDefinitions';
const LOG_STORAGE_KEY = 'habitTrackerLog';

// Fait passer 'sleep' en 'metric' et ajoute 'weight' aux listes déjà sauvegardées avant l'ajout
// du suivi de métriques, sans toucher aux habitudes personnalisées de l'utilisateur.
const migrateDefinitions = (defs: HabitDefinition[]): HabitDefinition[] => {
  let next = defs.map((h) =>
    h.id === 'sleep' && h.kind !== 'metric' ? { ...h, kind: 'metric' as const, unit: 'h' } : h
  );
  if (!next.some((h) => h.id === 'weight')) {
    next = [...next, { id: 'weight', label: 'Poids', icon: 'scale', kind: 'metric', unit: 'kg' }];
  }
  return next;
};

export const loadHabitDefinitions = (): HabitDefinition[] => {
  try {
    const saved = JSON.parse(localStorage.getItem(DEFS_STORAGE_KEY) || 'null');
    if (Array.isArray(saved) && saved.length > 0) return migrateDefinitions(saved);
  } catch {
    // ignore
  }
  return DEFAULT_HABITS;
};

export const saveHabitDefinitions = (defs: HabitDefinition[]): void => {
  localStorage.setItem(DEFS_STORAGE_KEY, JSON.stringify(defs));
};

export const addHabitDefinition = (
  defs: HabitDefinition[],
  label: string,
  icon: HabitIconKey
): HabitDefinition[] => {
  const id = `${Date.now()}-${Math.round(Math.random() * 1000)}`;
  return [...defs, { id, label: label.trim(), icon }];
};

export const removeHabitDefinition = (defs: HabitDefinition[], id: string): HabitDefinition[] =>
  defs.filter((h) => h.id !== id);

// Clé en heure locale (pas toISOString, qui bascule sur UTC et peut décaler le jour affiché).
export const toDateKey = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const loadHabitLog = (): HabitLog => {
  try {
    return JSON.parse(localStorage.getItem(LOG_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
};

export const saveHabitLog = (log: HabitLog): void => {
  localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(log));
};

export const isHabitDone = (log: HabitLog, dateKey: string, habitId: string): boolean =>
  (log[dateKey] || []).includes(habitId);

export const toggleHabit = (log: HabitLog, dateKey: string, habitId: string): HabitLog => {
  const dayList = log[dateKey] || [];
  const nextDayList = dayList.includes(habitId)
    ? dayList.filter((id) => id !== habitId)
    : [...dayList, habitId];
  const next = { ...log, [dateKey]: nextDayList };
  if (nextDayList.length === 0) delete next[dateKey];
  return next;
};

export const dayRatio = (log: HabitLog, dateKey: string, totalHabits: number): number =>
  totalHabits === 0 ? 0 : (log[dateKey]?.length || 0) / totalHabits;

// Lundi -> dimanche de la semaine contenant `reference`.
export const getWeekDates = (reference: Date = new Date()): Date[] => {
  const day = reference.getDay(); // 0 = dimanche
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(reference);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() + mondayOffset);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};

export interface HeatmapDay {
  date: Date;
  dateKey: string;
  ratio: number;
}

// Grille orientée semaines en colonnes (style heatmap de contributions), de la plus ancienne
// à la plus récente, alignée sur des semaines lundi->dimanche complètes.
export const computeHeatmapWeeks = (
  log: HabitLog,
  weeksCount: number,
  totalHabits: number,
  today: Date = new Date()
): HeatmapDay[][] => {
  const [currentMonday] = getWeekDates(today);
  const weeks: HeatmapDay[][] = [];
  for (let w = weeksCount - 1; w >= 0; w--) {
    const weekMonday = new Date(currentMonday);
    weekMonday.setDate(currentMonday.getDate() - w * 7);
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekMonday);
      d.setDate(weekMonday.getDate() + i);
      const dateKey = toDateKey(d);
      return { date: d, dateKey, ratio: dayRatio(log, dateKey, totalHabits) };
    });
    weeks.push(days);
  }
  return weeks;
};

// Jours consécutifs (en remontant depuis aujourd'hui, ou hier si rien n'est encore coché
// aujourd'hui) avec au moins une habitude cochée.
export const computeStreak = (log: HabitLog, today: Date = new Date()): number => {
  let streak = 0;
  const cursor = new Date(today);
  cursor.setHours(0, 0, 0, 0);

  if (!(log[toDateKey(cursor)]?.length > 0)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (log[toDateKey(cursor)]?.length > 0) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

// Même logique que computeStreak mais pour une habitude précise.
export const computeHabitStreak = (log: HabitLog, habitId: string, today: Date = new Date()): number => {
  let streak = 0;
  const cursor = new Date(today);
  cursor.setHours(0, 0, 0, 0);

  if (!isHabitDone(log, toDateKey(cursor), habitId)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (isHabitDone(log, toDateKey(cursor), habitId)) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

// Taux de réussite d'une habitude sur les `days` derniers jours (aujourd'hui inclus).
export const computeHabitCompletionRate = (
  log: HabitLog,
  habitId: string,
  days: number,
  today: Date = new Date()
): number => {
  let done = 0;
  const cursor = new Date(today);
  cursor.setHours(0, 0, 0, 0);
  for (let i = 0; i < days; i++) {
    if (isHabitDone(log, toDateKey(cursor), habitId)) done++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return done / days;
};

// Habitude avec le meilleur taux de réussite sur `days` jours — undefined si aucune n'a jamais
// été cochée sur la période (rien à mettre en avant).
export const computeBestHabit = (
  log: HabitLog,
  habits: HabitDefinition[],
  days: number,
  today: Date = new Date()
): { habit: HabitDefinition; rate: number } | undefined => {
  let best: { habit: HabitDefinition; rate: number } | undefined;
  for (const habit of habits) {
    const rate = computeHabitCompletionRate(log, habit.id, days, today);
    if (rate > 0 && (!best || rate > best.rate)) {
      best = { habit, rate };
    }
  }
  return best;
};

// % de réussite de la semaine en cours, uniquement sur les jours déjà écoulés (lundi -> aujourd'hui),
// pour ne pas pénaliser artificiellement avec les jours futurs.
export const computeWeekCompletionRate = (
  log: HabitLog,
  totalHabits: number,
  today: Date = new Date()
): number => {
  if (totalHabits === 0) return 0;
  const weekDates = getWeekDates(today);
  const todayKey = toDateKey(today);
  const elapsedDays = weekDates.filter((d) => toDateKey(d) <= todayKey);
  if (elapsedDays.length === 0) return 0;
  const totalDone = elapsedDays.reduce((sum, d) => sum + (log[toDateKey(d)]?.length || 0), 0);
  return totalDone / (elapsedDays.length * totalHabits);
};

// ---------------------------------------------------------------------------------------------
// Habitudes "metric" (poids, sommeil...) : une valeur numérique par jour au lieu d'une coche,
// stockées séparément du HabitLog booléen (formes différentes : nombre vs liste d'ids).
// ---------------------------------------------------------------------------------------------

export type MetricLog = Record<string /* dateKey */, Record<string /* habitId */, number>>;

const METRIC_STORAGE_KEY = 'habitTrackerMetricLog';

export const loadMetricLog = (): MetricLog => {
  try {
    return JSON.parse(localStorage.getItem(METRIC_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
};

export const saveMetricLog = (log: MetricLog): void => {
  localStorage.setItem(METRIC_STORAGE_KEY, JSON.stringify(log));
};

export const getMetricValue = (log: MetricLog, dateKey: string, habitId: string): number | undefined =>
  log[dateKey]?.[habitId];

export const setMetricValue = (
  log: MetricLog,
  dateKey: string,
  habitId: string,
  value: number
): MetricLog => ({
  ...log,
  [dateKey]: { ...(log[dateKey] || {}), [habitId]: value },
});

export const clearMetricValue = (log: MetricLog, dateKey: string, habitId: string): MetricLog => {
  if (!log[dateKey] || !(habitId in log[dateKey])) return log;
  const { [habitId]: _removed, ...restOfDay } = log[dateKey];
  const next = { ...log };
  if (Object.keys(restOfDay).length === 0) {
    delete next[dateKey];
  } else {
    next[dateKey] = restOfDay;
  }
  return next;
};

export interface MetricEntry {
  dateKey: string;
  value: number;
}

// Historique trié chronologiquement (plus ancien -> plus récent) pour une habitude 'metric'.
export const getMetricHistory = (log: MetricLog, habitId: string): MetricEntry[] =>
  Object.entries(log)
    .filter(([, day]) => typeof day[habitId] === 'number')
    .map(([dateKey, day]) => ({ dateKey, value: day[habitId] }))
    .sort((a, b) => a.dateKey.localeCompare(b.dateKey));

// Moyenne glissante sur les `windowSize` DERNIÈRES ENTRÉES SAISIES (pas les derniers jours civils
// — si on ne pèse pas tous les jours, moyenner sur des jours civils inclurait des trous).
export const computeRollingAverage = (
  history: MetricEntry[],
  windowSize: number = 10
): number | undefined => {
  if (history.length === 0) return undefined;
  const window = history.slice(-windowSize);
  return window.reduce((sum, e) => sum + e.value, 0) / window.length;
};

// Note de qualité du sommeil sur 10, basée sur l'écart aux ~8h recommandées (8h = 10/10, chaque
// heure d'écart -2 points). Heuristique simple, pas une recommandation médicale.
export const computeSleepScore = (hours: number): number => {
  const raw = 10 - Math.abs(hours - 8) * 2;
  return Math.max(0, Math.min(10, Math.round(raw * 10) / 10));
};

// Le sommeil se saisit en heures + minutes (7h30, pas "7.5") ; converti en heures décimales pour
// le stockage/les moyennes/le score, reconverti pour l'affichage.
export const hmToHours = (hours: number, minutes: number): number =>
  Math.round((hours + minutes / 60) * 100) / 100;

export const hoursToHM = (decimalHours: number): { hours: number; minutes: number } => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return minutes === 60 ? { hours: hours + 1, minutes: 0 } : { hours, minutes };
};

// Formatage d'affichage selon l'unité : "7h30" pour le sommeil (pas de décimale peu parlante),
// un nombre à décimales pour le poids (jusqu'au gramme, sans zéros superflus — 82.4 pas 82.400).
export const formatMetricValue = (value: number, unit?: string): string => {
  if (unit === 'h') {
    const { hours, minutes } = hoursToHM(value);
    return minutes > 0 ? `${hours}h${String(minutes).padStart(2, '0')}` : `${hours}h`;
  }
  const rounded = Math.round(value * 1000) / 1000;
  return `${parseFloat(rounded.toFixed(3))}${unit ? ` ${unit}` : ''}`;
};

export type ChartGranularity = 'day' | 'week' | 'month';

export interface ChartPoint {
  label: string;
  value: number;
}

const parseDateKey = (dateKey: string): Date => {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const MONTH_LABELS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

const formatDayLabel = (dateKey: string): string => {
  const d = parseDateKey(dateKey);
  return `${d.getDate()}/${d.getMonth() + 1}`;
};

const weekBucketKey = (dateKey: string): string => toDateKey(getWeekDates(parseDateKey(dateKey))[0]);

const formatWeekLabel = (bucketKey: string): string => {
  const d = parseDateKey(bucketKey);
  return `${d.getDate()}/${d.getMonth() + 1}`;
};

const monthBucketKey = (dateKey: string): string => dateKey.slice(0, 7); // "YYYY-MM"

const formatMonthLabel = (bucketKey: string): string => {
  const [, m] = bucketKey.split('-').map(Number);
  return MONTH_LABELS[m - 1];
};

// Regroupe l'historique brut (une entrée par jour saisi) par jour/semaine/mois pour l'affichage
// du graphique — semaine/mois moyennent les valeurs du groupe plutôt que de n'en garder qu'une.
export const aggregateMetricHistory = (
  history: MetricEntry[],
  granularity: ChartGranularity
): ChartPoint[] => {
  if (granularity === 'day') {
    return history.map((h) => ({ label: formatDayLabel(h.dateKey), value: h.value }));
  }

  const bucketKeyFor = granularity === 'week' ? weekBucketKey : monthBucketKey;
  const formatLabel = granularity === 'week' ? formatWeekLabel : formatMonthLabel;

  const buckets = new Map<string, number[]>();
  history.forEach((h) => {
    const key = bucketKeyFor(h.dateKey);
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(h.value);
  });

  return Array.from(buckets.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, values]) => ({
      label: formatLabel(key),
      value: values.reduce((sum, v) => sum + v, 0) / values.length,
    }));
};
