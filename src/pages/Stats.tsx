import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, TrendingUp, Zap, Clock, Weight, Gauge, Activity, BarChart3, Star, Award, Flame, Sparkles, Dumbbell, Heart, CheckCircle } from 'lucide-react';
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
                      Bienvenue, {userStats.nom}
                    </h1>
                    <p className="text-white/90 text-xl font-medium mt-2">Tableau de bord & Statistiques</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <Badge className={`${getRangColor(userStats.rang)} text-white text-lg px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300`}>
                    <Star className="w-4 h-4 mr-2" />
                    Rang {userStats.rang}
                  </Badge>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
                    <Zap className="w-5 h-5 group-hover:animate-pulse" />
                    <span className="text-white font-medium">×{userStats.multiplicateur} assiduité</span>
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
                    value={(userStats.xp / userStats.xpMax) * 100} 
                    className="h-4 bg-white/20 rounded-full"
                  />
                </div>
                <div className="text-sm">
                  <span className="text-white font-bold text-xl">{userStats.xp}</span> 
                  <span className="text-white/80"> / {userStats.xpMax} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white p-2 rounded-xl shadow-lg border-2 border-slate-200">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md font-semibold rounded-lg transition-all duration-300">
              <Dumbbell className="w-4 h-4 mr-2" />
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

          {/* Tableau de bord (ancienne page Home) */}
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
                        <div className="text-sm font-semibold text-black">Maximum en une série</div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-2xl font-bold text-green-600">{data.max}</div>
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
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  Évolution de vos performances
                </CardTitle>
                <p className="text-black font-medium">Suivi de votre progression au fil du temps</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userStats.historique.map((periode, index) => (
                    <div key={index} className="p-6 bg-white rounded-xl border-2 border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-black group-hover:scale-105 transition-transform duration-300">{periode.date}</h4>
                        <Badge className="bg-blue-200 text-blue-800 border-blue-300">
                          Progression
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200 group-hover:shadow-md transition-all duration-300">
                          <div className="text-2xl font-bold text-red-600">{periode.squat} kg</div>
                          <div className="text-sm font-semibold text-black">Squat</div>
                        </div>
                        
                        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200 group-hover:shadow-md transition-all duration-300">
                          <div className="text-2xl font-bold text-blue-600">{periode.km5} min</div>
                          <div className="text-sm font-semibold text-black">5km</div>
                        </div>
                        
                        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200 group-hover:shadow-md transition-all duration-300">
                          <div className="text-2xl font-bold text-green-600">{periode.pushups}</div>
                          <div className="text-sm font-semibold text-black">Pompes</div>
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
                    <h3 className="text-2xl font-bold text-black">{userStats.prochainObjectif.description}</h3>
                    <div className="text-4xl font-bold text-purple-600">{userStats.prochainObjectif.valeur}</div>
                    <div className="text-lg font-semibold text-black">
                      Pour atteindre le rang <Badge className={`${getRangColor(userStats.prochainObjectif.rangCible)} text-white ml-2`}>
                        {userStats.prochainObjectif.rangCible}
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
    </PageLayout>
  );
};

export default Stats;