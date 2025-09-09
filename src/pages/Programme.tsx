import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dumbbell, Clock, Target, Trophy, Star, Play, Pause, RotateCcw, CheckCircle, Timer, Zap, Flame, Award, Activity, Heart, TrendingUp } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

interface Exercice {
  id: number;
  nom: string;
  series: number;
  repetitions: number;
  poids: number;
  repos: number;
  description: string;
  muscle: string;
  difficulte: 'Facile' | 'Moyen' | 'Difficile';
  termine: boolean;
  calories: number;
}

interface ProgrammeDuJour {
  id: number;
  nom: string;
  date: string;
  duree: number;
  difficulte: 'Débutant' | 'Intermédiaire' | 'Avancé';
  objectif: string;
  exercices: Exercice[];
  calories: number;
  progression: number;
  statut: 'En cours' | 'Terminé' | 'Non commencé';
  streak: number;
  xp: number;
}

const Programme: React.FC = () => {
  const [programmeDuJour, setProgrammeDuJour] = useState<ProgrammeDuJour | null>(null);
  const [exerciceActuel, setExerciceActuel] = useState<number>(0);
  const [serieActuelle, setSerieActuelle] = useState<number>(1);
  const [tempsRepos, setTempsRepos] = useState<number>(0);
  const [enCours, setEnCours] = useState<boolean>(false);
  const [tempsEcoule, setTempsEcoule] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Génération du programme du jour
  useEffect(() => {
    const programmes = [
      {
        id: 1,
        nom: "Force Maximale",
        date: new Date().toLocaleDateString('fr-FR'),
        duree: 60,
        difficulte: 'Intermédiaire' as const,
        objectif: "Développement de la force maximale",
        calories: 450,
        progression: 0,
        statut: 'Non commencé' as const,
        streak: 7,
        xp: 1250,
        exercices: [
          {
            id: 1,
            nom: "Squats",
            series: 4,
            repetitions: 8,
            poids: 80,
            repos: 120,
            description: "Exercice de base pour les jambes avec charge",
            muscle: "Quadriceps",
            difficulte: 'Moyen' as const,
            termine: false,
            calories: 120
          },
          {
            id: 2,
            nom: "Développé couché",
            series: 4,
            repetitions: 6,
            poids: 70,
            repos: 120,
            description: "Exercice principal pour les pectoraux",
            muscle: "Pectoraux",
            difficulte: 'Moyen' as const,
            termine: false,
            calories: 100
          },
          {
            id: 3,
            nom: "Deadlift",
            series: 3,
            repetitions: 5,
            poids: 100,
            repos: 180,
            description: "Exercice roi de la musculation",
            muscle: "Dorsaux",
            difficulte: 'Difficile' as const,
            termine: false,
            calories: 150
          },
          {
            id: 4,
            nom: "Tractions",
            series: 3,
            repetitions: 8,
            poids: 0,
            repos: 90,
            description: "Exercice pour le dos au poids du corps",
            muscle: "Dorsaux",
            difficulte: 'Difficile' as const,
            termine: false,
            calories: 80
          }
        ]
      }
    ];

    setProgrammeDuJour(programmes[0]);
  }, []);

  // Timer pour le temps écoulé
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (enCours) {
      interval = setInterval(() => {
        setTempsEcoule(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [enCours]);

  // Timer pour le repos
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (tempsRepos > 0) {
      interval = setInterval(() => {
        setTempsRepos(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [tempsRepos]);

  const demarrerProgramme = () => {
    if (programmeDuJour) {
      setProgrammeDuJour({ ...programmeDuJour, statut: 'En cours' });
      setEnCours(true);
      setTempsEcoule(0);
    }
  };

  const arreterProgramme = () => {
    if (programmeDuJour) {
      setProgrammeDuJour({ ...programmeDuJour, statut: 'Terminé' });
      setEnCours(false);
    }
  };

  const exerciceSuivant = () => {
    if (programmeDuJour) {
      const exercice = programmeDuJour.exercices[exerciceActuel];
      
      if (serieActuelle < exercice.series) {
        setSerieActuelle(serieActuelle + 1);
        setTempsRepos(exercice.repos);
      } else if (exerciceActuel < programmeDuJour.exercices.length - 1) {
        // Marquer l'exercice comme terminé
        const nouveauxExercices = programmeDuJour.exercices.map((ex, index) => 
          index === exerciceActuel ? { ...ex, termine: true } : ex
        );
        
        const nouvelleProgression = ((exerciceActuel + 1) * 100) / programmeDuJour.exercices.length;
        setProgrammeDuJour({ 
          ...programmeDuJour, 
          exercices: nouveauxExercices,
          progression: nouvelleProgression
        });
        
        setExerciceActuel(exerciceActuel + 1);
        setSerieActuelle(1);
        setTempsRepos(0);
      } else {
        // Programme terminé
        const nouveauxExercices = programmeDuJour.exercices.map((ex, index) => 
          index === exerciceActuel ? { ...ex, termine: true } : ex
        );
        setProgrammeDuJour({ 
          ...programmeDuJour, 
          exercices: nouveauxExercices,
          statut: 'Terminé',
          progression: 100
        });
        setEnCours(false);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }
  };

  const formatTemps = (secondes: number) => {
    const minutes = Math.floor(secondes / 60);
    const secs = secondes % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficulteColor = (difficulte: string) => {
    switch (difficulte) {
      case 'Facile': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Difficile': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En cours': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Terminé': return 'bg-green-100 text-green-800 border-green-200';
      case 'Non commencé': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!programmeDuJour) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 mx-auto"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto absolute top-0 left-0"></div>
            </div>
            <p className="text-black text-lg font-medium">Chargement du programme...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  const exercice = programmeDuJour.exercices[exerciceActuel];
  const progression = programmeDuJour.progression;
  const caloriesBrulées = programmeDuJour.exercices
    .filter(ex => ex.termine)
    .reduce((total, ex) => total + ex.calories, 0);

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Animation de célébration */}
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="text-8xl animate-bounce">🎉</div>
            <div className="absolute top-1/4 left-1/4 text-6xl animate-pulse">🏆</div>
            <div className="absolute top-1/4 right-1/4 text-6xl animate-pulse">⭐</div>
            <div className="absolute bottom-1/4 left-1/3 text-6xl animate-pulse">💪</div>
            <div className="absolute bottom-1/4 right-1/3 text-6xl animate-pulse">🎉</div>
          </div>
        )}

        {/* Header du programme du jour avec particules */}
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
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <Dumbbell className="w-8 h-8 group-hover:animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white group-hover:scale-105 transition-transform duration-300">
                      Programme du Jour
                    </h1>
                    <p className="text-white/90 text-lg font-medium">{programmeDuJour.nom} - {programmeDuJour.date}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <Badge className={`${getStatutColor(programmeDuJour.statut)} text-lg px-4 py-2 rounded-full font-semibold border-2 hover:scale-105 transition-transform duration-300`}>
                    {programmeDuJour.statut}
                  </Badge>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
                    <Clock className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-white font-medium">{programmeDuJour.duree} min</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
                    <Zap className="w-4 h-4 group-hover:animate-pulse" />
                    <span className="text-white font-medium">{programmeDuJour.calories} cal</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
                    <Flame className="w-4 h-4 group-hover:animate-bounce" />
                    <span className="text-white font-medium">{programmeDuJour.streak} jours</span>
                  </div>
                </div>
              </div>

              <div className="lg:text-right space-y-3">
                <div className="text-white/90 font-medium">Progression du programme</div>
                <div className="w-80">
                  <Progress 
                    value={progression} 
                    className="h-4 bg-white/20 rounded-full overflow-hidden"
                  />
                </div>
                <div className="text-sm">
                  <span className="text-white font-bold text-lg">{progression}%</span> 
                  <span className="text-white/80"> terminé</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats en temps réel avec animations */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Timer className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                {formatTemps(tempsEcoule)}
              </div>
              <div className="text-sm text-black font-medium">Temps écoulé</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                {programmeDuJour.exercices.length}
              </div>
              <div className="text-sm text-black font-medium">Exercices</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                {programmeDuJour.exercices.filter(ex => ex.termine).length}
              </div>
              <div className="text-sm text-black font-medium">Terminés</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                {caloriesBrulées}
              </div>
              <div className="text-sm text-black font-medium">Calories</div>
            </CardContent>
          </Card>
        </div>

        {/* Contrôles du programme avec style amélioré */}
        <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-300 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="text-center group">
                  <div className="text-2xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                    {formatTemps(tempsEcoule)}
                  </div>
                  <div className="text-sm text-black">Temps écoulé</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                    {programmeDuJour.exercices.length}
                  </div>
                  <div className="text-sm text-black">Exercices</div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                    {programmeDuJour.exercices.filter(ex => ex.termine).length}
                  </div>
                  <div className="text-sm text-black">Terminés</div>
                </div>
      </div>

              <div className="flex gap-3">
                {!enCours && programmeDuJour.statut === 'Non commencé' && (
                  <Button 
                    onClick={demarrerProgramme}
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Commencer
                  </Button>
                )}
                
                {enCours && (
                  <Button 
                    onClick={arreterProgramme}
                    variant="destructive"
                    size="lg"
                    className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    Arrêter
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exercice actuel avec design amélioré */}
        {enCours && (
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-black">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">{exercice.nom}</span>
                <Badge className={`${getDifficulteColor(exercice.difficulte)} text-sm px-3 py-1 border-2`}>
                  {exercice.difficulte}
                </Badge>
          </CardTitle>
        </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <div className="text-3xl font-bold text-black group-hover:scale-110 transition-transform duration-300">{serieActuelle}</div>
                  <div className="text-sm text-black font-medium">Série actuelle</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <div className="text-3xl font-bold text-black group-hover:scale-110 transition-transform duration-300">{exercice.series}</div>
                  <div className="text-sm text-black font-medium">Total séries</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <div className="text-3xl font-bold text-black group-hover:scale-110 transition-transform duration-300">{exercice.repetitions}</div>
                  <div className="text-sm text-black font-medium">Répétitions</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <div className="text-3xl font-bold text-black group-hover:scale-110 transition-transform duration-300">{exercice.poids}kg</div>
                  <div className="text-sm text-black font-medium">Poids</div>
                </div>
              </div>

              <div className="text-center space-y-3">
                <p className="text-lg text-black font-medium">{exercice.description}</p>
                <div className="flex items-center justify-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <p className="text-sm text-black font-medium">Muscle ciblé: {exercice.muscle}</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 text-orange-600" />
                  <p className="text-sm text-black font-medium">{exercice.calories} calories</p>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={exerciceSuivant}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold px-8 py-4"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {serieActuelle < exercice.series ? 'Série suivante' : 'Exercice suivant'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Temps de repos avec animation */}
        {tempsRepos > 0 && (
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-black">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Timer className="w-6 h-6 text-white" />
                </div>
                Temps de repos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="text-8xl font-bold text-black animate-pulse">{tempsRepos}s</div>
                  <div className="absolute inset-0 text-8xl font-bold text-orange-200 animate-ping">{tempsRepos}s</div>
                </div>
                <Button 
                  onClick={() => setTempsRepos(0)}
                  variant="outline"
                  className="border-2 border-orange-300 text-orange-700 hover:bg-orange-100 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Passer le repos
                </Button>
          </div>
        </CardContent>
      </Card>
        )}

        {/* Liste des exercices avec animations */}
        <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-300 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-black">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              Exercices du programme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {programmeDuJour.exercices.map((exercice, index) => (
                <div 
                  key={exercice.id} 
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-500 hover:shadow-lg hover:scale-105 ${
                    exercice.termine 
                      ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-300 shadow-lg' 
                      : index === exerciceActuel && enCours
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300 shadow-lg'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      exercice.termine 
                        ? 'bg-green-500 text-white shadow-lg' 
                        : index === exerciceActuel && enCours
                        ? 'bg-blue-500 text-white shadow-lg animate-pulse'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {exercice.termine ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="font-bold text-lg">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-lg text-black">{exercice.nom}</div>
                      <div className="text-sm text-black">{exercice.series} séries × {exercice.repetitions} reps</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${getDifficulteColor(exercice.difficulte)} text-sm px-3 py-1 border-2`}>
                      {exercice.difficulte}
                    </Badge>
                    {exercice.poids > 0 && (
                      <span className="text-sm text-black font-medium bg-slate-100 px-3 py-1 rounded-full">
                        {exercice.poids}kg
                </span>
                    )}
                    <span className="text-sm text-black font-medium bg-orange-100 px-3 py-1 rounded-full">
                      {exercice.calories} cal
                </span>
              </div>
              </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Résumé de la séance avec animations */}
        {programmeDuJour.statut === 'Terminé' && (
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
        <CardHeader>
              <CardTitle className="flex items-center gap-3 text-black">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Trophy className="w-6 h-6 text-white" />
            </div>
                Séance terminée !
          </CardTitle>
        </CardHeader>
        <CardContent>
              <div className="text-center space-y-6">
                <div className="text-6xl animate-bounce">🎉</div>
                <h3 className="text-3xl font-bold text-black">Félicitations !</h3>
                <p className="text-xl text-black font-medium">Vous avez terminé votre programme du jour</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <div className="text-4xl font-bold text-black group-hover:scale-110 transition-transform duration-300">{formatTemps(tempsEcoule)}</div>
                    <div className="text-sm text-black font-medium">Temps total</div>
                  </div>
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <div className="text-4xl font-bold text-black group-hover:scale-110 transition-transform duration-300">{programmeDuJour.exercices.length}</div>
                    <div className="text-sm text-black font-medium">Exercices</div>
                    </div>
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <div className="text-4xl font-bold text-black group-hover:scale-110 transition-transform duration-300">{programmeDuJour.calories}</div>
                    <div className="text-sm text-black font-medium">Calories</div>
                </div>
                </div>
          </div>
        </CardContent>
      </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default Programme; 