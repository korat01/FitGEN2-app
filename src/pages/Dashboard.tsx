
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dumbbell, Target, TrendingUp, Star, Zap, Award, Activity, Heart, Clock, Flame, Calendar, BarChart3, CheckCircle } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const Dashboard: React.FC = () => {
  const todayStats = [
    { label: 'Séances aujourd\'hui', value: '1', icon: Dumbbell, color: 'blue', change: '+1' },
    { label: 'Calories brûlées', value: '450', icon: Flame, color: 'orange', change: '+50' },
    { label: 'Temps d\'entraînement', value: '1h 15m', icon: Clock, color: 'green', change: '+15min' },
    { label: 'Objectifs du jour', value: '3/4', icon: Target, color: 'purple', change: '+1' }
  ];

  const weeklyProgress = [
    { jour: 'Lun', seances: 1, calories: 450, completed: true },
    { jour: 'Mar', seances: 0, calories: 0, completed: false },
    { jour: 'Mer', seances: 1, calories: 380, completed: true },
    { jour: 'Jeu', seances: 1, calories: 520, completed: true },
    { jour: 'Ven', seances: 0, calories: 0, completed: false },
    { jour: 'Sam', seances: 1, calories: 600, completed: true },
    { jour: 'Dim', seances: 0, calories: 0, completed: false }
  ];

  const upcomingWorkouts = [
    { nom: 'Force Maximale', date: 'Aujourd\'hui', heure: '18:00', duree: '60min', difficulte: 'Intermédiaire' },
    { nom: 'Cardio Intensif', date: 'Demain', heure: '07:00', duree: '45min', difficulte: 'Avancé' },
    { nom: 'Yoga Relaxant', date: 'Mercredi', heure: '19:30', duree: '30min', difficulte: 'Débutant' }
  ];

  const goals = [
    { nom: 'Perdre 5kg', progression: 60, deadline: '2 mois', icon: Target, color: 'green' },
    { nom: 'Courir 5km', progression: 80, deadline: '1 mois', icon: Activity, color: 'blue' },
    { nom: '100 pompes', progression: 40, deadline: '3 mois', icon: Dumbbell, color: 'purple' }
  ];

  const getDifficulteColor = (difficulte: string) => {
    switch (difficulte) {
      case 'Débutant':
        return 'bg-blue-200 text-blue-800 border-blue-300';
      case 'Intermédiaire':
        return 'bg-purple-200 text-purple-800 border-purple-300';
      case 'Avancé':
        return 'bg-red-200 text-red-800 border-red-300';
      default:
        return 'bg-gray-200 text-gray-800 border-gray-300';
    }
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header avec animation */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
            <div className="absolute top-8 right-8 w-1 h-1 bg-blue-400/50 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-1/4 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce"></div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <BarChart3 className="w-8 h-8 group-hover:animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white group-hover:scale-105 transition-transform duration-300">
                      Dashboard
                    </h1>
                    <p className="text-white/90 text-lg font-medium">Vue d'ensemble de vos performances</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
                    <Star className="w-4 h-4 mr-2" />
                    Rang B
                  </Badge>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
                    <Zap className="w-5 h-5 group-hover:animate-pulse" />
                    <span className="text-white font-medium">×1.25 assiduité</span>
                  </div>
                </div>
              </div>

              <div className="lg:text-right space-y-3">
                <div className="text-white/90 font-medium">Progression vers le prochain rang</div>
                <div className="w-80">
                  <Progress 
                    value={75} 
                    className="h-3 bg-white/20"
                  />
                </div>
                <div className="text-sm">
                  <span className="text-white font-bold text-lg">2,450</span> 
                  <span className="text-white/80"> / 3,000 XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats d'aujourd'hui */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {todayStats.map((stat, index) => (
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

        {/* Progression hebdomadaire */}
        <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-300 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-black text-2xl">
              <div className="p-2 bg-blue-500 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              Progression hebdomadaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 group-hover:scale-110 ${
                    day.completed 
                      ? 'bg-green-500 text-white shadow-lg' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {day.completed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="font-bold">{day.seances}</span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-black">{day.jour}</div>
                  <div className="text-xs text-black">{day.calories} cal</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Entraînements à venir */}
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-black text-xl">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                Entraînements à venir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingWorkouts.map((workout, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Dumbbell className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-black group-hover:scale-105 transition-transform duration-300">{workout.nom}</div>
                        <div className="text-sm text-black">{workout.date} • {workout.heure}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getDifficulteColor(workout.difficulte)} text-xs mb-1`}>
                        {workout.difficulte}
                      </Badge>
                      <div className="text-sm text-black font-medium">{workout.duree}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Objectifs */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-black text-xl">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                Mes objectifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <div key={index} className="p-4 bg-white rounded-xl border-2 border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`w-10 h-10 bg-${goal.color}-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <goal.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-black group-hover:scale-105 transition-transform duration-300">{goal.nom}</div>
                        <div className="text-sm text-black">Échéance: {goal.deadline}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-black">
                        <span>Progression</span>
                        <span className="font-semibold">{goal.progression}%</span>
                      </div>
                      <Progress value={goal.progression} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
