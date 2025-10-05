import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, TrendingUp, Zap, Clock, Weight, Gauge, Activity, BarChart3, Star, Award, Flame, Sparkles, Dumbbell, Heart, CheckCircle, Play, Pause, RotateCcw, Plus, Calendar, Timer, Users, Medal, Crown, TrendingDown, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import PageLayout from '@/components/PageLayout';
import { useAuth } from '../contexts/AuthContext';
import { scoringEngine } from '../utils/scoring';

export const Stats: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [performances, setPerformances] = useState<any[]>([]);
  const [userRank, setUserRank] = useState<any>(null);
  const [globalRanking, setGlobalRanking] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'global' | 'sport' | 'weight' | 'age' | 'friends'>('global');
  const [friends, setFriends] = useState<any[]>([]);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [searchFriend, setSearchFriend] = useState('');
  
  // ÉTAT POUR LE FORMULAIRE DE PERFORMANCE
  const [performance, setPerformance] = useState({
    discipline: '',
    value: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Charger les performances depuis le localStorage
  useEffect(() => {
    if (user) {
      console.log('🔄 Stats: Chargement des performances...');
      const savedPerformances = localStorage.getItem('userPerformances');
      if (savedPerformances) {
        const performancesList = JSON.parse(savedPerformances);
        setPerformances(performancesList);
        
        console.log('📊 Stats: Performances chargées:', performancesList);
        console.log('👤 Stats: Utilisateur:', user);
        
        // Recalculer le rang avec les vraies données utilisateur
        const realRank = scoringEngine.calculateUserRank(user, performancesList);
        setUserRank(realRank);
        
        console.log('🏆 Stats: Rang calculé:', realRank);
        
        // Mettre à jour l'utilisateur avec le vrai rang
        updateUser({
          rank: realRank.rank,
          globalScore: realRank.globalScore
        });
      }
      
      // Charger le classement global
      loadGlobalRanking();
    }
  }, [user, updateUser]);

  // Fonction pour charger le classement global
  const loadGlobalRanking = () => {
    const mockRanking = [
      { id: '1', name: 'Alexandre', rank: 'S', globalScore: 950, sportClass: 'power', performances: 15, trend: 'up', weight: 85, age: 28, friends: ['2', '3'], lastActivity: '2h ago', streak: 12 },
      { id: '2', name: 'Marie', rank: 'A', globalScore: 850, sportClass: 'marathon', performances: 12, trend: 'up', weight: 60, age: 25, friends: ['1', '4'], lastActivity: '1h ago', streak: 8 },
      { id: '3', name: 'Thomas', rank: 'A', globalScore: 820, sportClass: 'crossfit', performances: 18, trend: 'down', weight: 75, age: 30, friends: ['1', '5'], lastActivity: '3h ago', streak: 5 },
      { id: '4', name: 'Sarah', rank: 'B', globalScore: 750, sportClass: 'calisthenics', performances: 10, trend: 'up', weight: 55, age: 22, friends: ['2', '6'], lastActivity: '4h ago', streak: 15 },
      { id: '5', name: 'Lucas', rank: 'B', globalScore: 720, sportClass: 'sprint', performances: 8, trend: 'stable', weight: 70, age: 26, friends: ['3', '7'], lastActivity: '5h ago', streak: 3 },
      { id: '6', name: 'Emma', rank: 'C', globalScore: 650, sportClass: 'classique', performances: 6, trend: 'up', weight: 58, age: 24, friends: ['4', '8'], lastActivity: '6h ago', streak: 7 },
      { id: '7', name: 'Pierre', rank: 'C', globalScore: 620, sportClass: 'streetlifting', performances: 9, trend: 'down', weight: 80, age: 32, friends: ['5', '9'], lastActivity: '1d ago', streak: 2 },
      { id: '8', name: 'Sophie', rank: 'D', globalScore: 580, sportClass: 'marathon', performances: 5, trend: 'stable', weight: 52, age: 20, friends: ['6', '10'], lastActivity: '2d ago', streak: 1 },
      { id: '9', name: 'Marc', rank: 'B', globalScore: 700, sportClass: 'power', performances: 11, trend: 'up', weight: 90, age: 35, friends: ['7', '11'], lastActivity: '3h ago', streak: 9 },
      { id: '10', name: 'Julie', rank: 'C', globalScore: 600, sportClass: 'calisthenics', performances: 7, trend: 'stable', weight: 50, age: 19, friends: ['8', '12'], lastActivity: '4h ago', streak: 4 },
      { id: '11', name: 'Antoine', rank: 'A', globalScore: 800, sportClass: 'crossfit', performances: 14, trend: 'up', weight: 78, age: 29, friends: ['9', '13'], lastActivity: '1h ago', streak: 11 },
      { id: '12', name: 'Camille', rank: 'B', globalScore: 680, sportClass: 'sprint', performances: 9, trend: 'down', weight: 65, age: 27, friends: ['10', '14'], lastActivity: '5h ago', streak: 6 },
    ];
    
    // Ajouter l'utilisateur actuel s'il n'est pas dans la liste
    if (user && !mockRanking.find(u => u.id === user.id)) {
      mockRanking.push({
        id: user.id,
        name: user.name || 'Vous',
        rank: userRank?.rank || 'D',
        globalScore: userRank?.globalScore || 0,
        sportClass: user.sportClass || 'classique',
        performances: performances.length,
        trend: 'stable',
        weight: user.weight || 70,
        age: user.age || 25,
        friends: [],
        lastActivity: 'Maintenant',
        streak: 1
      });
    }
    
    // Trier par score décroissant
    mockRanking.sort((a, b) => b.globalScore - a.globalScore);
    setGlobalRanking(mockRanking);
    
    // Charger les amis de l'utilisateur
    if (user) {
      const userFriends = mockRanking.filter(athlete => 
        athlete.friends.includes(user.id) || athlete.id === user.id
      );
      setFriends(userFriends);
    }
  };

  // FONCTION POUR AJOUTER UNE PERFORMANCE
  const handleAddPerformance = () => {
    if (performance.discipline && performance.value) {
      const newPerformance = {
        id: Date.now().toString(),
        discipline: performance.discipline,
        value: parseFloat(performance.value),
        date: new Date(performance.date),
        userId: user?.id || '1'
      };
      
      const newPerformances = [...performances, newPerformance];
      setPerformances(newPerformances);
      localStorage.setItem('userPerformances', JSON.stringify(newPerformances));
      
      // RECALCULER LE RANG AVEC LES VRAIES DONNÉES
      if (user) {
        const realRank = scoringEngine.calculateUserRank(user, newPerformances);
        setUserRank(realRank);
        
        // METTRE À JOUR L'UTILISATEUR AVEC LE NOUVEAU RANG
        updateUser({
          rank: realRank.rank,
          globalScore: realRank.globalScore
        });
        
        console.log('✅ Stats: Nouveau rang calculé:', realRank);
        
        // Recharger le classement global
        loadGlobalRanking();
      }
      
      // Reset form
      setPerformance({
        discipline: '',
        value: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  // FONCTION POUR SUPPRIMER UNE PERFORMANCE
  const handleDeletePerformance = (performanceId: string) => {
    const newPerformances = performances.filter(p => p.id !== performanceId);
    setPerformances(newPerformances);
    localStorage.setItem('userPerformances', JSON.stringify(newPerformances));
    
    if (user) {
      const realRank = scoringEngine.calculateUserRank(user, newPerformances);
      setUserRank(realRank);
      updateUser({
        rank: realRank.rank,
        globalScore: realRank.globalScore
      });
      
      // Recharger le classement global
      loadGlobalRanking();
    }
  };

  const getRangColor = (rang: string) => {
    switch (rang) {
      case 'S': return 'from-purple-600 to-purple-800';
      case 'A': return 'from-red-500 to-red-700';
      case 'B': return 'from-blue-500 to-blue-700';
      case 'C': return 'from-green-500 to-green-700';
      case 'D': return 'from-yellow-500 to-yellow-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const getRangIcon = (rang: string) => {
    switch (rang) {
      case 'S': return '👑';
      case 'A': return '🏆';
      case 'B': return '🥇';
      case 'C': return '🥈';
      case 'D': return '🥉';
      default: return '⭐';
    }
  };

  const getSportIcon = (sportClass: string) => {
    switch (sportClass) {
      case 'power': return '💪';
      case 'marathon': return '🏃';
      case 'crossfit': return '🔥';
      case 'calisthenics': return '🤸';
      case 'sprint': return '⚡';
      case 'classique': return '🏋️';
      case 'streetlifting': return '🏗️';
      default: return '🏃';
    }
  };

  // Fonctions pour filtrer les classements
  const getFilteredRanking = () => {
    switch (selectedCategory) {
      case 'sport':
        return globalRanking.filter(athlete => athlete.sportClass === user?.sportClass);
      case 'weight':
        if (!user?.weight) return globalRanking;
        const weightRange = 10; // ±10kg
        return globalRanking.filter(athlete => 
          Math.abs(athlete.weight - user.weight) <= weightRange
        );
      case 'age':
        if (!user?.age) return globalRanking;
        const ageRange = 5; // ±5 ans
        return globalRanking.filter(athlete => 
          Math.abs(athlete.age - user.age) <= ageRange
        );
      case 'friends':
        return friends;
      default:
        return globalRanking;
    }
  };

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'sport':
        return `Classement ${user?.sportClass || 'Sport'}`;
      case 'weight':
        return `Classement Poids (±10kg)`;
      case 'age':
        return `Classement Âge (±5ans)`;
      case 'friends':
        return 'Classement Amis';
      default:
        return 'Classement Global';
    }
  };

  const getCategoryDescription = () => {
    switch (selectedCategory) {
      case 'sport':
        return `Athlètes pratiquant le même sport que vous`;
      case 'weight':
        return `Athlètes avec un poids similaire (±10kg)`;
      case 'age':
        return `Athlètes du même âge (±5ans)`;
      case 'friends':
        return `Vos amis et vous-même`;
      default:
        return `Tous les athlètes de la plateforme`;
    }
  };

  const handleAddFriend = (friendId: string) => {
    const friend = globalRanking.find(a => a.id === friendId);
    if (friend && !friends.find(f => f.id === friendId)) {
      setFriends([...friends, friend]);
      alert(`Vous avez ajouté ${friend.name} comme ami !`);
    }
  };

  const handleRemoveFriend = (friendId: string) => {
    setFriends(friends.filter(f => f.id !== friendId));
    alert('Ami supprimé de votre liste');
  };

  // Fonctions pour préparer les données des graphiques
  const prepareChartData = () => {
    if (performances.length === 0) return [];

    // Grouper les performances par discipline
    const groupedData: { [key: string]: any[] } = {};
    performances.forEach(perf => {
      if (!groupedData[perf.discipline]) {
        groupedData[perf.discipline] = [];
      }
      groupedData[perf.discipline].push({
        date: new Date(perf.date).toLocaleDateString('fr-FR'),
        value: perf.value,
        timestamp: new Date(perf.date).getTime()
      });
    });

    // Trier par date pour chaque discipline
    Object.keys(groupedData).forEach(discipline => {
      groupedData[discipline].sort((a, b) => a.timestamp - b.timestamp);
    });

    return groupedData;
  };

  const getChartDataForDiscipline = (discipline: string) => {
    const chartData = prepareChartData();
    return chartData[discipline] || [];
  };

  const getAllChartData = () => {
    const chartData = prepareChartData();
    const allDates = new Set<string>();
    
    // Collecter toutes les dates
    Object.values(chartData).forEach(data => {
      data.forEach(item => allDates.add(item.date));
    });

    // Créer un dataset combiné
    const combinedData = Array.from(allDates).map(date => {
      const dataPoint: any = { date };
      Object.keys(chartData).forEach(discipline => {
        const disciplineData = chartData[discipline].find(item => item.date === date);
        dataPoint[discipline] = disciplineData ? disciplineData.value : null;
      });
      return dataPoint;
    });

    return combinedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getDisciplineColor = (discipline: string) => {
    const colors: { [key: string]: string } = {
      'bench': '#ef4444', // Rouge
      'squat': '#3b82f6', // Bleu
      'deadlift': '#10b981', // Vert
      '5k': '#8b5cf6', // Violet
      'pullups': '#f59e0b', // Orange
    };
    return colors[discipline] || '#6b7280';
  };

  const getDisciplineName = (discipline: string) => {
    const names: { [key: string]: string } = {
      'bench': 'Développé couché',
      'squat': 'Squat',
      'deadlift': 'Soulevé de terre',
      '5k': '5km',
      'pullups': 'Tractions',
    };
    return names[discipline] || discipline;
  };

  return (
    <PageLayout>
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
                        <BarChart3 className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                        <h1 className="text-2xl md:text-4xl font-bold tracking-tight truncate">
                          Salut, {user?.name || "Champion"} !
                    </h1>
                        <p className="text-white/90 text-sm md:text-lg mt-1 md:mt-2">Vos statistiques</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
                      <div className={`inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r ${getRangColor(userRank?.rank || "D")} text-white font-semibold shadow-lg text-sm md:text-base`}>
                        <span className="text-lg md:text-xl">{getRangIcon(userRank?.rank || "D")}</span>
                        <span>Rang {userRank?.rank || "D"}</span>
                  </div>
                      
                      <Button
                        onClick={() => {
                          const savedPerformances = localStorage.getItem('userPerformances');
                          if (savedPerformances) {
                            const performancesList = JSON.parse(savedPerformances);
                            const realRank = scoringEngine.calculateUserRank(user, performancesList);
                            setUserRank(realRank);
                            alert(`Rang recalculé : ${realRank.rank} (${realRank.globalScore}/1000)`);
                          }
                        }}
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm text-xs md:text-sm"
                      >
                        🔄 Actualiser
                      </Button>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                    <div className="text-white/90 font-medium text-sm md:text-base">Progression</div>
                <div className="w-full max-w-md">
                  <Progress 
                        value={(userRank?.globalScore || 0)} 
                        className="h-2 md:h-3 bg-white/20 rounded-full"
                  />
                </div>
                <div className="text-xs md:text-sm">
                      <span className="text-white font-bold text-lg md:text-xl">{userRank?.globalScore || 0}</span> 
                      <span className="text-white/80"> / 1000 points</span>
                </div>
              </div>
            </div>
          </div>
        </div>

            {/* Navigation Moderne */}
        <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-7 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-white/20">
                <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-semibold rounded-xl transition-all duration-300">
              <Dumbbell className="w-4 h-4 mr-2" />
              Accueil
            </TabsTrigger>
                <TabsTrigger value="performance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-semibold rounded-xl transition-all duration-300">
                  <Target className="w-4 h-4 mr-2" />
                  Performances
            </TabsTrigger>
                <TabsTrigger value="records" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-semibold rounded-xl transition-all duration-300">
              <Trophy className="w-4 h-4 mr-2" />
                  Records
            </TabsTrigger>
                <TabsTrigger value="progress" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-semibold rounded-xl transition-all duration-300">
              <TrendingUp className="w-4 h-4 mr-2" />
                  Progression
            </TabsTrigger>
                <TabsTrigger value="goals" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-semibold rounded-xl transition-all duration-300">
              <Target className="w-4 h-4 mr-2" />
              Objectifs
            </TabsTrigger>
                <TabsTrigger value="ranking" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-semibold rounded-xl transition-all duration-300">
                  <Trophy className="w-4 h-4 mr-2" />
                  Classement
            </TabsTrigger>
                <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-semibold rounded-xl transition-all duration-300">
                  <Users className="w-4 h-4 mr-2" />
                  Profil
            </TabsTrigger>
          </TabsList>

              {/* Vue d'accueil */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Programme du jour */}
                  <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Dumbbell className="w-6 h-6 text-white" />
                    </div>
                    Programme du jour
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold text-gray-800">Séance Force</h3>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            <Timer className="w-3 h-3 mr-1" />
                        45 min
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                        <p className="text-2xl font-bold text-blue-600">6</p>
                        <p className="text-sm text-gray-600">Exercices</p>
                      </div>
                          <div className="text-center p-3 bg-white rounded-xl shadow-sm">
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
                    </div>
                  </div>
                </CardContent>
              </Card>

                  {/* Stats rapides */}
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                        Aujourd'hui
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                          <span className="text-sm text-gray-600">Calories</span>
                          <span className="text-lg font-bold text-green-600">1,250</span>
                    </div>
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                          <span className="text-sm text-gray-600">Temps</span>
                          <span className="text-lg font-bold text-blue-600">45min</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                          <span className="text-sm text-gray-600">Séances</span>
                          <span className="text-lg font-bold text-purple-600">1/2</span>
                        </div>
                  </div>
                </CardContent>
              </Card>
            </div>

                {/* Activités récentes */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                  </div>
                  Activités récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                      {[
                        { exercice: 'Squats', series: '4x8', poids: '80kg', temps: '2h ago', status: 'completed' },
                        { exercice: 'Développé couché', series: '3x6', poids: '70kg', temps: '2h ago', status: 'completed' },
                        { exercice: 'Deadlift', series: '3x5', poids: '100kg', temps: '2h ago', status: 'completed' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                              <div className="font-bold text-lg text-gray-800">{activity.exercice}</div>
                              <div className="text-sm text-gray-600">{activity.series} • {activity.poids}</div>
                        </div>
                      </div>
                      <div className="text-right">
                            <div className="text-sm text-gray-600 font-medium">{activity.temps}</div>
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                          Terminé
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
              </TabsContent>

              {/* Performances */}
              <TabsContent value="performance" className="space-y-8">
                {/* Utiliser le nouveau composant PerformanceInput */}
                {/* The PerformanceInput component is not provided in the original file,
                    so we'll keep the placeholder for now. */}
                <div className="bg-white/80 backdrop-blur-sm border-0 shadow-xl p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Ajouter une performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="discipline" className="block text-sm font-medium text-gray-700 mb-1">Discipline</label>
                      <select
                        id="discipline"
                        value={performance.discipline}
                        onChange={(e) => setPerformance(prev => ({ ...prev, discipline: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Sélectionner une discipline</option>
                        <option value="bench">Développé couché</option>
                        <option value="squat">Squat</option>
                        <option value="deadlift">Soulevé de terre</option>
                        <option value="5k">5km</option>
                        <option value="pullups">Tractions</option>
                      </select>
                  </div>
                    <div>
                      <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">Valeur</label>
                      <input
                        type="number"
                        id="value"
                        value={performance.value}
                        onChange={(e) => setPerformance(prev => ({ ...prev, value: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ex: 100kg, 4min, 10 reps"
                      />
                        </div>
                        <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        id="date"
                        value={performance.date}
                        onChange={(e) => setPerformance(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                          </div>
                    <Button onClick={handleAddPerformance} className="col-span-full md:col-span-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold">
                      Ajouter Performance
                    </Button>
                          </div>
                        </div>
                
                {/* Utiliser le nouveau composant LiveRankCalculator */}
                {/* The LiveRankCalculator component is not provided in the original file,
                    so we'll keep the placeholder for now. */}
                <div className="bg-white/80 backdrop-blur-sm border-0 shadow-xl p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Rang en temps réel</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Votre rang actuel</p>
                      <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${getRangColor(userRank?.rank || "D")} text-white font-semibold shadow-lg`}>
                        <span className="text-xl">{getRangIcon(userRank?.rank || "D")}</span>
                        <span>Rang {userRank?.rank || "D"}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Votre score global</p>
                      <div className="text-4xl font-bold text-indigo-600">{userRank?.globalScore || 0}</div>
                      <p className="text-sm text-gray-600">sur 1000 points</p>
                </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Décomposition du score</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Weight className="w-4 h-4 text-red-600" /> Force: <span className="font-bold text-red-600">{userRank?.breakdown?.force || 0}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" /> Endurance: <span className="font-bold text-blue-600">{userRank?.breakdown?.endurance || 0}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dumbbell className="w-4 h-4 text-purple-600" /> Calisthéniques: <span className="font-bold text-purple-600">{userRank?.breakdown?.calisthenics || 0}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-600" /> Explosivité: <span className="font-bold text-green-600">{userRank?.breakdown?.explosivite || 0}</span>
                </div>
                    </div>
                    </div>
            </div>

                {/* Liste des performances */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-indigo-500" />
                      Vos performances ({performances.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                    {performances.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        <Dumbbell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg">Aucune performance enregistrée</p>
                        <p className="text-sm">Ajoutez votre première performance !</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {performances.map((perf) => (
                          <div key={perf.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
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
                              onClick={() => handleDeletePerformance(perf.id)}
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
          </TabsContent>

              {/* Records */}
          <TabsContent value="records" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Force */}
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader>
                  <CardTitle className="text-xl font-bold text-red-800 flex items-center gap-3">
                    <Weight className="w-6 h-6" />
                        Force - Vos Records
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                      {performances.filter(p => ['bench', 'squat', 'deadlift'].includes(p.discipline)).map((perf) => {
                        const weight = user?.weight || 75;
                        const ratio = Math.round((perf.value / weight) * 10) / 10;
                        
                        return (
                          <div key={perf.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl hover:shadow-md transition-all duration-300">
                      <div className="space-y-1">
                              <div className="font-bold text-lg capitalize text-gray-800">
                                {perf.discipline === 'bench' ? 'Développé couché' :
                                 perf.discipline === 'squat' ? 'Squat' :
                                 perf.discipline === 'deadlift' ? 'Soulevé de terre' : perf.discipline}
                              </div>
                              <div className="text-sm font-semibold text-gray-600">
                                Ratio: <span className="font-bold text-red-600">{ratio}×</span> poids corporel
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                              <div className="text-2xl font-bold text-red-600">{perf.value} kg</div>
                              <Badge className="bg-red-100 text-red-800 border-red-200 font-semibold">
                                Record
                        </Badge>
                      </div>
                    </div>
                        );
                      })}
                      
                      {performances.filter(p => ['bench', 'squat', 'deadlift'].includes(p.discipline)).length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                          <Weight className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg">Aucun record de force</p>
                          <p className="text-sm">Ajoutez vos performances !</p>
                        </div>
                      )}
                </CardContent>
              </Card>

              {/* Endurance */}
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader>
                  <CardTitle className="text-xl font-bold text-blue-800 flex items-center gap-3">
                    <Clock className="w-6 h-6" />
                        Endurance - Vos Records
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                      {performances.filter(p => p.discipline === '5k').map((perf) => (
                        <div key={perf.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all duration-300">
                      <div className="space-y-1">
                            <div className="font-bold text-lg text-gray-800">5km</div>
                            <div className="text-sm font-semibold text-gray-600">Meilleur chrono</div>
                      </div>
                      <div className="text-right space-y-2">
                            <div className="text-2xl font-bold text-blue-600">{perf.value} min</div>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-semibold">
                              Record
                        </Badge>
                      </div>
                    </div>
                  ))}
                      
                      {performances.filter(p => p.discipline === '5k').length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                          <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg">Aucun record d'endurance</p>
                          <p className="text-sm">Ajoutez vos performances !</p>
                    </div>
                      )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

               {/* Progression */}
               <TabsContent value="progress" className="space-y-8">
                 {/* Graphique global de toutes les performances */}
                 <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                   <CardHeader>
                     <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                       <TrendingUp className="w-6 h-6 text-green-600" />
                       Évolution globale de vos performances
                     </CardTitle>
                     <p className="text-gray-600">Progression de toutes vos disciplines dans le temps</p>
                   </CardHeader>
                   <CardContent>
                     {performances.length > 0 ? (
                       <div className="h-80 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                           <LineChart data={getAllChartData()}>
                             <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                             <XAxis 
                               dataKey="date" 
                               stroke="#6b7280"
                               fontSize={12}
                               tick={{ fill: '#6b7280' }}
                             />
                             <YAxis 
                               stroke="#6b7280"
                               fontSize={12}
                               tick={{ fill: '#6b7280' }}
                             />
                             <Tooltip 
                               contentStyle={{
                                 backgroundColor: 'white',
                                 border: '1px solid #e5e7eb',
                                 borderRadius: '8px',
                                 boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                               }}
                             />
                             <Legend />
                             {Object.keys(prepareChartData()).map(discipline => (
                               <Line
                                 key={discipline}
                                 type="monotone"
                                 dataKey={discipline}
                                 stroke={getDisciplineColor(discipline)}
                                 strokeWidth={3}
                                 dot={{ fill: getDisciplineColor(discipline), strokeWidth: 2, r: 4 }}
                                 activeDot={{ r: 6, stroke: getDisciplineColor(discipline), strokeWidth: 2 }}
                                 name={getDisciplineName(discipline)}
                               />
                             ))}
                           </LineChart>
                         </ResponsiveContainer>
                       </div>
                     ) : (
                       <div className="text-center text-gray-500 py-8">
                         <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                         <p className="text-lg">Aucune performance enregistrée</p>
                         <p className="text-sm">Ajoutez vos performances pour voir vos graphiques !</p>
                       </div>
                     )}
                   </CardContent>
                 </Card>

                 {/* Graphiques individuels par discipline */}
                 {Object.keys(prepareChartData()).map(discipline => {
                   const disciplineData = getChartDataForDiscipline(discipline);
                   const latestValue = disciplineData[disciplineData.length - 1]?.value;
                   const firstValue = disciplineData[0]?.value;
                   const improvement = latestValue && firstValue ? ((latestValue - firstValue) / firstValue * 100).toFixed(1) : 0;
                   
                   return (
                     <Card key={discipline} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                       <CardHeader>
                         <div className="flex items-center justify-between">
                           <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                             <div 
                               className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                               style={{ backgroundColor: getDisciplineColor(discipline) }}
                             >
                               {discipline === 'bench' ? '💪' :
                                discipline === 'squat' ? '🏋️' :
                                discipline === 'deadlift' ? '⚡' :
                                discipline === '5k' ? '🏃' :
                                discipline === 'pullups' ? '🤸‍♂️' : '📊'}
                             </div>
                             {getDisciplineName(discipline)}
                           </CardTitle>
                           <div className="text-right">
                             <div className="text-2xl font-bold" style={{ color: getDisciplineColor(discipline) }}>
                               {latestValue} {discipline === '5k' ? 'min' : discipline === 'pullups' ? 'reps' : 'kg'}
                             </div>
                              <div className="text-sm text-muted-foreground">
                                {Number(improvement) > 0 ? '+' : ''}{improvement}% d'amélioration
                              </div>
                           </div>
                         </div>
                       </CardHeader>
                       <CardContent>
                         <div className="h-64 w-full">
                           <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={disciplineData}>
                               <defs>
                                 <linearGradient id={`gradient-${discipline}`} x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor={getDisciplineColor(discipline)} stopOpacity={0.3}/>
                                   <stop offset="95%" stopColor={getDisciplineColor(discipline)} stopOpacity={0.05}/>
                                 </linearGradient>
                               </defs>
                               <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                               <XAxis 
                                 dataKey="date" 
                                 stroke="#6b7280"
                                 fontSize={12}
                                 tick={{ fill: '#6b7280' }}
                               />
                               <YAxis 
                                 stroke="#6b7280"
                                 fontSize={12}
                                 tick={{ fill: '#6b7280' }}
                               />
                               <Tooltip 
                                 contentStyle={{
                                   backgroundColor: 'white',
                                   border: '1px solid #e5e7eb',
                                   borderRadius: '8px',
                                   boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                 }}
                                 formatter={(value: any) => [
                                   `${value} ${discipline === '5k' ? 'min' : discipline === 'pullups' ? 'reps' : 'kg'}`,
                                   getDisciplineName(discipline)
                                 ]}
                               />
                               <Area
                                 type="monotone"
                                 dataKey="value"
                                 stroke={getDisciplineColor(discipline)}
                                 strokeWidth={3}
                                 fill={`url(#gradient-${discipline})`}
                                 dot={{ fill: getDisciplineColor(discipline), strokeWidth: 2, r: 4 }}
                                 activeDot={{ r: 6, stroke: getDisciplineColor(discipline), strokeWidth: 2 }}
                               />
                             </AreaChart>
                           </ResponsiveContainer>
                         </div>
                         
                         {/* Statistiques de la discipline */}
                         <div className="grid grid-cols-3 gap-4 mt-6">
                           <div className="text-center p-4 bg-gray-50 rounded-xl">
                             <div className="text-lg font-bold text-gray-800">{disciplineData.length}</div>
                             <div className="text-sm text-gray-600">Performances</div>
                           </div>
                           <div className="text-center p-4 bg-gray-50 rounded-xl">
                             <div className="text-lg font-bold text-gray-800">
                               {Math.max(...disciplineData.map(d => d.value))} {discipline === '5k' ? 'min' : discipline === 'pullups' ? 'reps' : 'kg'}
                             </div>
                             <div className="text-sm text-gray-600">Record</div>
                           </div>
                           <div className="text-center p-4 bg-gray-50 rounded-xl">
                             <div className="text-lg font-bold text-gray-800">
                               {disciplineData.length > 1 ? 
                                 ((Math.max(...disciplineData.map(d => d.value)) - Math.min(...disciplineData.map(d => d.value))) / Math.min(...disciplineData.map(d => d.value)) * 100).toFixed(1) + '%' 
                                 : '0%'
                               }
                             </div>
                             <div className="text-sm text-gray-600">Progression</div>
                           </div>
                         </div>
                       </CardContent>
                     </Card>
                   );
                 })}

                 {/* Graphique en barres des records */}
                 {performances.length > 0 && (
                   <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                     <CardHeader>
                       <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                         <Trophy className="w-6 h-6 text-yellow-600" />
                         Comparaison des records par discipline
                       </CardTitle>
                     </CardHeader>
                     <CardContent>
                       <div className="h-64 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={Object.keys(prepareChartData()).map(discipline => {
                             const disciplineData = getChartDataForDiscipline(discipline);
                             return {
                               discipline: getDisciplineName(discipline),
                               record: Math.max(...disciplineData.map(d => d.value)),
                               color: getDisciplineColor(discipline)
                             };
                           })}>
                             <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                             <XAxis 
                               dataKey="discipline" 
                               stroke="#6b7280"
                               fontSize={12}
                               tick={{ fill: '#6b7280' }}
                             />
                             <YAxis 
                               stroke="#6b7280"
                               fontSize={12}
                               tick={{ fill: '#6b7280' }}
                             />
                             <Tooltip 
                               contentStyle={{
                                 backgroundColor: 'white',
                                 border: '1px solid #e5e7eb',
                                 borderRadius: '8px',
                                 boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                               }}
                             />
                             <Bar 
                               dataKey="record" 
                               fill="#3b82f6"
                               radius={[4, 4, 0, 0]}
                             />
                           </BarChart>
                         </ResponsiveContainer>
                       </div>
                     </CardContent>
                   </Card>
                 )}
               </TabsContent>

          {/* Objectifs */}
              <TabsContent value="goals" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <Target className="w-6 h-6 text-purple-600" />
                  Prochain objectif
                </CardTitle>
              </CardHeader>
              <CardContent>
                    <div className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 text-center space-y-6">
                  <div className="text-6xl animate-bounce">🎯</div>
                  
                  <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-800">Atteignez le niveau supérieur</h3>
                        <div className="text-4xl font-bold text-purple-600">Rang {userRank?.rank === 'S' ? 'World' : userRank?.rank === 'A' ? 'S' : 'A'}</div>
                        <div className="text-lg font-semibold text-gray-600">
                          Continuez à vous améliorer !
                    </div>
                  </div>
                  
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-lg px-8 py-3">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Accepter le défi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

               {/* Classement Global */}
               <TabsContent value="ranking" className="space-y-8">
                 {/* Filtres de catégorie */}
                 <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                   <CardHeader>
                     <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                       <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                         <Target className="w-5 h-5 text-white" />
                       </div>
                       Filtrer le classement
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                       <Button
                         variant={selectedCategory === 'global' ? 'default' : 'outline'}
                         onClick={() => setSelectedCategory('global')}
                         className={`${selectedCategory === 'global' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''} font-semibold`}
                       >
                         🌍 Global
                       </Button>
                       <Button
                         variant={selectedCategory === 'sport' ? 'default' : 'outline'}
                         onClick={() => setSelectedCategory('sport')}
                         className={`${selectedCategory === 'sport' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''} font-semibold`}
                       >
                         {getSportIcon(user?.sportClass || 'classique')} Sport
                       </Button>
                       <Button
                         variant={selectedCategory === 'weight' ? 'default' : 'outline'}
                         onClick={() => setSelectedCategory('weight')}
                         className={`${selectedCategory === 'weight' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''} font-semibold`}
                       >
                         ⚖️ Poids
                       </Button>
                       <Button
                         variant={selectedCategory === 'age' ? 'default' : 'outline'}
                         onClick={() => setSelectedCategory('age')}
                         className={`${selectedCategory === 'age' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''} font-semibold`}
                       >
                         🎂 Âge
                       </Button>
                       <Button
                         variant={selectedCategory === 'friends' ? 'default' : 'outline'}
                         onClick={() => setSelectedCategory('friends')}
                         className={`${selectedCategory === 'friends' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''} font-semibold`}
                       >
                         👥 Amis
                       </Button>
                     </div>
                   </CardContent>
                 </Card>

                 {/* Header du classement */}
                 <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                   <CardHeader>
                     <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                       <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                         <Trophy className="w-6 h-6 text-white" />
                       </div>
                       {getCategoryTitle()}
                     </CardTitle>
                     <p className="text-gray-600">{getCategoryDescription()}</p>
                   </CardHeader>
                   <CardContent>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="text-center p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
                         <div className="text-3xl font-bold text-yellow-600 mb-2">
                           {getFilteredRanking().findIndex(u => u.id === user?.id) + 1 || 'N/A'}
                         </div>
                         <div className="text-lg font-semibold text-gray-800">Votre position</div>
                         <div className="text-sm text-gray-600">sur {getFilteredRanking().length} athlètes</div>
                       </div>
                       <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                         <div className="text-3xl font-bold text-blue-600 mb-2">
                           {userRank?.globalScore || 0}
                         </div>
                         <div className="text-lg font-semibold text-gray-800">Votre score</div>
                         <div className="text-sm text-gray-600">sur 1000 points</div>
                       </div>
                       <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                         <div className="text-3xl font-bold text-green-600 mb-2">
                           {performances.length}
                         </div>
                         <div className="text-lg font-semibold text-gray-800">Performances</div>
                         <div className="text-sm text-gray-600">enregistrées</div>
                       </div>
                     </div>
                   </CardContent>
                </Card>

                 {/* Liste du classement */}
                 <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                   <CardHeader>
                     <CardTitle className="text-xl font-bold flex items-center gap-2">
                       <Medal className="w-5 h-5 text-yellow-500" />
                       Top Athlètes ({getFilteredRanking().length})
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <div className="space-y-4">
                       {getFilteredRanking().map((athlete, index) => {
                        const isCurrentUser = athlete.id === user?.id;
                        const getPositionIcon = (position: number) => {
                          switch (position) {
                            case 1: return '🥇';
                            case 2: return '🥈';
                            case 3: return '🥉';
                            default: return `${position}`;
                          }
                        };

                        const getTrendIcon = (trend: string) => {
                          switch (trend) {
                            case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
                            case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
                            default: return <Minus className="w-4 h-4 text-gray-500" />;
                          }
                        };

                        return (
                          <div 
                            key={athlete.id} 
                            className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                              isCurrentUser 
                                ? 'bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-300 shadow-lg' 
                                : 'bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-md'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg">
                                {getPositionIcon(index + 1)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className={`font-bold text-lg ${isCurrentUser ? 'text-blue-800' : 'text-gray-800'}`}>
                                    {athlete.name}
                                  </span>
                                  {isCurrentUser && <Badge className="bg-blue-500 text-white">Vous</Badge>}
                                </div>
                                 <div className="flex items-center gap-2 text-sm text-gray-600">
                                   <span>{getSportIcon(athlete.sportClass)}</span>
                                   <span className="capitalize">{athlete.sportClass}</span>
                                   <span>•</span>
                                   <span>{athlete.performances} performances</span>
                                   <span>•</span>
                                   <span>{athlete.weight}kg</span>
                                   <span>•</span>
                                   <span>{athlete.age}ans</span>
                                   <span>•</span>
                                   <span className="text-orange-600 font-semibold">🔥{athlete.streak}</span>
                                 </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className={`font-bold text-xl ${isCurrentUser ? 'text-blue-600' : 'text-gray-800'}`}>
                                  {athlete.globalScore}
                                </div>
                                <div className="text-sm text-gray-600">points</div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getRangColor(athlete.rank)} text-white font-semibold text-sm`}>
                                  <span>{getRangIcon(athlete.rank)}</span>
                                  <span>{athlete.rank}</span>
                                </div>
                                {getTrendIcon(athlete.trend)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Statistiques du classement */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-purple-500" />
                        Répartition par rang
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                         {['S', 'A', 'B', 'C', 'D'].map(rank => {
                           const count = getFilteredRanking().filter(a => a.rank === rank).length;
                           const percentage = getFilteredRanking().length > 0 ? Math.round((count / getFilteredRanking().length) * 100) : 0;
                          
                          return (
                            <div key={rank} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{getRangIcon(rank)}</span>
                                <span className="font-semibold text-gray-800">Rang {rank}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full bg-gradient-to-r ${getRangColor(rank)}`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-semibold text-gray-600 w-8">{count}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-green-500" />
                        Répartition par sport
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                         {['power', 'marathon', 'crossfit', 'calisthenics', 'sprint', 'classique', 'streetlifting'].map(sport => {
                           const count = getFilteredRanking().filter(a => a.sportClass === sport).length;
                           const percentage = getFilteredRanking().length > 0 ? Math.round((count / getFilteredRanking().length) * 100) : 0;
                          const sportNames: { [key: string]: string } = {
                            'power': 'Powerlifting',
                            'marathon': 'Marathon',
                            'crossfit': 'CrossFit',
                            'calisthenics': 'Calisthénics',
                            'sprint': 'Sprint',
                            'classique': 'Musculation',
                            'streetlifting': 'Street Lifting'
                          };
                          
                          return (
                            <div key={sport} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{getSportIcon(sport)}</span>
                                <span className="font-semibold text-gray-800">{sportNames[sport]}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-semibold text-gray-600 w-8">{count}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Gestion des amis */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      Gérer vos amis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Ajoutez des amis pour comparer vos performances et vous motiver mutuellement !
                      </p>
                      
                      {/* Bouton pour ajouter des amis */}
                      <Button
                        onClick={() => setShowAddFriendModal(true)}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter des amis
                      </Button>

                      {/* Liste des amis actuels */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800">Vos amis ({friends.length - 1})</h4>
                        {friends.filter(f => f.id !== user?.id).map(friend => (
                          <div key={friend.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {friend.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">{friend.name}</div>
                                <div className="text-sm text-gray-600">
                                  {getSportIcon(friend.sportClass)} {friend.sportClass} • {friend.weight}kg • {friend.age}ans
                                </div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => handleRemoveFriend(friend.id)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Modal pour ajouter des amis */}
                {showAddFriendModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md bg-white">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Ajouter des amis</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAddFriendModal(false)}
                          >
                            ✕
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Rechercher un athlète..."
                            value={searchFriend}
                            onChange={(e) => setSearchFriend(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="max-h-60 overflow-y-auto space-y-2">
                          {globalRanking
                            .filter(athlete => 
                              athlete.id !== user?.id && 
                              !friends.find(f => f.id === athlete.id) &&
                              athlete.name.toLowerCase().includes(searchFriend.toLowerCase())
                            )
                            .slice(0, 10)
                            .map(athlete => (
                              <div key={athlete.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                    {athlete.name.charAt(0)}
                                  </div>
                                  <span className="font-medium">{athlete.name}</span>
                                </div>
                                <Button
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                  onClick={() => {
                                    handleAddFriend(athlete.id);
                                    setShowAddFriendModal(false);
                                  }}
                                >
                                  + Ajouter
                                </Button>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              {/* Profil */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <Users className="w-6 h-6 text-indigo-600" />
                      Informations du profil
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                          <div className="text-sm text-gray-600 mb-1">Nom</div>
                          <div className="text-lg font-semibold text-gray-800">{user?.name || "Utilisateur"}</div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                          <div className="text-sm text-gray-600 mb-1">Poids</div>
                          <div className="text-lg font-semibold text-gray-800">{user?.weight || 75} kg</div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                          <div className="text-sm text-gray-600 mb-1">Âge</div>
                          <div className="text-lg font-semibold text-gray-800">{user?.age || 28} ans</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                          <div className="text-sm text-gray-600 mb-1">Sexe</div>
                          <div className="text-lg font-semibold text-gray-800">{user?.sex || "male"}</div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl">
                          <div className="text-sm text-gray-600 mb-1">Sport</div>
                          <div className="text-lg font-semibold text-gray-800">{user?.sportClass || "classique"}</div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                          <div className="text-sm text-gray-600 mb-1">Rang actuel</div>
                          <div className="text-lg font-semibold text-gray-800">{userRank?.rank || "D"}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Stats;