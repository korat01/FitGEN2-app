import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import {
  Dumbbell, Droplet, Moon, Salad, Wind, BookOpen, Sun, Heart, Brain, Coffee,
  Flame, Check, Plus, X, Pencil,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  loadHabitDefinitions,
  saveHabitDefinitions,
  addHabitDefinition,
  removeHabitDefinition,
  toDateKey,
  loadHabitLog,
  saveHabitLog,
  isHabitDone,
  toggleHabit,
  getWeekDates,
  computeStreak,
  computeHabitStreak,
  computeBestHabit,
  ICON_KEYS,
  type HabitLog,
  type HabitDefinition,
  type HabitIconKey,
} from '@/utils/habitTracker';

const ICON_MAP: Record<HabitIconKey, React.ComponentType<{ className?: string }>> = {
  dumbbell: Dumbbell,
  droplet: Droplet,
  moon: Moon,
  salad: Salad,
  wind: Wind,
  book: BookOpen,
  sun: Sun,
  heart: Heart,
  brain: Brain,
  coffee: Coffee,
};

const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const INSIGHT_WINDOW_DAYS = 30;
const MAX_HABITS = 8;

export const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<HabitDefinition[]>([]);
  const [log, setLog] = useState<HabitLog>({});
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newIcon, setNewIcon] = useState<HabitIconKey>('dumbbell');
  const today = useMemo(() => new Date(), []);
  const todayKey = toDateKey(today);

  useEffect(() => {
    setHabits(loadHabitDefinitions());
    setLog(loadHabitLog());
  }, []);

  const weekDates = useMemo(() => getWeekDates(today), [today]);
  const streak = useMemo(() => computeStreak(log, today), [log, today]);
  const bestHabit = useMemo(
    () => computeBestHabit(log, habits, INSIGHT_WINDOW_DAYS, today),
    [log, habits, today]
  );

  const handleToggle = (dateKey: string, habitId: string) => {
    if (dateKey > todayKey) return;
    const next = toggleHabit(log, dateKey, habitId);
    setLog(next);
    saveHabitLog(next);
  };

  const handleAddHabit = () => {
    if (!newLabel.trim()) return;
    const next = addHabitDefinition(habits, newLabel, newIcon);
    setHabits(next);
    saveHabitDefinitions(next);
    setNewLabel('');
    setNewIcon('dumbbell');
    setIsAdding(false);
  };

  const handleRemoveHabit = (id: string) => {
    const next = removeHabitDefinition(habits, id);
    setHabits(next);
    saveHabitDefinitions(next);
  };

  return (
    <Card className="glass-card border-primary/20 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg md:text-xl font-bold text-foreground flex items-center gap-3">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            Habitudes
          </CardTitle>
          <div className="flex items-center gap-2 shrink-0">
            {streak > 0 && (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/15 border border-secondary/25 text-secondary font-semibold text-xs">
                <Flame className="w-3.5 h-3.5" />
                {streak}
              </div>
            )}
            <button
              type="button"
              onClick={() => setIsEditing((v) => !v)}
              aria-label="Modifier les habitudes"
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                isEditing ? 'bg-secondary/20 text-secondary' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Planning de la semaine : en-tête des jours, puis une rangée par habitude */}
        <div className="overflow-x-auto">
          <div className="min-w-[420px]">
            {/* En-tête jours */}
            <div className="grid grid-cols-[minmax(96px,1fr)_repeat(7,40px)] md:grid-cols-[minmax(120px,1fr)_repeat(7,44px)] gap-1.5 mb-2">
              <div />
              {weekDates.map((d) => {
                const dateKey = toDateKey(d);
                const isToday = dateKey === todayKey;
                return (
                  <div key={dateKey} className="flex flex-col items-center gap-0.5">
                    <span className={cn('text-[10px] font-medium', isToday ? 'text-secondary' : 'text-muted-foreground')}>
                      {DAY_LABELS[d.getDay() === 0 ? 6 : d.getDay() - 1]}
                    </span>
                    <span
                      className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold',
                        isToday ? 'bg-secondary/15 text-secondary' : 'text-muted-foreground/60'
                      )}
                    >
                      {d.getDate()}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Rangées habitudes */}
            <div className="space-y-1">
              {habits.map((habit) => {
                const Icon = ICON_MAP[habit.icon] || Dumbbell;
                const habitStreak = computeHabitStreak(log, habit.id, today);
                return (
                  <div
                    key={habit.id}
                    className="grid grid-cols-[minmax(96px,1fr)_repeat(7,40px)] md:grid-cols-[minmax(120px,1fr)_repeat(7,44px)] gap-1.5 items-center"
                  >
                    <div className="flex items-center gap-1.5 min-w-0 pr-1">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="text-xs font-medium text-foreground/80 truncate">{habit.label}</span>
                      {habitStreak > 1 && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-muted-foreground shrink-0">
                          <Flame className="w-2.5 h-2.5" />
                          {habitStreak}
                        </span>
                      )}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => handleRemoveHabit(habit.id)}
                          aria-label={`Supprimer ${habit.label}`}
                          className="ml-auto w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-500/10 shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {weekDates.map((d) => {
                      const dateKey = toDateKey(d);
                      const done = isHabitDone(log, dateKey, habit.id);
                      const isFuture = dateKey > todayKey;
                      return (
                        <button
                          key={dateKey}
                          type="button"
                          disabled={isFuture}
                          onClick={() => handleToggle(dateKey, habit.id)}
                          aria-label={`${habit.label} — ${dateKey}`}
                          className={cn(
                            'h-9 md:h-10 rounded-lg border transition-colors duration-150 active:scale-90 flex items-center justify-center',
                            done
                              ? 'bg-secondary/15 border-secondary/30'
                              : isFuture
                              ? 'border-white/5 bg-transparent cursor-not-allowed'
                              : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
                          )}
                        >
                          {done && <Check className="w-4 h-4 text-secondary" strokeWidth={2.5} />}
                        </button>
                      );
                    })}
                  </div>
                );
              })}

              {habits.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">Aucune habitude pour l'instant.</p>
              )}
            </div>
          </div>
        </div>

        {/* Ajout d'une habitude personnalisée */}
        {isAdding ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-3">
            <Input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Nom de l'habitude"
              maxLength={24}
              autoFocus
            />
            <div className="flex flex-wrap gap-2">
              {ICON_KEYS.map((key) => {
                const Icon = ICON_MAP[key];
                const selected = key === newIcon;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setNewIcon(key)}
                    className={cn(
                      'w-9 h-9 rounded-lg flex items-center justify-center border transition-colors',
                      selected
                        ? 'bg-gradient-to-br from-primary to-secondary border-transparent text-white'
                        : 'border-white/15 bg-white/5 text-muted-foreground hover:text-foreground hover:border-white/25'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddHabit}
                disabled={!newLabel.trim()}
                className="flex-1 h-9 rounded-lg gradient-primary text-white text-sm font-semibold disabled:opacity-50"
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={() => { setIsAdding(false); setNewLabel(''); }}
                className="px-4 h-9 rounded-lg border border-white/15 text-sm text-foreground/80 hover:bg-white/5"
              >
                Annuler
              </button>
            </div>
          </div>
        ) : (
          habits.length < MAX_HABITS && (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="w-full h-10 rounded-xl border border-dashed border-white/15 text-sm text-muted-foreground hover:text-foreground hover:border-white/30 hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter une habitude
            </button>
          )
        )}

        {bestHabit && (
          <p className="text-xs text-muted-foreground text-center">
            Meilleure habitude sur 30 jours : <span className="text-foreground font-medium">{bestHabit.habit.label}</span> ({Math.round(bestHabit.rate * 100)}%)
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default HabitTracker;
