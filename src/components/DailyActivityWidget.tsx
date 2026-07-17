import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Footprints, MapPin, Flame, Plus } from 'lucide-react';

const STORAGE_KEY = 'dailyActivity';
const STEPS_GOAL = 10000;
const STRIDE_METERS = 0.78;
const KCAL_PER_STEP_AT_70KG = 0.04;

const getTodayKey = () => new Date().toISOString().slice(0, 10);

const loadTodaySteps = (): number => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && saved.date === getTodayKey()) return saved.steps || 0;
  } catch {
    // ignore
  }
  return 0;
};

const saveTodaySteps = (steps: number) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: getTodayKey(), steps }));
};

interface DailyActivityWidgetProps {
  weightKg?: number;
}

export const DailyActivityWidget: React.FC<DailyActivityWidgetProps> = ({ weightKg = 75 }) => {
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    setSteps(loadTodaySteps());
  }, []);

  const addSteps = (amount: number) => {
    setSteps((prev) => {
      const next = Math.max(prev + amount, 0);
      saveTodaySteps(next);
      return next;
    });
  };

  const distanceKm = (steps * STRIDE_METERS) / 1000;
  const calories = Math.round(steps * KCAL_PER_STEP_AT_70KG * (weightKg / 70));
  const progressPercent = Math.min((steps / STEPS_GOAL) * 100, 100);

  const stats = [
    {
      label: 'Pas',
      value: steps.toLocaleString('fr-FR'),
      icon: Footprints,
      iconBg: 'bg-primary/15 border-primary/30 text-primary',
    },
    {
      label: 'Distance',
      value: `${distanceKm.toFixed(2)} km`,
      icon: MapPin,
      iconBg: 'bg-secondary/15 border-secondary/30 text-secondary',
    },
    {
      label: 'Calories',
      value: `${calories} kcal`,
      icon: Flame,
      iconBg: 'bg-accent/15 border-accent/30 text-accent',
    },
  ];

  return (
    <Card className="glass-card border-primary/20 card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <Footprints className="w-5 h-5 text-primary" />
            Activité du jour
          </span>
          <span className="text-sm font-medium text-muted-foreground tabular-nums">
            {Math.round(progressPercent)}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <Progress value={progressPercent} size="lg" variant="glow" aria-label="Objectif de pas quotidien" />

        <div className="grid grid-cols-3 gap-3">
          {stats.map(({ label, value, icon: Icon, iconBg }) => (
            <div
              key={label}
              className="rounded-xl bg-white/5 border border-white/10 p-3 text-center animate-fade-in"
            >
              <div className={`w-9 h-9 mx-auto mb-2 rounded-lg border flex items-center justify-center ${iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-base font-semibold text-foreground tabular-nums truncate">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          {[1000, 2000, 5000].map((amount) => (
            <Button
              key={amount}
              size="sm"
              variant="outline"
              className="border-primary/30 hover:bg-primary/15 text-xs"
              onClick={() => addSteps(amount)}
            >
              <Plus className="w-3 h-3 mr-1" />
              {amount.toLocaleString('fr-FR')}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyActivityWidget;
