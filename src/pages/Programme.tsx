import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dumbbell, Clock, Target, Trophy, Star, Play, Pause, RotateCcw, CheckCircle, Calendar, Timer } from 'lucide-react';
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
  termine?: boolean;
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
  tempsTotal: number;
  tempsRestant: number;
}

const Programme: React.FC = () => {
  const [programmeDuJour, setProgrammeDuJour] = useState<ProgrammeDuJour | null>(null);
  const [exerciceActuel, setExerciceActuel] = useState<number>(0);
  const [serieActuelle, setSerieActuelle] = useState<number>(1);
  const [tempsRepos, setTempsRepos] = useState<number>(0);
  const [enCours, setEnCours] = useState<boolean>(false);
  const [tempsEcoule, setTempsEcoule] = useState<number>(0);

  // Simulation du programme du jour
  useEffect(() => {
    const programme: ProgrammeDuJour = {
      id: 1,
      nom: "Programme Débutant",
      date: new Date().toLocaleDateString('fr-FR'),
      duree: 45,
      difficulte: 'Débutant',
      objectif: "Découverte de la musculation",
      calories: 300,
      progression: 0,
      tempsTotal: 45,
      tempsRestant: 45,
      exercices: [
        {
          id: 1,
          nom: "Squats",
          series: 3,
          repetitions: 12,
          poids: 0,
          repos: 60,
          description: "Exercice de base pour les jambes",
          muscle: "Quadriceps",
          difficulte: 'Facile',
          termine: false
        },
        {
          id: 2,
          nom: "Pompes",
          series: 3,
          repetitions: 10,
          poids: 0,
          repos: 45,
          description: "Exercice au poids du corps",
          muscle: "Pectoraux",
          difficulte: 'Facile',
          termine: false
        },
        {
          id: 3,
          nom: "Planche",
          series: 3,
          repetitions: 30,
          poids: 0,
          repos: 60,
          description: "Gainage abdominal",
          muscle: "Abdominaux",
          difficulte: 'Moyen',
          termine: false
        },
        {
          id: 4,
          nom: "Tractions",
          series: 3,
          repetitions: 5,
          poids: 0,
          repos: 90,
          description: "Exercice pour le dos",
          muscle: "Dorsaux",
          difficulte: 'Difficile',
          termine: false
        }
      ]
    };
    setProgrammeDuJour(programme);
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

  const demarrerProgramme = () => {
    setEnCours(true);
    setTempsEcoule(0);
  };

  const arreterProgramme = () => {
    setEnCours(false);
    setExerciceActuel(0);
    setSerieActuelle(1);
    setTempsRepos(0);
    setTempsEcoule(0);
  };

  const exerciceSuivant = () => {
    if (programmeDuJour) {
      const exercice = programmeDuJour.exercices[exerciceActuel];
      
      if (serieActuelle < exercice.series) {
        setSerieActuelle(serieActuelle + 1);
        setTempsRepos(exercice.repos);
      } else {
        // Marquer l'exercice comme terminé
        const nouveauxExercices = [...programmeDuJour.exercices];
        nouveauxExercices[exerciceActuel].termine = true;
        setProgrammeDuJour({...programmeDuJour, exercices: nouveauxExercices});
        
        if (exerciceActuel < programmeDuJour.exercices.length - 1) {
          setExerciceActuel(exerciceActuel + 1);
          setSerieActuelle(1);
          setTempsRepos(0);
        } else {
          // Programme terminé
          arreterProgramme();
        }
      }
    }
  };

  const getDifficulteColor = (difficulte: string) => {
    switch (difficulte) {
      case 'Facile': return 'bg-green-100 text-green-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Difficile': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficulteColorProgramme = (difficulte: string) => {
    switch (difficulte) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTemps = (secondes: number) => {
    const minutes = Math.floor(secondes / 60);
    const secs = secondes % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const calculerProgression = () => {
    if (!programmeDuJour) return 0;
    const exercicesTermines = programmeDuJour.exercices.filter(ex => ex.termine).length;
    return (exercicesTermines / programmeDuJour.exercices.length) * 100;
  };

  if (!programmeDuJour) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-lg text-black">Chargement du programme...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  const exercice = programmeDuJour.exercices[exerciceActuel];
  const progression = calculerProgression();

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header du programme du jour */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                    <Calendar className="w-10 h-10" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold tracking-tight text-white">Programme du Jour</h1>
                    <p className="text-white/90 text-xl font-medium">{programmeDuJour.date}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <Badge className={`${getDifficulteColorProgramme(programmeDuJour.difficulte)} text-lg px-6 py-3 rounded-full font-bold shadow-lg`}>
                    {programmeDuJour.difficulte}
                  </Badge>
                  <div className="flex items-center gap-3 bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm border border-white/30">
                    <Timer className="w-6 h-6 text-blue-400" />
                    <span className="text-xl font-bold text-white">{programmeDuJour.duree} min</span>
                    <span className="text-white/90 text-sm font-medium">durée</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm border border-white/30">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    <span className="text-xl font-bold text-white">{programmeDuJour.calories} cal</span>
                    <span className="text-white/90 text-sm font-medium">brûlées</span>
                  </div>
                </div>
              </div>

              <div className="lg:text-right space-y-4">
                <div className="text-white/90 font-medium text-lg">Progression</div>
                <div className="w-80">
                  <Progress 
                    value={progression} 
                    className="h-4 bg-white/20 rounded-full"
                  />
                </div>
                <div className="text-sm">
                  <span className="text-white font-bold text-2xl">{Math.round(progression)}%</span>
                  <span className="text-white/80 text-lg"> terminé</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contrôles du programme */}
        <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-300 shadow-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-black mb-2">{programmeDuJour.nom}</h2>
                <p className="text-lg text-black">{programmeDuJour.objectif}</p>
              </div>
              
              <div className="flex items-center gap-4">
                {!enCours ? (
                  <Button 
                    onClick={demarrerProgramme}
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xl px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <Play className="w-6 h-6 mr-3" />
                    Commencer
                  </Button>
                ) : (
                  <Button 
                    onClick={arreterProgramme}
                    size="lg"
                    variant="destructive"
                    className="text-xl px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <Pause className="w-6 h-6 mr-3" />
                    Arrêter
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exercice actuel */}
        {enCours && (
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl font-bold text-black flex items-center gap-4">
                <Dumbbell className="w-8 h-8 text-blue-600" />
                {exercice.nom}
              </CardTitle>
              <p className="text-black text-lg font-medium">{exercice.description}</p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white rounded-xl border-2 border-blue-200">
                  <div className="text-4xl font-bold text-black mb-2">{serieActuelle}</div>
                  <div className="text-lg text-black font-medium">Série</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border-2 border-blue-200">
                  <div className="text-4xl font-bold text-black mb-2">{exercice.series}</div>
                  <div className="text-lg text-black font-medium">Total</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border-2 border-blue-200">
                  <div className="text-4xl font-bold text-black mb-2">{exercice.repetitions}</div>
                  <div className="text-lg text-black font-medium">Répétitions</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border-2 border-blue-200">
                  <div className="text-4xl font-bold text-black mb-2">{exercice.poids}kg</div>
                  <div className="text-lg text-black font-medium">Poids</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <Badge className={getDifficulteColor(exercice.difficulte)}>
                  {exercice.difficulte}
                </Badge>
                <div className="text-2xl font-bold text-black">
                  Muscle: {exercice.muscle}
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={exerciceSuivant}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl px-12 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Play className="w-6 h-6 mr-3" />
                  {serieActuelle < exercice.series ? 'Série suivante' : 'Exercice suivant'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Temps de repos */}
        {tempsRepos > 0 && (
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl font-bold text-black flex items-center gap-4">
                <Clock className="w-8 h-8 text-orange-600" />
                Temps de repos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-8xl font-bold text-black mb-6">{tempsRepos}s</div>
                <Button 
                  onClick={() => setTempsRepos(0)}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 rounded-xl"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Passer le repos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Liste des exercices */}
        <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-300 shadow-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-3xl font-bold text-black flex items-center gap-4">
              <Target className="w-8 h-8 text-slate-600" />
              Exercices du jour
            </CardTitle>
            <p className="text-black text-lg font-medium">Vue d'ensemble de votre séance</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {programmeDuJour.exercices.map((exercice, index) => (
                <div 
                  key={exercice.id} 
                  className={`flex items-center justify-between p-6 rounded-xl border-2 transition-all duration-300 ${
                    exercice.termine 
                      ? 'bg-green-50 border-green-300' 
                      : index === exerciceActuel && enCours
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${
                      exercice.termine 
                        ? 'bg-green-500 text-white' 
                        : index === exerciceActuel && enCours
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {exercice.termine ? <CheckCircle className="w-6 h-6" /> : index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">{exercice.nom}</h3>
                      <p className="text-black">{exercice.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black">{exercice.series}x{exercice.repetitions}</div>
                      <div className="text-sm text-black">séries x reps</div>
                    </div>
                    <Badge className={getDifficulteColor(exercice.difficulte)}>
                      {exercice.difficulte}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistiques de la séance */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 shadow-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-3xl font-bold text-black flex items-center gap-4">
              <Star className="w-8 h-8 text-purple-600" />
              Statistiques de la séance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl border-2 border-purple-200">
                <div className="text-4xl font-bold text-black mb-2">{formatTemps(tempsEcoule)}</div>
                <div className="text-lg text-black font-medium">Temps écoulé</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border-2 border-purple-200">
                <div className="text-4xl font-bold text-black mb-2">{Math.round(progression)}%</div>
                <div className="text-lg text-black font-medium">Progression</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border-2 border-purple-200">
                <div className="text-4xl font-bold text-black mb-2">{programmeDuJour.calories}</div>
                <div className="text-lg text-black font-medium">Calories brûlées</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Programme; 