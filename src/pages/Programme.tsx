import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '../contexts/AuthContext';
import { useMobileDetection } from '../hooks/useMobileDetection';
import { useHunterMode } from '../hooks/useHunterMode';
import { useExerciseValidation } from '../contexts/ExerciseContext';
import { ExerciseCard } from '../components/programme/ExerciseCard';
import { 
  Dumbbell, 
  Play, 
  Clock, 
  Target, 
  Zap,
  Calendar,
  CalendarDays,
  List,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Activity,
  Timer,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
// Import direct du générateur (pas de lazy loading pour les fonctions utilitaires)
import { generateProgramme, adaptSessionToRecentFailure, adaptSessionToRecentDifficulty } from '../utils/programmeGenerator';
import { NewProgramModal } from '../components/programme/NewProgramModal';
import {
  createNewPowerliftingProgram,
  continueAfterTestWeek,
  type ProgramType,
  type PowerliftingProgramConfig,
  type GeneratedPowerliftingProgram,
  type MainLift,
} from '../utils/powerlifting';

// Fonction pour récupérer les 1RM réels de l'utilisateur (le programme travaille directement
// par rapport à ces maxs, il n'y a plus de "Training Max" intermédiaire)
const getUserMaxes = () => {
  const userPerformances = localStorage.getItem('userPerformances');
  if (!userPerformances) return null;

  try {
    const performances = JSON.parse(userPerformances);

    const getBestPerformance = (discipline: string) => {
      const perf = performances.filter((p: any) => p.discipline === discipline);
      return perf.length > 0 ? Math.max(...perf.map((p: any) => p.value)) : null;
    };

    const maxSquat = getBestPerformance('squat');
    const maxBench = getBestPerformance('bench');
    const maxDeadlift = getBestPerformance('deadlift');

    if (!maxSquat || !maxBench || !maxDeadlift) return null;

    return { maxSquat, maxBench, maxDeadlift };
  } catch (error) {
    console.error('Erreur lors du calcul des maxs:', error);
    return null;
  }
};

export const Programme: React.FC = () => {
  const { user } = useAuth();
  const { isMobile } = useMobileDetection();
  const { addValidation, getExerciseStatus, getSessionStatus, getSessionXP, validations, sessionRatings, addSessionRating, getSessionRating } = useExerciseValidation();
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
  const [difficultyRpe, setDifficultyRpe] = useState(5);
  const [ratedSessionId, setRatedSessionId] = useState<string | null>(null);
  const [programme, setProgramme] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTab, setCurrentTab] = useState<'today' | 'weekly' | 'planning'>('today');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isNewProgramModalOpen, setIsNewProgramModalOpen] = useState(false);
  const isPowerlifting = user?.sportClass === 'power';

  // Charger le programme existant
  useEffect(() => {
    console.log('🔄 Chargement du programme depuis localStorage...');
    const savedProgramme = localStorage.getItem('userProgramme');
    if (savedProgramme) {
      try {
        const parsedProgramme = JSON.parse(savedProgramme);
        console.log('📅 Programme chargé:', parsedProgramme);
        console.log('📊 Sessions dans le programme:', parsedProgramme.sessions?.length || 0);
        setProgramme(parsedProgramme);
      } catch (error) {
        console.error('❌ Erreur lors du chargement du programme:', error);
      }
    } else {
      console.log('❌ Aucun programme trouvé dans localStorage');
    }
  }, []);

  // Debug du composant
  useEffect(() => {
    console.log('=== DEBUG COMPOSANT PROGRAMME ===');
    console.log('User sportClass:', user.sportClass);
    console.log('Programme actuel:', programme);
    console.log('Nombre de sessions:', programme?.sessions?.length || 0);
    if (programme?.sessions) {
      console.log('Sessions:', programme.sessions.map(s => `${s.day}: ${s.nom}`));
    }
  }, [user, programme]);

  // Fonction pour générer un programme personnalisé selon le profil
  const handleGenerateProgramme = () => {
    console.log('🔴 Bouton cliqué !');
    console.log('👤 Utilisateur:', user);
    console.log('📅 Jours d\'entraînement:', user?.trainingDays);
    
    if (!user) {
      alert('❌ Vous devez être connecté');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      console.log('👤 Profil utilisateur COMPLET:', user);
      
      // Utiliser la nouvelle fonction de génération
      const generatedProgramme = generateProgramme(user as any);
      console.log('📅 Programme généré:', generatedProgramme);
      
      // Adapter le format pour l'affichage existant
      const adaptedProgramme = {
        id: generatedProgramme.id,
        nom: generatedProgramme.nom,
        dateDebut: new Date().toISOString(),
        sessions: generatedProgramme.sessions.map((session: any) => ({
          id: session.id,
          nom: session.nom,
          day: session.day || 'lundi', // Valeur par défaut
          phase: session.phase || 'Adaptation',
          intensity: session.intensity || 'Modérée',
          duration: session.duration || session.duree || 60,
          exercises: session.exercises || session.exercices || [],
          notes: session.notes || '',
          equipment: session.equipment || []
        })),
        userProfile: {
          sportClass: user.sportClass,
          level: (user as any).niveau || (user as any).generalLevel || 'intermediaire',
          weight: user.weight || 70,
          age: user.age || 25,
          sex: user.sex || 'male',
          trainingDays: user.trainingDays || ['lundi', 'mercredi', 'vendredi'],
          trainingMonths: user.trainingMonths || 3
        }
      };
      
      console.log('📅 Programme adapté:', adaptedProgramme);
      
      console.log('💾 Sauvegarde du programme dans localStorage...');
      localStorage.setItem('userProgramme', JSON.stringify(adaptedProgramme));
      
      console.log('🔄 Mise à jour du state programme...');
      setProgramme(adaptedProgramme);
      setIsGenerating(false);
      
      console.log('✅ Programme généré et sauvegardé !');
      console.log('📊 Sessions créées:', adaptedProgramme.sessions.map(s => `${s.day}: ${s.nom}`));
      
      alert(`🎉 Programme ${user.sportClass} généré avec succès !\n\n📅 ${adaptedProgramme.sessions.length} séances créées pour les jours :\n${user.trainingDays?.join(', ') || 'Non spécifiés'}\n\n✅ Vous pouvez maintenant voir vos entraînements dans les onglets "Hebdomadaire" et "Planning" !`);
    } catch (error) {
      console.error('❌ Erreur lors de la génération:', error);
      setIsGenerating(false);
      alert('❌ Erreur lors de la génération du programme');
    }
  };

  // Fonction pour régénérer
  const handleRegenerateProgramme = () => {
    const confirmRegenerate = confirm('🔄 Voulez-vous régénérer votre programme ?');
    if (confirmRegenerate) {
      handleGenerateProgramme();
    }
  };

  // Adapte un GeneratedPowerliftingProgram (nouveau système modulaire) au format déjà utilisé par
  // cette page (mêmes clés que l'ancien generateProgramme) — pour ne rien casser côté affichage.
  const toStoredProgramme = (
    generated: GeneratedPowerliftingProgram,
    config: PowerliftingProgramConfig,
    existingDateDebut?: string
  ) => ({
    id: generated.id,
    nom: generated.nom,
    dateDebut: existingDateDebut || new Date().toISOString(),
    sessions: generated.sessions,
    isTestWeek: !!generated.isTestWeek,
    powerliftingConfig: config,
    userProfile: {
      sportClass: 'power',
      trainingDays: config.trainingDays,
    },
  });

  // Nouveau système de création de programme powerlifting (type + jours choisis dans le modal) —
  // vérifie les perfs existantes, génère une semaine de test si besoin, sinon le programme complet.
  const handleNewPowerliftingProgram = (type: ProgramType, trainingDays: string[], speTargets?: MainLift[]) => {
    if (!user) return;
    setIsNewProgramModalOpen(false);
    setIsGenerating(true);

    try {
      const config: PowerliftingProgramConfig = {
        type,
        trainingDays,
        bodyweight: user.weight || 75,
        sex: user.sex === 'female' ? 'female' : 'male',
        speTargets,
      };

      const { program, missingLifts } = createNewPowerliftingProgram(config);
      const stored = toStoredProgramme(program, config);

      localStorage.setItem('userProgramme', JSON.stringify(stored));
      setProgramme(stored);
      setIsGenerating(false);

      if (missingLifts.length > 0) {
        alert(
          `📋 Aucune performance connue pour : ${missingLifts.join(', ')}.\n\nUne semaine de test a été générée pour estimer vos charges. Une fois vos résultats saisis dans "Stats", revenez ici et cliquez sur "Générer la suite du programme".`
        );
      } else {
        alert(`🎉 Programme "${program.nom}" généré avec succès !\n\n📅 ${stored.sessions.length} séances sur ${trainingDays.length} jours/semaine.`);
      }
    } catch (error) {
      console.error('❌ Erreur lors de la génération du programme powerlifting:', error);
      setIsGenerating(false);
      alert('❌ Erreur lors de la génération du programme');
    }
  };

  // Une fois la semaine de test complétée et les performances saisies dans Stats, génère le vrai
  // programme et le rattache à la suite (numérotation "Semaine 2", cf. spec) sans perdre la semaine 1.
  const handleContinueAfterTestWeek = () => {
    if (!programme?.powerliftingConfig) return;

    const testAsGenerated: GeneratedPowerliftingProgram = {
      id: programme.id,
      nom: programme.nom,
      description: '',
      duree: 1,
      sessions: programme.sessions,
      type: 'test',
      isTestWeek: true,
    };

    const result = continueAfterTestWeek(programme.powerliftingConfig, testAsGenerated);
    if (!result) {
      alert("⏳ Il manque encore au moins une performance (Squat, Bench ou Deadlift). Rendez-vous dans l'onglet Stats pour la renseigner, puis revenez ici.");
      return;
    }

    const stored = toStoredProgramme(result, programme.powerliftingConfig, programme.dateDebut);
    localStorage.setItem('userProgramme', JSON.stringify(stored));
    setProgramme(stored);
    alert('🎉 Votre programme complet est prêt, à partir de la Semaine 2 !');
  };

  // Un programme généré avant l'ajout des types d'exercice (échauffement/travail/accessoire)
  // n'aura pas ce champ — sans ça on ne peut pas distinguer "pas d'accessoires" d'un vieux format.
  const isStaleProgramme = !!programme && programme.sessions?.[0]?.exercises?.[0]?.type === undefined;

  // Fonction pour générer le calendrier
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const calendar = [];
    let currentDate = new Date(startDate);
    
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        weekDays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      calendar.push(weekDays);
      
      if (currentDate.getMonth() !== month && week > 3) break;
    }
    
    return calendar;
  };

  // Fonction pour obtenir le nom du jour
  const getDayName = (dayIndex: number) => {
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    return days[dayIndex];
  };

  // Fonction pour vérifier si c'est aujourd'hui
  const isToday = (date: Date) => {
      const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Fonction pour vérifier si c'est le mois actuel
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  // Numéro de semaine du programme (1, 2, 3...) calculé à partir de la vraie date de début —
  // continue de progresser d'un mois sur l'autre pour un programme de plusieurs semaines/cycles.
  // Fallback sur l'ancien calcul (semaine du mois, 1-5) pour les programmes générés avant l'ajout
  // de dateDebut, encore présents dans le localStorage de certains utilisateurs.
  const getWeekNumberForDate = (date: Date): number => {
    if (programme?.dateDebut) {
      const start = new Date(programme.dateDebut);
      start.setHours(0, 0, 0, 0);
      const startOfWeek = new Date(start);
      startOfWeek.setDate(start.getDate() - start.getDay());
      const diffDays = Math.floor((date.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24));
      return Math.floor(diffDays / 7) + 1;
    }
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstWeekday = firstDayOfMonth.getDay();
    const dayOfMonth = date.getDate();
    return Math.ceil((dayOfMonth + firstWeekday) / 7);
  };

  // Fonction pour obtenir la session d'une date
  const getSessionForDate = (date: Date) => {
    if (!programme) return null;

    const dayName = getDayName(date.getDay());
    const weekNumber = getWeekNumberForDate(date);

    // Trouver la session correspondant au jour ET à la semaine
    const session = programme.sessions.find((session: any) => {
      if (session.day !== dayName) return false;

      // Extraire le numéro de semaine du nom de la session
      const semaineMatch = session.nom.match(/Semaine (\d+)/);
      if (!semaineMatch) return false;

      const sessionWeek = parseInt(semaineMatch[1]);
      return sessionWeek === weekNumber;
    });
    
    // Si pas de session trouvée, créer une session de repos
    if (!session) {
      return {
        id: `repos-${dayName}`,
        nom: `Repos - ${dayName}`,
        day: dayName,
        phase: 'Repos',
        intensity: 'Repos',
        duration: 0,
        exercises: [],
        notes: 'Jour de récupération',
        equipment: [],
        isRestDay: true
      };
    }

    // Allège la séance à la volée si le dernier passage sur ce même mouvement a échoué — sans
    // jamais modifier le programme stocké, juste la version affichée. Si aucun échec ne déclenche
    // cet allègement, on regarde plutôt la note de difficulté (RPE) laissée par l'utilisateur.
    const afterFailureCheck = adaptSessionToRecentFailure(session, programme.sessions, validations);
    if (afterFailureCheck !== session) return afterFailureCheck;
    return adaptSessionToRecentDifficulty(session, programme.sessions, sessionRatings);
  };

  // Session d'aujourd'hui — résolue via getSessionForDate pour retomber sur la BONNE semaine
  // (et pas toujours la semaine 1, cf. bug historique de l'ancien getTodaysSession()).
  const todaySession = getSessionForDate(new Date());

  const [dismissedForSessionId, setDismissedForSessionId] = useState<string | null>(null);

  // Dès que TOUS les exercices notables (hors échauffement) de la séance du jour sont validés ET
  // qu'aucun n'est raté, on propose de noter la difficulté (RPE 1-10) pour ajuster la prochaine
  // séance sur ce mouvement. Un échec ne déclenche jamais ce popup : ce n'est pas une séance
  // "validée", et l'allègement automatique (adaptSessionToRecentFailure) s'en charge déjà.
  useEffect(() => {
    if (!todaySession || todaySession.isRestDay) return;
    const notable = todaySession.exercises.filter((e: any) => e.type !== 'echauffement');
    if (notable.length === 0) return;
    if (dismissedForSessionId === todaySession.id) return;
    if (getSessionRating(todaySession.id) != null) return;

    const today = new Date().toISOString().split('T')[0];
    const statuses = notable.map((e: any) => getExerciseStatus(e.id || e.nom, todaySession.id, today));
    const allCompleted = statuses.every((s: string) => s !== 'not-completed');
    const anyFailed = statuses.some((s: string) => s === 'failed');

    if (allCompleted && !anyFailed) {
      setDifficultyRpe(5);
      setIsDifficultyModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validations, todaySession?.id, dismissedForSessionId]);

  const handleSubmitDifficultyRating = () => {
    if (todaySession) {
      addSessionRating(todaySession.id, difficultyRpe);
      setDismissedForSessionId(todaySession.id);
    }
    setIsDifficultyModalOpen(false);
  };

  const handleDismissDifficultyRating = () => {
    if (todaySession) setDismissedForSessionId(todaySession.id);
    setIsDifficultyModalOpen(false);
  };

  // Libellé court et lisible du contenu d'une séance (au lieu du nom "Semaine X - Jour" qui ne dit
  // rien sur le contenu réel) : le mouvement principal du jour, "PR" / "PR SBD" / "SBD", ou "Repos".
  const getSessionFocusLabel = (session: any): string => {
    if (!session || session.isRestDay) return 'Repos';
    if (session.notes?.includes('PR SBD')) return 'PR SBD 🏆';
    if (session.notes?.includes('Séance PR')) return 'PR 🏆';
    if (session.notes?.includes('SBD combinée')) return 'SBD';
    const mainExercise = session.exercises?.find((e: any) => e.type === 'travail');
    if (mainExercise) return mainExercise.nom;
    return session.exercises?.[0]?.nom || session.phase || 'Séance';
  };

  // Fonction pour obtenir le nom du mois
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { month: 'long' });
  };

  // Fonction pour valider un exercice
  const handleExerciseValidation = (exerciseId: string, success: boolean) => {
    if (todaySession) {
      addValidation(exerciseId, todaySession.id, success);
    }
  };

  // Fonction pour ouvrir le modal de session
  const handleSessionClick = (session: any) => {
    setSelectedSession(session);
    setIsSessionModalOpen(true);
  };

  const calendar = generateCalendar();
  const { hunterPanelClass } = useHunterMode();

  const formatNumber = (value: number | undefined | null): string => {
    if (value === undefined || value === null || isNaN(value)) {
      return '0';
    }
    return value.toString();
  };

  return (
    <div className="p-4 md:p-6 overflow-x-hidden relative">
      <div className="mx-auto max-w-7xl space-y-4 md:space-y-8 relative z-10 page-transition stagger-animation">
        
        {/* Header Principal - VitalForce DA */}
        <div className={`relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-8 text-white shadow-[var(--shadow-glow-purple)] glass-card border border-primary/30 ${hunterPanelClass}`}>
          <div className="absolute inset-0 gradient-primary opacity-[var(--hero-overlay-opacity)]"></div>
          {/* Effets de particules VitalForce */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-secondary/20 to-transparent rounded-full -translate-y-32 translate-x-32 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/20 to-transparent rounded-full translate-y-24 -translate-x-24 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-x-16 -translate-y-16 animate-float"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2 md:space-y-4">
                <h1 className="text-xl md:text-5xl font-bold bg-gradient-to-r from-white via-secondary/70 to-primary/70 bg-clip-text text-transparent truncate">
                  🏋️ Mon Programme
                </h1>
                <p className="text-xs md:text-xl text-white/85 max-w-full md:max-w-2xl leading-relaxed">
                  Programme personnalisé basé sur vos performances
                </p>
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                  <div className="flex items-center gap-1.5 md:gap-2 bg-white/20 backdrop-blur-sm px-2 md:px-4 py-1 md:py-2 rounded-full">
                    <Activity className="w-3 h-3 md:w-5 md:h-5" />
                    <span className="font-semibold text-xs md:text-base truncate">Powerlifting</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 bg-white/20 backdrop-blur-sm px-2 md:px-4 py-1 md:py-2 rounded-full">
                    <Target className="w-3 h-3 md:w-5 md:h-5" />
                    <span className="font-semibold text-xs md:text-base truncate">5-3-1</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
                {programme && (
                  <Button
                    onClick={() => isPowerlifting ? setIsNewProgramModalOpen(true) : handleRegenerateProgramme()}
                    disabled={isGenerating}
                    className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Mise à jour...
                      </>
                    ) : isPowerlifting ? (
                      <>
                        <Dumbbell className="w-4 h-4 mr-2" />
                        Nouveau programme
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Mise à jour
                      </>
                    )}
                  </Button>
                )}
                <Button
                  onClick={() => isPowerlifting ? setIsNewProgramModalOpen(true) : handleGenerateProgramme()}
                  disabled={isGenerating}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Génération...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Générer Mon Programme
                    </>
                  )}
                </Button>
          </div>
        </div>
          </div>
            </div>

        {/* Programme obsolète : généré avant les dernières améliorations (accessoires, échauffement...) */}
        {isStaleProgramme && (
          <Card className="glass-card border-accent/30 bg-accent/5 rounded-2xl">
            <CardContent className="p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              <div className="flex-1">
                <p className="font-semibold text-foreground">Ton programme actuel date d'avant les dernières améliorations</p>
                <p className="text-sm text-muted-foreground mt-1">Régénère-le pour avoir l'échauffement, tous les accessoires (renfos) et la séance SBD à jour.</p>
              </div>
              <Button
                onClick={handleRegenerateProgramme}
                disabled={isGenerating}
                className="w-full md:w-auto gradient-primary text-white font-semibold shrink-0"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                Régénérer maintenant
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Semaine de test : les 3 maxes ne sont pas encore connus, on attend leur saisie dans Stats */}
        {programme?.isTestWeek && (
          <Card className="glass-card border-primary/30 bg-primary/5 rounded-2xl">
            <CardContent className="p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              <div className="flex-1">
                <p className="font-semibold text-foreground">📋 Semaine de test en cours</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Complétez cette semaine puis enregistrez vos résultats (Squat, Développé Couché, Soulevé de Terre) dans l'onglet Stats.
                  Votre programme complet se génère ensuite automatiquement à partir de la Semaine 2.
                </p>
              </div>
              <Button
                onClick={handleContinueAfterTestWeek}
                className="w-full md:w-auto gradient-primary text-white font-semibold shrink-0"
              >
                <Play className="w-4 h-4 mr-2" />
                Générer la suite du programme
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Message si pas de programme */}
        {!programme && (
          <Card className="border-0 shadow-xl glass-card border-primary/20 backdrop-blur-md border border-white/20 rounded-2xl">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🏋️</div>
              <h3 className="text-xl font-semibold text-foreground/90 mb-2">Aucun Programme Généré</h3>
              <p className="text-muted-foreground mb-6">Générez votre programme personnalisé pour commencer votre entraînement !</p>
              <Button
                onClick={() => isPowerlifting ? setIsNewProgramModalOpen(true) : handleGenerateProgramme()}
                disabled={isGenerating}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Génération...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    {isPowerlifting ? 'Nouveau programme' : 'Générer Mon Programme'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Message d'information si les jours d'entraînement ont changé */}
        {programme && user?.trainingDays && programme.sessions.length > 0 && (
          <Card className="bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/30 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-secondary flex items-center gap-2">
                <Target className="w-5 h-5" />
                Jours d'Entraînement Configurés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {user.trainingDays.map(day => (
                    <Badge key={day} className="bg-secondary/15 border border-secondary/25 text-secondary border-secondary">
                      {day}
                    </Badge>
                  ))}
                </div>
                <div className="bg-secondary/15 border border-secondary/25/50 border border-secondary/30 rounded-lg p-3">
                  <p className="text-secondary text-sm">
                    <strong>💡 Astuce :</strong> Si vous avez modifié vos jours d'entraînement, 
                    cliquez sur "Générer Mon Programme" pour créer un nouveau programme adapté à vos nouveaux jours.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Programme Généré */}
        {programme && (
          <>
            {/* Informations 1RM */}
            {(() => {
              const maxes = getUserMaxes();
              return maxes ? (
                <Card className="glass-card border-primary/20 rounded-2xl mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">Vos 1RM actuels</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="surface-panel rounded-lg p-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-1">Squat</p>
                          <p className="text-lg font-bold text-foreground">{maxes.maxSquat}kg</p>
                        </div>
                      </div>
                      <div className="surface-panel rounded-lg p-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-1">Bench</p>
                          <p className="text-lg font-bold text-foreground">{maxes.maxBench}kg</p>
                        </div>
                      </div>
                      <div className="surface-panel rounded-lg p-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-1">Deadlift</p>
                          <p className="text-lg font-bold text-foreground">{maxes.maxDeadlift}kg</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 rounded-lg surface-accent">
                      <p className="text-sm text-foreground/90">
                        <strong className="text-secondary">💡 Note :</strong> tous les pourcentages du programme sont calculés directement sur ces maxs (pas de Training Max intermédiaire), avec une petite progression à chaque nouveau cycle.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : null;
            })()}
          <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as any)} className="space-y-6">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} glass-card border-primary/20 backdrop-blur-md border border-white/20 shadow-lg rounded-xl`}>
              <TabsTrigger value="today" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white rounded-lg transition-all duration-200">
                <Calendar className="w-4 h-4" />
                Aujourd'hui
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white rounded-lg transition-all duration-200">
                <CalendarDays className="w-4 h-4" />
                Hebdomadaire
              </TabsTrigger>
              <TabsTrigger value="planning" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white rounded-lg transition-all duration-200">
                <List className="w-4 h-4" />
                Planning
              </TabsTrigger>
            </TabsList>

            {/* Onglet Aujourd'hui */}
            <TabsContent value="today">
              <Card className="glass-card border-primary/20 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-secondary" />
                        Programme du Jour
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {todaySession ? (
                    <div className="space-y-6">
                      {/* Informations de la session */}
                      <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-200/50">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-foreground">{todaySession.nom}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-500/15 border border-green-500/25 text-green-800 border-green-300">
                              {todaySession.intensity}
                            </Badge>
                            <Badge variant="secondary" className="bg-secondary/15 border border-secondary/25 text-secondary">
                              {todaySession.duration} min
                            </Badge>
                            <Badge variant="outline" className="bg-purple-500/15 border border-purple-500/25 text-purple-800 border-purple-300">
                              {todaySession.phase}
                            </Badge>
                    </div>
                  </div>
                  
                        {todaySession.notes && (
                          <div className="p-3 bg-secondary/10 rounded-lg mb-4">
                            <p className="text-sm text-secondary"><strong>Notes:</strong> {todaySession.notes}</p>
                    </div>
                        )}

                        {todaySession.equipment && todaySession.equipment.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-foreground/90 mb-2">Équipement requis:</p>
                            <div className="flex flex-wrap gap-2">
                              {todaySession.equipment.map((eq: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-muted-foreground">{eq}</Badge>
                              ))}
                    </div>
                    </div>
                        )}
                </div>

                      {/* Exercices avec validation */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-foreground">Exercices ({todaySession.exercises.length})</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-500/15 border border-green-500/25 text-green-800">
                              <Zap className="w-3 h-3 mr-1" />
                              +{getSessionXP(todaySession.id, new Date().toISOString().split('T')[0])} XP
                            </Badge>
                          </div>
                        </div>
                        {todaySession.exercises.map((exercise: any, index: number) => {
                          const today = new Date().toISOString().split('T')[0];
                          const exerciseStatus = getExerciseStatus(exercise.id || exercise.nom, todaySession.id, today);
                          const isCompleted = exerciseStatus !== 'not-completed';
                          const isSuccess = exerciseStatus === 'success';
                          const isWarmupExercise = exercise.type === 'echauffement' || (typeof exercise.nom === 'string' && exercise.nom.includes('(échauffement)'));

                          return (
                            <ExerciseCard
                              key={exercise.id || index}
                              exercise={exercise}
                              isCompleted={isCompleted}
                              isSuccess={isSuccess}
                              onValidate={
                                isWarmupExercise
                                  ? undefined
                                  : (success: boolean) => handleExerciseValidation(exercise.id || exercise.nom, success)
                              }
                            />
                          );
                        })}
                      </div>
                </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <RefreshCw className="w-12 h-12 text-white" />
                </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Jour de Repos</h3>
                      <p className="text-muted-foreground mb-6">Profitez de cette journée pour récupérer et vous détendre.</p>
                      <div className="p-4 bg-secondary/10 rounded-lg">
                        <p className="text-sm text-secondary">
                          💡 <strong>Conseil:</strong> La récupération est essentielle pour progresser.
                          Vous pouvez faire des étirements légers ou une marche.
                        </p>
                </div>
                    </div>
                  )}
              </CardContent>
            </Card>
            </TabsContent>

            {/* Onglet Hebdomadaire */}
            <TabsContent value="weekly">
              <Card className="glass-card border-primary/20 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                    <CalendarDays className="w-6 h-6 text-green-500" />
                    Planning Hebdomadaire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
                    {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map(day => {
                      // Date réelle de ce jour dans la semaine EN COURS (pas juste la 1ère occurrence
                      // de ce jour dans tout le programme, qui resterait figée sur la semaine 1 pour
                      // toujours) — passe par getSessionForDate pour bénéficier aussi de l'allègement
                      // automatique en cas d'échec au dernier passage sur le même mouvement.
                      const dayIndex: Record<string, number> = { dimanche: 0, lundi: 1, mardi: 2, mercredi: 3, jeudi: 4, vendredi: 5, samedi: 6 };
                      const now = new Date();
                      const startOfWeek = new Date(now);
                      startOfWeek.setHours(0, 0, 0, 0);
                      startOfWeek.setDate(now.getDate() - now.getDay());
                      const dateForDay = new Date(startOfWeek);
                      dateForDay.setDate(startOfWeek.getDate() + dayIndex[day]);

                      const resolvedSession = getSessionForDate(dateForDay);
                      const daySession = resolvedSession?.isRestDay ? null : resolvedSession;
                      const today = new Date().toISOString().split('T')[0];

                      const sessionStatus = daySession ? getSessionStatus(daySession.id, today) : 'not-started';
                      
                      return (
                        <Card
                          key={day}
                          className={`glass-card ${
                            daySession
                              ? sessionStatus === 'completed'
                                ? 'border-green-500/40 bg-green-500/5'
                                : sessionStatus === 'failed'
                                ? 'border-destructive/40 bg-destructive/5'
                                : sessionStatus === 'partial'
                                ? 'border-yellow-500/40 bg-yellow-500/5'
                                : 'border-primary/20'
                              : 'border-white/10'
                          } border-2 ${daySession ? 'cursor-pointer hover:border-primary/40 hover:shadow-lg transition-all duration-200' : 'cursor-default'}`}
                          onClick={() => daySession && handleSessionClick(daySession)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg capitalize">{day}</CardTitle>
                              {daySession && sessionStatus !== 'not-started' && (
                                <div className="flex items-center gap-1">
                                  {sessionStatus === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                                  {sessionStatus === 'failed' && <XCircle className="w-4 h-4 text-red-500" />}
                                  {sessionStatus === 'partial' && <Clock className="w-4 h-4 text-yellow-500" />}
                                </div>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent>
                            {daySession ? (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-green-500/15 border border-green-500/25 text-green-400">
                                    {daySession.intensity}
                                  </Badge>
                                  <Badge variant="secondary" className="bg-secondary/15 border border-secondary/25 text-secondary">
                                    {daySession.duration}min
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  <strong>{daySession.exercises?.length || 0}</strong> exercices
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  <strong>Phase:</strong> {daySession.phase}
                                </p>
                                {sessionStatus !== 'not-started' && (
                                  <div className="flex items-center justify-between">
                                    <Badge
                                      variant="outline"
                                      className={
                                        sessionStatus === 'completed'
                                          ? 'bg-green-500/15 border border-green-500/25 text-green-400'
                                          : sessionStatus === 'failed'
                                          ? 'bg-destructive/15 border border-destructive/25 text-destructive'
                                          : 'bg-yellow-500/15 border border-yellow-500/25 text-yellow-400'
                                      }
                                    >
                                      {sessionStatus === 'completed' && 'Terminé'}
                                      {sessionStatus === 'failed' && 'Échoué'}
                                      {sessionStatus === 'partial' && 'En cours'}
                                    </Badge>
                                    <Badge variant="outline" className="bg-primary/15 border border-primary/25 text-primary">
                                      <Zap className="w-3 h-3 mr-1" />
                                      +{getSessionXP(daySession.id, today)} XP
                                    </Badge>
                                  </div>
                                )}
                                <div className="text-xs text-muted-foreground">
                                  {daySession.exercises?.slice(0, 2).map((ex: any) => (
                                    <div key={ex.nom} className="flex items-center gap-1 mb-1">
                                      <span>{ex.nom}</span>
                                      {typeof ex.pourcentage === 'number' && ex.pourcentage > 0 && (
                                        <span className="text-secondary font-medium">({ex.pourcentage}% max)</span>
                                      )}
                                    </div>
                                  )) || 'Aucun exercice'}
                                  {daySession.exercises?.length > 2 && '...'}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-4">
                                <RefreshCw className="w-8 h-8 text-muted-foreground/70 mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground font-medium">Repos</p>
                                <p className="text-xs text-muted-foreground/70">Récupération</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                    </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Planning */}
            <TabsContent value="planning">
              <div className="space-y-8">
                {/* Header avec navigation */}
                <div className="surface-accent rounded-xl md:rounded-2xl p-3 md:p-6 border border-white/10 shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3 md:mb-4">
                    <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                      <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl md:rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">
                        <Calendar className="w-4 h-4 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-base md:text-2xl font-bold text-foreground truncate">Planning Mensuel</h2>
                        <p className="text-muted-foreground text-xs md:text-base truncate hidden sm:block">Calendrier d'entraînement</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 md:gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                        className="glass-card border border-white/15 text-foreground/90 hover:bg-white/10 shadow-sm px-2 md:px-4"
                      >
                        <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                      </Button>
                      <div className="glass-card border border-white/15 rounded-lg md:rounded-xl px-3 md:px-6 py-1.5 md:py-3 shadow-sm">
                        <h3 className="text-sm md:text-xl font-bold text-foreground truncate">
                          {getMonthName(currentMonth).slice(0, 3)} {currentMonth.getFullYear()}
                        </h3>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                        className="glass-card border border-white/15 text-foreground/90 hover:bg-white/10 shadow-sm px-2 md:px-4"
                      >
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Stats du programme - Compact Mobile */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <div className="glass-card border-primary/20 rounded-lg md:rounded-2xl p-2 md:p-4 border border-white/10 shadow-sm">
                      <div className="flex flex-col md:flex-row items-center md:gap-3">
                        <div className="w-6 h-6 md:w-10 md:h-10 bg-secondary/15 border border-secondary/25 rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-0">
                          <Activity className="w-3 h-3 md:w-5 md:h-5 text-secondary" />
                        </div>
                        <div className="text-center md:text-left">
                          <p className="text-base md:text-2xl font-bold text-foreground">{programme?.sessions.length || 0}</p>
                          <p className="text-[10px] md:text-sm text-muted-foreground truncate">Sessions</p>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card border-primary/20 rounded-lg md:rounded-2xl p-2 md:p-4 border border-white/10 shadow-sm">
                      <div className="flex flex-col md:flex-row items-center md:gap-3">
                        <div className="w-6 h-6 md:w-10 md:h-10 bg-green-500/15 border border-green-500/25 rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-0">
                          <Timer className="w-3 h-3 md:w-5 md:h-5 text-green-400" />
                        </div>
                        <div className="text-center md:text-left">
                          <p className="text-base md:text-2xl font-bold text-foreground">
                            {programme ? Math.round(programme.sessions.reduce((acc: number, session: any) => acc + session.duration, 0) / programme.sessions.length) || 0 : 0}
                          </p>
                          <p className="text-[10px] md:text-sm text-muted-foreground truncate">Min</p>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card border-primary/20 rounded-lg md:rounded-2xl p-2 md:p-4 border border-white/10 shadow-sm">
                      <div className="flex flex-col md:flex-row items-center md:gap-3">
                        <div className="w-6 h-6 md:w-10 md:h-10 bg-purple-500/15 border border-purple-500/25 rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-0">
                          <Target className="w-3 h-3 md:w-5 md:h-5 text-purple-400" />
                        </div>
                        <div className="text-center md:text-left">
                          <p className="text-xs md:text-2xl font-bold text-foreground truncate">{programme?.userProfile?.sportClass || 'N/A'}</p>
                          <p className="text-[10px] md:text-sm text-muted-foreground truncate">Sport</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {programme ? (
                  <Card className="glass-card border-primary/20 border border-white/10 shadow-lg rounded-xl md:rounded-2xl overflow-hidden">
                    <CardContent className="p-2 md:p-6">
                      {/* En-têtes des jours - Mobile Compact */}
                      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 md:mb-4">
                        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, i) => (
                          <div key={day} className="text-center text-[10px] md:text-sm font-semibold text-foreground/90 p-1 md:p-2 bg-white/5 rounded md:rounded-lg border border-gray-100">
                            <span className="hidden md:inline">{['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][i]}</span>
                            <span className="md:hidden">{day}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Grille du calendrier - Mobile Optimized */}
                      <div className="grid grid-cols-7 gap-1 md:gap-2">
                        {calendar.map((week, weekIndex) =>
                          week.map((date, dayIndex) => {
                            const dayName = getDayName(dayIndex);
                            const sessionForDate = getSessionForDate(date);
                            const isCurrentMonthDay = isCurrentMonth(date);
                            const isTodayDate = isToday(date);
                            
                            const focusLabel = sessionForDate ? getSessionFocusLabel(sessionForDate) : null;
                            const phaseStyle: Record<string, string> = {
                              Progression: 'bg-secondary/15 text-secondary border-secondary/30',
                              Deload: 'bg-white/10 text-muted-foreground border-white/15',
                              Adaptation: 'bg-green-500/15 text-green-400 border-green-500/30',
                              'Spécialisation': 'bg-accent/15 text-accent border-accent/30',
                            };

                            return (
                              <div
                                key={`${weekIndex}-${dayIndex}`}
                                className={`
                                  min-h-[64px] md:min-h-[130px] p-1 md:p-3 rounded-lg md:rounded-xl border-2 transition-all duration-200
                                  ${isCurrentMonthDay ? 'glass-card border-white/10 hover:border-primary/40 hover:shadow-md' : 'bg-white/[0.02] border-white/5'}
                                  ${isTodayDate ? 'ring-2 ring-secondary border-secondary/40' : ''}
                                `}
                              >
                                {/* Numéro du jour */}
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`text-xs md:text-base font-bold ${isCurrentMonthDay ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                                    {date.getDate()}
                                  </span>
                                  {isTodayDate && (
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-secondary rounded-full animate-pulse"></div>
                                  )}
                                </div>

                                {/* Session du jour */}
                                <div className="space-y-0.5 md:space-y-1">
                                  {sessionForDate && !sessionForDate.isRestDay ? (
                                    <div
                                      className={`text-[9px] md:text-sm p-1 md:p-2 rounded md:rounded-lg font-semibold cursor-pointer border hover:scale-[1.03] transition-all duration-200 ${
                                        phaseStyle[sessionForDate.phase] || 'bg-primary/15 text-primary border-primary/30'
                                      }`}
                                      onClick={() => handleSessionClick(sessionForDate)}
                                    >
                                      <div className="truncate">{focusLabel}</div>
                                      <div className="hidden md:flex items-center gap-1 text-[10px] font-normal opacity-75 mt-0.5">
                                        <Timer className="w-2.5 h-2.5 flex-shrink-0" />
                                        <span className="truncate">{sessionForDate.duration}min</span>
                                      </div>
                                    </div>
                                  ) : (
                                    isCurrentMonthDay && (
                                      <div className="text-[9px] md:text-xs text-muted-foreground/40 text-center py-1 md:py-2 bg-white/[0.02] rounded border border-white/5">
                                        <RefreshCw className="w-2.5 h-2.5 md:w-3 md:h-3 mx-auto" />
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                      
                      {/* Légende — couleurs alignées sur les cellules du calendrier */}
                      <div className="mt-8 pt-6 border-t border-white/10">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <div className="flex items-center gap-2 surface-panel-sm rounded-lg px-3 py-2">
                            <div className="w-3 h-3 bg-secondary rounded"></div>
                            <span className="text-sm font-medium text-foreground/90">Progression</span>
                          </div>
                          <div className="flex items-center gap-2 surface-panel-sm rounded-lg px-3 py-2">
                            <div className="w-3 h-3 bg-white/30 rounded"></div>
                            <span className="text-sm font-medium text-foreground/90">Deload</span>
                          </div>
                          <div className="flex items-center gap-2 surface-panel-sm rounded-lg px-3 py-2">
                            <div className="w-3 h-3 bg-green-400 rounded"></div>
                            <span className="text-sm font-medium text-foreground/90">Adaptation</span>
                          </div>
                          <div className="flex items-center gap-2 surface-panel-sm rounded-lg px-3 py-2">
                            <div className="w-3 h-3 bg-accent rounded"></div>
                            <span className="text-sm font-medium text-foreground/90">Spécialisation</span>
                          </div>
                          <div className="flex items-center gap-2 surface-panel-sm rounded-lg px-3 py-2">
                            <div className="w-3 h-3 bg-white/10 rounded"></div>
                            <span className="text-sm font-medium text-foreground/90">Repos</span>
                          </div>
                          <div className="flex items-center gap-2 surface-panel-sm rounded-lg px-3 py-2">
                            <div className="w-3 h-3 bg-secondary rounded animate-pulse"></div>
                            <span className="text-sm font-medium text-foreground/90">Aujourd'hui</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="glass-card border-primary/20 bg-white/10 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl overflow-hidden">
                    <CardContent className="p-16">
                      <div className="text-center">
                        <div className="w-40 h-40 bg-gradient-to-br from-primary via-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                          <Calendar className="w-20 h-20 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-foreground mb-4">Aucun Programme</h3>
                        <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                          Générez un programme personnalisé pour voir votre calendrier d'entraînement avec toutes vos sessions organisées.
                        </p>
                        <Button
                          onClick={() => isPowerlifting ? setIsNewProgramModalOpen(true) : handleGenerateProgramme()}
                          disabled={isGenerating}
                          className="bg-gradient-to-r from-primary via-secondary to-primary hover:from-secondary hover:via-primary hover:to-secondary text-white px-10 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                          {isGenerating ? (
                            <>
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                              Génération...
                            </>
                          ) : (
                            <>
                              <Play className="w-6 h-6 mr-3" />
                              Générer Programme
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
          </>
        )}

        {/* Modal pour afficher les détails de la session */}
        <Dialog open={isSessionModalOpen} onOpenChange={setIsSessionModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                <Dumbbell className="w-6 h-6 text-secondary" />
                {selectedSession?.nom}
              </DialogTitle>
            </DialogHeader>

            {selectedSession && (
              <div className="space-y-6">
                {/* Informations de la session */}
                <div className="p-6 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl border border-secondary/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground">{selectedSession.nom}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/15 border border-green-500/25 text-green-800 border-green-300">
                        {selectedSession.intensity}
                      </Badge>
                      <Badge variant="secondary" className="bg-secondary/15 border border-secondary/25 text-secondary">
                        {selectedSession.duration} min
                      </Badge>
                      <Badge variant="outline" className="bg-purple-500/15 border border-purple-500/25 text-purple-800 border-purple-300">
                        {selectedSession.phase}
                      </Badge>
                    </div>
                  </div>

                  {selectedSession.notes && (
                    <div className="p-3 bg-secondary/10 rounded-lg mb-4">
                      <p className="text-sm text-secondary"><strong>Notes:</strong> {selectedSession.notes}</p>
                    </div>
                  )}

                  {selectedSession.equipment && selectedSession.equipment.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground/90 mb-2">Équipement requis:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedSession.equipment.map((eq: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-muted-foreground">{eq}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Exercices */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Exercices ({selectedSession.exercises?.length || 0})</h4>
                  {selectedSession.exercises?.map((exercise: any, index: number) => (
                    <ExerciseCard key={exercise.id || index} exercise={exercise} />
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Popup de notation de difficulté (RPE) — proposé une fois la séance du jour entièrement
            validée sans aucun échec. La note ajuste la charge de la prochaine séance sur ce mouvement. */}
        <Dialog open={isDifficultyModalOpen} onOpenChange={(open) => { if (!open) handleDismissDifficultyRating(); }}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <Zap className="w-5 h-5 text-secondary" />
                Séance terminée — c'était comment ?
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Notez la difficulté de <strong>{todaySession?.nom}</strong> : ça sert à ajuster la charge de votre prochaine séance sur ce mouvement.
              </p>

              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setDifficultyRpe(n)}
                    className={`h-11 rounded-xl font-bold text-sm transition-all duration-150 ${
                      difficultyRpe === n
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                        : 'bg-white/5 text-muted-foreground border border-white/10 hover:border-primary/40 hover:text-foreground'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                <span>1 · Très facile</span>
                <span>10 · Hardcore</span>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSubmitDifficultyRating}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white"
                >
                  Valider ma note
                </Button>
                <Button variant="outline" onClick={handleDismissDifficultyRating} className="border-2 border-white/15">
                  Passer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Wizard de création de programme powerlifting (type + jours) — nouveau système modulaire */}
        {isNewProgramModalOpen && (
          <NewProgramModal
            onClose={() => setIsNewProgramModalOpen(false)}
            onConfirm={handleNewPowerliftingProgram}
          />
        )}
      </div>
    </div>
  );
};

export default Programme;