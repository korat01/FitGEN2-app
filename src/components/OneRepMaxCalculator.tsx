import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calculator } from 'lucide-react';
import { estimateOneRepMax, estimateOneRepMaxFromRPE, buildPercentageTable, MAX_RELIABLE_REPS } from '@/utils/oneRepMax';

const LIFTS = [
  { value: 'squat', label: 'Squat' },
  { value: 'bench', label: 'Développé Couché' },
  { value: 'deadlift', label: 'Soulevé de Terre' },
];

const RPE_OPTIONS = [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1];

const RPE_HINTS: Record<number, string> = {
  10: 'Échec — impossible de faire une rep de plus',
  9.5: 'Peut-être 1 rep de plus, pas sûr',
  9: '1 répétition en réserve',
  8.5: '1 à 2 répétitions en réserve',
  8: '2 répétitions en réserve',
  7.5: '2 à 3 répétitions en réserve',
  7: '3 répétitions en réserve',
  6.5: '3 à 4 répétitions en réserve',
  6: '4 répétitions en réserve',
  5.5: 'Effort modéré, large réserve',
  5: 'Effort modéré',
  4.5: 'Effort léger à modéré',
  4: 'Effort léger',
  3.5: 'Effort léger',
  3: 'Effort très léger',
  2.5: 'Effort minime',
  2: 'Effort très faible (échauffement)',
  1.5: 'Quasi aucun effort',
  1: 'Aucun effort (barre à vide)',
};

export const OneRepMaxCalculator: React.FC = () => {
  const [lift, setLift] = useState('squat');
  const [weight, setWeight] = useState<number>(100);
  const [reps, setReps] = useState<number>(5);
  const [rpe, setRpe] = useState<number>(10);

  const repsCappedWarning = reps > MAX_RELIABLE_REPS;

  const rpeEstimate = useMemo(
    () => estimateOneRepMaxFromRPE(weight || 0, reps || 1, rpe),
    [weight, reps, rpe]
  );
  // Epley/Brzycki restent affichées à titre de recoupement (elles supposent implicitement un
  // effort maximal, donc surtout pertinentes quand le RPE choisi est proche de 10).
  const formulaEstimate = useMemo(() => estimateOneRepMax(weight || 0, reps || 1), [weight, reps]);
  const table = useMemo(() => buildPercentageTable(rpeEstimate.oneRepMax), [rpeEstimate.oneRepMax]);

  return (
    <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          Calculateur de 1RM
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Entrez le poids, les répétitions et le RPE (difficulté ressentie) d'une série pour estimer votre charge maximale sur une répétition.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Mouvement</label>
            <Select value={lift} onValueChange={setLift}>
              <SelectTrigger className="h-11 glass-card border-2 border-white/15 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card border-0 shadow-xl rounded-xl">
                {LIFTS.map((l) => (
                  <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Poids (kg)</label>
            <Input
              type="number"
              min={0}
              step={2.5}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="h-11 glass-card border-2 border-white/15 rounded-xl text-lg font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Répétitions</label>
            <Input
              type="number"
              min={1}
              max={20}
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
              className="h-11 glass-card border-2 border-white/15 rounded-xl text-lg font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">RPE</label>
            <Select value={String(rpe)} onValueChange={(v) => setRpe(Number(v))}>
              <SelectTrigger className="h-11 glass-card border-2 border-white/15 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card border-0 shadow-xl rounded-xl">
                {RPE_OPTIONS.map((r) => (
                  <SelectItem key={r} value={String(r)}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-xs text-muted-foreground -mt-2">
          RPE {rpe} : {RPE_HINTS[rpe]}
        </p>

        {!rpeEstimate.reliable && (
          <p className="text-xs text-yellow-400">
            En dessous de RPE 6 (4+ répétitions en réserve), le ressenti ne suffit plus à évaluer précisément le max — estimation indicative seulement.
          </p>
        )}

        {repsCappedWarning && (
          <p className="text-xs text-yellow-400">
            Au-delà de {MAX_RELIABLE_REPS} répétitions, l'estimation devient peu fiable — calculée ici sur la base de {MAX_RELIABLE_REPS} reps.
          </p>
        )}

        {/* Résultat en vedette — basé sur le RPE (plus précis qu'Epley/Brzycki dès que ce n'était pas un effort maximal) */}
        <div className="rounded-2xl bg-gradient-to-r from-primary/15 to-secondary/15 border border-primary/25 p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">1RM estimé (via RPE)</p>
          <p className="text-4xl font-black text-foreground tabular-nums">{rpeEstimate.oneRepMax}<span className="text-lg text-muted-foreground font-medium"> kg</span></p>
          <p className="text-xs text-muted-foreground mt-1">
            {reps} rep{reps > 1 ? 's' : ''} @ RPE {rpe} ≈ {rpeEstimate.pctUsed}% du 1RM · Epley {formulaEstimate.epley}kg · Brzycki {formulaEstimate.brzycki}kg
          </p>
        </div>

        {/* Table des pourcentages */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Table des charges par %1RM</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {table.map((row) => (
              <div
                key={row.pct}
                className={`rounded-xl border p-3 ${row.pct >= 90 ? 'border-destructive/30 bg-destructive/5' : 'border-white/10 bg-white/[0.03]'}`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-secondary">{row.pct}%</span>
                  <span className="text-lg font-bold text-foreground tabular-nums">{row.weight}<span className="text-xs text-muted-foreground font-normal"> kg</span></span>
                </div>
                <span className="text-[10px] text-muted-foreground">{row.zone}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OneRepMaxCalculator;
