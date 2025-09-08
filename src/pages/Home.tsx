import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dumbbell, Calendar, Clock, Target, Play, CheckCircle, RotateCcw, TrendingUp, Zap, Flame, Activity, Trophy } from 'lucide-react';

const Home = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { isAuthenticated, user, login, register } = useAuth();
  const navigate = useNavigate();

  // Données de démonstration pour le résumé quotidien
  const [dailyData, setDailyData] = useState({
    todayWorkout: {
      name: "Force - Haut du corps",
      duration: 45,
      difficulty: "Intermédiaire",
      exercises: 6,
      completed: 3
    },
    calories: {
      consumed: 1850,
      burned: 420,
      goal: 2000,
      remaining: 150
    },
    progress: {
      weeklyGoal: 4,
      completed: 3,
      streak: 7
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      // L'utilisateur est connecté, on affiche le dashboard
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Dumbbell className="h-12 w-12 text-white mr-3" />
              <h1 className="text-3xl font-bold text-white">FitGEN22</h1>
            </div>
            <p className="text-gray-300">Votre coach personnel intelligent</p>
          </div>

          <Card className="shadow-2xl">
            <CardHeader>
              <div className="flex space-x-2 mb-4">
                <Button
                  variant={mode === 'login' ? 'default' : 'outline'}
                  onClick={() => setMode('login')}
                  className="flex-1"
                >
                  Connexion
                </Button>
                <Button
                  variant={mode === 'register' ? 'default' : 'outline'}
                  onClick={() => setMode('register')}
                  className="flex-1"
                >
                  Inscription
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {mode === 'login' ? <LoginForm /> : <RegisterForm />}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête de bienvenue */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Bonjour {user?.name} ! 👋
          </h1>
          <p className="text-gray-600">Voici votre résumé quotidien</p>
        </div>

        <div className="grid gap-6">
          {/* Programme du jour */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Programme du jour
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {dailyData.todayWorkout.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {dailyData.todayWorkout.duration} min
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      {dailyData.todayWorkout.difficulty}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Dumbbell className="h-3 w-3" />
                      {dailyData.todayWorkout.exercises} exercices
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {dailyData.todayWorkout.completed}/{dailyData.todayWorkout.exercises}
                  </div>
                  <div className="text-sm text-gray-600">Exercices terminés</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progression</span>
                  <span>{Math.round((dailyData.todayWorkout.completed / dailyData.todayWorkout.exercises) * 100)}%</span>
                </div>
                <Progress 
                  value={(dailyData.todayWorkout.completed / dailyData.todayWorkout.exercises) * 100} 
                  className="h-2"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Play className="h-4 w-4 mr-2" />
                  Commencer l'entraînement
                </Button>
                <Button variant="outline" onClick={() => navigate('/planning')}>
                  Voir le planning
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Calories et nutrition */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-600" />
                  Calories du jour
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {dailyData.calories.consumed}
                    </div>
                    <div className="text-sm text-gray-600">calories consommées</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Objectif: {dailyData.calories.goal} cal</span>
                      <span>Restant: {dailyData.calories.remaining} cal</span>
                    </div>
                    <Progress 
                      value={(dailyData.calories.consumed / dailyData.calories.goal) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-lg font-semibold text-red-600">
                        {dailyData.calories.burned}
                      </div>
                      <div className="text-xs text-red-500">Brûlées</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-semibold text-green-600">
                        {dailyData.calories.remaining}
                      </div>
                      <div className="text-xs text-green-500">Restantes</div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" onClick={() => navigate('/nutrition')}>
                    Gérer la nutrition
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Progression
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {dailyData.progress.completed}
                      </div>
                      <div className="text-xs text-blue-500">Séances cette semaine</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {dailyData.progress.streak}
                      </div>
                      <div className="text-xs text-purple-500">Jours de suite</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {Math.round((dailyData.progress.completed / dailyData.progress.weeklyGoal) * 100)}%
                      </div>
                      <div className="text-xs text-orange-500">Objectif hebdo</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Objectif hebdomadaire</span>
                      <span>{dailyData.progress.completed}/{dailyData.progress.weeklyGoal}</span>
                    </div>
                    <Progress 
                      value={(dailyData.progress.completed / dailyData.progress.weeklyGoal) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => navigate('/overview')}>
                      <Activity className="h-4 w-4 mr-2" />
                      Statistiques
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Trophy className="h-4 w-4 mr-2" />
                      Récompenses
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions rapides */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => navigate('/planning')}
                >
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Planning</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => navigate('/nutrition')}
                >
                  <Flame className="h-6 w-6" />
                  <span className="text-sm">Nutrition</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => navigate('/blocs-entrainement')}
                >
                  <Dumbbell className="h-6 w-6" />
                  <span className="text-sm">Exercices</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col gap-2"
                  onClick={() => navigate('/scan')}
                >
                  <Target className="h-6 w-6" />
                  <span className="text-sm">Scanner</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;