import { describe, it, expect } from 'vitest';
import {
  toDateKey,
  toggleHabit,
  isHabitDone,
  dayRatio,
  getWeekDates,
  computeHeatmapWeeks,
  computeStreak,
  computeHabitStreak,
  computeHabitCompletionRate,
  computeBestHabit,
  computeWeekCompletionRate,
  addHabitDefinition,
  removeHabitDefinition,
  setMetricValue,
  clearMetricValue,
  getMetricValue,
  getMetricHistory,
  computeRollingAverage,
  computeSleepScore,
  aggregateMetricHistory,
  hmToHours,
  hoursToHM,
  formatMetricValue,
  type HabitLog,
  type HabitDefinition,
  type MetricLog,
} from './habitTracker';

const HABITS: HabitDefinition[] = [
  { id: 'training', label: 'Entraînement', icon: 'dumbbell' },
  { id: 'hydration', label: 'Hydratation', icon: 'droplet' },
];

describe('habitTracker', () => {
  it('toggleHabit ajoute puis retire une habitude pour une date donnée', () => {
    const dateKey = '2026-01-05';
    let log: HabitLog = {};
    log = toggleHabit(log, dateKey, 'training');
    expect(isHabitDone(log, dateKey, 'training')).toBe(true);
    log = toggleHabit(log, dateKey, 'training');
    expect(isHabitDone(log, dateKey, 'training')).toBe(false);
    expect(log[dateKey]).toBeUndefined();
  });

  it('dayRatio reflète la proportion d\'habitudes cochées sur le total fourni', () => {
    const dateKey = '2026-01-05';
    let log: HabitLog = {};
    log = toggleHabit(log, dateKey, HABITS[0].id);
    expect(dayRatio(log, dateKey, HABITS.length)).toBeCloseTo(1 / 2);
  });

  it('getWeekDates retourne 7 jours consécutifs du lundi au dimanche', () => {
    const wednesday = new Date(2026, 0, 7);
    const week = getWeekDates(wednesday);
    expect(week).toHaveLength(7);
    expect(week[0].getDay()).toBe(1);
    expect(week[6].getDay()).toBe(0);
    expect(toDateKey(week[0])).toBe('2026-01-05');
    expect(toDateKey(week[6])).toBe('2026-01-11');
  });

  it('computeHeatmapWeeks aligne la dernière semaine sur la semaine en cours', () => {
    const today = new Date(2026, 0, 7);
    const weeks = computeHeatmapWeeks({}, 4, HABITS.length, today);
    expect(weeks).toHaveLength(4);
    weeks.forEach((week) => expect(week).toHaveLength(7));
    const lastWeek = weeks[weeks.length - 1];
    expect(lastWeek[0].dateKey).toBe(toDateKey(getWeekDates(today)[0]));
  });

  it('computeStreak compte les jours consécutifs avec au moins une habitude cochée', () => {
    const today = new Date(2026, 0, 10);
    let log: HabitLog = {};
    [0, 1, 2].forEach((offset) => {
      const d = new Date(today);
      d.setDate(d.getDate() - offset);
      log = toggleHabit(log, toDateKey(d), 'training');
    });
    expect(computeStreak(log, today)).toBe(3);
  });

  it('computeStreak retombe à 0 si rien n\'est coché ni aujourd\'hui ni hier', () => {
    const today = new Date(2026, 0, 10);
    expect(computeStreak({}, today)).toBe(0);
  });

  it('computeHabitStreak isole le streak d\'une habitude précise (ignore les autres)', () => {
    const today = new Date(2026, 0, 10);
    let log: HabitLog = {};
    log = toggleHabit(log, toDateKey(today), 'training');
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    log = toggleHabit(log, toDateKey(twoDaysAgo), 'hydration'); // autre habitude, avant-hier seulement
    expect(computeHabitStreak(log, 'training', today)).toBe(1);
    // hydration : rien hier ni aujourd'hui -> la remontée s'arrête avant d'atteindre avant-hier
    expect(computeHabitStreak(log, 'hydration', today)).toBe(0);
  });

  it('computeHabitCompletionRate calcule le taux sur une fenêtre de jours', () => {
    const today = new Date(2026, 0, 10);
    let log: HabitLog = {};
    log = toggleHabit(log, toDateKey(today), 'training');
    expect(computeHabitCompletionRate(log, 'training', 10, today)).toBeCloseTo(1 / 10);
  });

  it('computeBestHabit retourne l\'habitude avec le meilleur taux, undefined si rien de coché', () => {
    const today = new Date(2026, 0, 10);
    expect(computeBestHabit({}, HABITS, 30, today)).toBeUndefined();

    let log: HabitLog = {};
    log = toggleHabit(log, toDateKey(today), 'hydration');
    const best = computeBestHabit(log, HABITS, 30, today);
    expect(best?.habit.id).toBe('hydration');
  });

  it('computeWeekCompletionRate ignore les jours futurs de la semaine', () => {
    // Mercredi : seuls lundi/mardi/mercredi comptent, pas jeudi->dimanche
    const wednesday = new Date(2026, 0, 7);
    let log: HabitLog = {};
    const [monday] = getWeekDates(wednesday);
    log = toggleHabit(log, toDateKey(monday), 'training');
    log = toggleHabit(log, toDateKey(monday), 'hydration');
    // 2/2 habitudes le lundi, 0/2 mardi et mercredi -> (2)/(3 jours * 2 habitudes) = 1/3
    expect(computeWeekCompletionRate(log, HABITS.length, wednesday)).toBeCloseTo(1 / 3);
  });

  it('addHabitDefinition / removeHabitDefinition gèrent la liste éditable', () => {
    const withNew = addHabitDefinition(HABITS, 'Lecture', 'book');
    expect(withNew).toHaveLength(3);
    expect(withNew[2].label).toBe('Lecture');
    const removed = removeHabitDefinition(withNew, withNew[2].id);
    expect(removed).toHaveLength(2);
  });

  it('setMetricValue / getMetricValue / clearMetricValue gèrent une valeur numérique par jour', () => {
    let log: MetricLog = {};
    log = setMetricValue(log, '2026-01-05', 'weight', 82.4);
    expect(getMetricValue(log, '2026-01-05', 'weight')).toBe(82.4);
    log = clearMetricValue(log, '2026-01-05', 'weight');
    expect(getMetricValue(log, '2026-01-05', 'weight')).toBeUndefined();
    expect(log['2026-01-05']).toBeUndefined();
  });

  it('getMetricHistory ne retourne que les entrées de l\'habitude demandée, triées par date', () => {
    let log: MetricLog = {};
    log = setMetricValue(log, '2026-01-07', 'weight', 81);
    log = setMetricValue(log, '2026-01-05', 'weight', 82);
    log = setMetricValue(log, '2026-01-06', 'sleep', 7.5); // autre habitude, ne doit pas apparaître
    const history = getMetricHistory(log, 'weight');
    expect(history).toEqual([
      { dateKey: '2026-01-05', value: 82 },
      { dateKey: '2026-01-07', value: 81 },
    ]);
  });

  it('computeRollingAverage moyenne les 10 DERNIÈRES ENTRÉES SAISIES, pas les 10 derniers jours civils', () => {
    const history = Array.from({ length: 12 }, (_, i) => ({ dateKey: `2026-01-${i + 1}`, value: i + 1 }));
    // Les 10 dernières entrées sont les valeurs 3..12 -> moyenne = 7.5
    expect(computeRollingAverage(history, 10)).toBeCloseTo(7.5);
    expect(computeRollingAverage([], 10)).toBeUndefined();
  });

  it('computeSleepScore donne 10/10 à 8h et baisse de 2 points par heure d\'écart, clampé à [0,10]', () => {
    expect(computeSleepScore(8)).toBe(10);
    expect(computeSleepScore(7)).toBe(8);
    expect(computeSleepScore(9)).toBe(8);
    expect(computeSleepScore(2)).toBe(0); // -12 bruts, clampé
    expect(computeSleepScore(13)).toBe(0);
  });

  it('aggregateMetricHistory regroupe par semaine/mois en moyennant les valeurs du groupe', () => {
    const history = [
      { dateKey: '2026-01-05', value: 10 }, // lundi semaine du 5
      { dateKey: '2026-01-06', value: 20 }, // même semaine
      { dateKey: '2026-02-02', value: 30 }, // mois différent
    ];
    const byDay = aggregateMetricHistory(history, 'day');
    expect(byDay).toHaveLength(3);

    const byWeek = aggregateMetricHistory(history, 'week');
    expect(byWeek).toHaveLength(2);
    expect(byWeek[0].value).toBeCloseTo(15); // moyenne de 10 et 20

    const byMonth = aggregateMetricHistory(history, 'month');
    expect(byMonth).toHaveLength(2);
    expect(byMonth[0].value).toBeCloseTo(15);
    expect(byMonth[1].value).toBeCloseTo(30);
  });

  it('hmToHours / hoursToHM convertissent heures+minutes <-> heures décimales', () => {
    expect(hmToHours(7, 30)).toBeCloseTo(7.5);
    expect(hmToHours(8, 0)).toBe(8);
    expect(hoursToHM(7.5)).toEqual({ hours: 7, minutes: 30 });
    expect(hoursToHM(8)).toEqual({ hours: 8, minutes: 0 });
    // Aller-retour sans dérive sur un cas comme 6h45
    const decimal = hmToHours(6, 45);
    expect(hoursToHM(decimal)).toEqual({ hours: 6, minutes: 45 });
  });

  it('formatMetricValue affiche le sommeil en "XhYY" et le poids en décimal sans zéros superflus', () => {
    expect(formatMetricValue(7.5, 'h')).toBe('7h30');
    expect(formatMetricValue(8, 'h')).toBe('8h');
    expect(formatMetricValue(82.4, 'kg')).toBe('82.4 kg');
    expect(formatMetricValue(82, 'kg')).toBe('82 kg');
    expect(formatMetricValue(82.45, 'kg')).toBe('82.45 kg');
  });
});
