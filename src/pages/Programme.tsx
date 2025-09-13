import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Dumbbell, 
  Plus, 
  Settings, 
  Target,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  BarChart3,
  Users,
  Zap,
  Heart,
  Timer,
  Weight,
  Ruler,
  Flame,
  Award,
  Star,
  Trophy,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  Filter,
  Search,
  Grid,
  List,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle
} from 'lucide-react';

// Section Programme - Programme du jour
const ProgrammeSection = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const todayProgram = {
    date: '2024-01-15',
    name: 'Programme Débutant - Jour 1',
    duration: '60 min',
    difficulty: 'Débutant',
    type: 'Musculation',
    exercises: [
      {
        id: 1,
        name: 'Squat',
        sets: 3,
        reps: 12,
        weight: 'Corps libre',
        rest: '90s',
        completed: false
          },
          {
            id: 2,
        name: 'Développé couché',
        sets: 3,
        reps: 10,
        weight: '60kg',
        rest: '120s',
        completed: false
          },
          {
            id: 3,
        name: 'Soulevé de terre',
        sets: 3,
        reps: 8,
        weight: '80kg',
        rest: '120s',
        completed: false
          },
          {
            id: 4,
        name: 'Tractions',
        sets: 3,
        reps: 'Max',
        weight: 'Corps libre',
        rest: '90s',
        completed: false
      },
      {
        id: 5,
        name: 'Pompes',
        sets: 3,
        reps: 15,
        weight: 'Corps libre',
        rest: '60s',
        completed: false
      },
      {
        id: 6,
        name: 'Planche',
        sets: 3,
        reps: '30s',
        weight: 'Corps libre',
        rest: '60s',
        completed: false
      }
    ]
  };

  const handleStartWorkout = () => {
    setIsStarted(true);
  };

  const handleCompleteExercise = (exerciseId: number) => {
    if (completedExercises.includes(exerciseId)) {
      setCompletedExercises(completedExercises.filter(id => id !== exerciseId));
      } else {
      setCompletedExercises([...completedExercises, exerciseId]);
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < todayProgram.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
    }
  };

  const progress = (completedExercises.length / todayProgram.exercises.length) * 100;

    return (
    <div className="space-y-6">
      {/* En-tête du programme du jour */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Programme du Jour</h2>
          <p className="text-muted-foreground">
            {todayProgram.name} - {todayProgram.date}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {todayProgram.duration}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            {todayProgram.difficulty}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Dumbbell className="h-4 w-4" />
            {todayProgram.type}
          </Badge>
        </div>
      </div>

      {/* Progression générale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Progression de la Séance
          </CardTitle>
          <CardDescription>
            {completedExercises.length} / {todayProgram.exercises.length} exercices terminés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0%</span>
              <span className="font-medium">{Math.round(progress)}%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contrôles de la séance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Contrôles de la Séance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {!isStarted ? (
              <Button onClick={handleStartWorkout} className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Démarrer la Séance
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Pause className="h-4 w-4" />
                  Pause
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Recommencer
                </Button>
                <Button className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Terminer la Séance
                </Button>
          </div>
        )}
          </div>
        </CardContent>
      </Card>

      {/* Exercice actuel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            Exercice Actuel
          </CardTitle>
          <CardDescription>
            Exercice {currentExercise + 1} sur {todayProgram.exercises.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">
                {todayProgram.exercises[currentExercise].name}
              </h3>
              <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                <span>{todayProgram.exercises[currentExercise].sets} séries</span>
                <span>•</span>
                <span>{todayProgram.exercises[currentExercise].reps} répétitions</span>
                <span>•</span>
                <span>{todayProgram.exercises[currentExercise].weight}</span>
                  </div>
                </div>
                
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {todayProgram.exercises[currentExercise].sets}
                </div>
                <div className="text-sm text-muted-foreground">Séries</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {todayProgram.exercises[currentExercise].reps}
                </div>
                <div className="text-sm text-muted-foreground">Répétitions</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {todayProgram.exercises[currentExercise].rest}
                </div>
                <div className="text-sm text-muted-foreground">Repos</div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={handlePreviousExercise}
                disabled={currentExercise === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Précédent
              </Button>
              <Button 
                onClick={() => handleCompleteExercise(todayProgram.exercises[currentExercise].id)}
                className="flex items-center gap-2"
              >
                {completedExercises.includes(todayProgram.exercises[currentExercise].id) ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Terminé
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4" />
                    Marquer comme terminé
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleNextExercise}
                disabled={currentExercise === todayProgram.exercises.length - 1}
              >
                Suivant
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
            </CardContent>
          </Card>

      {/* Liste de tous les exercices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List className="h-5 w-5" />
            Tous les Exercices
          </CardTitle>
          <CardDescription>
            Vue d'ensemble de tous les exercices de la séance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayProgram.exercises.map((exercise, index) => (
              <div 
                key={exercise.id}
                className={`p-4 border rounded-lg transition-all ${
                  index === currentExercise ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                } ${
                  completedExercises.includes(exercise.id) ? 'bg-green-50 border-green-200' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {completedExercises.includes(exercise.id) ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="font-medium">{exercise.name}</span>
              </div>
                    <Badge variant="outline">
                      {exercise.sets} séries
                    </Badge>
                    <Badge variant="outline">
                      {exercise.reps} reps
                    </Badge>
                    <Badge variant="outline">
                      {exercise.weight}
                    </Badge>
              </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Repos: {exercise.rest}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setCurrentExercise(index)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
              </div>
              </div>
              </div>
            ))}
              </div>
            </CardContent>
          </Card>
    </div>
  );
};

// Section Planning - Contenu de la page Planning
const PlanningSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');

  const sessions = [
    {
      id: 1,
      date: '2024-01-15',
      time: '18:00',
      type: 'Musculation',
      duration: '60 min',
      status: 'completed',
      exercises: ['Squat', 'Développé couché', 'Soulevé de terre']
    },
    {
      id: 2,
      date: '2024-01-17',
      time: '19:00',
      type: 'Cardio',
      duration: '45 min',
      status: 'scheduled',
      exercises: ['Course', 'Vélo', 'Rameur']
    },
    {
      id: 3,
      date: '2024-01-19',
      time: '18:30',
      type: 'Musculation',
      duration: '75 min',
      status: 'scheduled',
      exercises: ['Tractions', 'Pompes', 'Fentes', 'Planche']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête du planning */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Planning d'Entraînement</h2>
          <p className="text-muted-foreground">
            Organisez et suivez vos séances d'entraînement
          </p>
        </div>

        <div className="flex gap-2">
          {['day', 'week', 'month'].map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode(mode)}
            >
              {mode === 'day' && 'Jour'}
              {mode === 'week' && 'Semaine'}
              {mode === 'month' && 'Mois'}
            </Button>
          ))}
                </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Séances Terminées</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Cette Semaine</p>
                <p className="text-2xl font-bold">3/4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Temps Total</p>
                <p className="text-2xl font-bold">8h 30min</p>
              </div>
              </div>
            </CardContent>
          </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Objectif</p>
                <p className="text-2xl font-bold">75%</p>
                </div>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Calendrier et sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendrier */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Calendrier des Séances</CardTitle>
            <CardDescription>
              Vue d'ensemble de vos entraînements programmés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Mini calendrier */}
              <div className="grid grid-cols-7 gap-2 text-center">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day) => (
                  <div key={day} className="p-2 font-semibold text-sm">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <div 
                    key={day} 
                    className={`p-2 text-sm rounded cursor-pointer hover:bg-gray-100 ${
                      day === 15 ? 'bg-blue-500 text-white' : ''
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des sessions */}
        <Card>
        <CardHeader>
            <CardTitle>Prochaines Séances</CardTitle>
            <CardDescription>
              Vos entraînements à venir
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-3">
              {sessions.map((session) => (
                <div key={session.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(session.status)}`}></div>
                      <span className="font-medium">{session.type}</span>
                    </div>
                    <Badge variant="outline">{session.duration}</Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-2">
                    {session.date} à {session.time}
                  </div>
                  
                  <div className="space-y-1">
                    {session.exercises.slice(0, 2).map((exercise) => (
                      <div key={exercise} className="text-xs text-muted-foreground">
                        • {exercise}
                      </div>
                    ))}
                    {session.exercises.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{session.exercises.length - 2} autres
                      </div>
                    )}
                    </div>
                  
                  <div className="flex gap-1 mt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Play className="h-3 w-3 mr-1" />
                      Démarrer
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-3 w-3" />
                    </Button>
                </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

// Page Programme fusionnée
export default function Programme() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <Tabs defaultValue="programme" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="programme">Programme du Jour</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
        </TabsList>
        
        <TabsContent value="programme" className="space-y-6">
          <ProgrammeSection />
        </TabsContent>
        
        <TabsContent value="planning" className="space-y-6">
          <PlanningSection />
        </TabsContent>
      </Tabs>
    </div>
  );
} 