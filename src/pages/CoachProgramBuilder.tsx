import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Plus, X, Search, CheckCircle2, Dumbbell, Clock, Ruler, Weight, Repeat, Timer, ChevronLeft, Download } from 'lucide-react';
import { getCoachClient, assignProgramToClient } from '@/utils/coachingData';
import { tousBlocs } from '@/utils/blocsExercices';
import { JOURS_SEMAINE, type JourSemaine, type AssignedProgram, type ProgramExercise } from '@/types/coaching';
import type { BlocExercice, SportTag } from '@/types/programme';

const JOUR_LABELS: Record<JourSemaine, string> = {
  lundi: 'Lundi', mardi: 'Mardi', mercredi: 'Mercredi', jeudi: 'Jeudi',
  vendredi: 'Vendredi', samedi: 'Samedi', dimanche: 'Dimanche',
};

/** Palette dédiée par sport pour repérer un exercice au premier coup d'œil dans la liste — voir
    aussi .simple-mode dans index.css qui neutralise ces teintes en mode épuré. */
const SPORT_TAG_META: Record<SportTag, { label: string; className: string }> = {
  power: { label: 'Power', className: 'sport-tag-power' },
  musculation: { label: 'Muscu', className: 'sport-tag-musculation' },
  marathon: { label: 'Marathon', className: 'sport-tag-marathon' },
  sprint: { label: 'Sprint', className: 'sport-tag-sprint' },
  crossfit: { label: 'Crossfit', className: 'sport-tag-crossfit' },
  calisthenics: { label: 'Calisthé.', className: 'sport-tag-calisthenics' },
  streetlifting: { label: 'Street', className: 'sport-tag-streetlifting' },
  mobilite: { label: 'Mobilité', className: 'sport-tag-mobilite' },
};

const ALL_SPORT_TAGS = Object.keys(SPORT_TAG_META) as SportTag[];

const SportBadges: React.FC<{ sports?: SportTag[]; size?: 'xs' | 'sm' }> = ({ sports, size = 'xs' }) => {
  if (!sports || sports.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {sports.map((s) => (
        <span
          key={s}
          className={`inline-flex items-center rounded-full border font-semibold ${SPORT_TAG_META[s].className} ${
            size === 'xs' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-0.5 text-[10px]'
          }`}
        >
          {SPORT_TAG_META[s].label}
        </span>
      ))}
    </div>
  );
};

/** Détermine quels champs de saisie ont du sens pour ce type d'exercice — un gainage se
    chronomètre, un exercice cardio se mesure en distance/temps, un exercice de force en
    séries/répétitions/charge. Évite de proposer "charge (kg)" pour des pompes au poids du corps. */
const fieldsForType = (type: string) => {
  if (type === 'cardio') return { distance: true, duree: true, series: false, reps: false, charge: false };
  if (type === 'gainage' || type === 'étirement') return { distance: false, duree: true, series: true, reps: false, charge: false };
  return { distance: false, duree: false, series: true, reps: true, charge: true };
};

const emptyDraft = () => ({ series: '3', repetitions: '10', charge: '0', dureeSecondes: '30', distanceMetres: '1000', reposSecondes: '90' });

const StepperField: React.FC<{
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  step?: number;
  min?: number;
  suffix?: string;
}> = ({ label, icon, value, onChange, step = 1, min = 0, suffix }) => {
  const num = Number(value) || 0;
  const bump = (delta: number) => onChange(String(Math.max(min, Math.round((num + delta) * 100) / 100)));
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
        {icon} {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => bump(-step)}
          className="w-10 h-10 rounded-xl surface-panel-sm flex items-center justify-center text-lg font-bold text-foreground/80 hover:text-foreground shrink-0 active:scale-95 transition-transform"
        >
          −
        </button>
        <div className="flex-1 relative">
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="text-center font-semibold h-10"
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => bump(step)}
          className="w-10 h-10 rounded-xl surface-panel-sm flex items-center justify-center text-lg font-bold text-foreground/80 hover:text-foreground shrink-0 active:scale-95 transition-transform"
        >
          +
        </button>
      </div>
    </div>
  );
};

const CoachProgramBuilder: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  // Sans id (route /coaching/programme) : programme "libre", pas rattaché à un coaché de l'app —
  // pour créer un programme à donner en PDF à quelqu'un qui n'a pas de compte. Le nom reste
  // éditable (utilisé seulement comme en-tête du PDF, rien n'est sauvegardé côté coaché).
  const isStandalone = !id;
  const [clientName, setClientName] = useState('');
  const [program, setProgram] = useState<AssignedProgram>({});
  const [activeDay, setActiveDay] = useState<JourSemaine>('lundi');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [sportFilter, setSportFilter] = useState<SportTag | 'all'>('all');
  const [pickedExercise, setPickedExercise] = useState<BlocExercice | null>(null);
  const [draft, setDraft] = useState(emptyDraft());
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (!id) return;
    const client = getCoachClient(id);
    if (client) {
      setClientName(client.name);
      setProgram(client.program || {});
    }
  }, [id]);

  const filteredExercises = useMemo(
    () => tousBlocs.filter((ex) =>
      ex.nom.toLowerCase().includes(exerciseSearch.toLowerCase()) &&
      (sportFilter === 'all' || ex.sports?.includes(sportFilter))
    ),
    [exerciseSearch, sportFilter]
  );

  const openPickerForNew = () => {
    setPickedExercise(null);
    setDraft(emptyDraft());
    setExerciseSearch('');
    setSportFilter('all');
    setIsPickerOpen(true);
  };

  const pickExercise = (ex: BlocExercice) => {
    setPickedExercise(ex);
    setDraft(emptyDraft());
  };

  const confirmAddExercise = () => {
    if (!pickedExercise) return;
    const fields = fieldsForType(pickedExercise.type);
    const entry: ProgramExercise = {
      id: `${pickedExercise.nom}-${Date.now()}`,
      nom: pickedExercise.nom,
      type: pickedExercise.type,
      ...(fields.series ? { series: Number(draft.series) || undefined } : {}),
      ...(fields.reps ? { repetitions: Number(draft.repetitions) || undefined } : {}),
      ...(fields.charge ? { charge: Number(draft.charge) || 0 } : {}),
      ...(fields.duree ? { dureeSecondes: Number(draft.dureeSecondes) || undefined } : {}),
      ...(fields.distance ? { distanceMetres: Number(draft.distanceMetres) || undefined } : {}),
      reposSecondes: Number(draft.reposSecondes) || undefined,
    };
    setProgram((prev) => ({ ...prev, [activeDay]: [...(prev[activeDay] || []), entry] }));
    setIsPickerOpen(false);
    setPickedExercise(null);
  };

  const removeExercise = (day: JourSemaine, exerciseId: string) => {
    setProgram((prev) => ({ ...prev, [day]: (prev[day] || []).filter((e) => e.id !== exerciseId) }));
  };

  const handleMarkProgram = () => {
    if (!id) return;
    assignProgramToClient(id, program);
    setJustSaved(true);
    window.setTimeout(() => navigate(`/coaching/${id}`), 900);
  };

  // jsPDF embarque html2canvas + DOMPurify (~180 Ko gzip) — chargé à la demande seulement au clic
  // sur "Télécharger en PDF", pas au chargement de la page (même logique que le scanner de
  // code-barres, voir Nutrition.tsx : sinon chaque visite de cette page paierait ce poids pour rien).
  const handleExportPdf = async () => {
    const { exportProgramToPdf } = await import('@/utils/pdfExport');
    exportProgramToPdf(clientName, program);
  };

  const dayExercises = program[activeDay] || [];
  const totalExercisesCount = JOURS_SEMAINE.reduce((acc, d) => acc + (program[d]?.length || 0), 0);

  const describeExercise = (ex: ProgramExercise): string => {
    const parts: string[] = [];
    if (ex.series) parts.push(`${ex.series} séries`);
    if (ex.repetitions) parts.push(`${ex.repetitions} reps`);
    if (ex.charge) parts.push(`${ex.charge} kg`);
    if (ex.dureeSecondes) parts.push(`${ex.dureeSecondes}s`);
    if (ex.distanceMetres) parts.push(`${ex.distanceMetres >= 1000 ? `${(ex.distanceMetres / 1000).toFixed(1)}km` : `${ex.distanceMetres}m`}`);
    if (ex.reposSecondes) parts.push(`repos ${ex.reposSecondes}s`);
    return parts.join(' · ');
  };

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-8 relative z-10 page-transition">
        <div className="space-y-6 stagger-animation">
          <Button onClick={() => navigate(isStandalone ? '/coaching' : `/coaching/${id}`)} variant="ghost" size="sm" className="text-muted-foreground -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isStandalone ? 'Coaching' : clientName}
          </Button>

          <div className="glass-card rounded-2xl p-5 space-y-3">
            <div>
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-secondary" />
                {isStandalone ? 'Nouveau programme' : `Programme de ${clientName}`}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {totalExercisesCount} exercice{totalExercisesCount > 1 ? 's' : ''} programmé{totalExercisesCount > 1 ? 's' : ''} sur la semaine
              </p>
            </div>
            {isStandalone && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Nom (optionnel, pour l'en-tête du PDF)</label>
                <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Ex: Julien" />
              </div>
            )}
          </div>

          {/* Sélecteur de jour */}
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {JOURS_SEMAINE.map((day) => {
              const count = program[day]?.length || 0;
              const active = activeDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`shrink-0 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    active
                      ? 'bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-[0_0_16px_hsl(var(--primary)/0.35)]'
                      : 'surface-panel-sm text-muted-foreground border-transparent hover:text-foreground'
                  }`}
                >
                  {JOUR_LABELS[day].slice(0, 3)}
                  {count > 0 && <span className="ml-1.5 opacity-80">({count})</span>}
                </button>
              );
            })}
          </div>

          {/* Exercices du jour sélectionné */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{JOUR_LABELS[activeDay]}</h2>

            {dayExercises.length === 0 && (
              <Card className="glass-card border-primary/20">
                <CardContent className="p-6 text-center text-muted-foreground text-sm">
                  Aucun exercice pour ce jour — ajoute-en un ci-dessous.
                </CardContent>
              </Card>
            )}

            {dayExercises.map((ex, index) => (
              <Card key={ex.id} className="glass-card border-primary/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground truncate">{ex.nom}</p>
                    <p className="text-xs text-secondary mt-0.5 font-medium">{describeExercise(ex)}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeExercise(activeDay, ex.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                    <X className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Button onClick={openPickerForNew} variant="outline" className="w-full border-2 border-dashed border-primary/30 hover:border-primary/50 h-12">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un exercice
            </Button>
          </div>

          <div className="flex gap-3">
            {!isStandalone && (
              <Button
                onClick={handleMarkProgram}
                disabled={totalExercisesCount === 0}
                className="flex-1 h-12 gradient-primary text-white font-semibold shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {justSaved ? 'Programme envoyé !' : 'Marquer programme'}
              </Button>
            )}
            <Button
              onClick={handleExportPdf}
              disabled={totalExercisesCount === 0}
              variant={isStandalone ? 'default' : 'outline'}
              className={isStandalone ? 'flex-1 h-12 gradient-primary text-white font-semibold shadow-lg' : 'h-12 border-primary/25 shrink-0'}
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger en PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog : choix de l'exercice puis saisie des paramètres */}
      <Dialog open={isPickerOpen} onOpenChange={setIsPickerOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {!pickedExercise ? (
            <>
              <DialogHeader>
                <DialogTitle>Choisir un exercice — {JOUR_LABELS[activeDay]}</DialogTitle>
              </DialogHeader>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 h-4 w-4" />
                <Input
                  placeholder="Rechercher un exercice..."
                  value={exerciseSearch}
                  onChange={(e) => setExerciseSearch(e.target.value)}
                  className="pl-9"
                  autoFocus
                />
              </div>

              {/* Filtre par sport */}
              <div className="flex gap-1.5 overflow-x-auto pb-3 -mx-1 px-1">
                <button
                  onClick={() => setSportFilter('all')}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    sportFilter === 'all'
                      ? 'bg-primary text-primary-foreground border-transparent'
                      : 'surface-panel-sm text-muted-foreground border-transparent hover:text-foreground'
                  }`}
                >
                  Tous
                </button>
                {ALL_SPORT_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSportFilter(tag)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      sportFilter === tag
                        ? `${SPORT_TAG_META[tag].className} ring-1 ring-inset ring-current`
                        : 'surface-panel-sm text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    {SPORT_TAG_META[tag].label}
                  </button>
                ))}
              </div>

              <div className="space-y-1.5">
                {filteredExercises.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-6">Aucun exercice ne correspond.</p>
                )}
                {filteredExercises.map((ex) => (
                  <button
                    key={ex.nom}
                    onClick={() => pickExercise(ex)}
                    className="w-full flex items-start gap-3 p-3.5 surface-panel-sm rounded-xl text-left hover:border-primary/40 border border-transparent transition-colors"
                  >
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <p className="text-sm font-semibold text-foreground truncate">{ex.nom}</p>
                      <p className="text-xs text-muted-foreground truncate">{ex.muscles_sollicités.join(', ')}</p>
                      <SportBadges sports={ex.sports} />
                    </div>
                    <span className="text-[10px] uppercase tracking-wide text-secondary shrink-0 mt-0.5">{ex.type}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <button
                  onClick={() => setPickedExercise(null)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-1 -ml-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Changer d'exercice
                </button>
                <DialogTitle>{pickedExercise.nom}</DialogTitle>
                <SportBadges sports={pickedExercise.sports} size="sm" />
              </DialogHeader>
              <div className="space-y-4">
                {(() => {
                  const fields = fieldsForType(pickedExercise.type);
                  return (
                    <>
                      {fields.series && (
                        <div className="grid grid-cols-2 gap-3">
                          <StepperField
                            label="Séries"
                            icon={<Repeat className="w-3.5 h-3.5" />}
                            value={draft.series}
                            onChange={(v) => setDraft({ ...draft, series: v })}
                            min={1}
                          />
                          {fields.reps && (
                            <StepperField
                              label="Répétitions"
                              icon={<Repeat className="w-3.5 h-3.5" />}
                              value={draft.repetitions}
                              onChange={(v) => setDraft({ ...draft, repetitions: v })}
                              min={1}
                            />
                          )}
                        </div>
                      )}
                      {fields.charge && (
                        <StepperField
                          label="Charge — 0 si poids du corps"
                          icon={<Weight className="w-3.5 h-3.5" />}
                          value={draft.charge}
                          onChange={(v) => setDraft({ ...draft, charge: v })}
                          step={2.5}
                          suffix="kg"
                        />
                      )}
                      {fields.duree && (
                        <StepperField
                          label="Durée"
                          icon={<Clock className="w-3.5 h-3.5" />}
                          value={draft.dureeSecondes}
                          onChange={(v) => setDraft({ ...draft, dureeSecondes: v })}
                          step={10}
                          min={1}
                          suffix="sec"
                        />
                      )}
                      {fields.distance && (
                        <StepperField
                          label="Distance"
                          icon={<Ruler className="w-3.5 h-3.5" />}
                          value={draft.distanceMetres}
                          onChange={(v) => setDraft({ ...draft, distanceMetres: v })}
                          step={100}
                          min={1}
                          suffix="m"
                        />
                      )}
                      <StepperField
                        label="Repos entre séries"
                        icon={<Timer className="w-3.5 h-3.5" />}
                        value={draft.reposSecondes}
                        onChange={(v) => setDraft({ ...draft, reposSecondes: v })}
                        step={15}
                        suffix="sec"
                      />
                    </>
                  );
                })()}

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" onClick={() => setPickedExercise(null)} className="flex-1">
                    Retour
                  </Button>
                  <Button onClick={confirmAddExercise} className="flex-1 gradient-primary text-white font-semibold">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoachProgramBuilder;
