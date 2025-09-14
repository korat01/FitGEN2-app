import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Apple, 
  Utensils, 
  Calculator, 
  Target, 
  TrendingUp, 
  Clock,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const Nutrition: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('breakfast');

  // Données d'exemple pour les macros
  const dailyMacros = {
    calories: { current: 1850, target: 2200, unit: 'kcal' },
    protein: { current: 120, target: 150, unit: 'g' },
    carbs: { current: 180, target: 220, unit: 'g' },
    fat: { current: 65, target: 80, unit: 'g' }
  };

  // Données d'exemple pour les repas
  const meals = {
    breakfast: [
      { name: 'Oeufs brouillés', calories: 320, protein: 20, carbs: 2, fat: 25 },
      { name: 'Pain complet', calories: 80, protein: 3, carbs: 15, fat: 1 },
      { name: 'Avocat', calories: 160, protein: 2, carbs: 9, fat: 15 }
    ],
    lunch: [
      { name: 'Poulet grillé', calories: 250, protein: 35, carbs: 0, fat: 12 },
      { name: 'Riz brun', calories: 220, protein: 5, carbs: 45, fat: 2 },
      { name: 'Brocolis', calories: 55, protein: 5, carbs: 11, fat: 0.5 }
    ],
    dinner: [
      { name: 'Saumon', calories: 280, protein: 30, carbs: 0, fat: 18 },
      { name: 'Quinoa', calories: 180, protein: 6, carbs: 32, fat: 3 },
      { name: 'Épinards', calories: 25, protein: 3, carbs: 4, fat: 0.5 }
    ]
  };

  const MacroCard = ({ title, current, target, unit, color }: any) => (
    <Card className="relative overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <Badge variant="secondary" className="text-xs">
            {current}/{target} {unit}
          </Badge>
        </div>
        <Progress 
          value={(current / target) * 100} 
          className="h-2 mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{current} {unit}</span>
          <span>{target} {unit}</span>
        </div>
      </CardContent>
    </Card>
  );

  const MealCard = ({ meal, foods }: any) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg capitalize">{meal}</CardTitle>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Ajouter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {foods.map((food: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">{food.name}</p>
                <p className="text-sm text-muted-foreground">
                  {food.protein}g protéines • {food.carbs}g glucides • {food.fat}g lipides
                </p>
              </div>
              <Badge variant="outline">{food.calories} kcal</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Apple className="w-8 h-8 text-primary" />
            Nutrition
          </h1>
          <p className="text-muted-foreground mt-1">
            Suivez vos macros et planifiez vos repas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calculator className="w-4 h-4 mr-2" />
            Calculatrice
          </Button>
          <Button>
            <Target className="w-4 h-4 mr-2" />
            Objectifs
          </Button>
        </div>
      </div>

      {/* Macros Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MacroCard 
          title="Calories" 
          current={dailyMacros.calories.current} 
          target={dailyMacros.calories.target} 
          unit={dailyMacros.calories.unit}
          color="bg-blue-500"
        />
        <MacroCard 
          title="Protéines" 
          current={dailyMacros.protein.current} 
          target={dailyMacros.protein.target} 
          unit={dailyMacros.protein.unit}
          color="bg-green-500"
        />
        <MacroCard 
          title="Glucides" 
          current={dailyMacros.carbs.current} 
          target={dailyMacros.carbs.target} 
          unit={dailyMacros.carbs.unit}
          color="bg-yellow-500"
        />
        <MacroCard 
          title="Lipides" 
          current={dailyMacros.fat.current} 
          target={dailyMacros.fat.target} 
          unit={dailyMacros.fat.unit}
          color="bg-red-500"
        />
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Rechercher un aliment</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Ex: poulet, riz, avocat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meals Tabs */}
      <Tabs value={selectedMeal} onValueChange={setSelectedMeal}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="breakfast" className="flex items-center gap-2">
            <Utensils className="w-4 h-4" />
            Petit-déjeuner
          </TabsTrigger>
          <TabsTrigger value="lunch" className="flex items-center gap-2">
            <Utensils className="w-4 h-4" />
            Déjeuner
          </TabsTrigger>
          <TabsTrigger value="dinner" className="flex items-center gap-2">
            <Utensils className="w-4 h-4" />
            Dîner
          </TabsTrigger>
        </TabsList>

        <TabsContent value="breakfast" className="mt-6">
          <MealCard meal="Petit-déjeuner" foods={meals.breakfast} />
        </TabsContent>

        <TabsContent value="lunch" className="mt-6">
          <MealCard meal="Déjeuner" foods={meals.lunch} />
        </TabsContent>

        <TabsContent value="dinner" className="mt-6">
          <MealCard meal="Dîner" foods={meals.dinner} />
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Progression
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">+2.3kg</p>
            <p className="text-sm text-muted-foreground">Ce mois-ci</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Dernier repas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">14:30</p>
            <p className="text-sm text-muted-foreground">Déjeuner</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              Objectif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-500">84%</p>
            <p className="text-sm text-muted-foreground">Macros atteints</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Nutrition;