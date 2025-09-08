import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import StatCard from '@/components/StatCard';
import ActionButton from '@/components/ActionButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Dumbbell, 
  Clock, 
  Target, 
  Play, 
  Pause, 
  RotateCcw,
  Plus,
  Edit,
  Trash2,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Programme = () => {
  const navigate = useNavigate();
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  // Données d'exemple
  const workoutProgram = {
    name: "Push Day",
    duration: "75 min",
    difficulty: "Intermédiaire",
    exercises: [
      { 
        name: "Développé couché", 
        sets: "4x8-10", 
        weight: "80kg",
        rest: "2-3 min",
        completed: false
      },
      { 
        name: "Dips", 
        sets: "3x12-15", 
        weight: "Poids du corps",
        rest: "90 sec",
        completed: false
      },
      { 
        name: "Élévations latérales", 
        sets: "3x15", 
        weight: "12kg",
        rest: "60 sec",
        completed: false
      },
      { 
        name: "Développé incliné", 
        sets: "3x10-12", 
        weight: "60kg",
        rest: "2 min",
        completed: false
      }
    ]
  };

  const workoutStats = {
    totalExercises: workoutProgram.exercises.length,
    completedExercises: completedExercises.length,
    estimatedTime: workoutProgram.duration,
    calories: 450
  };

  const handleStartWorkout = () => {
    setIsWorkoutActive(true);
  };

  const handlePauseWorkout = () => {
    setIsWorkoutActive(false);
  };

  const handleCompleteExercise = (index: number) => {
    if (!completedExercises.includes(index)) {
      setCompletedExercises([...completedExercises, index]);
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < workoutProgram.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
    }
  };

  const handleResetWorkout = () => {
    setIsWorkoutActive(false);
    setCurrentExercise(0);
    setCompletedExercises([]);
  };

  return (
    <PageLayout
      title="Programme d'entraînement"
      subtitle="Suivez votre séance en temps réel"
      icon={<Dumbbell className="h-6 w-6 text-blue-600" />}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </div>
      }
    >
      {/* Statistiques de la séance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Exercices"
          value={`${workoutStats.completedExercises}/${workoutStats.totalExercises}`}
          icon={Target}
          color="blue"
          progress={(workoutStats.completedExercises / workoutStats.totalExercises) * 100}
        />
        <StatCard
          title="Temps estimé"
          value={workoutStats.estimatedTime}
          icon={Clock}
          color="green"
        />
        <StatCard
          title="Calories"
          value={workoutStats.calories}
          icon={Target}
          color="purple"
        />
        <StatCard
          title="Progression"
          value={`${Math.round((workoutStats.completedExercises / workoutStats.totalExercises) * 100)}%`}
          icon={Target}
          color="orange"
        />
      </div>

      {/* Contrôles de la séance */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-900 text-2xl">
            <div className="bg-blue-100 rounded-full p-2">
              <Play className="h-6 w-6 text-blue-600" />
            </div>
            Contrôles de la séance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4">
            {!isWorkoutActive ? (
              <Button 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleStartWorkout}
              >
                <Play className="h-5 w-5 mr-2" />
                Démarrer la séance
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline"
                  className="px-6 py-3 border-2 border-red-300 hover:border-red-400 hover:bg-red-50 text-red-700 font-semibold transition-all duration-300"
                  onClick={handlePauseWorkout}
                >
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </Button>
                <Button 
                  variant="outline"
                  className="px-6 py-3 border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-semibold transition-all duration-300"
                  onClick={handleResetWorkout}
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Reset
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Exercice actuel */}
      {isWorkoutActive && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-slate-900">
              Exercice {currentExercise + 1} sur {workoutProgram.exercises.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold text-slate-900">
                {workoutProgram.exercises[currentExercise].name}
              </h3>
              <div className="flex justify-center gap-6 text-lg text-slate-600">
                <span className="bg-white px-4 py-2 rounded-lg shadow">
                  {workoutProgram.exercises[currentExercise].sets}
                </span>
                <span className="bg-white px-4 py-2 rounded-lg shadow">
                  {workoutProgram.exercises[currentExercise].weight}
                </span>
                <span className="bg-white px-4 py-2 rounded-lg shadow">
                  Repos: {workoutProgram.exercises[currentExercise].rest}
                </span>
              </div>
              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline"
                  onClick={handlePreviousExercise}
                  disabled={currentExercise === 0}
                  className="px-6 py-2"
                >
                  Précédent
                </Button>
                <Button 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2"
                  onClick={() => handleCompleteExercise(currentExercise)}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Terminer
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleNextExercise}
                  disabled={currentExercise === workoutProgram.exercises.length - 1}
                  className="px-6 py-2"
                >
                  Suivant
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des exercices */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-900 text-2xl">
            <div className="bg-purple-100 rounded-full p-2">
              <Dumbbell className="h-6 w-6 text-purple-600" />
            </div>
            Liste des exercices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {workoutProgram.exercises.map((exercise, index) => (
              <div 
                key={index} 
                className={`flex justify-between items-center p-4 rounded-xl border transition-all duration-200 ${
                  completedExercises.includes(index) 
                    ? 'bg-green-50 border-green-200' 
                    : currentExercise === index && isWorkoutActive
                    ? 'bg-blue-50 border-blue-200 shadow-md'
                    : 'bg-slate-50 border-slate-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  {completedExercises.includes(index) ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center">
                      <span className="text-sm font-medium text-slate-600">{index + 1}</span>
                    </div>
                  )}
                  <span className="font-semibold text-slate-900 text-lg">{exercise.name}</span>
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  <span className="bg-slate-200 px-2 py-1 rounded-md">{exercise.sets}</span>
                  <span className="mx-3">•</span>
                  <span className="bg-slate-200 px-2 py-1 rounded-md">{exercise.weight}</span>
                  <span className="mx-3">•</span>
                  <span className="bg-slate-200 px-2 py-1 rounded-md">{exercise.rest}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Programme; 