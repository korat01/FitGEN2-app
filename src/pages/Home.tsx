import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Target, TrendingUp, Star, Zap, Award, Activity, Heart, Clock, Flame, CheckCircle } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const Home: React.FC = () => {
  const stats = [
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

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Hero Section avec animation */}
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
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <Dumbbell className="w-8 h-8 group-hover:animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold tracking-tight text-white group-hover:scale-105 transition-transform duration-300">
                      Bienvenue sur FitGEN22
                    </h1>
                    <p className="text-white/90 text-xl font-medium mt-2">Votre coach personnel pour atteindre vos objectifs</p>
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
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
                    <Flame className="w-5 h-5 group-hover:animate-bounce" />
                    <span className="text-white font-medium">7 jours de streak</span>
                  </div>
                </div>
              </div>

              <div className="lg:text-right space-y-4">
                <div className="text-white/90 font-medium text-lg">Progression vers le prochain rang</div>
                <div className="w-80">
                  <div className="w-full bg-white/20 rounded-full h-4 mb-2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-white font-bold text-xl">2,450</span> 
                  <span className="text-white/80"> / 3,000 XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid avec animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
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
      </div>
    </PageLayout>
  );
};

export default Home;