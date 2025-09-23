import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, Target, TrendingUp, Zap, Clock, Weight, 
  Gauge, Activity, BarChart3, Star, Award, Flame, 
  Sparkles, Dumbbell, Heart, CheckCircle, Play, Pause, 
  RotateCcw, Plus, Calendar, Timer, Users, Settings, 
  Bell, Search, Sun, Moon, Medal, Crown 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { scoringEngine } from '../utils/scoring';
import PageLayout from '../components/PageLayout';

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
      case 'World': return '👑';
      case 'Nation': return '🏆';
      case 'S': return '🥇';
      case 'A': return '🥈';
      case 'B': return '🥉';
      case 'C': return '⭐';
      case 'D': return '🔰';
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
                      {performances.slice(0, 3).map((perf, index) => (
                        <div key={perf.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-lg text-gray-800">
                                {perf.discipline === 'bench' ? 'Développé couché' :
                                 perf.discipline === 'squat' ? 'Squat' :
                                 perf.discipline === 'deadlift' ? 'Soulevé de terre' : perf.discipline}
                              </div>
                              <div className="text-sm text-gray-600">{perf.value} kg</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600 font-medium">
                              {new Date(perf.date).toLocaleDateString()}
                            </div>
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
                {/* Formulaire d'ajout de performance */}
                <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 border-0 shadow-2xl">
                  <CardContent className="p-8 text-white">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold mb-2">🎯 Ajoutez vos performances</h2>
                      <p className="text-white/90 text-lg">Entrez vos performances pour calculer votre rang réel</p>
                    </div>
                    
                    <div className="max-w-md mx-auto space-y-4">
                      <select
                        value={performance.discipline}
                        onChange={(e) => setPerformance({ ...performance, discipline: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-gray-800 text-lg font-semibold border-0 shadow-lg"
                      >
                        <option value="">Choisissez votre discipline</option>
                        <option value="bench">💪 Développé couché (kg)</option>
                        <option value="squat">🏋️ Squat (kg)</option>
                        <option value="deadlift">⚡ Soulevé de terre (kg)</option>
                        <option value="5k">🏃 5km (min)</option>
                        <option value="pullups">🤸‍♂️ Tractions (reps)</option>
                      </select>
                      
                      <input
                        type="number"
                        value={performance.value}
                        onChange={(e) => setPerformance({ ...performance, value: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-gray-800 text-lg font-semibold border-0 shadow-lg"
                        placeholder="Entrez votre performance"
                        step="0.1"
                      />
                      
                      <input
                        type="date"
                        value={performance.date}
                        onChange={(e) => setPerformance({ ...performance, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-gray-800 text-lg font-semibold border-0 shadow-lg"
                      />
                      
                      <button
                        onClick={handleAddPerformance}
                        className="w-full bg-white text-emerald-600 px-6 py-4 rounded-xl text-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
                      >
                        <Plus className="w-5 h-5 inline mr-2" />
                        AJOUTER MA PERFORMANCE
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Affichage du rang calculé */}
                {userRank && (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2">
                        <Medal className="w-6 h-6 text-yellow-500" />
                        Votre rang calculé : {userRank.rank}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-5xl font-bold text-indigo-600 mb-2">
                        {userRank.globalScore}/1000
                      </div>
                      <div className="text-lg text-gray-600 mb-4">Score global</div>
                      <div className="text-sm text-gray-500">
                        {userRank.reason}
                      </div>
                    </CardContent>
                  </Card>
                )}

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

              {/* Autres onglets... */}
              <TabsContent value="records" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Vos Records</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Section records en cours de développement...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Votre Progression</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Section progression en cours de développement...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="goals" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Vos Objectifs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Section objectifs en cours de développement...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Votre Profil</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Section profil en cours de développement...</p>
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