import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SelectableTile } from '@/components/profile/SelectableTile';
import { Target, GraduationCap, Dumbbell, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { PROGRAM_TYPE_LABELS, PROGRAM_TYPE_DAY_RANGE, type ProgramType, type MainLift } from '@/utils/powerlifting';

const DAYS_OF_WEEK = [
  { key: 'lundi', label: 'Lundi' },
  { key: 'mardi', label: 'Mardi' },
  { key: 'mercredi', label: 'Mercredi' },
  { key: 'jeudi', label: 'Jeudi' },
  { key: 'vendredi', label: 'Vendredi' },
  { key: 'samedi', label: 'Samedi' },
  { key: 'dimanche', label: 'Dimanche' },
];

const MAIN_LIFTS: Array<{ key: MainLift; label: string }> = [
  { key: 'squat', label: 'Squat' },
  { key: 'bench', label: 'Bench Press' },
  { key: 'deadlift', label: 'Deadlift' },
];

const MAX_SPE_TARGETS = 2;

// Descriptions courtes (une ligne) pour rester cohérent avec les autres SelectableTile de l'app
// (cf. ProfileSummary) — celles-ci sont tronquées au-delà d'une ligne, donc pas de phrases longues.
const TYPE_DESCRIPTIONS: Record<ProgramType, string> = {
  classique: 'Vagues progressives sur cycles de 4 semaines',
  apprentissage: 'Charge qui augmente à chaque séance',
  spe: 'Choisis 1 ou 2 mouvements à spécialiser',
};

type Step = 'type' | 'targets' | 'classique-spe' | 'days';

interface NewProgramModalProps {
  onClose: () => void;
  onConfirm: (type: ProgramType, trainingDays: string[], speTargets?: MainLift[]) => void;
}

// Wizard : type de programme, puis (si "Spé") mouvement(s) à spécialiser, puis jours d'entraînement
// (bornés selon le type choisi). Header + footer restent fixes et seule la zone du milieu scroll —
// pense mobile : le bouton d'action principal doit toujours rester visible sans avoir à scroller.
// La génération réelle (vérif des perfs, semaine de test, dispatch vers le bon générateur) se fait
// côté appelant (Programme.tsx) via src/utils/powerlifting — ce modal ne fait que collecter le choix.
export const NewProgramModal: React.FC<NewProgramModalProps> = ({ onClose, onConfirm }) => {
  const [step, setStep] = useState<Step>('type');
  const [selectedType, setSelectedType] = useState<ProgramType | null>(null);
  const [selectedTargets, setSelectedTargets] = useState<MainLift[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const range = selectedType ? PROGRAM_TYPE_DAY_RANGE[selectedType] : null;
  const isSpe = selectedType === 'spe';
  const isClassique = selectedType === 'classique';
  const canProceedFromType = !!selectedType;
  const canProceedFromTargets = selectedTargets.length >= 1 && selectedTargets.length <= MAX_SPE_TARGETS;
  const canConfirm = !!range && selectedDays.length >= range.min && selectedDays.length <= range.max;

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  const toggleTarget = (lift: MainLift) => {
    setSelectedTargets((prev) =>
      prev.includes(lift) ? prev.filter((l) => l !== lift) : prev.length < MAX_SPE_TARGETS ? [...prev, lift] : prev
    );
  };

  const handleTypeSelect = (type: ProgramType) => {
    setSelectedType(type);
    // Un changement de type change les bornes de jours autorisés : on retire les jours qui ne
    // rentreraient plus dans la nouvelle fourchette max, pour éviter un choix devenu invalide.
    const newRange = PROGRAM_TYPE_DAY_RANGE[type];
    setSelectedDays((prev) => prev.slice(0, newRange.max));
    if (type !== 'spe') setSelectedTargets([]);
  };

  const goToDaysStep = () => setStep('days');
  const goFromTypeStep = () => setStep(isSpe ? 'targets' : isClassique ? 'classique-spe' : 'days');
  const goBackFromDays = () => setStep(isSpe ? 'targets' : isClassique ? 'classique-spe' : 'type');

  const title =
    step === 'type'
      ? 'Nouveau programme'
      : step === 'targets'
      ? 'Spé — quels mouvements ?'
      : step === 'classique-spe'
      ? 'Spécialisation (optionnel)'
      : selectedType
      ? PROGRAM_TYPE_LABELS[selectedType]
      : 'Nouveau programme';

  return (
    <Dialog open onOpenChange={(next) => { if (!next) onClose(); }}>
      <DialogContent className="w-[calc(100%-1.5rem)] max-w-lg max-h-[88vh] p-0 gap-0 rounded-2xl flex flex-col overflow-hidden">
        <DialogHeader className="p-4 pr-10 border-b border-white/10 shrink-0 space-y-0">
          <DialogTitle className="text-base md:text-lg font-bold text-foreground flex items-center gap-2 text-left">
            <Dumbbell className="w-5 h-5 text-primary shrink-0" />
            <span className="truncate">{title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {step === 'type' && (
            <>
              <p className="text-sm text-muted-foreground">Quel type de programme voulez-vous générer ?</p>

              <SelectableTile
                layout="horizontal"
                icon={<Target className="w-5 h-5" />}
                label={PROGRAM_TYPE_LABELS.classique}
                description={TYPE_DESCRIPTIONS.classique}
                selected={selectedType === 'classique'}
                onClick={() => handleTypeSelect('classique')}
                gradient="from-primary to-secondary"
              />
              <SelectableTile
                layout="horizontal"
                icon={<GraduationCap className="w-5 h-5" />}
                label={PROGRAM_TYPE_LABELS.apprentissage}
                description={TYPE_DESCRIPTIONS.apprentissage}
                selected={selectedType === 'apprentissage'}
                onClick={() => handleTypeSelect('apprentissage')}
                gradient="from-green-500 to-emerald-500"
              />
              <SelectableTile
                layout="horizontal"
                icon={<Dumbbell className="w-5 h-5" />}
                label={PROGRAM_TYPE_LABELS.spe}
                description={TYPE_DESCRIPTIONS.spe}
                selected={selectedType === 'spe'}
                onClick={() => handleTypeSelect('spe')}
                gradient="from-red-500 to-orange-500"
              />
            </>
          )}

          {step === 'targets' && (
            <>
              <p className="text-sm text-muted-foreground">
                Choisis 1 ou 2 mouvements à spécialiser
                <span className="ml-1 font-medium text-foreground">({selectedTargets.length}/{MAX_SPE_TARGETS})</span>
                — le(s) reste(nt) en entretien allégé, pas d'inquiétude.
              </p>

              <div className="space-y-2">
                {MAIN_LIFTS.map(({ key, label }) => (
                  <SelectableTile
                    key={key}
                    layout="horizontal"
                    icon={<Dumbbell className="w-5 h-5" />}
                    label={label}
                    selected={selectedTargets.includes(key)}
                    onClick={() => toggleTarget(key)}
                    disabled={!selectedTargets.includes(key) && selectedTargets.length >= MAX_SPE_TARGETS}
                    gradient="from-red-500 to-orange-500"
                  />
                ))}
              </div>
            </>
          )}

          {step === 'classique-spe' && (
            <>
              <p className="text-sm text-muted-foreground">
                Optionnel : mets 1 ou 2 mouvements en priorité sur les jours au-delà des 3 jours de base
                <span className="ml-1 font-medium text-foreground">({selectedTargets.length}/{MAX_SPE_TARGETS})</span>.
                Sans choix, l'ordre par défaut (bench puis squat puis deadlift) est utilisé.
              </p>

              <div className="space-y-2">
                {MAIN_LIFTS.map(({ key, label }) => (
                  <SelectableTile
                    key={key}
                    layout="horizontal"
                    icon={<Dumbbell className="w-5 h-5" />}
                    label={label}
                    selected={selectedTargets.includes(key)}
                    onClick={() => toggleTarget(key)}
                    disabled={!selectedTargets.includes(key) && selectedTargets.length >= MAX_SPE_TARGETS}
                    gradient="from-primary to-secondary"
                  />
                ))}
              </div>
            </>
          )}

          {step === 'days' && range && (
            <>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 shrink-0" />
                <p>
                  Entre {range.min} et {range.max} jours
                  <span className="ml-1 font-medium text-foreground">({selectedDays.length}/{range.max})</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <SelectableTile
                    key={day.key}
                    icon={<Calendar className="w-4 h-4" />}
                    label={day.label}
                    selected={selectedDays.includes(day.key)}
                    onClick={() => toggleDay(day.key)}
                    disabled={!selectedDays.includes(day.key) && selectedDays.length >= range.max}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 p-4 border-t border-white/10 shrink-0">
          {step === 'type' && (
            <Button
              onClick={goFromTypeStep}
              disabled={!canProceedFromType}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white"
            >
              Continuer
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          {step === 'targets' && (
            <>
              <Button variant="outline" onClick={() => setStep('type')} className="border-2 border-white/15">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <Button
                onClick={goToDaysStep}
                disabled={!canProceedFromTargets}
                className="flex-1 bg-gradient-to-r from-primary to-secondary text-white"
              >
                Continuer
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          )}
          {step === 'classique-spe' && (
            <>
              <Button variant="outline" onClick={() => setStep('type')} className="border-2 border-white/15">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <Button
                onClick={goToDaysStep}
                className="flex-1 bg-gradient-to-r from-primary to-secondary text-white"
              >
                {selectedTargets.length > 0 ? 'Continuer' : 'Passer / Continuer'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          )}
          {step === 'days' && (
            <>
              <Button variant="outline" onClick={goBackFromDays} className="border-2 border-white/15">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <Button
                onClick={() => selectedType && onConfirm(selectedType, selectedDays, (isSpe || isClassique) ? selectedTargets : undefined)}
                disabled={!canConfirm}
                className="flex-1 bg-gradient-to-r from-primary to-secondary text-white"
              >
                Générer mon programme
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewProgramModal;
