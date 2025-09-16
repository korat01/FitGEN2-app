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
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent">
          Bienvenue sur FitGEN22
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Votre assistant personnel pour la musculation et la nutrition. 
          Créez des programmes sur mesure et suivez vos progrès.
        </p>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
        <Card className="mobile-card hover-lift hover-glow cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="p-3 gradient-primary text-white rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Dumbbell className="h-8 w-8" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">Créer un Programme</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Générez un programme personnalisé selon vos objectifs
            </p>
            <Button className="w-full gradient-primary text-white hover:shadow-glow">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Programme
            </Button>
          </CardContent>
        </Card>

        <Card className="mobile-card hover-lift hover-glow cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="p-3 gradient-success text-white rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">Planning</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Organisez vos séances d'entraînement
            </p>
            <Button variant="outline" className="w-full border-2 hover:bg-muted/50">
              <ArrowRight className="h-4 w-4 mr-2" />
              Voir Planning
            </Button>
          </CardContent>
        </Card>

        <Card className="mobile-card hover-lift hover-glow cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">Nutrition</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Suivez votre alimentation et vos macros
            </p>
            <Button variant="outline" className="w-full border-2 hover:bg-muted/50">
              <ArrowRight className="h-4 w-4 mr-2" />
              Voir Nutrition
            </Button>
          </CardContent>
        </Card>

        <Card className="mobile-card hover-lift hover-glow cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="p-3 gradient-accent text-white rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="h-8 w-8" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">Statistiques</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Analysez vos performances et progrès
            </p>
            <Button variant="outline" className="w-full border-2 hover:bg-muted/50">
              <ArrowRight className="h-4 w-4 mr-2" />
              Voir Stats
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progrès récents */}
      <Card className="mobile-card shadow-float animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 gradient-primary text-white rounded-lg">
              <TrendingUp className="h-5 w-5" />
            </div>
            Progrès Récents
          </CardTitle>
          <CardDescription className="text-base">
            Vos dernières performances et améliorations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Séance de musculation terminée</p>
                  <p className="text-sm text-muted-foreground">Hier à 18h30</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">+5kg</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Objectif hebdomadaire atteint</p>
                  <p className="text-sm text-muted-foreground">3/3 séances cette semaine</p>
                </div>
              </div>
              <Badge className="gradient-primary text-white">100%</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Nouveau record personnel</p>
                  <p className="text-sm text-muted-foreground">Développé couché : 120kg</p>
                </div>
              </div>
              <Badge variant="outline" className="border-2 border-primary text-primary">Record!</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Objectifs du mois */}
      <Card className="mobile-card shadow-float animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 gradient-accent text-white rounded-lg">
              <Trophy className="h-5 w-5" />
            </div>
            Objectifs du Mois
          </CardTitle>
          <CardDescription className="text-base">
            Vos objectifs pour le mois en cours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>Séances d'entraînement</span>
                <span className="text-primary">12/16</span>
              </div>
              <Progress value={75} className="h-3 bg-muted/50" />
              <p className="text-xs text-muted-foreground">Excellent progrès! Continuez comme ça</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>Objectif calorique quotidien</span>
                <span className="text-primary">2,400/2,500 cal</span>
              </div>
              <Progress value={96} className="h-3 bg-muted/50" />
              <p className="text-xs text-muted-foreground">Presque parfait! Encore 100 calories</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>Protéines quotidiennes</span>
                <span className="text-primary">180/200g</span>
              </div>
              <Progress value={90} className="h-3 bg-muted/50" />
              <p className="text-xs text-muted-foreground">Bien joué! Plus que 20g à atteindre</p>
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
    <div className="space-y-8 animate-fade-in">
      <Tabs defaultValue="accueil" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 bg-muted/50 rounded-xl p-1">
          <TabsTrigger 
            value="accueil" 
            className="rounded-lg text-base font-medium data-[state=active]:shadow-glow data-[state=active]:gradient-primary data-[state=active]:text-white"
          >
            Accueil
          </TabsTrigger>
          <TabsTrigger 
            value="stats"
            className="rounded-lg text-base font-medium data-[state=active]:shadow-glow data-[state=active]:gradient-primary data-[state=active]:text-white"
          >
            Statistiques
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="accueil" className="space-y-6 mt-6">
          <AccueilSection />
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-6 mt-6">
          <StatsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}