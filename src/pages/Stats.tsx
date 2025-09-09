import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, TrendingUp, Zap, Clock, Weight, Gauge, Activity, BarChart3, Star, Award, Flame, Sparkles } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

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

const Stats: React.FC = () => {
  const [userStats] = useState<UserStats>({
    nom: "Alexandre Martin",
    rang: "B",
    xp: 2450,
    xpMax: 3000,
    multiplicateur: 1.25,
    stats: {
      force: 78,
      endurance: 60,
      vitesse: 45,
      poidsCorps: 85
    },
    records: {
      force: {
        squat: { poids: 180, ratio: 2.1 },
        bench: { poids: 120, ratio: 1.4 },
        deadlift: { poids: 200, ratio: 2.3 }
      },
      endurance: {
        km1: { temps: "3:45" },
        km5: { temps: "22:30" }
      },
      vitesse: {
        sprint100m: { temps: "12.8s" }
      },
      poidsCorps: {
        pushups: { max: 45 },
        tractions: { max: 18 }
      }
    },
    historique: [
      { date: "2024-01", squat: 160, km5: 25, pushups: 35 },
      { date: "2024-02", squat: 165, km5: 24, pushups: 38 },
      { date: "2024-03", squat: 170, km5: 23, pushups: 40 },
      { date: "2024-04", squat: 175, km5: 23, pushups: 42 },
      { date: "2024-05", squat: 180, km5: 22.5, pushups: 45 }
    ],
    prochainObjectif: {
      description: "Atteins 2.5× ton poids au squat",
      valeur: "212.5 kg",
      rangCible: "A"
    }
  });

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
      <div className="space-y-8">
        {/* Header Principal avec animation */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
                    <BarChart3 className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white">{userStats.nom}</h1>
                    <p className="text-white/90 text-lg font-medium">Vos performances en un coup d'œil</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <Badge className={`${getRangColor(userStats.rang)} text-white text-lg px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300`}>
                    <Star className="w-4 h-4 mr-2" />
                    Rang {userStats.rang}
                  </Badge>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors duration-300">
                    <Flame className="w-5 h-5 text-orange-400" />
                    <span className="text-lg font-semibold text-white">×{userStats.multiplicateur}</span>
                    <span className="text-white/90 text-sm font-medium">assiduité</span>
                  </div>
                </div>
              </div>

              <div className="lg:text-right space-y-3">
                <div className="text-white/90 font-medium">Progression vers le prochain rang</div>
                <div className="w-80">
                  <Progress 
                    value={(userStats.xp / userStats.xpMax) * 100} 
                    className="h-3 bg-white/20"
                  />
                </div>
                <div className="text-sm">
                  <span className="text-white font-bold text-lg">{userStats.xp}</span> 
                  <span className="text-white/80"> / {userStats.xpMax} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="stats" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white p-2 rounded-xl shadow-lg border-2 border-slate-200">
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

          {/* Stats Globales */}
          <TabsContent value="stats" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(userStats.stats).map(([stat, valeur]) => (
                <Card key={stat} className={`${getStatBgColor(stat)} border-2 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group`}>
                  <CardContent className="p-6 text-center">
                    <div className={`${getStatColor(stat)} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                      {getStatIcon(stat)}
                    </div>
                    <h3 className="text-xl font-bold capitalize mb-3 text-black">
                      {stat === 'poidsCorps' ? 'Poids du Corps' : stat}
                    </h3>
                    <div className="text-4xl font-bold mb-4 text-black group-hover:scale-110 transition-transform duration-300">{valeur}/100</div>
                    <Progress value={valeur} className="h-3 mb-3" />
                    <div className="text-sm font-semibold text-black">
                      {valeur >= 80 ? '🔥 Excellent' : valeur >= 60 ? '⭐ Bon' : valeur >= 40 ? '📈 Moyen' : '💪 À améliorer'}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

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
                  {Object.entries(userStats.stats).map(([stat, valeur]) => (
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
                    Force
                  </CardTitle>
                  <p className="text-red-700 font-medium">Vos records en musculation</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(userStats.records.force).map(([exercice, data]) => (
                    <div key={exercice} className="flex justify-between items-center p-4 bg-white rounded-xl border-2 border-red-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <div className="space-y-1">
                        <div className="font-bold text-lg capitalize text-black">{exercice}</div>
                        <div className="text-sm font-semibold text-black">
                          Ratio: <span className="font-bold text-red-600">{data.ratio}×</span> poids corporel
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-2xl font-bold text-red-600">{data.poids} kg</div>
                        <Badge className="bg-red-200 text-red-800 border-red-400 font-semibold">
                          {getBadgeTitle(exercice, data.poids)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Endurance */}
              <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-blue-800 flex items-center gap-3">
                    <Clock className="w-6 h-6" />
                    Endurance
                  </CardTitle>
                  <p className="text-blue-700 font-medium">Vos meilleurs chronos de course</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(userStats.records.endurance).map(([distance, data]) => (
                    <div key={distance} className="flex justify-between items-center p-4 bg-white rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <div className="space-y-1">
                        <div className="font-bold text-lg text-black">{distance}</div>
                        <div className="text-sm font-semibold text-black">Meilleur chrono</div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-2xl font-bold text-blue-600">{data.temps}</div>
                        <Badge className="bg-blue-200 text-blue-800 border-blue-400 font-semibold">
                          {getBadgeTitle(distance, parseFloat(data.temps))}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Vitesse */}
              <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-amber-800 flex items-center gap-3">
                    <Gauge className="w-6 h-6" />
                    Vitesse
                  </CardTitle>
                  <p className="text-amber-700 font-medium">Vos performances en sprint</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl border-2 border-amber-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="space-y-1">
                      <div className="font-bold text-lg text-black">100m Sprint</div>
                      <div className="text-sm font-semibold text-black">Meilleur temps</div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-2xl font-bold text-amber-600">{userStats.records.vitesse.sprint100m.temps}</div>
                      <Badge className="bg-amber-200 text-amber-800 border-amber-400 font-semibold">
                        {getBadgeTitle('sprint100m', parseFloat(userStats.records.vitesse.sprint100m.temps))}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Poids du Corps */}
              <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-green-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-green-800 flex items-center gap-3">
                    <Activity className="w-6 h-6" />
                    Poids du Corps
                  </CardTitle>
                  <p className="text-green-700 font-medium">Exercices au poids du corps</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(userStats.records.poidsCorps).map(([exercice, data]) => (
                    <div key={exercice} className="flex justify-between items-center p-4 bg-white rounded-xl border-2 border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <div className="space-y-1">
                        <div className="font-bold text-lg capitalize text-black">{exercice}</div>
                        <div className="text-sm font-semibold text-black">Maximum</div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-2xl font-bold text-green-600">{data.max} reps</div>
                        <Badge className="bg-green-200 text-green-800 border-green-400 font-semibold">
                          {getBadgeTitle(exercice, data.max)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Historique */}
          <TabsContent value="historique" className="space-y-6">
            <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-300 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-black flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Progression dans le temps
                </CardTitle>
                <p className="text-black font-medium">Évolution de vos performances sur les 5 derniers mois</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userStats.historique.map((entry, index) => (
                    <div key={entry.date} className="flex items-center justify-between p-6 bg-white border-2 border-slate-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <div className="flex items-center gap-6">
                        <div className="text-lg font-semibold text-black bg-slate-100 px-4 py-2 rounded-lg">
                          {entry.date}
                        </div>
                        {index === userStats.historique.length - 1 && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-sm px-4 py-2 font-semibold">
                            <Trophy className="w-4 h-4 mr-2" />
                            PR Récent
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-8 text-center">
                        <div className="space-y-1">
                          <div className="font-bold text-red-600 text-sm">Squat</div>
                          <div className="text-xl font-bold text-black">{entry.squat} kg</div>
                        </div>
                        <div className="space-y-1">
                          <div className="font-bold text-blue-600 text-sm">5km</div>
                          <div className="text-xl font-bold text-black">{entry.km5} min</div>
                        </div>
                        <div className="space-y-1">
                          <div className="font-bold text-green-600 text-sm">Push-ups</div>
                          <div className="text-xl font-bold text-black">{entry.pushups} reps</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Objectifs */}
          <TabsContent value="objectifs" className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-black flex items-center gap-3">
                  <Target className="w-6 h-6 text-purple-600" />
                  Prochain Objectif
                </CardTitle>
                <p className="text-black font-medium">Votre défi pour progresser vers le rang supérieur</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center p-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl border-2 border-purple-200 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-black">{userStats.prochainObjectif.description}</h3>
                  <div className="text-5xl font-bold text-purple-600 mb-4 hover:scale-110 transition-transform duration-300">
                    {userStats.prochainObjectif.valeur}
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
                    <Star className="w-5 h-5 mr-2" />
                    Pour passer au Rang {userStats.prochainObjectif.rangCible}
                  </Badge>
                </div>

                <div className="text-center">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105">
                    <Target className="w-6 h-6 mr-3" />
                    Lancer Test de Validation
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="text-center p-6 bg-white border-2 border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="text-4xl mb-4">🏆</div>
                    <h4 className="text-xl font-bold text-black mb-2">Badges Disponibles</h4>
                    <p className="text-black font-medium">Débloque de nouveaux badges en progressant</p>
                  </Card>
                  <Card className="text-center p-6 bg-white border-2 border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="text-4xl mb-4">📈</div>
                    <h4 className="text-xl font-bold text-black mb-2">Suivi Continu</h4>
                    <p className="text-black font-medium">Vos performances sont enregistrées automatiquement</p>
                  </Card>
                  <Card className="text-center p-6 bg-white border-2 border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="text-4xl mb-4">🎯</div>
                    <h4 className="text-xl font-bold text-black mb-2">Objectifs Personnalisés</h4>
                    <p className="text-black font-medium">Des défis adaptés à votre niveau</p>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Stats; 