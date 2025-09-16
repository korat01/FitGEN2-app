import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Crown,
  Medal,
  Award,
  TrendingUp,
  Calendar,
  Dumbbell,
  Activity,
  Flame,
  Shield,
  Sword,
  Gem,
  Coins,
  Globe,
  BarChart3,
  Users,
  Clock,
  Award as AwardIcon
} from 'lucide-react';

const Stats: React.FC = () => {
  // Données utilisateur
  const [userProfile] = useState({
    age: 28,
    sexe: 'M',
    poids: 75,
    taille: 180
  });

  // Système de rangs
  const ranks = [
    { 
      name: 'E - Débutant', 
      minScore: 0, 
      maxScore: 20, 
      color: 'rank-e',
      icon: Shield, 
      description: 'Premiers pas dans le sport',
      standard: 'Performance de base'
    },
    { 
      name: 'D - Occasionnel', 
      minScore: 20, 
      maxScore: 40, 
      color: 'rank-d',
      icon: Star, 
      description: 'Régularité minimale',
      standard: 'Niveau amateur débutant'
    },
    { 
      name: 'C - Confirmé', 
      minScore: 40, 
      maxScore: 60, 
      color: 'rank-c',
      icon: Target, 
      description: 'Vrai niveau sportif',
      standard: 'Amateur investi'
    },
    { 
      name: 'B - Régional', 
      minScore: 60, 
      maxScore: 75, 
      color: 'rank-b',
      icon: Medal, 
      description: 'Niveau compétiteur régional',
      standard: 'Compétiteur régional'
    },
    { 
      name: 'A - National', 
      minScore: 75, 
      maxScore: 85, 
      color: 'rank-a',
      icon: Crown, 
      description: 'Niveau compétitif officiel',
      standard: 'Minimas fédéraux'
    },
    { 
      name: 'S - Mondial', 
      minScore: 85, 
      maxScore: 95, 
      color: 'rank-s',
      icon: Trophy, 
      description: 'Performances élite',
      standard: 'Élite mondiale'
    },
    { 
      name: 'Nation', 
      minScore: 95, 
      maxScore: 98, 
      color: 'rank-nation',
      icon: Award, 
      description: 'Champion national',
      standard: 'Champion national'
    },
    { 
      name: 'World', 
      minScore: 98, 
      maxScore: 100, 
      color: 'rank-world',
      icon: Gem, 
      description: 'Champion mondial',
      standard: 'Record mondial'
    }
  ];

  // Performances actuelles
  const [userPerformances] = useState({
    force: {
      squat: 120,
      bench: 90,
      deadlift: 150,
      total: 360,
      wilks: 285.6
    },
    cardio: {
      vo2max: 45.2,
      vma: 15.8,
      time5k: 22.5,
      time10k: 48.2
    },
    explosivite: {
      sprint100m: 13.2,
      verticalJump: 65,
      broadJump: 2.4
    }
  });

  // Standards officiels
  const standards = {
    force: {
      wilks: {
        E: 200, D: 250, C: 300, B: 350, A: 400, S: 450, Nation: 500, World: 550
      }
    },
    cardio: {
      vo2max: {
        E: 30, D: 35, C: 40, B: 45, A: 50, S: 55, Nation: 60, World: 65
      }
    },
    explosivite: {
      sprint100m: {
        E: 16, D: 15, C: 14, B: 13, A: 12, S: 11, Nation: 10.5, World: 10
      }
    }
  };

  // Calcul du rang
  const calculateRank = (performance: number, category: string) => {
    const categoryStandards = standards[category as keyof typeof standards];
    const performanceKey = Object.keys(categoryStandards)[0] as keyof typeof categoryStandards;
    const categoryRanks = categoryStandards[performanceKey] as Record<string, number>;
    
    for (let i = ranks.length - 1; i >= 0; i--) {
      const rank = ranks[i];
      const standardValue = categoryRanks[rank.name.split(' - ')[0]];
      if (performance >= standardValue) {
        return rank;
      }
    }
    return ranks[0];
  };

  // Rangs actuels
  const currentRanks = {
    force: calculateRank(userPerformances.force.wilks, 'force'),
    cardio: calculateRank(userPerformances.cardio.vo2max, 'cardio'),
    explosivite: calculateRank(userPerformances.explosivite.sprint100m, 'explosivite')
  };

  // Rang global
  const overallScore = (
    (currentRanks.force.minScore + currentRanks.force.maxScore) / 2 * 0.4 +
    (currentRanks.cardio.minScore + currentRanks.cardio.maxScore) / 2 * 0.4 +
    (currentRanks.explosivite.minScore + currentRanks.explosivite.maxScore) / 2 * 0.2
  );
  
  const overallRank = ranks.find(rank => 
    overallScore >= rank.minScore && overallScore < rank.maxScore
  ) || ranks[ranks.length - 1];

  // Statistiques rapides
  const quickStats = [
    { label: 'Série actuelle', value: '12 jours', icon: Flame, color: 'text-orange-500' },
    { label: 'Entraînements', value: '47', icon: Dumbbell, color: 'text-blue-500' },
    { label: 'Calories brûlées', value: '12,450', icon: Zap, color: 'text-red-500' },
    { label: 'XP total', value: '2,850', icon: Coins, color: 'text-green-500' }
  ];

  // Quêtes
  const quests = [
    {
      id: 1,
      title: 'Force Régionale',
      description: 'Atteindre 350 points Wilks',
      progress: Math.min((userPerformances.force.wilks / 350) * 100, 100),
      xp: 500,
      category: 'force',
      unlocked: true,
      deadline: '30 jours'
    },
    {
      id: 2,
      title: 'Cardio Confirmé',
      description: 'Atteindre 40 VO2Max',
      progress: Math.min((userPerformances.cardio.vo2max / 40) * 100, 100),
      xp: 300,
      category: 'cardio',
      unlocked: true,
      deadline: '15 jours'
    },
    {
      id: 3,
      title: 'Sprint National',
      description: 'Courir 100m en moins de 12s',
      progress: Math.min(((16 - userPerformances.explosivite.sprint100m) / (16 - 12)) * 100, 100),
      xp: 750,
      category: 'explosivite',
      unlocked: false,
      deadline: '45 jours'
    }
  ];

  // Badges
  const badges = [
    { name: 'Premier Pas', description: 'Première performance', icon: Star, unlocked: true, xp: 50 },
    { name: 'Force Confirmée', description: 'Rang C en force', icon: Dumbbell, unlocked: true, xp: 200 },
    { name: 'Cardio Régional', description: 'Rang B en cardio', icon: Activity, unlocked: false, xp: 300 },
    { name: 'Triple Menace', description: 'Rang B dans les 3 disciplines', icon: Trophy, unlocked: false, xp: 1000 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container-modern section-spacing">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="heading-1 mb-4">Mes Performances</h1>
          <p className="text-large max-w-2xl mx-auto">
            Suivez votre progression avec des standards sportifs officiels et des objectifs personnalisés
          </p>
        </div>

        {/* Rang global */}
        <Card className="modern-card mb-8 slide-up">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <overallRank.icon className="w-8 h-8 text-primary" />
                  <Badge className={`${overallRank.color} text-white text-lg px-4 py-2`}>
                    {overallRank.name}
                  </Badge>
                </div>
                <h2 className="heading-2 mb-2">Alexandre</h2>
                <p className="text-large mb-4">{overallRank.description}</p>
                <p className="text-muted-foreground">
                  Standard: {overallRank.standard}
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">{overallScore.toFixed(1)}</div>
                <div className="text-muted-foreground mb-4">Score global</div>
                <div className="w-64">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progression</span>
                    <span>{overallScore.toFixed(1)}%</span>
                  </div>
                  <Progress value={overallScore} className="h-3" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="modern-card text-center">
                <CardContent className="p-6">
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Disciplines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Dumbbell className="w-6 h-6 text-blue-500" />
                Force
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rang actuel</span>
                  <Badge className={`${currentRanks.force.color} text-white`}>
                    {currentRanks.force.name}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Wilks: {userPerformances.force.wilks}</span>
                    <span className="text-muted-foreground">/ 350 (B)</span>
                  </div>
                  <Progress value={(userPerformances.force.wilks / 350) * 100} className="h-2" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Total: {userPerformances.force.total}kg
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-green-500" />
                Cardio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rang actuel</span>
                  <Badge className={`${currentRanks.cardio.color} text-white`}>
                    {currentRanks.cardio.name}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>VO2Max: {userPerformances.cardio.vo2max}</span>
                    <span className="text-muted-foreground">/ 45 (B)</span>
                  </div>
                  <Progress value={(userPerformances.cardio.vo2max / 45) * 100} className="h-2" />
                </div>
                <div className="text-sm text-muted-foreground">
                  5K: {userPerformances.cardio.time5k}min
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-500" />
                Explosivité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rang actuel</span>
                  <Badge className={`${currentRanks.explosivite.color} text-white`}>
                    {currentRanks.explosivite.name}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>100m: {userPerformances.explosivite.sprint100m}s</span>
                    <span className="text-muted-foreground">/ 13s (B)</span>
                  </div>
                  <Progress value={((16 - userPerformances.explosivite.sprint100m) / (16 - 13)) * 100} className="h-2" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Saut: {userPerformances.explosivite.verticalJump}cm
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="quests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quests" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Quêtes
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <AwardIcon className="w-4 h-4" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Comparaison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quests" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {quests.map((quest) => (
                <Card key={quest.id} className={`modern-card ${quest.unlocked ? '' : 'opacity-60'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{quest.title}</h3>
                      <Badge variant="secondary">
                        {quest.xp} XP
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{quest.description}</p>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progression</span>
                        <span>{quest.progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={quest.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Délai: {quest.deadline}</span>
                        <span>{quest.unlocked ? 'Actif' : 'Verrouillé'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {badges.map((badge, index) => (
                <Card key={index} className={`modern-card text-center ${badge.unlocked ? 'border-primary/20' : 'opacity-60'}`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-4">
                      <div className={`p-4 rounded-full ${badge.unlocked ? 'bg-primary/10' : 'bg-muted'}`}>
                        <badge.icon className={`w-8 h-8 ${badge.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{badge.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                        <Badge variant={badge.unlocked ? "default" : "secondary"}>
                          {badge.xp} XP
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="modern-card">
                <CardHeader>
                  <CardTitle>Comparaison Population</CardTitle>
                  <CardDescription>Vos performances vs moyenne générale</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Force (Wilks)</span>
                      <span className="font-medium">{userPerformances.force.wilks} vs 180</span>
                    </div>
                    <Progress value={(userPerformances.force.wilks / 180) * 100} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Cardio (VO2Max)</span>
                      <span className="font-medium">{userPerformances.cardio.vo2max} vs 35</span>
                    </div>
                    <Progress value={(userPerformances.cardio.vo2max / 35) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="modern-card">
                <CardHeader>
                  <CardTitle>Objectifs Prochains</CardTitle>
                  <CardDescription>Prochains paliers à atteindre</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Force → Rang B</span>
                      <span className="text-sm text-muted-foreground">+{350 - userPerformances.force.wilks} Wilks</span>
                    </div>
                    <Progress value={(userPerformances.force.wilks / 350) * 100} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Cardio → Rang B</span>
                      <span className="text-sm text-muted-foreground">+{45 - userPerformances.cardio.vo2max} VO2Max</span>
                    </div>
                    <Progress value={(userPerformances.cardio.vo2max / 45) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Stats;