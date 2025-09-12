import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Calendar, 
  Target, 
  TrendingUp, 
  Activity, 
  Clock,
  Dumbbell,
  Heart,
  Zap,
  Award,
  Users,
  Settings,
  Plus,
  ArrowRight,
  CheckCircle,
  Star,
  Trophy,
  Flame,
  Timer,
  Weight,
  Ruler
} from 'lucide-react';

// Section Accueil - Contenu de la page d'accueil
const AccueilSection = () => {
  return (
    <div className="space-y-6">
      {/* En-tête de bienvenue */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Bienvenue sur FitGEN2
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Votre assistant personnel pour la musculation et la nutrition. 
          Créez des programmes sur mesure et suivez vos progrès.
        </p>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Dumbbell className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Créer un Programme</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Générez un programme personnalisé selon vos objectifs
            </p>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Programme
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">Planning</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Organisez vos séances d'entraînement
            </p>
            <Button variant="outline" className="w-full">
              <ArrowRight className="h-4 w-4 mr-2" />
              Voir Planning
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 text-red-600" />
            <h3 className="font-semibold mb-2">Nutrition</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Suivez votre alimentation et vos macros
            </p>
            <Button variant="outline" className="w-full">
              <ArrowRight className="h-4 w-4 mr-2" />
              Voir Nutrition
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold mb-2">Statistiques</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Analysez vos performances et progrès
            </p>
            <Button variant="outline" className="w-full">
              <ArrowRight className="h-4 w-4 mr-2" />
              Voir Stats
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progrès récents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Progrès Récents
          </CardTitle>
          <CardDescription>
            Vos dernières performances et améliorations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Séance de musculation terminée</p>
                  <p className="text-sm text-muted-foreground">Hier à 18h30</p>
                </div>
              </div>
              <Badge variant="secondary">+5kg</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Objectif hebdomadaire atteint</p>
                  <p className="text-sm text-muted-foreground">3/3 séances cette semaine</p>
                </div>
              </div>
              <Badge variant="default">100%</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Nouveau record personnel</p>
                  <p className="text-sm text-muted-foreground">Développé couché : 120kg</p>
                </div>
              </div>
              <Badge variant="outline">Record!</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Objectifs du mois */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Objectifs du Mois
          </CardTitle>
          <CardDescription>
            Vos objectifs pour le mois en cours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Séances d'entraînement</span>
                <span>12/16</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Objectif calorique quotidien</span>
                <span>2,400/2,500 cal</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Protéines quotidiennes</span>
                <span>180/200g</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Section Stats - Contenu existant de la page Stats
const StatsSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const statsData = {
    week: {
      workouts: 4,
      totalTime: '8h 30min',
      caloriesBurned: 2840,
      weightChange: -0.8,
      strengthGains: 3
    },
    month: {
      workouts: 16,
      totalTime: '34h 15min',
      caloriesBurned: 11200,
      weightChange: -2.1,
      strengthGains: 12
    },
    year: {
      workouts: 180,
      totalTime: '380h 45min',
      caloriesBurned: 125000,
      weightChange: -8.5,
      strengthGains: 45
    }
  };

  const currentStats = statsData[selectedPeriod as keyof typeof statsData];

  return (
    <div className="space-y-6">
      {/* En-tête des statistiques */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Statistiques</h2>
          <p className="text-muted-foreground">
            Analysez vos performances et suivez vos progrès
          </p>
        </div>
        
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period === 'week' && 'Semaine'}
              {period === 'month' && 'Mois'}
              {period === 'year' && 'Année'}
            </Button>
          ))}
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Séances</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.workouts}</div>
            <p className="text-xs text-muted-foreground">
              +2 par rapport à la période précédente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps Total</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.totalTime}</div>
            <p className="text-xs text-muted-foreground">
              +15% par rapport à la période précédente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories Brûlées</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.caloriesBurned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% par rapport à la période précédente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perte de Poids</CardTitle>
            <Weight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.weightChange}kg</div>
            <p className="text-xs text-muted-foreground">
              Objectif: -1kg par mois
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques et analyses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Progrès de Force</CardTitle>
            <CardDescription>
              Évolution de vos charges sur les exercices principaux
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Développé couché</span>
                <span className="text-sm text-muted-foreground">+5kg</span>
              </div>
              <Progress value={75} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Squat</span>
                <span className="text-sm text-muted-foreground">+3kg</span>
              </div>
              <Progress value={60} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Soulevé de terre</span>
                <span className="text-sm text-muted-foreground">+7kg</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition des Entraînements</CardTitle>
            <CardDescription>
              Types d'entraînements effectués cette période
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Musculation</span>
                </div>
                <span className="text-sm font-medium">60%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Cardio</span>
                </div>
                <span className="text-sm font-medium">25%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Flexibilité</span>
                </div>
                <span className="text-sm font-medium">15%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Objectifs et défis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Objectifs et Défis
          </CardTitle>
          <CardDescription>
            Vos objectifs personnels et défis en cours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Objectifs Actifs</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Perdre 5kg d'ici 3 mois</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Faire 3 séances par semaine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Atteindre 100kg au développé couché</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Défis du Mois</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Défi 30 jours de cardio</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Défi nutrition parfaite</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Défi flexibilité quotidienne</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Page Stats fusionnée
export default function Stats() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <Tabs defaultValue="accueil" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="accueil">Accueil</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accueil" className="space-y-6">
          <AccueilSection />
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-6">
          <StatsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
} 