import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dumbbell, Clock, Target, Trophy, Star, Play, Pause, RotateCcw, CheckCircle, Timer, Zap, Flame, Award, Activity, Heart, TrendingUp, Calendar, Settings, Grid3X3, CalendarDays } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PlanningCalendar from '@/components/PlanningCalendar';
import ProgramGenerator from '@/components/ProgramGenerator';
import MonthlyCalendar from '@/components/MonthlyCalendar';
import PlanningConfig from '@/components/PlanningConfig';
import StatCard from '@/components/StatCard';
import { useNavigate } from 'react-router-dom';

interface Exercice {
  id: number;
  nom: string;
  series: number;
  repetitions: number;
  poids: number;
  repos: number;
  description: string;
  muscle: string;
  difficulte: 'Facile' | 'Moyen' | 'Difficile';
  termine: boolean;
  calories: number;
}

interface ProgrammeDuJour {
  id: number;
  nom: string;
  date: string;
  duree: number;
  difficulte: 'Débutant' | 'Intermédiaire' | 'Avancé';
  objectif: string;
  exercices: Exercice[];
  calories: number;
  progression: number;
  statut: 'En cours' | 'Terminé' | 'Non commencé';
  streak: number;
  xp: number;
}

const Programme: React.FC = () => {
  const navigate = useNavigate();
  const [programmeDuJour, setProgrammeDuJour] = useState<ProgrammeDuJour | null>(null);
  const [exerciceActuel, setExerciceActuel] = useState<number>(0);
  const [serieActuelle, setSerieActuelle] = useState<number>(1);
  const [tempsRepos, setTempsRepos] = useState<number>(0);
  const [enCours, setEnCours] = useState<boolean>(false);
  const [tempsEcoule, setTempsEcoule] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  
  // States pour le planning
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [planningDuration, setPlanningDuration] = useState(3);
  const [viewMode, setViewMode] = useState<'workout' | 'weekly' | 'monthly'>('workout');

  // Génération du programme du jour
  useEffect(() => {
    const programmes = [
      {
        id: 1,
        nom: "Force Maximale",
        date: new Date().toLocaleDateString('fr-FR'),
        duree: 60,
        difficulte: 'Intermédiaire' as const,
        objectif: "Développement de la force maximale",
        calories: 450,
        progression: 0,
        statut: 'Non commencé' as const,
        streak: 7,
        xp: 1250,
        exercices: [
          {
            id: 1,
            nom: "Squats",
            series: 4,
            repetitions: 8,
            poids: 80,
            repos: 120,
            description: "Exercice de base pour les jambes avec charge",
            muscle: "Quadriceps",
            difficulte: 'Moyen' as const,
            termine: false,
            calories: 120
          },
          {
            id: 2,
            nom: "Développé couché",
            series: 4,
            repetitions: 6,
            poids: 70,
            repos: 120,
            description: "Exercice principal pour les pectoraux",
            muscle: "Pectoraux",
            difficulte: 'Moyen' as const,
            termine: false,
            calories: 100
          },
          {
            id: 3,
            nom: "Deadlift",
            series: 3,
            repetitions: 5,
            poids: 100,
            repos: 180,
            description: "Exercice roi de la musculation",
            muscle: "Dorsaux",
            difficulte: 'Difficile' as const,
            termine: false,
            calories: 150
          },
          {
            id: 4,
            nom: "Tractions",
            series: 3,
            repetitions: 8,
            poids: 0,
            repos: 90,
            description: "Exercice pour le dos au poids du corps",
            muscle: "Dorsaux",
            difficulte: 'Difficile' as const,
            termine: false,
            calories: 80
          }
        ]
      }
    ];

    setProgrammeDuJour(programmes[0]);
  }, []);

  // Charger les jours sélectionnés depuis le profil (simulation)
  useEffect(() => {
    const userSelectedDays = ['Mardi', 'Jeudi'];
    setSelectedDays(userSelectedDays);
  }, []);

  // Timer pour le temps écoulé
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (enCours) {
      interval = setInterval(() => {
        setTempsEcoule(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [enCours]);

  // Timer pour le repos
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (tempsRepos > 0) {
      interval = setInterval(() => {
        setTempsRepos(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [tempsRepos]);

  const demarrerProgramme = () => {
    if (programmeDuJour) {
      setProgrammeDuJour({ ...programmeDuJour, statut: 'En cours' });
      setEnCours(true);
      setTempsEcoule(0);
    }
  };

  const arreterProgramme = () => {
    if (programmeDuJour) {
      setProgrammeDuJour({ ...programmeDuJour, statut: 'Terminé' });
      setEnCours(false);
    }
  };

  const exerciceSuivant = () => {
    if (programmeDuJour) {
      const exercice = programmeDuJour.exercices[exerciceActuel];
      
      if (serieActuelle < exercice.series) {
        setSerieActuelle(serieActuelle + 1);
        setTempsRepos(exercice.repos);
      } else if (exerciceActuel < programmeDuJour.exercices.length - 1) {
        // Marquer l'exercice comme terminé
        const nouveauxExercices = programmeDuJour.exercices.map((ex, index) => 
          index === exerciceActuel ? { ...ex, termine: true } : ex
        );
        
        const nouvelleProgression = ((exerciceActuel + 1) * 100) / programmeDuJour.exercices.length;
        setProgrammeDuJour({ 
          ...programmeDuJour, 
          exercices: nouveauxExercices,
          progression: nouvelleProgression
        });
        
        setExerciceActuel(exerciceActuel + 1);
        setSerieActuelle(1);
        setTempsRepos(0);
      } else {
        // Programme terminé
        const nouveauxExercices = programmeDuJour.exercices.map((ex, index) => 
          index === exerciceActuel ? { ...ex, termine: true } : ex
        );
        setProgrammeDuJour({ 
          ...programmeDuJour, 
          exercices: nouveauxExercices,
          statut: 'Terminé',
          progression: 100
        });
        setEnCours(false);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }
  };

  // Fonctions pour le planning
  const handleDayClick = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleProgramsGenerated = (generatedPrograms: any[]) => {
    setPrograms(generatedPrograms);
    setIsGenerating(false);
  };

  const handleStartWorkout = (day: string) => {
    const program = programs.find(p => p.day === day);
    if (program) {
      navigate(`/programme/${program.day.toLowerCase()}`);
    }
  };

  const handleEditProgram = (day: string) => {
    const program = programs.find(p => p.day === day);
    if (program) {
      navigate(`/blocs-entrainement?edit=${program.day.toLowerCase()}`);
    }
  };

  const handleCalendarDayClick = (date: Date, program: any) => {
    if (program) {
      navigate(`/programme/${program.day.toLowerCase()}`);
    }
  };

  const handleCalendarEditProgram = (date: Date, program: any) => {
    if (program) {
      navigate(`/blocs-entrainement?edit=${program.day.toLowerCase()}`);
    }
  };

  const handleCalendarStartWorkout = (date: Date, program: any) => {
    if (program) {
      navigate(`/programme/${program.day.toLowerCase()}`);
    }
  };

  const handleDaysChange = (days: string[]) => {
    setSelectedDays(days);
  };

  const handleDurationChange = (months: number) => {
    setPlanningDuration(months);
  };

  const generateMonthlyPlanning = () => {
    setIsGenerating(true);
    
    // Simulation de la génération du planning mensuel
    setTimeout(() => {
      const newPrograms = [];
      const today = new Date();
      
      // Types de programmes avec exercices détaillés
      const programTypes = [
        { 
          name: 'Push Day', 
          exercises: [
            { name: 'Développé couché', sets: '4x8-10', weight: '80kg', rest: '2-3 min' },
            { name: 'Dips', sets: '3x12-15', weight: 'Poids du corps', rest: '90 sec' },
            { name: 'Élévations latérales', sets: '3x15', weight: '12kg', rest: '60 sec' },
            { name: 'Développé incliné', sets: '3x10-12', weight: '60kg', rest: '2 min' }
          ],
          duration: '75 min',
          difficulty: 'Intermédiaire',
          calories: 450
        },
        { 
          name: 'Pull Day', 
          exercises: [
            { name: 'Tractions', sets: '4x8-10', weight: 'Poids du corps', rest: '2-3 min' },
            { name: 'Rowing barre', sets: '4x8-10', weight: '70kg', rest: '2 min' },
            { name: 'Curl biceps', sets: '3x12-15', weight: '15kg', rest: '60 sec' },
            { name: 'Face pull', sets: '3x15', weight: '20kg', rest: '60 sec' },
            { name: 'Shrugs', sets: '3x12', weight: '40kg', rest: '60 sec' }
          ],
          duration: '80 min',
          difficulty: 'Intermédiaire',
          calories: 480
        },
        { 
          name: 'Leg Day', 
          exercises: [
            { name: 'Squat', sets: '4x8-10', weight: '100kg', rest: '3-4 min' },
            { name: 'Fentes', sets: '3x12', weight: '20kg', rest: '2 min' },
            { name: 'Soulevé de terre', sets: '4x6-8', weight: '120kg', rest: '3-4 min' },
            { name: 'Extensions', sets: '3x15', weight: '60kg', rest: '90 sec' },
            { name: 'Mollets', sets: '4x20', weight: '80kg', rest: '60 sec' },
            { name: 'Planche', sets: '3x45 sec', weight: 'Poids du corps', rest: '60 sec' }
          ],
          duration: '90 min',
          difficulty: 'Avancé',
          calories: 600
        }
      ];
      
      // Générer les programmes pour la durée sélectionnée
      for (let month = 0; month < planningDuration; month++) {
        const currentMonth = new Date(today.getFullYear(), today.getMonth() + month, 1);
        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
          const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const dayName = currentDate.toLocaleDateString('fr-FR', { weekday: 'long' });
          
          if (selectedDays.includes(dayName)) {
            const programType = programTypes[selectedDays.indexOf(dayName) % programTypes.length];
            
            newPrograms.push({
              date: currentDate,
              day: dayName,
              name: programType.name,
              exercises: programType.exercises,
              duration: programType.duration,
              difficulty: programType.difficulty,
              calories: programType.calories,
              completed: false,
              isToday: currentDate.toDateString() === new Date().toDateString()
            });
          }
        }
      }
      
      setPrograms(newPrograms);
      setIsGenerating(false);
    }, 2000);
  };

  const formatTemps = (secondes: number) => {
    const minutes = Math.floor(secondes / 60);
    const secs = secondes % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficulteColor = (difficulte: string) => {
    switch (difficulte) {
      case 'Facile': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Difficile': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En cours': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Terminé': return 'bg-green-100 text-green-800 border-green-200';
      case 'Non commencé': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Statistiques du planning
  const planningStats = {
    totalDays: selectedDays.length,
    completedWorkouts: programs.filter(p => p.completed).length,
    remainingWorkouts: programs.filter(p => !p.completed).length,
    weeklyProgress: programs.length > 0 ? Math.round((programs.filter(p => p.completed).length / programs.length) * 100) : 0,
    totalSessions: selectedDays.length * planningDuration * 4
  };

  if (!programmeDuJour) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 mx-auto"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto absolute top-0 left-0"></div>
            </div>
            <p className="text-black text-lg font-medium">Chargement du programme...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  const exercice = programmeDuJour.exercices[exerciceActuel];
  const progression = programmeDuJour.progression;
  const caloriesBrulées = programmeDuJour.exercices
    .filter(ex => ex.termine)
    .reduce((total, ex) => total + ex.calories, 0);

  return (
    <PageLayout
      title="Programme & Planning"
      subtitle="Votre entraînement du jour et planification"
      icon={<Dumbbell className="h-6 w-6 text-blue-600" />}
      actions={
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/profile')}
            className="border-2 border-slate-300 hover:border-slate-400"
          >
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
        </div>
      }
    >
      {/* Animation de célébration */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="text-8xl animate-bounce">🎉</div>
          <div className="absolute top-1/4 left-1/4 text-6xl animate-pulse">🏆</div>
          <div className="absolute top-1/4 right-1/4 text-6xl animate-pulse">⭐</div>
          <div className="absolute bottom-1/4 left-1/3 text-6xl animate-pulse">💪</div>
          <div className="absolute bottom-1/4 right-1/3 text-6xl animate-pulse">🎉</div>
        </div>
      )}

      <Tabs value={viewMode} onValueChange={(value: string) => setViewMode(value as any)} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 bg-white p-2 rounded-xl shadow-lg border-2 border-slate-200">
          <TabsTrigger value="workout" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md font-semibold rounded-lg transition-all duration-300">
            <Dumbbell className="w-4 h-4 mr-2" />
            Entraînement
          </TabsTrigger>
          <TabsTrigger value="weekly" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md font-semibold rounded-lg transition-all duration-300">
            <Grid3X3 className="w-4 h-4 mr-2" />
            Planning
          </TabsTrigger>
          <TabsTrigger value="monthly" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md font-semibold rounded-lg transition-all duration-300">
            <CalendarDays className="w-4 h-4 mr-2" />
            Calendrier
          </TabsTrigger>
        </TabsList>

        {/* Vue Entraînement du jour */}
        <TabsContent value="workout" className="space-y-8">
          {/* Header du programme du jour avec particules */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
            {/* Particules animées */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-blue-400/50 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-1/4 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce"></div>
              <div className="absolute bottom-8 right-1/3 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                      <Dumbbell className="w-8 h-8 group-hover:animate-pulse" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold tracking-tight text-white group-hover:scale-105 transition-transform duration-300">
                        Programme du Jour
                      </h1>
                      <p className="text-white/90 text-lg font-medium">{programmeDuJour.nom} - {programmeDuJour.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <Badge className={`${getStatutColor(programmeDuJour.statut)} text-lg px-4 py-2 rounded-full font-semibold border-2 hover:scale-105 transition-transform duration-300`}>
                      {programmeDuJour.statut}
                    </Badge>
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
                      <Clock className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="text-white font-medium">{programmeDuJour.duree} min</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
                      <Zap className="w-4 h-4 group-hover:animate-pulse" />
                      <span className="text-white font-medium">{programmeDuJour.calories} cal</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
                      <Flame className="w-4 h-4 group-hover:animate-bounce" />
                      <span className="text-white font-medium">{programmeDuJour.streak} jours</span>
                    </div>
                  </div>
                </div>

                <div className="lg:text-right space-y-3">
                  <div className="text-white/90 font-medium">Progression du programme</div>
                  <div className="w-80">
                    <Progress 
                      value={progression} 
                      className="h-4 bg-white/20 rounded-full overflow-hidden"
                    />
                  </div>
                  <div className="text-sm">
                    <span className="text-white font-bold text-lg">{progression}%</span> 
                    <span className="text-white/80"> terminé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats en temps réel avec animations */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Timer className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                  {formatTemps(tempsEcoule)}
                </div>
                <div className="text-sm text-black font-medium">Temps écoulé</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                  {programmeDuJour.exercices.length}
                </div>
                <div className="text-sm text-black font-medium">Exercices</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                  {programmeDuJour.exercices.filter(ex => ex.termine).length}
                </div>
                <div className="text-sm text-black font-medium">Terminés</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                  {caloriesBrulées}
                </div>
                <div className="text-sm text-black font-medium">Calories</div>
              </CardContent>
            </Card>
          </div>

          {/* Contrôles du programme avec style amélioré */}
          <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-300 shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="text-center group">
                    <div className="text-2xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                      {formatTemps(tempsEcoule)}
                    </div>
                    <div className="text-sm text-black">Temps écoulé</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-2xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                      {programmeDuJour.exercices.length}
                    </div>
                    <div className="text-sm text-black">Exercices</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-2xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                      {programmeDuJour.exercices.filter(ex => ex.termine).length}
                    </div>
                    <div className="text-sm text-black">Terminés</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  {!enCours && programmeDuJour.statut === 'Non commencé' && (
                    <Button 
                      onClick={demarrerProgramme}
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Commencer
                    </Button>
                  )}
                  
                  {enCours && (
                    <Button 
                      onClick={arreterProgramme}
                      size="lg"
                      className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                    >
                      <Pause className="w-5 h-5 mr-2" />
                      Arrêter
                    </Button>
                  )}
                  
                  {programmeDuJour.statut === 'Terminé' && (
                    <Button 
                      onClick={() => window.location.reload()}
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Nouveau programme
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exercice en cours avec design gaming */}
          {enCours && exercice && (
            <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-4 border-purple-500 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
              {/* Effets de bordure animés */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/30 animate-pulse"></div>
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-4">
                  <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
                    <Dumbbell className="w-8 h-8" />
                  </div>
                  <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    {exercice.nom}
                  </span>
                </CardTitle>
                <p className="text-center text-white/90 text-lg font-medium">{exercice.description}</p>
              </CardHeader>
              
              <CardContent className="relative z-10 space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group">
                    <div className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                      {serieActuelle}/{exercice.series}
                    </div>
                    <div className="text-sm font-semibold text-white/80">Séries</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group">
                    <div className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                      {exercice.repetitions}
                    </div>
                    <div className="text-sm font-semibold text-white/80">Répétitions</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group">
                    <div className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                      {exercice.poids > 0 ? `${exercice.poids}kg` : 'Poids du corps'}
                    </div>
                    <div className="text-sm font-semibold text-white/80">Charge</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group">
                    <div className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                      {tempsRepos > 0 ? formatTemps(tempsRepos) : `${exercice.repos}s`}
                    </div>
                    <div className="text-sm font-semibold text-white/80">
                      {tempsRepos > 0 ? 'Repos en cours' : 'Repos prévu'}
                    </div>
                  </div>
                </div>
                
                {tempsRepos === 0 && (
                  <div className="text-center">
                    <Button 
                      onClick={exerciceSuivant}
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 font-bold text-xl px-8 py-4"
                    >
                      <CheckCircle className="w-6 h-6 mr-3" />
                      Série terminée
                    </Button>
                  </div>
                )}
                
                {tempsRepos > 0 && (
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-4 animate-pulse bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                      {formatTemps(tempsRepos)}
                    </div>
                    <p className="text-lg font-semibold text-white/90">
                      Temps de repos - Préparez-vous pour la prochaine série !
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Liste des exercices du programme */}
          <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-300 shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-black text-2xl">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                Exercices du programme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {programmeDuJour.exercices.map((ex, index) => (
                  <div key={ex.id} className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 group ${
                    ex.termine 
                      ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-300 shadow-lg' 
                      : index === exerciceActuel && enCours
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-purple-300 shadow-xl ring-4 ring-purple-200'
                      : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                          ex.termine 
                            ? 'bg-green-500' 
                            : index === exerciceActuel && enCours
                            ? 'bg-purple-500 animate-pulse'
                            : 'bg-gray-400'
                        }`}>
                          {ex.termine ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : index === exerciceActuel && enCours ? (
                            <Play className="w-6 h-6 text-white animate-pulse" />
                          ) : (
                            <span className="text-white font-bold">{index + 1}</span>
                          )}
                        </div>
                        
                        <div>
                          <div className="font-bold text-lg text-black group-hover:scale-105 transition-transform duration-300">
                            {ex.nom}
                          </div>
                          <div className="text-sm text-black">
                            {ex.series} séries • {ex.repetitions} répétitions • {ex.poids > 0 ? `${ex.poids}kg` : 'Poids du corps'}
                          </div>
                          <div className="text-sm text-black font-medium">
                            {ex.muscle} • {ex.repos}s de repos • {ex.calories} cal
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`${getDifficulteColor(ex.difficulte)} text-xs`}>
                          {ex.difficulte}
                        </Badge>
                        {index === exerciceActuel && enCours && (
                          <Badge className="bg-purple-200 text-purple-800 border-purple-300 text-xs animate-pulse">
                            En cours
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vue Planning hebdomadaire */}
        <TabsContent value="weekly" className="space-y-8">
          {/* Statistiques du planning */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Jours d'entraînement"
              value={planningStats.totalDays}
              subtitle="par semaine"
              icon={Calendar}
              color="blue"
            />
            <StatCard
              title="Séances terminées"
              value={planningStats.completedWorkouts}
              subtitle="cette semaine"
              icon={Target}
              color="green"
            />
            <StatCard
              title="Séances restantes"
              value={planningStats.remainingWorkouts}
              subtitle="à effectuer"
              icon={Clock}
              color="orange"
            />
            <StatCard
              title="Progression"
              value={`${planningStats.weeklyProgress}%`}
              subtitle="de la semaine"
              icon={TrendingUp}
              color="purple"
            />
          </div>

          {/* Configuration du planning */}
          <PlanningConfig
            selectedDays={selectedDays}
            onDaysChange={handleDaysChange}
            onDurationChange={handleDurationChange}
            onGeneratePlanning={generateMonthlyPlanning}
          />

          {/* Générateur de programmes */}
          <ProgramGenerator
            selectedDays={selectedDays}
            onProgramsGenerated={handleProgramsGenerated}
          />

          {/* Calendrier de planning */}
          <PlanningCalendar
            selectedDays={selectedDays}
            programs={programs}
            onDayClick={handleDayClick}
          />

          {/* Actions rapides pour les programmes */}
          {programs.length > 0 && (
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800 text-2xl">
                  <div className="bg-violet-100 rounded-full p-2">
                    <Dumbbell className="h-6 w-6 text-violet-600" />
                  </div>
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {programs.map((program, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-800">{program.day}</h4>
                        <Badge 
                          variant="outline" 
                          className={`${
                            program.difficulty === 'Débutant' ? 'border-emerald-300 text-emerald-700' :
                            program.difficulty === 'Intermédiaire' ? 'border-amber-300 text-amber-700' :
                            'border-red-300 text-red-700'
                          }`}
                        >
                          {program.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="font-medium text-slate-800">{program.name}</div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {program.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            {program.exercises} exos
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold"
                            onClick={() => handleStartWorkout(program.day)}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Commencer
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditProgram(program.day)}
                            className="border-2 border-slate-300 hover:border-slate-400"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Vue Calendrier mensuel */}
        <TabsContent value="monthly" className="space-y-8">
          <MonthlyCalendar
            selectedDays={selectedDays}
            programs={programs}
            onDayClick={handleCalendarDayClick}
            onEditProgram={handleCalendarEditProgram}
            onStartWorkout={handleCalendarStartWorkout}
          />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Programme;