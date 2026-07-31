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
  type HabitLog,
  type HabitDefinition,
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
});
