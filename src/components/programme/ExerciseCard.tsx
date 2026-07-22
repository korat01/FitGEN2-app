import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Dumbbell, Sparkles, Check, X } from 'lucide-react';
import { useSounds } from '@/utils/sounds';

type ExerciseType = 'echauffement' | 'travail' | 'accessoire';

const TYPE_META: Record<ExerciseType, {
  label: string;
  icon: React.ReactNode;
  accentClass: string;
  iconWrapClass: string;
}> = {
  echauffement: {
    label: 'Échauffement',
    icon: <Flame className="w-4 h-4" />,
    accentClass: 'bg-white/15',
    iconWrapClass: 'bg-white/10 text-muted-foreground border-white/10',
  },
  travail: {
    label: 'Travail',
    icon: <Dumbbell className="w-5 h-5" />,
    accentClass: 'gradient-primary',
    iconWrapClass: 'bg-primary/15 text-primary border-primary/30 shadow-[0_0_16px_hsl(var(--primary)/0.35)]',
  },
  accessoire: {
    label: 'Accessoire',
    icon: <Sparkles className="w-4 h-4" />,
    accentClass: 'bg-secondary/40',
    iconWrapClass: 'bg-secondary/15 text-secondary border-secondary/30',
  },
};

const inferType = (exercise: any): ExerciseType | null => {
  if (exercise.type === 'echauffement' || exercise.type === 'travail' || exercise.type === 'accessoire') {
    return exercise.type;
  }
  if (typeof exercise.nom === 'string' && exercise.nom.includes('(échauffement)')) return 'echauffement';
  return null;
};

interface ExerciseCardProps {
  exercise: any;
  isCompleted?: boolean;
  isSuccess?: boolean;
  /** Si fourni, affiche les boutons de validation compacts (jamais sur l'échauffement). */
  onValidate?: (success: boolean) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, isCompleted, isSuccess, onValidate }) => {
  const type = inferType(exercise);
  const meta = type ? TYPE_META[type] : null;
  const isWarmup = type === 'echauffement';
  const isMainLift = type === 'travail';
  const { playSuccess, playError } = useSounds();

  const sets = exercise.progression?.sets ?? exercise.series;
  const reps = exercise.progression?.reps ?? exercise.reps;
  const poids = exercise.progression?.poids ?? exercise.poids;
  const repos = exercise.progression?.repos ?? exercise.repos;
  const pourcentage = typeof exercise.pourcentage === 'number' && exercise.pourcentage > 0 ? exercise.pourcentage : null;
  const nomAffiche = typeof exercise.nom === 'string' ? exercise.nom.replace(' (échauffement)', '') : exercise.nom;

  const hasMuscles = Array.isArray(exercise.muscles) && exercise.muscles.length > 0;
  const hasEquipement = Array.isArray(exercise.equipement) && exercise.equipement.length > 0;

  const canValidate = !!onValidate && !isWarmup;

  const handleValidate = (success: boolean) => {
    if (success) playSuccess(); else playError();
    onValidate?.(success);
  };

  return (
    <Card
      className={`glass-card rounded-xl overflow-hidden transition-all duration-200 ${
        isCompleted
          ? isSuccess
            ? 'border-green-500/40 bg-green-500/5'
            : 'border-destructive/40 bg-destructive/5'
          : isWarmup
          ? 'border-white/10'
          : isMainLift
          ? 'border-primary/30 hover:border-primary/50 hover:shadow-[0_0_24px_hsl(var(--primary)/0.15)]'
          : 'border-white/10 hover:border-secondary/30'
      }`}
    >
      <div className="flex">
        {/* Barre d'accent — identifie le type de série d'un coup d'œil */}
        <div className={`w-1 shrink-0 ${meta?.accentClass || 'bg-white/10'}`} />

        <div className="flex-1 min-w-0">
          <CardContent className={isWarmup ? 'p-3' : 'p-4'}>
            <div className="flex items-center gap-3">
              {meta && (
                <div className={`shrink-0 rounded-xl border flex items-center justify-center ${isWarmup ? 'w-8 h-8' : 'w-11 h-11'} ${meta.iconWrapClass}`}>
                  {meta.icon}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className={`truncate font-semibold ${isWarmup ? 'text-sm text-muted-foreground' : 'text-base text-foreground'}`}>
                    {nomAffiche}
                  </h4>
                </div>
                {meta && !isWarmup && (
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{meta.label}</span>
                )}
              </div>

              {/* Poids en vedette */}
              <div className="text-right shrink-0">
                <div className="flex items-baseline gap-1 justify-end">
                  <span className={`font-black tabular-nums ${isWarmup ? 'text-lg text-foreground/80' : 'text-2xl text-foreground'}`}>
                    {poids}
                  </span>
                  <span className="text-xs text-muted-foreground">kg</span>
                </div>
                {pourcentage && (
                  <span className="text-[10px] font-medium text-secondary tabular-nums">{pourcentage}% du max</span>
                )}
              </div>
            </div>

            {/* Séries / reps / repos */}
            <div className={`flex items-center gap-4 ${isWarmup ? 'mt-2 pl-11' : 'mt-3 pl-14'}`}>
              <div className="text-xs">
                <span className="text-muted-foreground">Séries </span>
                <span className="font-semibold text-foreground tabular-nums">{sets}</span>
              </div>
              <div className="text-xs">
                <span className="text-muted-foreground">Reps </span>
                <span className="font-semibold text-foreground tabular-nums">{reps}</span>
              </div>
              <div className="text-xs">
                <span className="text-muted-foreground">Repos </span>
                <span className="font-semibold text-foreground tabular-nums">{repos}</span>
              </div>
            </div>

            {(hasMuscles || hasEquipement) && (
              <div className="text-xs text-muted-foreground mt-3 pl-14 space-y-0.5">
                {hasMuscles && <p><strong className="text-foreground/70">Muscles :</strong> {exercise.muscles.join(', ')}</p>}
                {hasEquipement && <p><strong className="text-foreground/70">Équipement :</strong> {exercise.equipement.join(', ')}</p>}
              </div>
            )}

            {exercise.conseils && (
              <div className="mt-3 ml-14 p-3 rounded-lg bg-accent/10 border border-accent/25">
                <p className="text-sm text-foreground"><strong className="text-accent">Conseil :</strong> {exercise.conseils}</p>
              </div>
            )}

            {/* Validation compacte — un seul rang de boutons, jamais une carte dupliquée en dessous.
                Les deux boutons restent cliquables même après validation pour corriger un mauvais clic. */}
            {canValidate && (
              <div className={`flex items-center justify-end gap-2 ${isMainLift ? 'mt-3 pl-14' : 'mt-3 pl-14'}`}>
                {isCompleted && (
                  <span className={`text-[11px] font-medium mr-auto ${isSuccess ? 'text-green-400' : 'text-destructive'}`}>
                    {isSuccess ? '+50 XP' : '+10 XP'}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleValidate(true)}
                  className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-full text-xs font-medium transition-all duration-150 ${
                    isCompleted && isSuccess
                      ? 'bg-green-500 text-white'
                      : 'bg-white/5 text-muted-foreground hover:bg-green-500/15 hover:text-green-400 border border-white/10'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  Réussi
                </button>
                <button
                  type="button"
                  onClick={() => handleValidate(false)}
                  className={`inline-flex items-center gap-1 h-7 px-2.5 rounded-full text-xs font-medium transition-all duration-150 ${
                    isCompleted && !isSuccess
                      ? 'bg-destructive text-white'
                      : 'bg-white/5 text-muted-foreground hover:bg-destructive/15 hover:text-destructive border border-white/10'
                  }`}
                >
                  <X className="w-3.5 h-3.5" />
                  Raté
                </button>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default ExerciseCard;
