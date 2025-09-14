import React, { useState, useEffect } from 'react';
import { Apple, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatCard from '@/components/StatCard';
import PageLayout from '@/components/PageLayout';

const Nutrition = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data
  const stats = {
    totalFoods: 156,
    totalCalories: 2450,
    totalProteins: 125,
    totalCarbs: 280
  };

  const mockAliments = [
    {
      id: 1,
      nom: 'Pomme',
      calories: 52,
      protéines: 0.3,
      glucides: 14,
      lipides: 0.2,
      catégorie: 'Fruits'
    },
    {
      id: 2,
      nom: 'Poulet',
      calories: 165,
      protéines: 31,
      glucides: 0,
      lipides: 3.6,
      catégorie: 'Viandes'
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Apple className="h-8 w-8 text-blue-600" />
                Nutrition
              </h1>
              <p className="text-gray-600">Gérez votre alimentation et vos apports</p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter aliment
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Aliments"
            value={stats.totalFoods}
            icon={Apple}
            color="blue"
          />
          <StatCard
            title="Calories"
            value={stats.totalCalories}
            icon={Apple}
            color="green"
          />
          <StatCard
            title="Protéines"
            value={`${stats.totalProteins}g`}
            icon={Apple}
            color="purple"
          />
          <StatCard
            title="Glucides"
            value={`${stats.totalCarbs}g`}
            icon={Apple}
            color="orange"
          />
        </div>

        {/* Recherche et filtres */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un aliment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtres
          </Button>
        </div>

        {/* Liste des aliments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAliments.map((aliment) => (
            <Card key={aliment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {aliment.nom}
                  <Badge variant="secondary">{aliment.catégorie}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calories:</span>
                    <span className="font-medium">{aliment.calories} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Protéines:</span>
                    <span className="font-medium">{aliment.protéines}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Glucides:</span>
                    <span className="font-medium">{aliment.glucides}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lipides:</span>
                    <span className="font-medium">{aliment.lipides}g</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Nutrition;