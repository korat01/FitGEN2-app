
import React from 'react';
import PageLayout from '@/components/PageLayout';
import StatCard from '@/components/StatCard';
import ActionButton from '@/components/ActionButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Flame, 
  Target, 
  TrendingUp, 
  Clock, 
  Dumbbell, 
  Apple, 
  Activity,
  BarChart3,
  Play,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Données d'exemple
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
      name: "Nouveau Programme", 
      icon: Dumbbell, 
      color: 'blue' as const,
      action: () => navigate('/programme')
    },
    { 
      name: "Scanner Aliment", 
      icon: Apple, 
      color: 'green' as const,
      action: () => navigate('/scan')
    },
    { 
      name: "Mesure Corporelle", 
      icon: Target, 
      color: 'purple' as const,
      action: () => navigate('/profile')
    },
    { 
      name: "Historique", 
      icon: BarChart3, 
      color: 'orange' as const,
      action: () => navigate('/overview')
    }
  ];

  return (
    <PageLayout
      title="Tableau de bord"
      subtitle="Vue d'ensemble de vos performances"
      icon={<BarChart3 className="h-6 w-6 text-blue-600" />}
      showBackButton={false}
    >
      {/* Statistiques du jour */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Calories"
          value={todayStats.calories}
          subtitle={`sur ${todayStats.target}`}
          icon={Flame}
          color="blue"
          progress={(todayStats.calories / todayStats.target) * 100}
        />
        <StatCard
          title="Protéines"
          value={`${todayStats.protein}g`}
          subtitle="Objectif: 200g"
          icon={Target}
          color="green"
        />
        <StatCard
          title="Progression"
          value={weeklyProgress.workouts}
          subtitle="séances cette semaine"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Programme du jour */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-slate-900 text-2xl">
            <div className="bg-blue-100 rounded-full p-2">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            Programme du jour
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-900">{todayProgram.name}</h3>
              <div className="flex gap-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1 text-sm font-medium">
                  {todayProgram.difficulty}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2 text-slate-700 px-3 py-1 text-sm font-medium border-slate-300">
                  <Clock className="h-4 w-4" />
                  {todayProgram.duration}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              {todayProgram.exercises.map((exercise, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200">
                  <span className="font-semibold text-slate-900 text-lg">{exercise.name}</span>
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
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                size="lg"
                onClick={() => navigate('/programme')}
              >
                <Play className="h-5 w-5 mr-2" />
                Commencer la séance
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/blocs-entrainement')}
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
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-slate-900 text-2xl">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <ActionButton
                key={index}
                name={action.name}
                icon={action.icon}
                color={action.color}
                onClick={action.action}
              />
                ))}
              </div>
        </CardContent>
      </Card>

      {/* Progression hebdomadaire */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-900 text-2xl">
            <div className="bg-purple-100 rounded-full p-2">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            Progression de la semaine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-700 font-semibold text-lg">Séances d'entraînement</span>
              <span className="font-bold text-slate-900 text-lg">{weeklyProgress.workouts}/{weeklyProgress.target}</span>
            </div>
            <Progress 
              value={(weeklyProgress.workouts / weeklyProgress.target) * 100} 
              className="h-3 bg-slate-200"
            />
            
            <div className="flex justify-between items-center">
              <span className="text-slate-700 font-semibold text-lg">Calories brûlées</span>
              <span className="font-bold text-slate-900 text-lg">{weeklyProgress.calories.toLocaleString()}/{weeklyProgress.target.toLocaleString()}</span>
            </div>
            <Progress 
              value={(weeklyProgress.calories / weeklyProgress.target) * 100} 
              className="h-3 bg-slate-200"
            />
            
            <Button
              variant="outline"
              className="w-full mt-4 border-2 border-purple-300 hover:border-purple-400 hover:bg-purple-50 text-purple-700 font-semibold py-3 transition-all duration-300"
              onClick={() => navigate('/overview')}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Voir le détail de la progression
                  </Button>
                </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Dashboard;
