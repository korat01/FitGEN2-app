import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { statsInputClass } from '@/utils/statsChartTheme';
import { Plus, Award, BarChart3, Dumbbell, Weight, Clock, Zap } from 'lucide-react';

interface PerformanceManagerProps {
  performances: any[];
  userRank: any;
  onAdd: (performance: { discipline: string; value: string; date: string }) => void;
  onDelete: (id: string) => void;
}

const isFreeRun = (discipline: string) => discipline === 'course';

const DISCIPLINE_LABELS: Record<string, string> = {
  bench: 'Développé couché',
  squat: 'Squat',
  deadlift: 'Soulevé de terre',
  '5k': '5 km',
  course: 'Course',
  pullups: 'Tractions',
  pushups: 'Pompes',
};

const DISCIPLINE_UNITS: Record<string, string> = {
  bench: 'kg',
  squat: 'kg',
  deadlift: 'kg',
  '5k': 'min',
  course: 'km/h',
  pullups: 'reps',
  pushups: 'reps',
};

export const PerformanceManager: React.FC<PerformanceManagerProps> = ({
  performances,
  userRank,
  onAdd,
  onDelete,
}) => {
  const [form, setForm] = useState({
    discipline: '',
    value: '',
    distanceKm: '',
    timeMin: '',
    date: new Date().toISOString().split('T')[0],
  });

  const resetForm = () =>
    setForm({ discipline: '', value: '', distanceKm: '', timeMin: '', date: new Date().toISOString().split('T')[0] });

  const handleSubmit = () => {
    if (!form.discipline) return;

    if (isFreeRun(form.discipline)) {
      const distance = parseFloat(form.distanceKm);
      const time = parseFloat(form.timeMin);
      if (!distance || !time) return;
      const speedKmh = distance / (time / 60);
      onAdd({ discipline: form.discipline, value: String(speedKmh), date: form.date });
      resetForm();
      return;
    }

    if (!form.value) return;
    onAdd({ discipline: form.discipline, value: form.value, date: form.date });
    resetForm();
  };

  return (
    <div className="space-y-5 md:space-y-6">
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl flex items-center gap-2">
            <Plus className="w-5 h-5 text-secondary" />
            Ajouter une performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="discipline" className="text-sm font-medium text-muted-foreground">Discipline</label>
              <select
                id="discipline"
                value={form.discipline}
                onChange={(e) => setForm((prev) => ({ ...prev, discipline: e.target.value }))}
                className={statsInputClass}
              >
                <option value="">Sélectionner une discipline</option>
                <option value="bench">Développé couché</option>
                <option value="squat">Squat</option>
                <option value="deadlift">Soulevé de terre</option>
                <option value="course">Course (distance libre)</option>
                <option value="pullups">Tractions</option>
                <option value="pushups">Pompes</option>
              </select>
            </div>
            {isFreeRun(form.discipline) ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="distanceKm" className="text-sm font-medium text-muted-foreground">Distance (km)</label>
                  <Input
                    type="number"
                    id="distanceKm"
                    value={form.distanceKm}
                    onChange={(e) => setForm((prev) => ({ ...prev, distanceKm: e.target.value }))}
                    className={statsInputClass}
                    placeholder="Ex: 5, 10, 21.1"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="timeMin" className="text-sm font-medium text-muted-foreground">Temps (min)</label>
                  <Input
                    type="number"
                    id="timeMin"
                    value={form.timeMin}
                    onChange={(e) => setForm((prev) => ({ ...prev, timeMin: e.target.value }))}
                    className={statsInputClass}
                    placeholder="Ex: 25, 45, 90"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <label htmlFor="value" className="text-sm font-medium text-muted-foreground">Valeur</label>
                <Input
                  type="number"
                  id="value"
                  value={form.value}
                  onChange={(e) => setForm((prev) => ({ ...prev, value: e.target.value }))}
                  className={statsInputClass}
                  placeholder="Ex: 100, 4, 10"
                />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium text-muted-foreground">Date</label>
              <Input
                type="date"
                id="date"
                value={form.date}
                onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                className={statsInputClass}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSubmit} className="w-full gradient-primary text-white font-semibold h-11">
                Ajouter la performance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary" />
            Décomposition du score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Force', value: userRank?.breakdown?.force || 0, icon: Weight, color: 'text-red-400' },
              { label: 'Endurance', value: userRank?.breakdown?.endurance || 0, icon: Clock, color: 'text-blue-400' },
              { label: 'Calisthénie', value: userRank?.breakdown?.calisthenics || 0, icon: Dumbbell, color: 'text-purple-400' },
              { label: 'Explosivité', value: userRank?.breakdown?.explosivite || 0, icon: Zap, color: 'text-green-400' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="surface-panel-sm p-3 md:p-4 flex items-center justify-between min-h-[52px]">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Icon className={`w-4 h-4 shrink-0 ${color}`} /> {label}
                </span>
                <span className={`font-bold tabular-nums ${color}`}>{value}</span>
              </div>
            ))}
          </div>
          {typeof userRank?.wilksScore === 'number' && (
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Score Wilks (référence) : <span className="font-semibold text-foreground">{userRank.wilksScore}</span> pts
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-secondary" />
            Vos performances ({performances.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {performances.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Dumbbell className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg">Aucune performance enregistrée</p>
              <p className="text-sm">Ajoutez votre première performance ci-dessus</p>
            </div>
          ) : (
            <div className="space-y-2">
              {performances.map((perf) => (
                <div
                  key={perf.id}
                  className="surface-panel flex items-center justify-between gap-3 p-3 md:p-4 min-h-[56px] rounded-xl transition-colors hover:border-primary/30"
                >
                  <div className="min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {DISCIPLINE_LABELS[perf.discipline] || perf.discipline}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isFreeRun(perf.discipline) ? Number(perf.value).toFixed(1) : perf.value} {DISCIPLINE_UNITS[perf.discipline] || 'kg'} · {new Date(perf.date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(perf.id)}
                    className="shrink-0 h-9 text-red-400 border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
                  >
                    Supprimer
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
