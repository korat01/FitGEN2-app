import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Award } from 'lucide-react';
import { getExerciseInfo } from '@/utils/exerciseInfo';

interface ExerciseInfoModalProps {
  nom: string;
  open: boolean;
  onClose: () => void;
}

// Fiche déclenchée par l'icône info sur chaque carte d'exercice — décrit le mouvement et, pour les
// 3 mouvements jugés en compétition (squat/bench/deadlift), des repères techniques inspirés des
// règles IPF. Les accessoires ont une description sans section règles (pas jugés en compétition).
export const ExerciseInfoModal: React.FC<ExerciseInfoModalProps> = ({ nom, open, onClose }) => {
  const info = getExerciseInfo(nom);

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-left">
            <span className="truncate">{nom}</span>
            {info?.isIPFLift && (
              <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-[11px] font-semibold">
                <Award className="w-3 h-3" />
                Mouvement IPF
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        {info ? (
          <div className="space-y-4">
            <p className="text-sm text-foreground/90">{info.description}</p>

            {info.tips && (
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/25">
                <p className="text-sm text-foreground">
                  <strong className="text-accent">Conseil :</strong> {info.tips}
                </p>
              </div>
            )}

            {info.isIPFLift && info.ipfRules && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                  Règles IPF (compétition)
                </p>
                <ul className="space-y-1.5">
                  {info.ipfRules.map((rule, i) => (
                    <li key={i} className="text-sm text-foreground/85 flex gap-2">
                      <span className="text-secondary shrink-0">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-muted-foreground italic">
                  Repères indicatifs — vérifiez toujours le règlement IPF en vigueur (powerlifting.sport) avant une compétition officielle.
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Pas de fiche détaillée pour cet exercice pour l'instant.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseInfoModal;
