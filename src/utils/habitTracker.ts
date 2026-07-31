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
  | 'coffee';

export interface HabitDefinition {
  id: string;
  label: string;
  icon: HabitIconKey;
}

export const ICON_KEYS: HabitIconKey[] = [
  'dumbbell', 'droplet', 'moon', 'salad', 'wind', 'book', 'sun', 'heart', 'brain', 'coffee',
];

// Habitudes par défaut, utilisées pour amorcer la liste au tout premier lancement — ensuite
// la liste vit dans le localStorage et l'utilisateur peut l'éditer (ajout/suppression).
const DEFAULT_HABITS: HabitDefinition[] = [
  { id: 'training', label: 'Entraînement', icon: 'dumbbell' },
  { id: 'hydration', label: 'Hydratation', icon: 'droplet' },
  { id: 'sleep', label: 'Sommeil', icon: 'moon' },
  { id: 'nutrition', label: 'Nutrition', icon: 'salad' },
  { id: 'mobility', label: 'Étirements', icon: 'wind' },
];

export type HabitLog = Record<string, string[]>;

const DEFS_STORAGE_KEY = 'habitTrackerDefinitions';
const LOG_STORAGE_KEY = 'habitTrackerLog';

export const loadHabitDefinitions = (): HabitDefinition[] => {
  try {
    const saved = JSON.parse(localStorage.getItem(DEFS_STORAGE_KEY) || 'null');
    if (Array.isArray(saved) && saved.length > 0) return saved;
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
