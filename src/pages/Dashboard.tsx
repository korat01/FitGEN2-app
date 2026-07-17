import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { useExerciseValidation } from '../contexts/ExerciseContext';
import { scoringEngine } from '../utils/scoring';
import { Dumbbell, Target, TrendingUp, Zap, Clock, Weight, Gauge, Activity, BarChart3, Star, Award, Flame, Sparkles, Heart, CheckCircle, Play, Pause, RotateCcw, Plus, Calendar, Timer, Users, Settings, Bell, Search, Apple } from 'lucide-react';

// Nouveaux composants pour le Dashboard
import { XPLevelBar } from '@/components/XPLevelBar';
import { DailyQuests } from '@/components/DailyQuests';
import { QuestWidget } from '@/components/QuestWidget';
import { StreakDisplay } from '@/components/StreakDisplay';
import { WeeklyProgressChart } from '@/components/WeeklyProgressChart';
import { DailyActivityWidget } from '@/components/DailyActivityWidget';
import { OneRepMaxCalculator } from '@/components/OneRepMaxCalculator';
import { HexagonBadgeRow } from '@/components/HexagonBadge';
import { RankBadge } from '@/components/RankBadge';
import { ProgressionPreviewCard } from '@/components/stats/ProgressionPreviewCard';
import { usePerformanceStats } from '@/hooks/usePerformanceStats';
import { getWeekKey } from '@/utils/weeklyProgress';

// Utilitaires pour les calculs
import { calculateXPData, generateDailyQuests, calculateStreakData, toPerformanceRecords } from '@/utils/statsCalculator';
import { XPData, DailyQuest, StreakData } from '@/types/stats';
export const Dashboard: React.FC = () => {
  const {
    user,
    updateUser
  } = useAuth();
  const {
    xpData,
    validations,
  } = useExerciseValidation();
  const {
    performances,
    userRank,
    refreshFromStorage,
  } = usePerformanceStats();
  const [weekKey, setWeekKey] = useState(getWeekKey());

  // NOUVEAUX ÉTATS POUR LES COMPOSANTS DASHBOARD
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>([]);
  const [streakData, setStreakData] = useState<StreakData | null>(null);

  const recalculateRank = () => {
    if (user) {
      const list = refreshFromStorage();
      const realRank = scoringEngine.calculateUserRank(user, list);
      alert(`Rang recalculé : ${realRank.rank} (${realRank.globalScore} ${realRank.scoreLabel})`);
    }
  };

  // Calculer quêtes et streak quand les performances changent
  useEffect(() => {
    if (user) {
      const formattedPerformances = toPerformanceRecords(performances, user.id);

      try {
        const calculatedStreakData = calculateStreakData(user as any, formattedPerformances);
        const generatedQuests = generateDailyQuests(user as any);
        setDailyQuests(generatedQuests);
        setStreakData(calculatedStreakData);
      } catch (error) {
        console.error('Erreur calcul dashboard:', error);
      }
    }
  }, [user, performances, userRank, validations]);

  // Rafraîchir stats + reset visuel du graphique hebdo chaque lundi
  useEffect(() => {
    const tick = () => {
      const current = getWeekKey();
      if (current !== weekKey) setWeekKey(current);
      refreshFromStorage();
    };
    tick();
    const onFocus = () => tick();
    window.addEventListener('focus', onFocus);
    const interval = window.setInterval(tick, 60_000);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.clearInterval(interval);
    };
  }, [weekKey, refreshFromStorage]);

  // Fonction pour obtenir la couleur du rang
  const getRangColor = (rang: string) => {
    switch (rang) {
      case 'World':
        return 'from-yellow-400 to-yellow-600';
      case 'Nation':
        return 'from-purple-500 to-purple-700';
      case 'S':
        return 'from-purple-600 to-purple-800';
      case 'A':
        return 'from-red-500 to-red-700';
      case 'B':
        return 'from-blue-500 to-blue-700';
      case 'C':
        return 'from-green-500 to-green-700';
      case 'D':
        return 'from-yellow-500 to-yellow-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  // Fonction pour obtenir l'icône du rang
  const getRangIcon = (rang: string) => {
    switch (rang) {
      case 'World':
        return '🏆';
      case 'Nation':
        return '🏆';
      case 'S':
        return '🥇';
      case 'A':
        return '🥈';
      case 'B':
        return '🥉';
      case 'C':
        return '⭐';
      case 'D':
        return '🔰';
      default:
        return '⭐';
    }
  };

  // Fonction pour obtenir la statistique principale selon la classe de sport
  const getMainStatForSportClass = (sportClass: string, performances: any[]) => {
    switch (sportClass?.toLowerCase()) {
      case 'power':
      case 'powerlifting':
      case 'powerlifter':
        // Pour le powerlifting : MEILLEUR total des 3 mouvements (même session)
        // D'abord, essayer de trouver des totaux de sessions complètes
        const squatPerformances = performances.filter(p => p.discipline === 'squat');
        const benchPerformances = performances.filter(p => p.discipline === 'bench' || p.discipline === 'bench_press');
        const deadliftPerformances = performances.filter(p => p.discipline === 'deadlift');

        // Calculer le meilleur total possible en combinant les meilleures performances individuelles
        // (car on n'a pas forcément des sessions complètes enregistrées)
        const bestSquat = squatPerformances.length > 0 ? Math.max(...squatPerformances.map(p => p.value || 0)) : 0;
        const bestBench = benchPerformances.length > 0 ? Math.max(...benchPerformances.map(p => p.value || 0)) : 0;
        const bestDeadlift = deadliftPerformances.length > 0 ? Math.max(...deadliftPerformances.map(p => p.value || 0)) : 0;
        const bestTotal = bestSquat + bestBench + bestDeadlift;

        return {
          label: 'Meilleur Total',
          value: `${bestTotal} kg`,
          icon: '🏋️‍♂️',
          description: `Squat: ${bestSquat}kg + Bench: ${bestBench}kg + Deadlift: ${bestDeadlift}kg`
        };
      case 'streetlifting':
      case 'street':
        // Pour le streetlifting : MEILLEURES performances de chaque mouvement
        const streetSquat = performances.filter(p => p.discipline === 'squat').map(p => p.value || 0);
        const streetBench = performances.filter(p => p.discipline === 'bench' || p.discipline === 'bench_press').map(p => p.value || 0);
        const streetDeadlift = performances.filter(p => p.discipline === 'deadlift').map(p => p.value || 0);
        const streetPullups = performances.filter(p => p.discipline === 'pullups').map(p => p.value || 0);
        const bestStreetSquat = streetSquat.length > 0 ? Math.max(...streetSquat) : 0;
        const bestStreetBench = streetBench.length > 0 ? Math.max(...streetBench) : 0;
        const bestStreetDeadlift = streetDeadlift.length > 0 ? Math.max(...streetDeadlift) : 0;
        const bestStreetPullups = streetPullups.length > 0 ? Math.max(...streetPullups) : 0;
        const streetTotal = bestStreetSquat + bestStreetBench + bestStreetDeadlift;
        return {
          label: 'Meilleur Total Street',
          value: `${streetTotal} kg`,
          icon: '💪',
          description: `+ ${bestStreetPullups} tractions max`
        };
      case 'sprint':
        // Pour le sprint : MEILLEUR temps (le plus rapide)
        const sprint100m = performances.filter(p => p.discipline === '100m').map(p => p.value || 0);
        const sprint200m = performances.filter(p => p.discipline === '200m').map(p => p.value || 0);
        const bestTime100m = sprint100m.length > 0 ? Math.min(...sprint100m) : 0;
        const bestTime200m = sprint200m.length > 0 ? Math.min(...sprint200m) : 0;
        const maxSpeed = bestTime100m > 0 ? (100 / bestTime100m * 3.6).toFixed(1) : '0';
        return {
          label: 'Meilleur 100m',
          value: `${bestTime100m > 0 ? bestTime100m.toFixed(1) : '0'}s`,
          icon: '⚡',
          description: `Vitesse max: ${maxSpeed} km/h`
        };
      case 'marathon':
      case 'runner':
        // Pour le marathon : MEILLEUR temps de marathon ou MEILLEURE distance
        const marathonTimes = performances.filter(p => p.discipline === 'marathon').map(p => p.value || 0);
        const distances30min = performances.filter(p => p.discipline === '30min').map(p => p.value || 0);
        const bestMarathonTime = marathonTimes.length > 0 ? Math.min(...marathonTimes) : null;
        const bestDistance30min = distances30min.length > 0 ? Math.max(...distances30min) : 0;
        if (bestMarathonTime) {
          const hours = Math.floor(bestMarathonTime / 60);
          const minutes = bestMarathonTime % 60;
          return {
            label: 'Meilleur Marathon',
            value: `${hours}h${minutes.toString().padStart(2, '0')}`,
            icon: '🏃‍♂️',
            description: 'Temps record'
          };
        } else {
          return {
            label: 'Meilleure Distance',
            value: `${bestDistance30min.toFixed(1)} km`,
            icon: '🏃‍♀️',
            description: 'En 30 minutes'
          };
        }
      case 'crossfit':
        // Pour le crossfit : MEILLEURES performances par discipline
        const crossfitPerformances = performances.filter(p => ['burpees', 'pullups', 'squat', 'bench', 'bench_press'].includes(p.discipline));
        const bestCrossfitScore = crossfitPerformances.length > 0 ? Math.max(...crossfitPerformances.map(p => p.value || 0)) : 0;
        return {
          label: 'Meilleure Perf',
          value: `${bestCrossfitScore}`,
          icon: '🔥',
          description: 'Meilleure performance'
        };
      case 'calisthenics':
        // Pour le calisthenics : MEILLEURES performances
        const pullupsPerformances = performances.filter(p => p.discipline === 'pullups').map(p => p.value || 0);
        const muscleUpsPerformances = performances.filter(p => p.discipline === 'muscle_up').map(p => p.value || 0);
        const bestPullups = pullupsPerformances.length > 0 ? Math.max(...pullupsPerformances) : 0;
        const bestMuscleUps = muscleUpsPerformances.length > 0 ? Math.max(...muscleUpsPerformances) : 0;
        return {
          label: 'Meilleures Tractions',
          value: `${bestPullups} reps`,
          icon: '🆙',
          description: bestMuscleUps > 0 ? `+ ${bestMuscleUps} muscle-ups` : 'En une série'
        };
      default:
        // Pour classique : score global
        return {
          label: 'Score Global',
          value: `${userRank?.globalScore || 0} ${userRank?.scoreLabel || 'pts'}`,
          icon: '⭐',
          description: 'Performance générale'
        };
    }
  };


  // Fonctions pour gérer les interactions Dashboard
  const handleQuestComplete = (questId: string) => {
    setDailyQuests(prev => prev.map(quest => quest.id === questId ? {
      ...quest,
      completed: true,
      progress: quest.maxProgress
    } : quest));
  };

  // Mémorisé : évite de recalculer 5x par rendu (filtres/max sur performances)
  // (le cas "classique" lit aussi userRank.globalScore, doit être dans les deps)
  const mainStat = useMemo(
    () => getMainStatForSportClass(user?.sportClass || 'classique', performances),
    [user?.sportClass, performances, userRank]
  );

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Chargement...</p>
        </div>
      </div>;
  }
  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-8 relative z-10 page-transition">
      <div className="space-y-8 stagger-animation">
          
          {/* Header Principal - VitalForce DA */}
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-8 text-white shadow-[var(--shadow-glow-purple)] glass-card border border-primary/30">
            <div className="absolute inset-0 gradient-primary opacity-80"></div>
            {/* Particules flottantes VitalForce */}
            <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-16 translate-x-16 md:-translate-y-32 md:translate-x-32 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 md:w-48 md:h-48 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full translate-y-12 -translate-x-12 md:translate-y-24 md:-translate-x-24 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 md:w-48 md:h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12 md:translate-y-24 md:-translate-x-24"></div>
            
          <div className="relative z-10">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: User Info */}
                <div className="flex-1 space-y-4 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    {/* Identité : badge de rang + niveau en petite bulle */}
                    <RankBadge rank={userRank?.rank || 'D'} level={xpData?.level || 1} size="lg" animated className="shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h1 className="text-2xl md:text-4xl font-bold tracking-tight truncate text-white">
                        VitalForce
                    </h1>
                      <div className="flex items-center gap-2 mt-2 max-w-xs">
                        <Progress
                          value={xpData ? Math.min(Math.max(xpData.currentXP / xpData.xpToNextLevel * 100, 0), 100) : 0}
                          size="sm"
                          variant="subtle"
                          className="flex-1"
                          aria-label="Progression XP"
                        />
                        <span className="text-white/90 font-medium text-sm tabular-nums shrink-0">
                          {xpData ? Math.round(Math.min(Math.max(xpData.currentXP / xpData.xpToNextLevel * 100, 0), 100)) : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
                    {/* STATISTIQUE PRINCIPALE SELON LA CLASSE DE SPORT */}
                    <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-secondary to-secondary/80 text-primary-foreground font-semibold shadow-[var(--shadow-glow-blue)] text-sm md:text-base">
                      <span className="text-lg md:text-xl">{mainStat.icon}</span>
                      <span>{mainStat.label}: {mainStat.value}</span>
                    </div>
                    
                    {/* RANG CALCULÉ AVEC LES PERFORMANCES */}
                    <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold shadow-[var(--shadow-glow-purple)] text-sm md:text-base">
                      <span>Rang {userRank?.rank || 'D'}</span>
                    </div>
                
                    <Button onClick={recalculateRank} size="sm" className="bg-card/30 hover:bg-card/50 text-foreground border-primary/30 backdrop-blur-sm text-xs md:text-sm">
                      🔄 Recalculer
                    </Button>
                    
                    <Button onClick={() => window.location.href = '/stats'} size="sm" className="bg-card/30 hover:bg-card/50 text-foreground border-primary/30 backdrop-blur-sm text-xs md:text-sm">
                      ➕ Performances
                    </Button>
                </div>
              </div>

                <div className="space-y-3 md:space-y-4 mt-4">
                  <div className="text-foreground/90 font-medium text-sm md:text-base">
                    Progression vers le rang {userRank?.nextRank || 'C'}
                  </div>
                  <div className="w-full max-w-md">
                    <Progress value={userRank?.rankProgressPercent || 0} size="md" variant="subtle" />
                  </div>
                  <div className="text-xs md:text-sm">
                    <span className="text-foreground font-bold text-lg md:text-xl">
                      {Math.round(userRank?.rankProgressPercent || 0)}%
                    </span>
                    <span className="text-foreground/80"> vers le rang {userRank?.nextRank || 'C'}</span>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* NOUVEAUX COMPOSANTS DASHBOARD */}
        {/* Barre XP & Niveau */}
        <XPLevelBar />

        {/* Activité du jour : pas, distance, calories */}
        <DailyActivityWidget weightKg={user.weight} />

        {/* Calculateur de 1RM — réservé aux powerlifters */}
        {user.sportClass === 'power' && <OneRepMaxCalculator />}

        {/* Widget Quêtes */}
        <QuestWidget />

        {/* Streak & Régularité */}
        {streakData && <StreakDisplay streakData={streakData} />}

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {/* STATISTIQUE PRINCIPALE - Plus grande et mise en avant */}
            <Card className="glass-card border-primary/30 shadow-[var(--shadow-glow-purple)] md:col-span-2">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-secondary mb-1 font-semibold truncate">
                      {mainStat.label}
                    </p>
                    <p className="text-xl md:text-3xl font-bold text-foreground truncate">
                      {mainStat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {mainStat.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/15 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl md:text-3xl">
                      {mainStat.icon}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-muted-foreground mb-1 truncate">Poids</p>
                    <p className="text-lg md:text-2xl font-bold text-foreground truncate">{user.weight} kg</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/15 border border-secondary/25 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Weight className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-muted-foreground mb-1 truncate">Âge</p>
                    <p className="text-lg md:text-2xl font-bold text-foreground truncate">{user.age} ans</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/15 border border-accent/25 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-muted-foreground mb-1 truncate">Sport</p>
                    <p className="text-lg md:text-2xl font-bold text-foreground capitalize truncate">{user.sportClass}</p>
                      </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/15 border border-primary/25 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Activity className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
              </div>
            </CardContent>
          </Card>

            <Card className="glass-card border-primary/20">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-muted-foreground mb-1 truncate">Performances</p>
                    <p className="text-lg md:text-2xl font-bold text-foreground truncate">{performances.length}</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/15 border border-secondary/25 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Badges Row */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Award className="w-5 h-5 text-secondary" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HexagonBadgeRow 
                badges={[
                  { level: 1, title: 'Débutant', variant: 'bronze', unlocked: true },
                  { level: 5, title: 'Régulier', variant: 'primary', unlocked: (xpData?.level || 1) >= 5 },
                  { level: 10, title: 'Confirmé', variant: 'platinum', unlocked: (xpData?.level || 1) >= 10 },
                  { level: 25, title: 'Expert', variant: 'gold', unlocked: (xpData?.level || 1) >= 25 },
                  { level: 50, title: 'Légende', variant: 'diamond', unlocked: (xpData?.level || 1) >= 50 },
                ]}
                size="sm"
              />
            </CardContent>
          </Card>

          {/* Progression hebdomadaire (données réelles, reset lundi) */}
          <WeeklyProgressChart
            key={weekKey}
            title="Progression hebdomadaire"
            performances={performances}
            validations={validations}
          />

          {/* Accès rapide : records, graphiques, classement */}
          <ProgressionPreviewCard userRank={userRank} performancesCount={performances.length} />

          {/* Actions rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/progression'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Ma progression</h3>
                <p className="text-muted-foreground">Records, graphiques et classement</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/stats'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Mon Programme</h3>
                <p className="text-muted-foreground">Gérer mes entraînements</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/nutrition'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Apple className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Nutrition</h3>
                <p className="text-muted-foreground">Aliments, repas et objectifs</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/profile'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
              </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Mon Profil</h3>
                <p className="text-muted-foreground">Modifier mes informations</p>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;