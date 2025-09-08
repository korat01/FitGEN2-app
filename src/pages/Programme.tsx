import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Calendar, Clock, Target, Play, CheckCircle, RotateCcw, TrendingUp, Zap, Coffee, Star, Timer, Activity } from 'lucide-react';

const Programme = () => {
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState('lundi');

  // Générer le planning basé sur les préférences de l'utilisateur
  const generateWeeklyProgram = () => {
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    const frequency = user?.trainingFrequency || 3;
    
    // Créer un planning basé sur la fréquence d'entraînement
    const program: any = {};
    
    days.forEach((day, index) => {
      const isTrainingDay = index < frequency;
      
      if (isTrainingDay) {
        program[day] = {
          name: getWorkoutName(index),
          duration: user?.trainingDuration || 45,
          difficulty: user?.level || 'intermédiaire',
          exercises: getExercisesForDay(index),
          type: getWorkoutType(index),
          isRestDay: false,
          completed: Math.random() > 0.5, // Simulation
          calories: Math.floor(Math.random() * 200) + 300
        };
      } else {
        program[day] = {
          name: "Jour de repos",
          duration: 0,
          difficulty: "Repos",
          exercises: [],
          type: "repos",
          isRestDay: true,
          completed: false,
          calories: 0
        };
      }
    });
    
    return program;
  };

  const getWorkoutName = (dayIndex: number) => {
    const workouts = [
      "Force - Haut du corps",
      "Cardio - HIIT",
      "Force - Bas du corps",
      "Cardio - Endurance",
      "Force - Corps entier"
    ];
    return workouts[dayIndex % workouts.length];
  };

  const getWorkoutType = (dayIndex: number) => {
    const types = ["force", "cardio", "force", "cardio", "force"];
    return types[dayIndex % types.length];
  };

  const getExercisesForDay = (dayIndex: number) => {
    const exercises = [
      [
        { name: "Développé couché", sets: 4, reps: "8-10", rest: "2min", completed: true },
        { name: "Tractions", sets: 3, reps: "6-8", rest: "90s", completed: true },
        { name: "Développé militaire", sets: 3, reps: "8-10", rest: "2min", completed: false },
        { name: "Rowing barre", sets: 3, reps: "8-10", rest: "90s", completed: false },
        { name: "Dips", sets: 3, reps: "8-12", rest: "90s", completed: false },
        { name: "Curl biceps", sets: 3, reps: "10-12", rest: "60s", completed: false }
      ],
      [
        { name: "Burpees", sets: 4, reps: "30s", rest: "30s", completed: true },
        { name: "Mountain climbers", sets: 4, reps: "30s", rest: "30s", completed: true },
        { name: "Jumping jacks", sets: 4, reps: "30s", rest: "30s", completed: false },
        { name: "High knees", sets: 4, reps: "30s", rest: "30s", completed: false },
        { name: "Squat jumps", sets: 4, reps: "30s", rest: "30s", completed: false },
        { name: "Planche", sets: 3, reps: "45s", rest: "60s", completed: false }
      ],
      [
        { name: "Squats", sets: 4, reps: "8-10", rest: "2min", completed: false },
        { name: "Fentes", sets: 3, reps: "10-12", rest: "90s", completed: false },
        { name: "Soulevé de terre", sets: 4, reps: "6-8", rest: "2min", completed: false },
        { name: "Hip thrust", sets: 3, reps: "10-12", rest: "90s", completed: false },
        { name: "Leg press", sets: 3, reps: "12-15", rest: "90s", completed: false },
        { name: "Mollets", sets: 4, reps: "15-20", rest: "60s", completed: false }
      ],
      [
        { name: "Course à pied", sets: 1, reps: "20min", rest: "0s", completed: false },
        { name: "Vélo", sets: 1, reps: "15min", rest: "0s", completed: false },
        { name: "Natation", sets: 1, reps: "10min", rest: "0s", completed: false }
      ],
      [
        { name: "Thruster", sets: 4, reps: "8-10", rest: "2min", completed: false },
        { name: "Deadlift", sets: 4, reps: "6-8", rest: "2min", completed: false },
        { name: "Push press", sets: 3, reps: "8-10", rest: "90s", completed: false },
        { name: "Goblet squat", sets: 3, reps: "10-12", rest: "90s", completed: false },
        { name: "Renegade row", sets: 3, reps: "10-12", rest: "90s", completed: false },
        { name: "Burpees", sets: 3, reps: "8-10", rest: "90s", completed: false }
      ]
    ];
    return exercises[dayIndex % exercises.length];
  };

  const weeklyProgram = generateWeeklyProgram();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'force': return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'cardio': return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'repos': return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'débutant': return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'intermédiaire': return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white';
      case 'avancé': return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white';
      case 'expert': return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    }
  };

  const getDayStatus = (workout: any) => {
    if (workout.isRestDay) return 'repos';
    if (workout.completed) return 'completed';
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'repos': return <Coffee className="h-4 w-4 text-gray-500" />;
      default: return <Dumbbell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500 bg-green-50';
      case 'repos': return 'border-gray-300 bg-gray-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* En-tête amélioré */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Planning d'entraînement
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Votre programme personnalisé pour atteindre vos objectifs de manière efficace et motivante
          </p>
        </div>

        <div className="grid gap-8">
          {/* Sélection des jours - Design amélioré */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                <Calendar className="h-6 w-6 text-blue-600" />
                Votre semaine d'entraînement
              </CardTitle>
              <CardDescription className="text-lg">
                Cliquez sur un jour pour voir les détails de votre séance
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              <div className="grid grid-cols-7 gap-3">
                {Object.entries(weeklyProgram).map(([day, workout]: [string, any]) => {
                  const status = getDayStatus(workout);
                  const isSelected = selectedDay === day;
                  
                  return (
                    <Button
                      key={day}
                      variant="outline"
                      className={`h-24 flex flex-col gap-2 transition-all duration-300 hover:scale-105 ${
                        isSelected 
                          ? 'ring-2 ring-blue-500 shadow-lg scale-105' 
                          : 'hover:shadow-md'
                      } ${getStatusColor(status)}`}
                      onClick={() => setSelectedDay(day)}
                    >
                      <div className="flex items-center gap-1">
                        {getStatusIcon(status)}
                      </div>
                      <span className="text-sm font-semibold capitalize">{day}</span>
                      <div className="text-xs text-center">
                        {workout.isRestDay ? (
                          <span className="text-gray-500">Repos</span>
                        ) : (
                          <div className="space-y-1">
                            <Badge className={`text-xs ${getTypeColor(workout.type)}`}>
                              {workout.type}
                            </Badge>
                            <div className="text-gray-600">{workout.duration}min</div>
                          </div>
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Détails du jour sélectionné - Design amélioré */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                {weeklyProgram[selectedDay]?.isRestDay ? (
                  <Coffee className="h-8 w-8 text-gray-500" />
                ) : (
                  <Dumbbell className="h-8 w-8 text-blue-600" />
                )}
                <CardTitle className="text-3xl">
                  {weeklyProgram[selectedDay]?.name}
                </CardTitle>
              </div>
              <CardDescription className="text-lg">
                {new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8">
              {weeklyProgram[selectedDay]?.isRestDay ? (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
                    <Coffee className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-700 mb-4">Jour de repos</h3>
                  <p className="text-xl text-gray-500 mb-8 max-w-md mx-auto">
                    Profitez de ce jour pour récupérer et laisser votre corps se reconstruire.
                  </p>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 max-w-2xl mx-auto">
                    <h4 className="text-xl font-semibold text-gray-700 mb-6 flex items-center justify-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      Conseils pour la récupération
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">Hydratez-vous bien (2-3L d'eau)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Dormez 7-9 heures</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-600">Étirements légers (15-20min)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-600">Marche ou activité douce</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* En-tête de la séance */}
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Badge className={`text-sm px-4 py-2 ${getTypeColor(weeklyProgram[selectedDay]?.type)}`}>
                      {weeklyProgram[selectedDay]?.type}
                    </Badge>
                    <Badge className={`text-sm px-4 py-2 ${getDifficultyColor(weeklyProgram[selectedDay]?.difficulty)}`}>
                      {weeklyProgram[selectedDay]?.difficulty}
                    </Badge>
                    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                      <Timer className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-700 font-semibold">{weeklyProgram[selectedDay]?.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                      <Activity className="h-4 w-4 text-green-600" />
                      <span className="text-green-700 font-semibold">~{weeklyProgram[selectedDay]?.calories} cal</span>
                    </div>
                  </div>

                  {/* Liste des exercices */}
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-gray-900 text-center mb-6">Exercices de la séance</h4>
                    <div className="grid gap-4">
                      {weeklyProgram[selectedDay]?.exercises.map((exercise: any, index: number) => (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between p-6 rounded-2xl transition-all duration-300 hover:shadow-md ${
                            exercise.completed 
                              ? 'bg-green-50 border-2 border-green-200' 
                              : 'bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              exercise.completed 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-300 text-gray-600'
                            }`}>
                              {exercise.completed ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : (
                                <span className="text-sm font-bold">{index + 1}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h5 className="text-lg font-semibold text-gray-900">{exercise.name}</h5>
                              <p className="text-gray-600">
                                {exercise.sets} séries × {exercise.reps} répétitions
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-gray-500">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">Repos: {exercise.rest}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button className="flex-1 h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                      <Play className="h-5 w-5 mr-2" />
                      Commencer l'entraînement
                    </Button>
                    <Button variant="outline" className="h-14 px-8 border-2 hover:bg-gray-50 transition-all duration-300">
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Modifier
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Programme; 