import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Users, ChefHat, Utensils } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface Repas {
  id: string;
  nom: string;
  type: string;
  recettes: Array<{
    id: string;
    nom: string;
    description: string;
    calories: number;
    proteines: number;
    glucides: number;
    lipides: number;
    fibres: number;
    ingredients: string[];
  }>;
  aliments: Array<{
    id: string;
    nom: string;
    description: string;
    calories: number;
    proteines: number;
    glucides: number;
    lipides: number;
    fibres: number;
  }>;
}

export const RepasDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Données de test
  const repasData: Repas[] = [
    {
      id: '1',
      nom: 'Petit-déjeuner',
      type: 'Matin',
      recettes: [
        {
          id: '1',
          nom: 'Salade de Quinoa aux Légumes',
          description: 'Une salade fraîche et nutritive avec du quinoa, des légumes croquants et une vinaigrette légère.',
          calories: 320,
          proteines: 12,
          glucides: 45,
          lipides: 8,
          fibres: 6,
          ingredients: [
            '1 tasse de quinoa',
            '2 tomates cerises',
            '1 concombre',
            '1 poivron rouge',
            '1/2 oignon rouge',
            '2 cuillères à soupe d\'huile d\'olive',
            '1 cuillère à soupe de vinaigre balsamique',
            'Sel et poivre'
          ]
        }
      ],
      aliments: [
        {
          id: '1',
          nom: 'Œufs',
          description: 'Œufs biologiques',
          calories: 140,
          proteines: 12,
          glucides: 1,
          lipides: 10,
          fibres: 0
        }
      ]
    },
    {
      id: '2',
      nom: 'Déjeuner',
      type: 'Midi',
      recettes: [
        {
          id: '2',
          nom: 'Poulet aux Légumes',
          description: 'Poulet grillé avec légumes de saison et herbes fraîches.',
          calories: 450,
          proteines: 35,
          glucides: 25,
          lipides: 20,
          fibres: 8,
          ingredients: [
            '200g de blanc de poulet',
            '1 courgette',
            '1 aubergine',
            '2 tomates',
            '1 oignon',
            'Herbes de Provence',
            'Huile d\'olive',
            'Sel et poivre'
          ]
        }
      ],
      aliments: [
        {
          id: '2',
          nom: 'Riz complet',
          description: 'Riz complet cuit',
          calories: 200,
          proteines: 4,
          glucides: 40,
          lipides: 1,
          fibres: 2
        }
      ]
    },
    {
      id: '3',
      nom: 'Dîner',
      type: 'Soir',
      recettes: [
        {
          id: '3',
          nom: 'Saumon aux Épinards',
          description: 'Filet de saumon grillé avec épinards frais et citron.',
          calories: 380,
          proteines: 28,
          glucides: 15,
          lipides: 22,
          fibres: 5,
          ingredients: [
            '150g de filet de saumon',
            '200g d\'épinards frais',
            '1 citron',
            'Ail',
            'Huile d\'olive',
            'Sel et poivre'
          ]
        }
      ],
      aliments: [
        {
          id: '3',
          nom: 'Pommes de terre',
          description: 'Pommes de terre vapeur',
          calories: 150,
          proteines: 3,
          glucides: 35,
          lipides: 0,
          fibres: 3
        }
      ]
    }
  ];

  const repas = repasData.find(r => r.id === id);

  if (!repas) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Repas non trouvé</h1>
            <Button onClick={() => navigate('/nutrition')}>
              Retour à la nutrition
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* Header avec bouton retour */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/nutrition')}
            className="hover:bg-blue-50 hover:border-blue-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Détail du Repas</h1>
        </div>

        {/* Carte principale du repas */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-gray-800">{repas.nom}</CardTitle>
              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                {repas.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              {/* Recettes du repas */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recettes</h3>
                <div className="space-y-4">
                  {repas.recettes.map((recette, index) => (
                    <Card key={index} className="bg-gray-50 border border-gray-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{recette.nom}</CardTitle>
                          <Badge variant="secondary">
                            {recette.calories} cal
                          </Badge>
                        </div>
                        <p className="text-gray-600">{recette.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Valeurs nutritionnelles */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-600">Protéines</p>
                              <p className="text-xl font-bold text-gray-800">{recette.proteines}g</p>
                            </div>
                            <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-600">Glucides</p>
                              <p className="text-xl font-bold text-gray-800">{recette.glucides}g</p>
                            </div>
                            <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-600">Lipides</p>
                              <p className="text-xl font-bold text-gray-800">{recette.lipides}g</p>
                            </div>
                            <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-600">Fibres</p>
                              <p className="text-xl font-bold text-gray-800">{recette.fibres}g</p>
                            </div>
                          </div>
                          
                          {/* Ingrédients */}
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Ingrédients :</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {recette.ingredients.map((ingredient, ingIndex) => (
                                <div key={ingIndex} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span className="text-gray-700">{ingredient}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Aliments du repas */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Aliments</h3>
                <div className="space-y-4">
                  {repas.aliments.map((aliment, index) => (
                    <Card key={index} className="bg-gray-50 border border-gray-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{aliment.nom}</CardTitle>
                          <Badge variant="secondary">
                            {aliment.calories} cal
                          </Badge>
                        </div>
                        <p className="text-gray-600">{aliment.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-600">Protéines</p>
                            <p className="text-xl font-bold text-gray-800">{aliment.proteines}g</p>
                          </div>
                          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-600">Glucides</p>
                            <p className="text-xl font-bold text-gray-800">{aliment.glucides}g</p>
                          </div>
                          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-600">Lipides</p>
                            <p className="text-xl font-bold text-gray-800">{aliment.lipides}g</p>
                          </div>
                          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-600">Fibres</p>
                            <p className="text-xl font-bold text-gray-800">{aliment.fibres}g</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Totaux du repas */}
              <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-orange-900">Totaux du repas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-orange-700">Calories</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {repas.recettes.reduce((acc, r) => acc + r.calories, 0) + 
                         repas.aliments.reduce((acc, a) => acc + a.calories, 0)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-orange-700">Protéines</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {repas.recettes.reduce((acc, r) => acc + r.proteines, 0) + 
                         repas.aliments.reduce((acc, a) => acc + a.proteines, 0)}g
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-orange-700">Glucides</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {repas.recettes.reduce((acc, r) => acc + r.glucides, 0) + 
                         repas.aliments.reduce((acc, a) => acc + a.glucides, 0)}g
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-orange-700">Lipides</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {repas.recettes.reduce((acc, r) => acc + r.lipides, 0) + 
                         repas.aliments.reduce((acc, a) => acc + a.lipides, 0)}g
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RepasDetail; 