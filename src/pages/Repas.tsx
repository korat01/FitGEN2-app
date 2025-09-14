import React, { useState } from 'react';
import { Utensils, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatCard from '@/components/StatCard';
import PageLayout from '@/components/PageLayout';

const Repas = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const stats = {
    totalRepas: 24,
    totalRecettes: 48,
    planifiés: 12,
    favoris: 8
  };

  const mockRecettes = [
    {
      id: 1,
      nom: 'Salade César',
      temps: 15,
      difficulté: 'Facile',
      calories: 320,
      type: 'Déjeuner'
    },
    {
      id: 2,
      nom: 'Saumon grillé',
      temps: 25,
      difficulté: 'Moyen',
      calories: 450,
      type: 'Dîner'
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Utensils className="h-8 w-8 text-blue-600" />
                Mes Repas
              </h1>
              <p className="text-gray-600">Planifiez vos repas de la semaine</p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter un repas
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Recettes"
            value={stats.totalRepas}
            icon={Utensils}
            color="blue"
          />
          <StatCard
            title="Total recettes"
            value={stats.totalRecettes}
            icon={Utensils}
            color="green"
          />
          <StatCard
            title="Planifiés"
            value={stats.planifiés}
            icon={Utensils}
            color="purple"
          />
          <StatCard
            title="Favoris"
            value={stats.favoris}
            icon={Utensils}
            color="orange"
          />
        </div>

        {/* Recherche et filtres */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une recette..."
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

        {/* Liste des recettes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRecettes.map((recette) => (
            <Card key={recette.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {recette.nom}
                  <Badge variant="secondary">{recette.type}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temps:</span>
                    <span className="font-medium">{recette.temps} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulté:</span>
                    <span className="font-medium">{recette.difficulté}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calories:</span>
                    <span className="font-medium">{recette.calories} kcal</span>
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

export default Repas;