import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Flame, Target, TrendingUp, Clock, Dumbbell, Apple, Activity, Play, Plus, BarChart3, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);

  // Données d'exemple - à remplacer par vos vraies données
  const todayProgram = {
    name: "Push Day",
    exercises: [
      { name: "Développé couché", sets: "4x8-10", weight: "80kg" },
      { name: "Dips", sets: "3x12-15", weight: "Poids du corps" },
      { name: "Élévations latérales", sets: "3x15", weight: "12kg" }
    ],
    duration: "75 min",
    difficulty: "Intermédiaire"
  };

  const todayStats = {
    calories: 2450,
    target: 2800,
    protein: 180,
    carbs: 250,
    fat: 85
  };

  const weeklyProgress = {
    workouts: 4,
    target: 5,
    calories: 16800,
    target: 19600
  };

  const quickActions = [
    { 
      name: "Planning", 
      icon: Calendar, 
      color: 'blue' as const,
      action: () => navigate('/planning')
    },
    { 
      name: "Nouveau Programme", 
      icon: Dumbbell, 
      color: 'green' as const,
      action: () => navigate('/programme')
    },
    { 
      name: "Scanner Aliment", 
      icon: Apple, 
      color: 'purple' as const,
      action: () => navigate('/scan')
    },
    { 
      name: "Profil", 
      icon: User, 
      color: 'pink' as const,
      action: () => navigate('/profile')
    }
  ];

  const handleStartWorkout = () => {
    setIsWorkoutStarted(true);
    setTimeout(() => {
      setIsWorkoutStarted(false);
    }, 2000);
  };

  const handleAddExercise = () => {
    navigate('/blocs-entrainement');
  };

  const handleViewProgress = () => {
    navigate('/overview');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* En-tête avec salutation et date */}
        <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Bonjour !
            </h1>
            <p className="text-slate-600 text-lg">Prêt pour votre séance d'aujourd'hui ?</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 font-medium">
              {new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Statistiques du jour */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Calories</p>
                  <p className="text-3xl font-bold">{todayStats.calories}</p>
                  <p className="text-blue-100 text-xs">sur {todayStats.target}</p>
                </div>
                <div className="bg-blue-100 rounded-full p-3">
                  <Flame className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <Progress 
                value={(todayStats.calories / todayStats.target) * 100} 
                className="mt-4 bg-white/20"
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-400 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Protéines</p>
                  <p className="text-3xl font-bold">{todayStats.protein}g</p>
                  <p className="text-emerald-100 text-xs">Objectif: 200g</p>
                </div>
                <div className="bg-emerald-100 rounded-full p-3">
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-400 to-violet-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-100 text-sm font-medium">Progression</p>
                  <p className="text-3xl font-bold">{weeklyProgress.workouts}</p>
                  <p className="text-violet-100 text-xs">séances cette semaine</p>
                </div>
                <div className="bg-violet-100 rounded-full p-3">
                  <TrendingUp className="h-8 w-8 text-violet-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Programme du jour */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-slate-800 text-2xl">
              <div className="bg-blue-100 rounded-full p-2">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              Programme du jour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-800">{todayProgram.name}</h3>
                <div className="flex gap-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium">
                    {todayProgram.difficulty}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-2 text-slate-600 px-3 py-1 text-sm font-medium border-slate-300">
                    <Clock className="h-4 w-4" />
                    {todayProgram.duration}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                {todayProgram.exercises.map((exercise, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200">
                    <span className="font-semibold text-slate-800 text-lg">{exercise.name}</span>
                    <div className="text-sm text-slate-600 font-medium">
                      <span className="bg-slate-200 px-2 py-1 rounded-md">{exercise.sets}</span>
                      <span className="mx-3">•</span>
                      <span className="bg-slate-200 px-2 py-1 rounded-md">{exercise.weight}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  size="lg"
                  onClick={handleStartWorkout}
                  disabled={isWorkoutStarted}
                >
                  {isWorkoutStarted ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Démarrage...
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Commencer la séance
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleAddExercise}
                  className="px-6 py-3 border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Ajouter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions rapides */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-slate-800 text-2xl">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`h-28 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 ${
                    action.color === 'blue' ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-300' :
                    action.color === 'green' ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 hover:border-emerald-300' :
                    action.color === 'purple' ? 'text-violet-600 bg-violet-50 hover:bg-violet-100 border-violet-200 hover:border-violet-300' :
                    'text-pink-600 bg-pink-50 hover:bg-pink-100 border-pink-200 hover:border-pink-300'
                  }`}
                  onClick={action.action}
                >
                  <action.icon className="h-8 w-8" />
                  <span className="text-sm font-semibold">{action.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progression hebdomadaire */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800 text-2xl">
              <div className="bg-violet-100 rounded-full p-2">
                <TrendingUp className="h-6 w-6 text-violet-600" />
              </div>
              Progression de la semaine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-semibold text-lg">Séances d'entraînement</span>
                <span className="font-bold text-slate-800 text-lg">{weeklyProgress.workouts}/{weeklyProgress.target}</span>
              </div>
              <Progress 
                value={(weeklyProgress.workouts / weeklyProgress.target) * 100} 
                className="h-3 bg-slate-200"
              />
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-semibold text-lg">Calories brûlées</span>
                <span className="font-bold text-slate-800 text-lg">{weeklyProgress.calories.toLocaleString()}/{weeklyProgress.target.toLocaleString()}</span>
              </div>
              <Progress 
                value={(weeklyProgress.calories / weeklyProgress.target) * 100} 
                className="h-3 bg-slate-200"
              />
              
              <Button 
                variant="outline" 
                className="w-full mt-4 border-2 border-violet-300 hover:border-violet-400 hover:bg-violet-50 text-violet-700 font-semibold py-3 transition-all duration-300"
                onClick={handleViewProgress}
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Voir le détail de la progression
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;