import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '../contexts/AuthContext';
import { useMobileDetection } from '../hooks/useMobileDetection';
import { useExerciseValidation } from '../contexts/ExerciseContext';
import { ExerciseValidation } from '../components/ExerciseValidation';
import { VitalForceBackground } from '@/components/VitalForceBackground';
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
import { generateProgramme } from '../utils/programmeGenerator';

// Fonction pour récupérer les informations de Training Max
const getTrainingMaxInfo = () => {
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
    
    // Calculer les Training Max (Cycle 1)
    const tmSquat = Math.round(maxSquat * 0.9);
    const tmBench = Math.round(maxBench * 0.9);
    const tmDeadlift = Math.round(maxDeadlift * 0.9);
    
    return {
      maxSquat, maxBench, maxDeadlift,
      tmSquat, tmBench, tmDeadlift
    };
  } catch (error) {
    console.error('Erreur lors du calcul des Training Max:', error);
    return null;
  }
};

// Fonction pour calculer le pourcentage d'un exercice principal
const calculatePercentage = (exerciseName: string, weight: number, notes: string) => {
  if (typeof weight !== 'number') return null;
  
  // Récupérer les vraies performances de l'utilisateur depuis localStorage
  const userPerformances = localStorage.getItem('userPerformances');
  if (!userPerformances) return null;
  
  try {
    const performances = JSON.parse(userPerformances);
    
    // Trouver les meilleures performances pour chaque exercice
    const getBestPerformance = (discipline: string) => {
      const perf = performances.filter((p: any) => p.discipline === discipline);
      return perf.length > 0 ? Math.max(...perf.map((p: any) => p.value)) : null;
    };
    
    const maxSquat = getBestPerformance('squat');
    const maxBench = getBestPerformance('bench');
    const maxDeadlift = getBestPerformance('deadlift');
    
    if (!maxSquat || !maxBench || !maxDeadlift) return null;
    
    // Extraire le cycle depuis les notes
    let cycle = 1;
    if (notes && notes.includes('Cycle')) {
      const cycleMatch = notes.match(/Cycle (\d+)/);
      if (cycleMatch) {
        cycle = parseInt(cycleMatch[1]);
      }
    }
    
    // Calculer les Training Max exactement comme dans le programme
    const progressionCycle = (cycle - 1) * 2.5; // +2.5kg par cycle pour haut du corps
    const progressionCycleBas = (cycle - 1) * 5; // +5kg par cycle pour bas du corps
    
    const tmSquat = Math.round((maxSquat * 0.9) + progressionCycleBas);
    const tmBench = Math.round((maxBench * 0.9) + progressionCycle);
    const tmDeadlift = Math.round((maxDeadlift * 0.9) + progressionCycleBas);
    
    // Calculer le pourcentage selon l'exercice
    switch (exerciseName) {
      case 'Squat':
        return Math.round((weight / tmSquat) * 100);
      case 'Développé Couché':
        return Math.round((weight / tmBench) * 100);
      case 'Soulevé de Terre':
        return Math.round((weight / tmDeadlift) * 100);
      case 'Développé Militaire':
        // Estimation du TM Press basé sur le Bench (environ 60-70%)
        const tmPress = Math.round((maxBench * 0.9 * 0.65) + progressionCycle);
        return Math.round((weight / tmPress) * 100);
      default:
        return null;
    }
  } catch (error) {
    console.error('Erreur lors du calcul du pourcentage:', error);
    return null;
  }
};

export const Programme: React.FC = () => {
  const { user } = useAuth();
  const { isMobile } = useMobileDetection();
  const { addValidation, getExerciseStatus, getSessionStatus, getSessionXP } = useExerciseValidation();
  const [programme, setProgramme] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTab, setCurrentTab] = useState<'today' | 'weekly' | 'planning'>('today');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

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

  // Obtenir la session d'aujourd'hui
  const getTodaysSession = () => {
    if (!programme) return null;
    
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const today = days[new Date().getDay()];
    
    return programme.sessions.find((session: any) => session.day === today);
  };

  const todaySession = getTodaysSession();

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

  // Fonction pour obtenir la session d'une date
  const getSessionForDate = (date: Date) => {
    if (!programme) return null;
    
    const dayName = getDayName(date.getDay());
    
    // Calculer la semaine du mois (1-4)
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstWeekday = firstDayOfMonth.getDay();
    const dayOfMonth = date.getDate();
    const weekOfMonth = Math.ceil((dayOfMonth + firstWeekday) / 7);
    
    // Trouver la session correspondant au jour ET à la semaine
    const session = programme.sessions.find((session: any) => {
      if (session.day !== dayName) return false;
      
      // Extraire le numéro de semaine du nom de la session
      const semaineMatch = session.nom.match(/Semaine (\d+)/);
      if (!semaineMatch) return false;
      
      const sessionWeek = parseInt(semaineMatch[1]);
      return sessionWeek === weekOfMonth;
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
    
    return session;
  };

  // Fonction pour obtenir le nom du mois
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { month: 'long' });
  };

  // Fonction pour valider un exercice
  const handleExerciseValidation = (exerciseId: string, success: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    const todaySession = programme?.sessions.find((s: any) => s.day === getCurrentDay());
    
    if (todaySession) {
      addValidation(exerciseId, todaySession.id, success);
    }
  };

  // Fonction pour obtenir le jour actuel
  const getCurrentDay = () => {
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    return days[new Date().getDay()];
  };

  // Fonction pour ouvrir le modal de session
  const handleSessionClick = (session: any) => {
    setSelectedSession(session);
    setIsSessionModalOpen(true);
  };

  const calendar = generateCalendar();

  const formatNumber = (value: number | undefined | null): string => {
    if (value === undefined || value === null || isNaN(value)) {
      return '0';
    }
    return value.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-4 md:p-6 overflow-x-hidden">
      <VitalForceBackground intensity="medium" />
      <div className="mx-auto max-w-7xl space-y-4 md:space-y-8">
        
        {/* Header Principal */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8 text-white shadow-2xl">
          {/* Effets de particules flottantes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-24 -translate-x-24 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-x-16 -translate-y-16 animate-pulse delay-500"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2 md:space-y-4">
                <h1 className="text-xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent truncate">
                  🏋️ Mon Programme
                </h1>
                <p className="text-xs md:text-xl text-blue-100 max-w-full md:max-w-2xl leading-relaxed">
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
                    onClick={handleRegenerateProgramme}
                    disabled={isGenerating}
                    className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Mise à jour...
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
                  onClick={handleGenerateProgramme}
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

        {/* Message si pas de programme */}
        {!programme && (
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🏋️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun Programme Généré</h3>
              <p className="text-gray-500 mb-6">Générez votre programme personnalisé pour commencer votre entraînement !</p>
              <Button 
                onClick={handleGenerateProgramme}
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
                    Générer Mon Programme
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Message d'information si les jours d'entraînement ont changé */}
        {programme && user?.trainingDays && programme.sessions.length > 0 && (
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Jours d'Entraînement Configurés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {user.trainingDays.map(day => (
                    <Badge key={day} className="bg-blue-100 text-blue-800 border-blue-300">
                      {day}
                    </Badge>
                  ))}
                </div>
                <div className="bg-blue-100/50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-700 text-sm">
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
            {/* Informations Training Max */}
            {(() => {
              const tmInfo = getTrainingMaxInfo();
              return tmInfo ? (
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-lg rounded-2xl mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">Vos Training Max (Cycle 1)</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">Squat</p>
                          <p className="text-lg font-bold text-gray-800">{tmInfo.maxSquat}kg</p>
                          <p className="text-sm text-blue-600 font-medium">TM: {tmInfo.tmSquat}kg</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">Bench</p>
                          <p className="text-lg font-bold text-gray-800">{tmInfo.maxBench}kg</p>
                          <p className="text-sm text-blue-600 font-medium">TM: {tmInfo.tmBench}kg</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-1">Deadlift</p>
                          <p className="text-lg font-bold text-gray-800">{tmInfo.maxDeadlift}kg</p>
                          <p className="text-sm text-blue-600 font-medium">TM: {tmInfo.tmDeadlift}kg</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>💡 Note :</strong> Les pourcentages affichés sont calculés sur le Training Max (90% du 1RM) + progression du cycle.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : null;
            })()}
          <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as any)} className="space-y-6">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} bg-white/90 backdrop-blur-md border border-white/20 shadow-lg rounded-xl`}>
              <TabsTrigger value="today" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-200">
                <Calendar className="w-4 h-4" />
                Aujourd'hui
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-200">
                <CalendarDays className="w-4 h-4" />
                Hebdomadaire
              </TabsTrigger>
              <TabsTrigger value="planning" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-200">
                <List className="w-4 h-4" />
                Planning
              </TabsTrigger>
            </TabsList>

            {/* Onglet Aujourd'hui */}
            <TabsContent value="today">
              <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-blue-500" />
                        Programme du Jour
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {todaySession ? (
                    <div className="space-y-6">
                      {/* Informations de la session */}
                      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200/50">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-800">{todaySession.nom}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                              {todaySession.intensity}
                            </Badge>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {todaySession.duration} min
                            </Badge>
                            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                              {todaySession.phase}
                            </Badge>
                    </div>
                  </div>
                  
                        {todaySession.notes && (
                          <div className="p-3 bg-blue-50 rounded-lg mb-4">
                            <p className="text-sm text-blue-800"><strong>Notes:</strong> {todaySession.notes}</p>
                    </div>
                        )}

                        {todaySession.equipment && todaySession.equipment.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Équipement requis:</p>
                            <div className="flex flex-wrap gap-2">
                              {todaySession.equipment.map((eq: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-gray-600">{eq}</Badge>
                              ))}
                    </div>
                    </div>
                        )}
                </div>

                      {/* Exercices avec validation */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-gray-800">Exercices ({todaySession.exercises.length})</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 text-green-800">
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
                          
                          return (
                            <div key={exercise.id || index} className="space-y-3">
                              {/* Informations de l'exercice */}
                              <Card className={`bg-white/70 backdrop-blur-sm border-2 rounded-xl transition-all duration-200 ${
                                isCompleted 
                                  ? isSuccess 
                                    ? 'border-green-300 bg-green-50/70 shadow-green-200' 
                                    : 'border-red-300 bg-red-50/70 shadow-red-200'
                                  : 'border-gray-200 hover:border-indigo-300 hover:shadow-lg'
                              }`}>
                                <CardHeader className="pb-3">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                      {exercise.nom}
                                      {isCompleted && (
                                        isSuccess ? (
                                          <CheckCircle className="w-5 h-5 text-green-500" />
                                        ) : (
                                          <XCircle className="w-5 h-5 text-red-500" />
                                        )
                                      )}
                                    </CardTitle>
                                    <Badge variant="outline">{exercise.categorie}</Badge>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-4`}>
                                      <div className="text-center p-2 bg-gray-50 rounded">
                                        <p className="text-sm text-gray-600">Séries</p>
                                        <p className="font-bold text-gray-800">{formatNumber(exercise.progression?.sets || exercise.series)}</p>
                                      </div>
                                      <div className="text-center p-2 bg-gray-50 rounded">
                                        <p className="text-sm text-gray-600">Reps</p>
                                        <p className="font-bold text-gray-800">{exercise.progression?.reps || exercise.reps}</p>
                                      </div>
                                      <div className="text-center p-2 bg-gray-50 rounded">
                                        <p className="text-sm text-gray-600">Poids</p>
                                        <div className="flex flex-col items-center gap-1">
                                          <p className="font-bold text-gray-800">{formatNumber(exercise.progression?.poids || exercise.poids)}</p>
                                          {(() => {
                                            const percentage = calculatePercentage(exercise.nom, exercise.poids, todaySession.notes);
                                            return percentage ? (
                                              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
                                                {percentage}% du TM
                                              </span>
                                            ) : null;
                                          })()}
                                        </div>
                                      </div>
                                      <div className="text-center p-2 bg-gray-50 rounded">
                                        <p className="text-sm text-gray-600">Repos</p>
                                        <p className="font-bold text-gray-800">{exercise.progression?.repos || exercise.repos}</p>
                                      </div>
                                    </div>

                                    <div className="text-sm text-gray-600">
                                      <p><strong>Muscles:</strong> {exercise.muscles?.join(', ') || 'Non spécifié'}</p>
                                      <p><strong>Équipement:</strong> {exercise.equipement?.join(', ') || 'Non spécifié'}</p>
                                    </div>
                                    
                                    {exercise.conseils && (
                                      <div className="p-3 bg-yellow-50 rounded-lg">
                                        <p className="text-sm text-yellow-800"><strong>Conseil:</strong> {exercise.conseils}</p>
                                      </div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                              
                              {/* Composant de validation */}
                              <ExerciseValidation
                                exercise={exercise}
                                onValidation={handleExerciseValidation}
                                isCompleted={isCompleted}
                                isSuccess={isSuccess}
                                isRestDay={false}
                              />
                            </div>
                          );
                        })}
                      </div>
                </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <RefreshCw className="w-12 h-12 text-white" />
                </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Jour de Repos</h3>
                      <p className="text-gray-600 mb-6">Profitez de cette journée pour récupérer et vous détendre.</p>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
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
              <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <CalendarDays className="w-6 h-6 text-green-500" />
                    Planning Hebdomadaire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
                    {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map(day => {
                      const daySession = programme.sessions.find((s: any) => s.day === day);
                      const today = new Date().toISOString().split('T')[0];
                      
                      // Créer une session de repos si pas de session trouvée
                      const sessionToDisplay = daySession || {
                        id: `repos-${day}`,
                        nom: `Repos - ${day}`,
                        day: day,
                        phase: 'Repos',
                        intensity: 'Repos',
                        duration: 0,
                        exercises: [],
                        notes: 'Jour de récupération',
                        equipment: [],
                        isRestDay: true
                      };
                      
                      const sessionStatus = daySession ? getSessionStatus(daySession.id, today) : 'not-started';
                      
                      return (
                        <Card 
                          key={day} 
                          className={`${
                            daySession 
                              ? sessionStatus === 'completed'
                                ? 'bg-green-50/80 border-green-300 shadow-green-200'
                                : sessionStatus === 'failed'
                                ? 'bg-red-50/80 border-red-300 shadow-red-200'
                                : sessionStatus === 'partial'
                                ? 'bg-yellow-50/80 border-yellow-300 shadow-yellow-200'
                                : 'bg-blue-50/80 border-blue-200 shadow-blue-200'
                              : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 shadow-gray-200'
                          } border-2 ${daySession ? 'cursor-pointer hover:shadow-lg transition-all duration-200' : 'cursor-default'}`}
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
                                  <Badge variant="outline" className="bg-green-100 text-green-800">
                                    {daySession.intensity}
                                  </Badge>
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                    {daySession.duration}min
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">
                                  <strong>{daySession.exercises?.length || 0}</strong> exercices
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong>Phase:</strong> {daySession.phase}
                                </p>
                                {sessionStatus !== 'not-started' && (
                                  <div className="flex items-center justify-between">
                                    <Badge 
                                      variant="outline" 
                                      className={
                                        sessionStatus === 'completed' 
                                          ? 'bg-green-100 text-green-800'
                                          : sessionStatus === 'failed'
                                          ? 'bg-red-100 text-red-800'
                                          : 'bg-yellow-100 text-yellow-800'
                                      }
                                    >
                                      {sessionStatus === 'completed' && 'Terminé'}
                                      {sessionStatus === 'failed' && 'Échoué'}
                                      {sessionStatus === 'partial' && 'En cours'}
                                    </Badge>
                                    <Badge variant="outline" className="bg-purple-100 text-purple-800">
                                      <Zap className="w-3 h-3 mr-1" />
                                      +{getSessionXP(daySession.id, today)} XP
                                    </Badge>
                                  </div>
                                )}
                                <div className="text-xs text-gray-500">
                                  {daySession.exercises?.slice(0, 2).map((ex: any) => {
                                    const percentage = calculatePercentage(ex.nom, ex.poids, daySession.notes);
                                    return (
                                      <div key={ex.nom} className="flex items-center gap-1 mb-1">
                                        <span>{ex.nom}</span>
                                        {percentage && (
                                          <span className="text-blue-600 font-medium">({percentage}% TM)</span>
                                        )}
                                      </div>
                                    );
                                  }) || 'Aucun exercice'}
                                  {daySession.exercises?.length > 2 && '...'}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-4">
                                <RefreshCw className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500 font-medium">Repos</p>
                                <p className="text-xs text-gray-400">Récupération</p>
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
                <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-xl md:rounded-2xl p-3 md:p-6 border border-gray-200 shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3 md:mb-4">
                    <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                      <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">
                        <Calendar className="w-4 h-4 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-base md:text-2xl font-bold text-gray-800 truncate">Planning Mensuel</h2>
                        <p className="text-gray-600 text-xs md:text-base truncate hidden sm:block">Calendrier d'entraînement</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 md:gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                        className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm px-2 md:px-4"
                      >
                        <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                      </Button>
                      <div className="bg-white border border-gray-300 rounded-lg md:rounded-xl px-3 md:px-6 py-1.5 md:py-3 shadow-sm">
                        <h3 className="text-sm md:text-xl font-bold text-gray-800 truncate">
                          {getMonthName(currentMonth).slice(0, 3)} {currentMonth.getFullYear()}
                        </h3>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                        className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm px-2 md:px-4"
                      >
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Stats du programme - Compact Mobile */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <div className="bg-white rounded-lg md:rounded-2xl p-2 md:p-4 border border-gray-200 shadow-sm">
                      <div className="flex flex-col md:flex-row items-center md:gap-3">
                        <div className="w-6 h-6 md:w-10 md:h-10 bg-blue-100 rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-0">
                          <Activity className="w-3 h-3 md:w-5 md:h-5 text-blue-600" />
                        </div>
                        <div className="text-center md:text-left">
                          <p className="text-base md:text-2xl font-bold text-gray-800">{programme?.sessions.length || 0}</p>
                          <p className="text-[10px] md:text-sm text-gray-600 truncate">Sessions</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg md:rounded-2xl p-2 md:p-4 border border-gray-200 shadow-sm">
                      <div className="flex flex-col md:flex-row items-center md:gap-3">
                        <div className="w-6 h-6 md:w-10 md:h-10 bg-green-100 rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-0">
                          <Timer className="w-3 h-3 md:w-5 md:h-5 text-green-600" />
                        </div>
                        <div className="text-center md:text-left">
                          <p className="text-base md:text-2xl font-bold text-gray-800">
                            {programme ? Math.round(programme.sessions.reduce((acc: number, session: any) => acc + session.duration, 0) / programme.sessions.length) || 0 : 0}
                          </p>
                          <p className="text-[10px] md:text-sm text-gray-600 truncate">Min</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg md:rounded-2xl p-2 md:p-4 border border-gray-200 shadow-sm">
                      <div className="flex flex-col md:flex-row items-center md:gap-3">
                        <div className="w-6 h-6 md:w-10 md:h-10 bg-purple-100 rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-0">
                          <Target className="w-3 h-3 md:w-5 md:h-5 text-purple-600" />
                        </div>
                        <div className="text-center md:text-left">
                          <p className="text-xs md:text-2xl font-bold text-gray-800 truncate">{programme?.userProfile?.sportClass || 'N/A'}</p>
                          <p className="text-[10px] md:text-sm text-gray-600 truncate">Sport</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {programme ? (
                  <Card className="bg-white border border-gray-200 shadow-lg rounded-xl md:rounded-2xl overflow-hidden">
                    <CardContent className="p-2 md:p-6">
                      {/* En-têtes des jours - Mobile Compact */}
                      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 md:mb-4">
                        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, i) => (
                          <div key={day} className="text-center text-[10px] md:text-sm font-semibold text-gray-700 p-1 md:p-2 bg-gray-50 rounded md:rounded-lg border border-gray-100">
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
                            
                            return (
                              <div
                                key={`${weekIndex}-${dayIndex}`}
                                className={`
                                  min-h-[60px] md:min-h-[120px] p-1 md:p-3 rounded-lg md:rounded-xl border transition-all duration-200
                                  ${isCurrentMonthDay ? 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md' : 'bg-gray-50/50 border-gray-100'}
                                  ${isTodayDate ? 'ring-2 ring-blue-400 bg-blue-50 border-blue-300 shadow-md' : ''}
                                `}
                              >
                                {/* Numéro du jour */}
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`text-xs md:text-base font-bold ${isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {date.getDate()}
                                  </span>
                                  {isTodayDate && (
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                  )}
                                </div>
                                
                                {/* Session du jour - Compact */}
                                <div className="space-y-0.5 md:space-y-1">
                                  {sessionForDate ? (
                                    <div
                                      className={`
                                        text-[8px] md:text-xs p-1 md:p-2 rounded md:rounded-lg font-medium cursor-pointer border
                                        ${sessionForDate.phase === 'Progression' ? 'bg-blue-50 text-blue-800 border-blue-200' : 
                                          sessionForDate.phase === 'Deload' ? 'bg-gray-50 text-gray-700 border-gray-200' :
                                          sessionForDate.phase === 'Adaptation' ? 'bg-green-50 text-green-800 border-green-200' :
                                          sessionForDate.phase === 'Spécialisation' ? 'bg-orange-50 text-orange-800 border-orange-200' :
                                          'bg-purple-50 text-purple-800 border-purple-200'}
                                        hover:scale-105 transition-all duration-200
                                      `}
                                      onClick={() => handleSessionClick(sessionForDate)}
                                    >
                                      <div className="truncate font-semibold mb-0.5">{sessionForDate.nom.split('-')[0]}</div>
                                      <div className="text-[7px] md:text-[10px] opacity-80 space-y-0.5">
                                        <div className="flex items-center gap-0.5 truncate">
                                          <Timer className="w-2 h-2 md:w-2.5 md:h-2.5 flex-shrink-0" />
                                          <span className="truncate">{sessionForDate.duration}min</span>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    isCurrentMonthDay && (
                                      <div className="text-[8px] md:text-xs text-gray-300 text-center py-1 bg-gray-50/30 rounded border border-gray-50">
                                        <RefreshCw className="w-2 h-2 md:w-3 md:h-3 text-gray-200 mx-auto" />
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                      
                      {/* Légende avec couleurs spécifiques */}
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex flex-wrap items-center justify-center gap-4">
                          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                            <div className="w-3 h-3 bg-blue-500 rounded"></div>
                            <span className="text-sm font-medium text-gray-700">Progression</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                            <div className="w-3 h-3 bg-gray-400 rounded"></div>
                            <span className="text-sm font-medium text-gray-700">Deload</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                            <div className="w-3 h-3 bg-green-500 rounded"></div>
                            <span className="text-sm font-medium text-gray-700">Adaptation</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                            <div className="w-3 h-3 bg-orange-500 rounded"></div>
                            <span className="text-sm font-medium text-gray-700">Spécialisation</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                            <div className="w-3 h-3 bg-gray-200 rounded"></div>
                            <span className="text-sm font-medium text-gray-700">Repos</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                            <div className="w-3 h-3 bg-blue-500 rounded animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-700">Aujourd'hui</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-white/95 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl overflow-hidden">
                    <CardContent className="p-16">
                      <div className="text-center">
                        <div className="w-40 h-40 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                          <Calendar className="w-20 h-20 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">Aucun Programme</h3>
                        <p className="text-gray-600 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                          Générez un programme personnalisé pour voir votre calendrier d'entraînement avec toutes vos sessions organisées.
                        </p>
                        <Button 
                          onClick={handleGenerateProgramme} 
                          disabled={isGenerating}
                          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white px-10 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
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
              <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Dumbbell className="w-6 h-6 text-blue-500" />
                {selectedSession?.nom}
              </DialogTitle>
            </DialogHeader>
            
            {selectedSession && (
              <div className="space-y-6">
                {/* Informations de la session */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{selectedSession.nom}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                        {selectedSession.intensity}
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {selectedSession.duration} min
                      </Badge>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                        {selectedSession.phase}
                      </Badge>
                    </div>
                  </div>
                  
                  {selectedSession.notes && (
                    <div className="p-3 bg-blue-50 rounded-lg mb-4">
                      <p className="text-sm text-blue-800"><strong>Notes:</strong> {selectedSession.notes}</p>
                    </div>
                  )}

                  {selectedSession.equipment && selectedSession.equipment.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Équipement requis:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedSession.equipment.map((eq: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-gray-600">{eq}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Exercices */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Exercices ({selectedSession.exercises?.length || 0})</h4>
                  {selectedSession.exercises?.map((exercise: any, index: number) => (
                    <Card key={exercise.id || index} className="bg-white/60 backdrop-blur-sm border border-gray-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{exercise.nom}</CardTitle>
                          <Badge variant="outline">{exercise.categorie}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-4`}>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <p className="text-sm text-gray-600">Séries</p>
                              <p className="font-bold text-gray-800">{formatNumber(exercise.progression?.sets || exercise.series)}</p>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <p className="text-sm text-gray-600">Reps</p>
                              <p className="font-bold text-gray-800">{exercise.progression?.reps || exercise.reps}</p>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <p className="text-sm text-gray-600">Poids</p>
                              <div className="flex flex-col items-center gap-1">
                                <p className="font-bold text-gray-800">{formatNumber(exercise.progression?.poids || exercise.poids)}</p>
                                {(() => {
                                  const percentage = calculatePercentage(exercise.nom, exercise.poids, selectedSession.notes);
                                  return percentage ? (
                                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
                                      {percentage}% du TM
                                    </span>
                                  ) : null;
                                })()}
                              </div>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <p className="text-sm text-gray-600">Repos</p>
                              <p className="font-bold text-gray-800">{exercise.progression?.repos || exercise.repos}</p>
                            </div>
                          </div>

                          <div className="text-sm text-gray-600">
                            <p><strong>Muscles:</strong> {exercise.muscles?.join(', ') || 'Non spécifié'}</p>
                            <p><strong>Équipement:</strong> {exercise.equipement?.join(', ') || 'Non spécifié'}</p>
                          </div>
                          
                          {exercise.conseils && (
                            <div className="p-3 bg-yellow-50 rounded-lg">
                              <p className="text-sm text-yellow-800"><strong>Conseil:</strong> {exercise.conseils}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Programme;