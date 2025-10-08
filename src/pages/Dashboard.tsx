
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { useExerciseValidation } from '../contexts/ExerciseContext';
import { scoringEngine } from '../utils/scoring';
import { 
  Dumbbell, Target, TrendingUp, Zap, Clock, Weight, 
  Gauge, Activity, BarChart3, Star, Award, Flame, 
  Sparkles, Heart, CheckCircle, Play, Pause, RotateCcw, 
  Plus, Calendar, Timer, Users, Settings, Bell, Search 
} from 'lucide-react';

// Nouveaux composants pour le Dashboard
import { XPLevelBar } from '@/components/XPLevelBar';
import { DailyQuests } from '@/components/DailyQuests';
import { QuestWidget } from '@/components/QuestWidget';
import { StreakDisplay } from '@/components/StreakDisplay';

// Utilitaires pour les calculs
import { 
  calculateXPData, 
  generateDailyQuests, 
  calculateStreakData 
} from '@/utils/statsCalculator';
import { XPData, DailyQuest, StreakData } from '@/types/stats';

export const Dashboard: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { xpData } = useExerciseValidation();
  const [userRank, setUserRank] = useState<any>(null);
  const [performances, setPerformances] = useState<any[]>([]);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  // NOUVEAUX ÉTATS POUR LES COMPOSANTS DASHBOARD
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>([]);
  const [streakData, setStreakData] = useState<StreakData | null>(null);

  // FONCTION POUR RECALCULER LE RANG
  const recalculateRank = () => {
    if (user) {
      console.log('🔄 RECALCUL FORCÉ DU RANG');
      const savedPerformances = localStorage.getItem('userPerformances');
      if (savedPerformances) {
        const performancesList = JSON.parse(savedPerformances);
        console.log('📊 Performances pour recalcul:', performancesList);
        
        const realRank = scoringEngine.calculateUserRank(user, performancesList);
        console.log('🏆 Nouveau rang calculé:', realRank);
        
        setUserRank(realRank);
        updateUser({
          rank: realRank.rank,
          globalScore: realRank.globalScore
        });
        
        // Mettre à jour les performances
        setPerformances(performancesList);
        
        // Debug info
        setDebugInfo({
          userWeight: user.weight,
          userSex: user.sex,
          userSportClass: user.sportClass,
          performancesCount: performancesList.length,
          performances: performancesList,
          calculatedRank: realRank
        });
        
        alert(`Rang recalculé : ${realRank.rank} (${realRank.globalScore}/1000)`);
      }
    }
  };

  // Charger les performances et calculer le rang
  useEffect(() => {
    if (user) {
      console.log('🔄 Dashboard: DÉBUT DU CHARGEMENT');
      console.log('👤 Utilisateur:', user);
      
      const savedPerformances = localStorage.getItem('userPerformances');
      console.log('💾 Performances brutes du localStorage:', savedPerformances);
      
      if (savedPerformances) {
        try {
          const performancesList = JSON.parse(savedPerformances);
          console.log('📊 Performances parsées:', performancesList);
          setPerformances(performancesList);
          
          // Calculer le rang avec les vraies performances
          console.log('🧮 Calcul du rang...');
          const realRank = scoringEngine.calculateUserRank(user, performancesList);
          console.log('🏆 Rang calculé:', realRank);
          setUserRank(realRank);
          
          // Debug info
          setDebugInfo({
            userWeight: user.weight,
            userSex: user.sex,
            userSportClass: user.sportClass,
            performancesCount: performancesList.length,
            performances: performancesList,
            calculatedRank: realRank
          });
          
          // Mettre à jour l'utilisateur avec le vrai rang
          if (realRank.rank !== user.rank || realRank.globalScore !== user.globalScore) {
            updateUser({
              rank: realRank.rank,
              globalScore: realRank.globalScore
            });
            console.log('✅ Utilisateur mis à jour avec le nouveau rang');
          }

          // CALCULER LES DONNÉES POUR LE DASHBOARD
          try {
            // Convertir les performances au bon format
            const formattedPerformances = performancesList.map((p: any) => ({
              id: p.id || Math.random().toString(),
              userId: user.id,
              discipline: { id: p.discipline, name: p.discipline },
              value: parseFloat(p.value) || 0,
              units: 'kg',
              date: new Date(p.date),
              context: 'raw',
              verified: true
            }));

          // Calculer les données pour le dashboard
          const calculatedStreakData = calculateStreakData(user as any, formattedPerformances);
          const calculatedXpData = calculateXPData(user as any, formattedPerformances, calculatedStreakData);
          const generatedQuests = generateDailyQuests(user as any);

          // Mettre à jour les états
          setDailyQuests(generatedQuests);
          setStreakData(calculatedStreakData);

            console.log('✅ Données Dashboard calculées:', {
              xpData: calculatedXpData,
              streakData: calculatedStreakData
            });
          } catch (error) {
            console.error('❌ Erreur lors du calcul des données Dashboard:', error);
          }
        } catch (error) {
          console.error('❌ Erreur lors du parsing des performances:', error);
        }
      } else {
        console.log('⚠️ Aucune performance trouvée dans localStorage');
        const defaultRank = {
          rank: 'D',
          globalScore: 0,
          breakdown: { force: 0, endurance: 0, explosivite: 0, calisthenics: 0 },
          reason: 'Aucune performance enregistrée'
        };
        setUserRank(defaultRank);
        setDebugInfo({
          userWeight: user.weight,
          userSex: user.sex,
          userSportClass: user.sportClass,
          performancesCount: 0,
          performances: [],
          calculatedRank: defaultRank
        });
      }
    }
  }, [user, updateUser]);

  // Fonction pour obtenir la couleur du rang
  const getRangColor = (rang: string) => {
    switch (rang) {
      case 'World': return 'from-yellow-400 to-yellow-600';
      case 'Nation': return 'from-purple-500 to-purple-700';
      case 'S': return 'from-purple-600 to-purple-800';
      case 'A': return 'from-red-500 to-red-700';
      case 'B': return 'from-blue-500 to-blue-700';
      case 'C': return 'from-green-500 to-green-700';
      case 'D': return 'from-yellow-500 to-yellow-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  // Fonction pour obtenir l'icône du rang
  const getRangIcon = (rang: string) => {
    switch (rang) {
      case 'World': return '🏆';
      case 'Nation': return '🏆';
      case 'S': return '🥇';
      case 'A': return '🥈';
      case 'B': return '🥉';
      case 'C': return '⭐';
      case 'D': return '🔰';
      default: return '⭐';
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
        
        // DEBUG: Afficher les performances pour comprendre le calcul
        console.log('🏋️ DEBUG POWERLIFTING:', {
          squatPerformances: squatPerformances.map(p => ({ value: p.value, date: p.date })),
          benchPerformances: benchPerformances.map(p => ({ value: p.value, date: p.date })),
          deadliftPerformances: deadliftPerformances.map(p => ({ value: p.value, date: p.date })),
          bestSquat,
          bestBench,
          bestDeadlift,
          bestTotal,
          allPerformances: performances.map(p => ({ discipline: p.discipline, value: p.value, date: p.date }))
        });
        
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
        const maxSpeed = bestTime100m > 0 ? ((100 / bestTime100m) * 3.6).toFixed(1) : '0';
        
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
        const crossfitPerformances = performances.filter(p => 
          ['burpees', 'pullups', 'squat', 'bench', 'bench_press'].includes(p.discipline)
        );
        const bestCrossfitScore = crossfitPerformances.length > 0 ? 
          Math.max(...crossfitPerformances.map(p => p.value || 0)) : 0;
        
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
          value: `${userRank?.globalScore || 0}/1000`,
          icon: '⭐',
          description: 'Performance générale'
        };
    }
  };

  // Fonction pour calculer la progression vers le rang supérieur
  const getRankProgression = (currentRank: string, currentScore: number) => {
    const rankThresholds = {
      'D': { min: 0, max: 200 },
      'C': { min: 200, max: 400 },
      'B': { min: 400, max: 600 },
      'A': { min: 600, max: 800 },
      'S': { min: 800, max: 900 },
      'Nation': { min: 900, max: 950 },
      'World': { min: 950, max: 1000 }
    };

    const threshold = rankThresholds[currentRank as keyof typeof rankThresholds];
    if (!threshold) return { percentage: 100, nextRank: 'World' };

    // Calculer le pourcentage dans le rang actuel
    const range = threshold.max - threshold.min;
    const progress = currentScore - threshold.min;
    const percentage = Math.min(Math.max((progress / range) * 100, 0), 100);

    // Déterminer le rang suivant
    const ranks = ['D', 'C', 'B', 'A', 'S', 'Nation', 'World'];
    const currentIndex = ranks.indexOf(currentRank);
    const nextRank = currentIndex < ranks.length - 1 ? ranks[currentIndex + 1] : 'World';

    return { percentage, nextRank };
  };

  // Fonctions pour gérer les interactions Dashboard
  const handleQuestComplete = (questId: string) => {
    setDailyQuests(prev => prev.map(quest => 
      quest.id === questId 
        ? { ...quest, completed: true, progress: quest.maxProgress }
        : quest
    ));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
          
          {/* Header Principal - Design Moderne */}
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8 text-white shadow-2xl">
            {/* Effets visuels */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16 md:-translate-y-32 md:translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 md:w-48 md:h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12 md:translate-y-24 md:-translate-x-24"></div>
            
          <div className="relative z-10">
              <div className="flex flex-col gap-6">
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-3 md:p-4 bg-white/20 rounded-xl md:rounded-2xl backdrop-blur-sm flex-shrink-0">
                      <Dumbbell className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                      <h1 className="text-2xl md:text-4xl font-bold tracking-tight truncate">
                        Salut, Kelyan !
                    </h1>
                      <p className="text-white/90 text-sm md:text-lg mt-1 md:mt-2">Votre tableau de bord</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
                    {/* STATISTIQUE PRINCIPALE SELON LA CLASSE DE SPORT */}
                    {(() => {
                      const mainStat = getMainStatForSportClass(user.sportClass, performances);
                      return (
                        <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg text-sm md:text-base">
                          <span className="text-lg md:text-xl">{mainStat.icon}</span>
                          <span>{mainStat.label}: {mainStat.value}</span>
                        </div>
                      );
                    })()}
                    
                    {/* RANG CALCULÉ AVEC LES PERFORMANCES */}
                    <div className={`inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r ${getRangColor(userRank?.rank || 'D')} text-white font-semibold shadow-lg text-sm md:text-base`}>
                      <span className="text-lg md:text-xl">{getRangIcon(userRank?.rank || 'D')}</span>
                      <span>Rang {userRank?.rank || 'D'}</span>
                </div>
                
                    <Button
                      onClick={recalculateRank}
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm text-xs md:text-sm"
                    >
                      🔄 Recalculer
                    </Button>
                    
                    <Button
                      onClick={() => window.location.href = '/stats'}
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm text-xs md:text-sm"
                    >
                      📊 Stats
                    </Button>
                </div>
              </div>

                <div className="space-y-3 md:space-y-4 mt-4">
                  {(() => {
                    const progression = getRankProgression(userRank?.rank || 'D', userRank?.globalScore || 0);
                    return (
                      <>
                        <div className="text-white/90 font-medium text-sm md:text-base">
                          Progression vers le rang {progression.nextRank}
                        </div>
                        <div className="w-full max-w-md">
                          <Progress 
                            value={progression.percentage} 
                            className="h-2 md:h-3 bg-white/20 rounded-full"
                          />
                        </div>
                        <div className="text-xs md:text-sm">
                          <span className="text-white font-bold text-lg md:text-xl">
                            {Math.round(progression.percentage)}%
                          </span> 
                          <span className="text-white/80"> vers le rang {progression.nextRank}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
            </div>
          </div>
        </div>

        {/* NOUVEAUX COMPOSANTS DASHBOARD */}
        {/* Barre XP & Niveau */}
        <XPLevelBar />

        {/* Widget Quêtes */}
        <QuestWidget />

        {/* Streak & Régularité */}
        {streakData && <StreakDisplay streakData={streakData} />}

          {/* DEBUG INFO - Masqué par défaut */}
          {false && (
            <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">🐛 DEBUG INFO</h3>
              <div className="text-sm text-yellow-700 space-y-1">
                <p><strong>Utilisateur:</strong></p>
                <p>Poids: {user?.weight || 75}kg</p>
                <p>Sexe: {user?.sex || 'male'}</p>
                <p>Sport: {user?.sportClass || 'classique'}</p>
                <p>Âge: {user?.age || 25} ans</p>
                <p><strong>Performances:</strong></p>
                <p>Nombre: {performances.length}</p>
                <p><strong>Détail:</strong> {JSON.stringify(performances, null, 2)}</p>
                <p><strong>Rang calculé:</strong></p>
                <p>{JSON.stringify(userRank, null, 2)}</p>
                </div>
                </div>
          )}

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {/* STATISTIQUE PRINCIPALE - Plus grande et mise en avant */}
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 backdrop-blur-sm border-2 border-emerald-200 shadow-xl md:col-span-2">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-emerald-600 mb-1 font-semibold truncate">
                      {getMainStatForSportClass(user.sportClass, performances).label}
                    </p>
                    <p className="text-xl md:text-3xl font-bold text-emerald-700 truncate">
                      {getMainStatForSportClass(user.sportClass, performances).value}
                    </p>
                    <p className="text-xs text-emerald-500 mt-1">
                      {getMainStatForSportClass(user.sportClass, performances).description}
                    </p>
                  </div>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl md:text-3xl">
                      {getMainStatForSportClass(user.sportClass, performances).icon}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-muted-foreground mb-1 truncate">Poids</p>
                    <p className="text-lg md:text-2xl font-bold text-foreground truncate">{user.weight} kg</p>
              </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Weight className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>
            </div>
          </CardContent>
        </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-muted-foreground mb-1 truncate">Âge</p>
                    <p className="text-lg md:text-2xl font-bold text-foreground truncate">{user.age} ans</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-muted-foreground mb-1 truncate">Sport</p>
                    <p className="text-lg md:text-2xl font-bold text-foreground capitalize truncate">{user.sportClass}</p>
                      </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Activity className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                  </div>
              </div>
            </CardContent>
          </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-muted-foreground mb-1 truncate">Performances</p>
                    <p className="text-lg md:text-2xl font-bold text-foreground truncate">{performances.length}</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-pink-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Détail du rang calculé */}
          {userRank && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                  <Award className="w-6 h-6 text-yellow-500" />
                  Votre rang calculé
              </CardTitle>
            </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r ${getRangColor(userRank.rank)} text-white font-bold text-2xl shadow-lg`}>
                    <span className="text-2xl">{getRangIcon(userRank.rank)}</span>
                    <span>Rang {userRank.rank}</span>
                      </div>
                  
                  <div className="text-4xl font-bold text-indigo-600">
                    {userRank.globalScore}/1000
                      </div>
                  <div className="text-lg text-gray-600">Score global</div>
                    </div>

                {/* Barre de progression */}
                    <div className="space-y-2">
                  {(() => {
                    const progression = getRankProgression(userRank.rank, userRank.globalScore);
                    return (
                      <>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Progression vers le rang {progression.nextRank}</span>
                          <span>{Math.round(progression.percentage)}%</span>
                        </div>
                        <Progress value={progression.percentage} className="h-4" />
                      </>
                    );
                  })()}
                      </div>

                {/* Détail des scores */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Force</div>
                    <div className="text-2xl font-bold text-red-600">{userRank.breakdown.force}</div>
                    </div>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Endurance</div>
                    <div className="text-2xl font-bold text-blue-600">{userRank.breakdown.endurance}</div>
                  </div>
                </div>

                {/* Informations contextuelles */}
                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Calcul basé sur</div>
                  <div className="text-lg font-semibold text-gray-800">{userRank.reason}</div>
                </div>

                {/* Bouton pour aller aux stats */}
                <Button
                  onClick={() => window.location.href = '/stats'}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Voir le détail de mes performances
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Actions rapides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/stats'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Mes Statistiques</h3>
                <p className="text-gray-600">Voir mes performances et mon rang</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/programme'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Mon Programme</h3>
                <p className="text-gray-600">Gérer mes entraînements</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/profile'}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
              </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Mon Profil</h3>
                <p className="text-gray-600">Modifier mes informations</p>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
