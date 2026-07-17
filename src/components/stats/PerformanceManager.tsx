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

export const PerformanceManager: React.FC<PerformanceManagerProps> = ({
  performances,
  userRank,
  onAdd,
  onDelete,
}) => {
  const [form, setForm] = useState({
    discipline: '',
    value: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = () => {
    if (!form.discipline || !form.value) return;
    onAdd(form);
    setForm({ discipline: '', value: '', date: new Date().toISOString().split('T')[0] });
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
                <option value="5k">5km</option>
                <option value="pullups">Tractions</option>
              </select>
            </div>
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
                      {perf.discipline === 'bench' ? 'Développé couché' :
                       perf.discipline === 'squat' ? 'Squat' :
                       perf.discipline === 'deadlift' ? 'Soulevé de terre' :
                       perf.discipline === '5k' ? '5 km' :
                       perf.discipline === 'pullups' ? 'Tractions' : perf.discipline}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {perf.value} {perf.discipline === '5k' ? 'min' : 'kg'} · {new Date(perf.date).toLocaleDateString('fr-FR')}
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
