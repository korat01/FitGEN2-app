import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dumbbell, Calendar, Target, Flame, TrendingUp, Clock, CheckCircle, Play, Pause, RotateCcw } from 'lucide-react';

const Overview = () => {
  const { user } = useAuth();

  // Données simulées pour la démonstration
  const todayWorkout = {
    name: "Séance Force - Haut du corps",
    duration: 45,
    exercises: 6,
    completed: 3,
    calories: 320,
    progress: 50
  };

  const nutrition = {
    caloriesConsumed: 1850,
    caloriesGoal: 2200,
    protein: 120,
    proteinGoal: 150,
    carbs: 180,
    carbsGoal: 220,
    fat: 65,
    fatGoal: 80
  };

  const weeklyProgress = [
    { day: 'Lun', weight: 75.2, completed: true },
    { day: 'Mar', weight: 75.0, completed: true },
    { day: 'Mer', weight: 74.8, completed: true },
    { day: 'Jeu', weight: 74.9, completed: false },
    { day: 'Ven', weight: 0, completed: false },
    { day: 'Sam', weight: 0, completed: false },
    { day: 'Dim', weight: 0, completed: false }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* En-tête avec salutation */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {getGreeting()}, {user?.name?.split(' ')[0]} !
              </h1>
              <p className="text-gray-600 text-lg">Voici votre résumé du jour</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Aujourd'hui</p>
              <p className="text-2xl font-bold text-gray-800">
                {new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Cartes principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Programme du jour */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                Programme du jour
              </CardTitle>
              <CardDescription>Votre séance d'entraînement personnalisée</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white/80 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{todayWorkout.name}</h3>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    {todayWorkout.duration} min
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{todayWorkout.exercises}</p>
                    <p className="text-sm text-gray-600">Exercices</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{todayWorkout.completed}</p>
                    <p className="text-sm text-gray-600">Terminés</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progression</span>
                    <span>{todayWorkout.progress}%</span>
                  </div>
                  <Progress value={todayWorkout.progress} className="h-3" />
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
              <CardDescription>Vos apports caloriques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {nutrition.caloriesConsumed}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  / {nutrition.caloriesGoal} calories
                </div>
                <Progress 
                  value={(nutrition.caloriesConsumed / nutrition.caloriesGoal) * 100} 
                  className="h-3 mb-4"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Protéines</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {nutrition.protein}g / {nutrition.proteinGoal}g
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Glucides</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {nutrition.carbs}g / {nutrition.carbsGoal}g
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Lipides</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {nutrition.fat}g / {nutrition.fatGoal}g
                  </span>
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
              <CardDescription>Votre évolution cette semaine</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/80 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-800 w-12">{day.day}</span>
                      {day.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <div className="text-right">
                      {day.weight > 0 ? (
                        <span className="font-semibold text-gray-800">{day.weight} kg</span>
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
              <CardDescription>Vos cibles à atteindre</CardDescription>
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
      </div>
    </div>
  );
};

export default Overview;