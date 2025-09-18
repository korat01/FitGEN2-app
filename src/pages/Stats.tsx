import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, TrendingUp, Zap, Clock, Weight, Gauge, Activity, BarChart3, Star, Award, Flame, Sparkles, Dumbbell, Heart, CheckCircle, Play, Pause, RotateCcw } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { LiveRankCalculator } from '../components/LiveRankCalculator';
import { PerformanceInput } from '../components/PerformanceInput';
import { useAuth } from '../contexts/AuthContext';
import { ScoringEngine } from '../utils/scoring';
import { getSportProfile } from '../utils/standardsData';

interface UserStats {
  nom: string;
  rang: string;
  xp: number;
  xpMax: number;
  multiplicateur: number;
  stats: {
    force: number;
    endurance: number;
    vitesse: number;
    poidsCorps: number;
  };
  records: {
    force: {
      squat: { poids: number; ratio: number };
      bench: { poids: number; ratio: number };
      deadlift: { poids: number; ratio: number };
    };
    endurance: {
      km1: { temps: string };
      km5: { temps: string };
    };
    vitesse: {
      sprint100m: { temps: string };
    };
    poidsCorps: {
      pushups: { max: number };
      tractions: { max: number };
    };
  };
  historique: {
    date: string;
    squat: number;
    km5: number;
    pushups: number;
  }[];
  prochainObjectif: {
    description: string;
    valeur: string;
    rangCible: string;
  };
}

export const Stats: React.FC = () => {
  const { user } = useAuth();
  const [performances, setPerformances] = useState<any[]>([]);
  const [userRank, setUserRank] = useState<any>(null);
  
  // ÉTAT POUR LE FORMULAIRE DE PERFORMANCE
  const [performance, setPerformance] = useState({
    discipline: '',
    value: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Charger les performances depuis le localStorage
  useEffect(() => {
    const savedPerformances = localStorage.getItem('userPerformances');
    if (savedPerformances) {
      setPerformances(JSON.parse(savedPerformances));
    }
  }, []);

  // Sauvegarder les performances
  const savePerformances = (newPerformances: any[]) => {
    setPerformances(newPerformances);
    localStorage.setItem('userPerformances', JSON.stringify(newPerformances));
  };

  // Ajouter une nouvelle performance
  const handlePerformanceAdded = (performance: any) => {
    const newPerformances = [...performances, performance];
    savePerformances(newPerformances);
  };

  // Supprimer une performance
  const handlePerformanceDeleted = (performanceId: string) => {
    const newPerformances = performances.filter(p => p.id !== performanceId);
    savePerformances(newPerformances);
  };

  // FONCTION SIMPLIFIÉE POUR CALCULER LE RANG DIRECTEMENT
  const calculateSimpleRank = (performancesList: any[]) => {
    if (!user || performancesList.length === 0) {
      return { rank: 'D', score: 0, reason: 'Aucune performance' };
    }

    let totalScore = 0;
    let performanceCount = 0;

    performancesList.forEach((perf) => {
      const weight = user.weight || 75;
      let score = 0;

      switch (perf.discipline) {
        case 'bench':
          // Avec 180kg pour 75kg = 2.4x poids corporel
          if (perf.value >= 180) score = 800; // Rang A/S
          else if (perf.value >= 150) score = 600; // Rang B
          else if (perf.value >= 120) score = 400; // Rang C
          else score = 200; // Rang D
          break;
          
        case 'squat':
          if (perf.value >= 200) score = 800;
          else if (perf.value >= 160) score = 600;
          else if (perf.value >= 120) score = 400;
          else score = 200;
          break;
          
        case 'deadlift':
          if (perf.value >= 250) score = 800;
          else if (perf.value >= 200) score = 600;
          else if (perf.value >= 150) score = 400;
          else score = 200;
          break;
          
        case '5k':
          if (perf.value <= 20) score = 800; // Très rapide
          else if (perf.value <= 25) score = 600;
          else if (perf.value <= 30) score = 400;
          else score = 200;
          break;
          
        case 'pullups':
          if (perf.value >= 25) score = 800;
          else if (perf.value >= 15) score = 600;
          else if (perf.value >= 10) score = 400;
          else score = 200;
          break;
      }

      totalScore += score;
      performanceCount++;
    });

    const averageScore = totalScore / performanceCount;
    
    // Déterminer le rang
    let rank = 'D';
    if (averageScore >= 750) rank = 'S';
    else if (averageScore >= 650) rank = 'A';
    else if (averageScore >= 500) rank = 'B';
    else if (averageScore >= 350) rank = 'C';

    return {
      rank,
      score: Math.round(averageScore),
      reason: `Basé sur ${performanceCount} performance(s)`
    };
  };

  // MODIFIER LA FONCTION handleAddPerformance
  const handleAddPerformance = () => {
    if (performance.discipline && performance.value) {
      const newPerformance = {
        id: Date.now().toString(),
        discipline: performance.discipline,
        value: parseFloat(performance.value),
        date: new Date(performance.date),
        userId: user?.id || '1'
      };
      
      // Ajouter la performance
      const newPerformances = [...performances, newPerformance];
      setPerformances(newPerformances);
      localStorage.setItem('userPerformances', JSON.stringify(newPerformances));
      
      // CALCULER LE RANG SIMPLE IMMÉDIATEMENT
      const simpleRank = calculateSimpleRank(newPerformances);
      setUserRank(simpleRank);
      
      // Mettre à jour l'utilisateur
      const updatedUser = {
        ...user,
        rank: simpleRank.rank,
        globalScore: simpleRank.score
      };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      
      // FORCER LE RECHARGEMENT DE LA PAGE POUR ACTUALISER L'AFFICHAGE
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
      // Reset form
      setPerformance({
        discipline: '',
        value: '',
        date: new Date().toISOString().split('T')[0]
      });
      
      alert(`Performance ajoutée ! Votre rang est maintenant : ${simpleRank.rank} (${simpleRank.score}/1000)`);
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  // FONCTION POUR RECALCULER LE RANG AVEC LES PERFORMANCES
  const calculateRealRankWithPerformances = (performancesList: any[]) => {
    if (!user || performancesList.length === 0) {
      setUserRank(null);
      return;
    }

    try {
      const scoringEngine = new ScoringEngine();
      
      // Calculer les scores normalisés pour chaque performance
      const userScores: { [discipline: string]: number } = {};
      
      performancesList.forEach((perf: any) => {
        const normalizedScore = scoringEngine.calculateNormalizedScore(
          perf.value,
          perf.discipline,
          user.sex || 'male',
          user.weight || 75,
          user.age || 28
        );
        
        // Garder le meilleur score pour chaque discipline
        if (!userScores[perf.discipline] || normalizedScore > userScores[perf.discipline]) {
          userScores[perf.discipline] = normalizedScore;
        }
      });
      
      // Créer le profil utilisateur
      const userProfile = {
        id: user.id || '1',
        name: user.name || 'Utilisateur',
        weights: getSportProfile(user.sportClass || 'classique')
      };
      
      // Calculer le score global
      const globalScore = scoringEngine.calculateGlobalScore(
        userScores,
        userProfile,
        user.sportClass || 'classique'
      );
      
      setUserRank(globalScore);
      
      // METTRE À JOUR LE RANG DE L'UTILISATEUR
      updateUserRank(globalScore);
      
      console.log('Rang recalculé:', globalScore);
      console.log('Performances utilisées:', performancesList);
      
    } catch (error) {
      console.error('Erreur lors du calcul du rang:', error);
    }
  };

  // Modifier la fonction calculateRealRank pour utiliser les performances actuelles
  const calculateRealRank = () => {
    calculateRealRankWithPerformances(performances);
  };

  useEffect(() => {
    calculateRealRank();
  }, [performances, user]);

  // AJOUTER CET EFFET POUR CHARGER LE RANG AU DÉMARRAGE
  useEffect(() => {
    const savedPerformances = localStorage.getItem('userPerformances');
    if (savedPerformances) {
      const performancesList = JSON.parse(savedPerformances);
      const simpleRank = calculateSimpleRank(performancesList);
      setUserRank(simpleRank);
      console.log('Rang chargé au démarrage:', simpleRank);
    }
  }, [user]);

  // FONCTION POUR METTRE À JOUR LE RANG DE L'UTILISATEUR
  const updateUserRank = (newRank: any) => {
    if (!user || !newRank) return;
    
    // Mettre à jour l'utilisateur avec le nouveau rang
    const updatedUser = {
      ...user,
      rank: newRank.rank,
      globalScore: newRank.globalScore,
      breakdown: newRank.breakdown
    };
    
    // Sauvegarder dans le localStorage
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    
    // Mettre à jour le contexte d'authentification si possible
    // Note: Vous devrez peut-être ajuster cela selon votre contexte d'auth
    console.log('Rang mis à jour:', newRank.rank);
  };

  // FONCTION POUR METTRE À JOUR LES RECORDS ET L'HISTORIQUE
  const updateRecordsAndHistory = (performancesList: any[]) => {
    if (!user || performancesList.length === 0) return;

    // Créer les records à partir des performances
    const records = {
      force: {
        squat: { poids: 0, ratio: 0 },
        bench: { poids: 0, ratio: 0 },
        deadlift: { poids: 0, ratio: 0 }
      },
      endurance: {
        km1: { temps: "0:00" },
        km5: { temps: "0:00" }
      },
      vitesse: {
        sprint100m: { temps: "0.0s" }
      },
      poidsCorps: {
        pushups: { max: 0 },
        tractions: { max: 0 }
      }
    };

    // Trouver les meilleures performances
    performancesList.forEach((perf) => {
      const weight = user.weight || 75;
      
      switch (perf.discipline) {
        case 'bench':
          if (perf.value > records.force.bench.poids) {
            records.force.bench.poids = perf.value;
            records.force.bench.ratio = Math.round((perf.value / weight) * 10) / 10;
          }
          break;
        case 'squat':
          if (perf.value > records.force.squat.poids) {
            records.force.squat.poids = perf.value;
            records.force.squat.ratio = Math.round((perf.value / weight) * 10) / 10;
          }
          break;
        case 'deadlift':
          if (perf.value > records.force.deadlift.poids) {
            records.force.deadlift.poids = perf.value;
            records.force.deadlift.ratio = Math.round((perf.value / weight) * 10) / 10;
          }
          break;
        case '5k':
          if (records.endurance.km5.temps === "0:00" || perf.value < parseFloat(records.endurance.km5.temps)) {
            records.endurance.km5.temps = `${perf.value}:00`;
          }
          break;
        case 'pullups':
          if (perf.value > records.poidsCorps.tractions.max) {
            records.poidsCorps.tractions.max = perf.value;
          }
          break;
      }
    });

    // Créer l'historique à partir des performances
    const historique = performancesList
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5) // Garder les 5 dernières performances
      .map((perf) => ({
        date: new Date(perf.date).toLocaleDateString(),
        squat: perf.discipline === 'squat' ? perf.value : 0,
        km5: perf.discipline === '5k' ? perf.value : 0,
        pushups: perf.discipline === 'pullups' ? perf.value : 0
      }));

    // Mettre à jour l'utilisateur avec les nouveaux records et historique
    const updatedUser = {
      ...user,
      records: records,
      historique: historique
    };

    // Sauvegarder dans le localStorage
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    
    return updatedUser;
  };

  // Stats du tableau de bord
  const dashboardStats = [
    { label: 'Séances cette semaine', value: '4', icon: Dumbbell, color: 'blue', change: '+2' },
    { label: 'Calories brûlées', value: '1,250', icon: Flame, color: 'orange', change: '+15%' },
    { label: 'Temps d\'entraînement', value: '3h 45m', icon: Clock, color: 'green', change: '+30min' },
    { label: 'Objectifs atteints', value: '8/10', icon: Target, color: 'purple', change: '+3' }
  ];

  const recentActivities = [
    { exercice: 'Squats', series: '4x8', poids: '80kg', temps: '2h ago', status: 'completed' },
    { exercice: 'Développé couché', series: '3x6', poids: '70kg', temps: '2h ago', status: 'completed' },
    { exercice: 'Deadlift', series: '3x5', poids: '100kg', temps: '2h ago', status: 'completed' },
    { exercice: 'Tractions', series: '3x8', poids: '0kg', temps: '2h ago', status: 'completed' }
  ];

  const achievements = [
    { nom: 'Premier pas', description: 'Première séance terminée', icon: '👶', unlocked: true },
    { nom: 'Régulier', description: '7 jours consécutifs', icon: '🔥', unlocked: true },
    { nom: 'Force brute', description: '100kg au squat', icon: '💪', unlocked: false },
    { nom: 'Marathonien', description: '5km en moins de 20min', icon: '🏃', unlocked: false }
  ];

  const getRangColor = (rang: string) => {
    switch (rang) {
      case 'S': return 'bg-gradient-to-r from-purple-600 to-purple-800';
      case 'A': return 'bg-gradient-to-r from-red-500 to-red-700';
      case 'B': return 'bg-gradient-to-r from-blue-500 to-blue-700';
      case 'C': return 'bg-gradient-to-r from-green-500 to-green-700';
      case 'D': return 'bg-gradient-to-r from-yellow-500 to-yellow-700';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-700';
    }
  };

  const getStatColor = (stat: string) => {
    switch (stat) {
      case 'force': return 'text-red-600';
      case 'endurance': return 'text-blue-600';
      case 'vitesse': return 'text-amber-600';
      case 'poidsCorps': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatBgColor = (stat: string) => {
    switch (stat) {
      case 'force': return 'bg-gradient-to-br from-red-50 to-red-100 border-red-300';
      case 'endurance': return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300';
      case 'vitesse': return 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300';
      case 'poidsCorps': return 'bg-gradient-to-br from-green-50 to-green-100 border-green-300';
      default: return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300';
    }
  };

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'force': return <Weight className="w-6 h-6" />;
      case 'endurance': return <Clock className="w-6 h-6" />;
      case 'vitesse': return <Gauge className="w-6 h-6" />;
      case 'poidsCorps': return <Activity className="w-6 h-6" />;
      default: return <Activity className="w-6 h-6" />;
    }
  };

  const getBadgeTitle = (exercice: string, valeur: number) => {
    if (exercice === 'squat' && valeur >= 200) return 'Titan';
    if (exercice === 'deadlift' && valeur >= 250) return 'Hercule';
    if (exercice === 'bench' && valeur >= 150) return 'Forge';
    if (exercice === 'km5' && valeur <= 20) return 'Faucon';
    if (exercice === 'pushups' && valeur >= 50) return 'Machine';
    if (exercice === 'tractions' && valeur >= 25) return 'Singe';
    return 'Champion';
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
        {/* Header Principal avec animation */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
          {/* Particules animées */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
            <div className="absolute top-8 right-8 w-1 h-1 bg-blue-400/50 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-1/4 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce"></div>
            <div className="absolute bottom-8 right-1/3 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <BarChart3 className="w-8 h-8 group-hover:animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold tracking-tight text-white group-hover:scale-105 transition-transform duration-300">
                      Bienvenue, {user?.name || "Utilisateur"}
                    </h1>
                    <p className="text-white/90 text-xl font-medium mt-2">Tableau de bord & Statistiques</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <Badge className={`${getRangColor(userRank?.rank || "D")} text-white text-lg px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300`}>
                    <Star className="w-4 h-4 mr-2" />
                    Rang {userRank?.rank || "D"}
                  </Badge>
                  <Button
                    onClick={() => {
                      const savedPerformances = localStorage.getItem('userPerformances');
                      if (savedPerformances) {
                        const performancesList = JSON.parse(savedPerformances);
                        const simpleRank = calculateSimpleRank(performancesList);
                        setUserRank(simpleRank);
                        alert(`Rang recalculé : ${simpleRank.rank} (${simpleRank.score}/1000)`);
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    🔄 Recalculer mon rang
                  </Button>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
                    <Zap className="w-5 h-5 group-hover:animate-pulse" />
                    <span className="text-white font-medium">×{user?.multiplicateur || 1.25} assiduité</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
                    <Flame className="w-5 h-5 group-hover:animate-bounce" />
                    <span className="text-white font-medium">7 jours de streak</span>
                  </div>
                </div>
              </div>

              <div className="lg:text-right space-y-4">
                <div className="text-white/90 font-medium text-lg">Progression vers le prochain rang</div>
                <div className="w-80">
                  <Progress 
                    value={(user?.xp || 0 / user?.xpMax || 3000) * 100} 
                    className="h-4 bg-white/20 rounded-full"
                  />
                </div>
                <div className="text-sm">
                  <span className="text-white font-bold text-xl">{user?.xp || 0}</span> 
                  <span className="text-white/80"> / {user?.xpMax || 3000} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-white p-2 rounded-xl shadow-lg border-2 border-slate-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md font-semibold rounded-lg transition-all duration-300">
              <Dumbbell className="w-4 h-4 mr-2" />
              Accueil
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md font-semibold rounded-lg transition-all duration-300">
              <Activity className="w-4 h-4 mr-2" />
              Tableau de bord
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md font-semibold rounded-lg transition-all duration-300">
              <BarChart3 className="w-4 h-4 mr-2" />
              Stats Globales
            </TabsTrigger>
            <TabsTrigger value="records" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md font-semibold rounded-lg transition-all duration-300">
              <Trophy className="w-4 h-4 mr-2" />
              Mes Records
            </TabsTrigger>
            <TabsTrigger value="historique" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md font-semibold rounded-lg transition-all duration-300">
              <TrendingUp className="w-4 h-4 mr-2" />
              Historique
            </TabsTrigger>
            <TabsTrigger value="objectifs" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md font-semibold rounded-lg transition-all duration-300">
              <Target className="w-4 h-4 mr-2" />
              Objectifs
            </TabsTrigger>
          </TabsList>

          {/* Vue Accueil (ancienne page Overview) */}
          <TabsContent value="overview" className="space-y-8">
            {/* Cartes principales */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Programme du jour */}
              <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Dumbbell className="w-6 h-6 text-white" />
                    </div>
                    Programme du jour
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-white/80 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">Séance Force - Haut du corps</h3>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        45 min
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">6</p>
                        <p className="text-sm text-gray-600">Exercices</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">3</p>
                        <p className="text-sm text-gray-600">Terminés</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progression</span>
                        <span>50%</span>
                      </div>
                      <Progress value={50} className="h-3" />
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold">
                        <Play className="w-4 h-4 mr-2" />
                        Commencer
                      </Button>
                      <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                        <Pause className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Calories et nutrition */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    Nutrition
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800 mb-1">1850</div>
                    <div className="text-sm text-gray-600 mb-2">/ 2200 calories</div>
                    <Progress value={84} className="h-3 mb-4" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Protéines</span>
                      <span className="text-sm font-semibold text-gray-800">120g / 150g</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Glucides</span>
                      <span className="text-sm font-semibold text-gray-800">180g / 220g</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Lipides</span>
                      <span className="text-sm font-semibold text-gray-800">65g / 80g</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold">
                    Voir le détail
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Progression hebdomadaire */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    Progression hebdomadaire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/80 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-800 w-12">{day}</span>
                          {index < 3 ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                          )}
                        </div>
                        <div className="text-right">
                          {index < 3 ? (
                            <span className="font-semibold text-gray-800">{75.2 - index * 0.2} kg</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    Objectifs du mois
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Séances complétées</span>
                      <span className="text-sm font-semibold text-gray-800">12 / 16</span>
                    </div>
                    <Progress value={75} className="h-3" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Perte de poids</span>
                      <span className="text-sm font-semibold text-gray-800">2.1 / 4 kg</span>
                    </div>
                    <Progress value={52.5} className="h-3" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Force générale</span>
                      <span className="text-sm font-semibold text-gray-800">+15%</span>
                    </div>
                    <Progress value={60} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Grid avec animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <Card key={index} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 border-2 border-${stat.color}-300 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-${stat.color}-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-black group-hover:scale-110 transition-transform duration-300 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-black font-medium mb-2">{stat.label}</div>
                    <Badge className={`bg-${stat.color}-200 text-${stat.color}-800 border-${stat.color}-300 text-xs`}>
                      {stat.change}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Activités récentes avec design amélioré */}
            <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-300 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-black text-2xl">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  Activités récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-lg text-black group-hover:scale-105 transition-transform duration-300">{activity.exercice}</div>
                          <div className="text-sm text-black">{activity.series} • {activity.poids}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-black font-medium">{activity.temps}</div>
                        <Badge className="bg-green-200 text-green-800 border-green-300 text-xs">
                          Terminé
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements avec animations */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-black text-2xl">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 group ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-300 shadow-lg' 
                        : 'bg-white border-slate-200'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className={`text-4xl group-hover:scale-110 transition-transform duration-300 ${
                          achievement.unlocked ? 'animate-pulse' : 'grayscale'
                        }`}>
                          {achievement.icon}
                        </div>
                        <div>
                          <div className={`font-bold text-lg group-hover:scale-105 transition-transform duration-300 ${
                            achievement.unlocked ? 'text-black' : 'text-gray-400'
                          }`}>
                            {achievement.nom}
                          </div>
                          <div className={`text-sm ${
                            achievement.unlocked ? 'text-black' : 'text-gray-400'
                          }`}>
                            {achievement.description}
                          </div>
                        </div>
                        {achievement.unlocked && (
                          <div className="ml-auto">
                            <Badge className="bg-green-200 text-green-800 border-green-300">
                              Débloqué
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-300 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-black text-2xl">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Button className="h-20 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-lg">
                    <Dumbbell className="w-6 h-6 mr-3" />
                    Commencer l'entraînement
                  </Button>
                  <Button className="h-20 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-lg">
                    <Target className="w-6 h-6 mr-3" />
                    Voir mes objectifs
                  </Button>
                  <Button className="h-20 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-lg">
                    <TrendingUp className="w-6 h-6 mr-3" />
                    Mes statistiques
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Globales */}
          <TabsContent value="stats" className="space-y-8">
            {/* BOUTON TRÈS VISIBLE POUR AJOUTER DES PERFORMANCES */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">🎯 Ajoutez vos performances !</h2>
              <p className="text-xl mb-6">Entrez vos performances pour calculer votre rang réel</p>
              
              <div className="max-w-md mx-auto space-y-4">
                <select
                  value={performance.discipline}
                  onChange={(e) => setPerformance({ ...performance, discipline: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg text-black text-lg font-semibold"
                >
                  <option value="">Choisissez votre discipline</option>
                  <option value="bench">💪 Développé couché (kg)</option>
                  <option value="squat">🏋️ Squat (kg)</option>
                  <option value="deadlift">⚡ Soulevé de terre (kg)</option>
                  <option value="5k">�� 5km (min)</option>
                  <option value="pullups">��‍♂️ Tractions (reps)</option>
                </select>
                
                <input
                  type="number"
                  value={performance.value}
                  onChange={(e) => setPerformance({ ...performance, value: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg text-black text-lg font-semibold"
                  placeholder="Entrez votre performance"
                  step="0.1"
                />
                
                <input
                  type="date"
                  value={performance.date}
                  onChange={(e) => setPerformance({ ...performance, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg text-black text-lg font-semibold"
                />
                
                <button
                  onClick={handleAddPerformance}
                  className="w-full bg-white text-green-600 px-6 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-colors"
                >
                  �� AJOUTER MA PERFORMANCE
                </button>
              </div>
            </div>

            {/* AFFICHAGE DU RANG CALCULÉ */}
            {userRank && (
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                    �� Votre rang calculé : {userRank.rank}
                    <Button
                      onClick={() => {
                        const savedPerformances = localStorage.getItem('userPerformances');
                        if (savedPerformances) {
                          const performancesList = JSON.parse(savedPerformances);
                          const simpleRank = calculateSimpleRank(performancesList);
                          setUserRank(simpleRank);
                        }
                      }}
                      size="sm"
                      variant="outline"
                      className="ml-2"
                    >
                      🔄 Actualiser
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {userRank.score}/1000
                  </div>
                  <div className="text-lg text-gray-600 mb-4">Score global</div>
                  
                  <div className="text-sm text-gray-600">
                    {userRank.reason}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* LISTE DES PERFORMANCES AJOUTÉES */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  📊 Vos performances ({performances.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {performances.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    Aucune performance enregistrée. Ajoutez votre première performance !
                  </div>
                ) : (
                  <div className="space-y-4">
                    {performances.map((perf) => (
                      <div key={perf.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                        <div>
                          <div className="font-medium text-lg">
                            {perf.discipline === 'bench' ? '💪 Développé couché' :
                             perf.discipline === 'squat' ? '🏋️ Squat' :
                             perf.discipline === 'deadlift' ? '⚡ Soulevé de terre' :
                             perf.discipline === '5k' ? '🏃 5km' :
                             perf.discipline === 'pullups' ? '🤸‍♂️ Tractions' : perf.discipline}
                          </div>
                          <div className="text-sm text-gray-500">
                            {perf.value} {perf.discipline === '5k' ? 'min' : 'kg'} - {new Date(perf.date).toLocaleDateString()}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePerformanceDeleted(perf.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          Supprimer
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Profil de Performance */}
            <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-300 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-black flex items-center gap-3">
                  <Award className="w-6 h-6 text-amber-600" />
                  Profil de Performance
                </CardTitle>
                <p className="text-black font-medium">Vue d'ensemble de vos capacités physiques</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {Object.entries(user?.stats || {}).map(([stat, valeur]) => (
                    <div key={stat} className="text-center space-y-3 group">
                      <div className={`w-20 h-20 mx-auto rounded-full ${getStatColor(stat)} bg-opacity-20 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                        {getStatIcon(stat)}
                      </div>
                      <div className="space-y-1">
                        <div className="text-lg font-bold capitalize text-black">
                          {stat === 'poidsCorps' ? 'Poids du Corps' : stat}
                        </div>
                        <div className="text-2xl font-bold text-black group-hover:scale-110 transition-transform duration-300">{valeur}</div>
                        <div className="text-sm font-semibold text-black">sur 100</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mes Records */}
          <TabsContent value="records" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Force */}
              <Card className="border-2 border-red-300 bg-gradient-to-br from-red-50 to-red-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-red-800 flex items-center gap-3">
                    <Weight className="w-6 h-6" />
                    Force - Vos Records
                  </CardTitle>
                  <p className="text-red-700 font-medium">Basés sur vos performances réelles</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Afficher les records calculés à partir des performances */}
                  {performances.filter(p => ['bench', 'squat', 'deadlift'].includes(p.discipline)).map((perf) => {
                    const weight = user?.weight || 75;
                    const ratio = Math.round((perf.value / weight) * 10) / 10;
                    
                    return (
                      <div key={perf.id} className="flex justify-between items-center p-4 bg-white rounded-xl border-2 border-red-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className="space-y-1">
                          <div className="font-bold text-lg capitalize text-black">
                            {perf.discipline === 'bench' ? 'Développé couché' :
                             perf.discipline === 'squat' ? 'Squat' :
                             perf.discipline === 'deadlift' ? 'Soulevé de terre' : perf.discipline}
                          </div>
                          <div className="text-sm font-semibold text-black">
                            Ratio: <span className="font-bold text-red-600">{ratio}×</span> poids corporel
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="text-2xl font-bold text-red-600">{perf.value} kg</div>
                          <Badge className="bg-red-200 text-red-800 border-red-400 font-semibold">
                            {getBadgeTitle(perf.discipline, perf.value)}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                  
                  {performances.filter(p => ['bench', 'squat', 'deadlift'].includes(p.discipline)).length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      Aucun record de force enregistré. Ajoutez vos performances !
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Endurance */}
              <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-blue-800 flex items-center gap-3">
                    <Clock className="w-6 h-6" />
                    Endurance - Vos Records
                  </CardTitle>
                  <p className="text-blue-700 font-medium">Basés sur vos performances réelles</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {performances.filter(p => p.discipline === '5k').map((perf) => (
                    <div key={perf.id} className="flex justify-between items-center p-4 bg-white rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <div className="space-y-1">
                        <div className="font-bold text-lg text-black">5km</div>
                        <div className="text-sm font-semibold text-black">Meilleur chrono</div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-2xl font-bold text-blue-600">{perf.value} min</div>
                        <Badge className="bg-blue-200 text-blue-800 border-blue-400 font-semibold">
                          {getBadgeTitle('5k', perf.value)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  {performances.filter(p => p.discipline === '5k').length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      Aucun record d'endurance enregistré. Ajoutez vos performances !
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Poids du Corps */}
              <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-green-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-green-800 flex items-center gap-3">
                    <Activity className="w-6 h-6" />
                    Poids du Corps - Vos Records
                  </CardTitle>
                  <p className="text-green-700 font-medium">Basés sur vos performances réelles</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {performances.filter(p => p.discipline === 'pullups').map((perf) => (
                    <div key={perf.id} className="flex justify-between items-center p-4 bg-white rounded-xl border-2 border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <div className="space-y-1">
                        <div className="font-bold text-lg capitalize text-black">Tractions</div>
                        <div className="text-sm font-semibold text-black">Maximum en une série</div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-2xl font-bold text-green-600">{perf.value}</div>
                        <Badge className="bg-green-200 text-green-800 border-green-400 font-semibold">
                          {getBadgeTitle('pullups', perf.value)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  {performances.filter(p => p.discipline === 'pullups').length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      Aucun record au poids du corps enregistré. Ajoutez vos performances !
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Historique */}
          <TabsContent value="historique" className="space-y-6">
            <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-300 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  Évolution de vos performances
                </CardTitle>
                <p className="text-black font-medium">Basé sur vos performances réelles</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {performances
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 10)
                    .map((perf, index) => (
                      <div key={perf.id} className="p-6 bg-white rounded-xl border-2 border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-bold text-black group-hover:scale-105 transition-transform duration-300">
                            {new Date(perf.date).toLocaleDateString()}
                          </h4>
                          <Badge className="bg-blue-200 text-blue-800 border-blue-300">
                            Performance
                          </Badge>
                        </div>
                        
                        <div className="text-center p-4 bg-gray-50 rounded-lg border">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {perf.value} {perf.discipline === '5k' ? 'min' : perf.discipline === 'pullups' ? 'reps' : 'kg'}
                          </div>
                          <div className="text-lg font-semibold text-black">
                            {perf.discipline === 'bench' ? '💪 Développé couché' :
                             perf.discipline === 'squat' ? '🏋️ Squat' :
                             perf.discipline === 'deadlift' ? '⚡ Soulevé de terre' :
                             perf.discipline === '5k' ? '🏃 5km' :
                             perf.discipline === 'pullups' ? '🤸‍♂️ Tractions' : perf.discipline}
                          </div>
                        </div>
                      </div>
                    ))}
                  
                  {performances.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      Aucune performance enregistrée. Ajoutez vos performances pour voir votre historique !
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Objectifs */}
          <TabsContent value="objectifs" className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black flex items-center gap-3">
                  <Target className="w-6 h-6 text-purple-600" />
                  Prochain objectif
                </CardTitle>
                <p className="text-black font-medium">Ce que vous devez accomplir pour progresser</p>
              </CardHeader>
              <CardContent>
                <div className="p-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl border-2 border-purple-200 text-center space-y-6">
                  <div className="text-6xl animate-bounce">🎯</div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-black">{user?.prochainObjectif?.description}</h3>
                    <div className="text-4xl font-bold text-purple-600">{user?.prochainObjectif?.valeur}</div>
                    <div className="text-lg font-semibold text-black">
                      Pour atteindre le rang <Badge className={`${getRangColor(user?.prochainObjectif?.rangCible || "D")} text-white ml-2`}>
                        {user?.prochainObjectif?.rangCible || "D"}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-lg px-8 py-3">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Accepter le défi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default Stats;