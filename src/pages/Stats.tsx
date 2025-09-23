import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, TrendingUp, Zap, Clock, Weight, Gauge, Activity, BarChart3, Star, Award, Flame, Sparkles, Dumbbell, Heart, CheckCircle, Play, Pause, RotateCcw, Plus, Calendar, Timer, Users, Medal, Crown } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useAuth } from '../contexts/AuthContext';
import { scoringEngine } from '../utils/scoring';

export const Stats: React.FC = () => {
  const { user, updateUser } = useAuth();
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
    }
  }, [user, updateUser]);

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

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
            
            {/* Header Principal - Design Moderne */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 p-8 text-white shadow-2xl">
              {/* Effets visuels */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
              
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <BarChart3 className="w-8 h-8" />
                  </div>
                  <div>
                        <h1 className="text-4xl font-bold tracking-tight">
                          Salut, {user?.name || "Champion"} !
                    </h1>
                        <p className="text-white/90 text-lg mt-2">Votre tableau de bord personnel</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                      <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${getRangColor(userRank?.rank || "D")} text-white font-semibold shadow-lg`}>
                        <span className="text-xl">{getRangIcon(userRank?.rank || "D")}</span>
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
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                      >
                        🔄 Actualiser
                      </Button>
                </div>
              </div>

              <div className="lg:text-right space-y-4">
                    <div className="text-white/90 font-medium">Progression</div>
                <div className="w-80">
                  <Progress 
                        value={(userRank?.globalScore || 0)} 
                        className="h-3 bg-white/20 rounded-full"
                  />
                </div>
                <div className="text-sm">
                      <span className="text-white font-bold text-xl">{userRank?.globalScore || 0}</span> 
                      <span className="text-white/80"> / 1000 points</span>
                </div>
              </div>
            </div>
          </div>
        </div>

            {/* Navigation Moderne */}
        <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-white/20">
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
              <TabsContent value="progress" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  Évolution de vos performances
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                      {performances
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .slice(0, 10)
                        .map((perf, index) => (
                          <div key={perf.id} className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                              <h4 className="text-lg font-bold text-gray-800">
                                {new Date(perf.date).toLocaleDateString()}
                              </h4>
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                Performance
                        </Badge>
                      </div>
                      
                            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                              <div className="text-3xl font-bold text-indigo-600 mb-2">
                                {perf.value} {perf.discipline === '5k' ? 'min' : perf.discipline === 'pullups' ? 'reps' : 'kg'}
                        </div>
                              <div className="text-lg font-semibold text-gray-800">
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
                          <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg">Aucune performance enregistrée</p>
                          <p className="text-sm">Ajoutez vos performances pour voir votre historique !</p>
                        </div>
                      )}
                </div>
              </CardContent>
            </Card>
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