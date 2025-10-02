import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Users, ChefHat, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Recette {
  id: string;
  nom: string;
  description: string;
  calories: number;
  proteines: number;
  glucides: number;
  lipides: number;
  fibres: number;
  tempsPreparation: number;
  nombrePortions: number;
  difficulte: string;
  ingredients: string[];
  instructions: string[];
  conseils: string;
  tags: string[];
}

export const RecetteDetail: React.FC = () => {
  const navigate = useNavigate();
  const [recette] = useState<Recette>({
    id: '1',
    nom: 'Salade de Quinoa aux Légumes',
    description: 'Une salade fraîche et nutritive avec du quinoa, des légumes croquants et une vinaigrette légère.',
      calories: 320,
    proteines: 12,
    glucides: 45,
    lipides: 8,
    fibres: 6,
    tempsPreparation: 25,
    nombrePortions: 2,
    difficulte: 'Facile',
      ingredients: [
      '1 tasse de quinoa',
      '2 tomates cerises',
      '1 concombre',
      '1 poivron rouge',
      '1/2 oignon rouge',
      '2 cuillères à soupe d\'huile d\'olive',
      '1 cuillère à soupe de vinaigre balsamique',
      'Sel et poivre'
      ],
      instructions: [
      'Rincer le quinoa à l\'eau froide',
      'Cuire le quinoa selon les instructions du paquet',
      'Laisser refroidir le quinoa',
      'Couper les légumes en petits morceaux',
      'Mélanger le quinoa avec les légumes',
      'Préparer la vinaigrette avec l\'huile et le vinaigre',
      'Assaisonner avec sel et poivre',
      'Servir frais'
    ],
    conseils: 'Cette recette peut être préparée à l\'avance et conservée au réfrigérateur pendant 2-3 jours.',
    tags: ['Végétarien', 'Sans gluten', 'Riche en protéines']
  });

    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* Header avec bouton retour */}
        <div className="flex items-center gap-4">
        <Button
          variant="outline"
            onClick={() => navigate(-1)}
            className="hover:bg-blue-50 hover:border-blue-300"
        >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
        </Button>
          <h1 className="text-3xl font-bold text-gray-800">Détail de la Recette</h1>
        </div>

        {/* Carte principale de la recette */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-gray-800">{recette.nom}</CardTitle>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                {recette.difficulte}
                  </Badge>
                  </div>
            <p className="text-gray-600 text-lg">{recette.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              {/* Informations générales */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-blue-700">Temps</p>
                    <p className="text-xl font-bold text-blue-900">{recette.tempsPreparation} min</p>
                  </CardContent>
        </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-green-700">Portions</p>
                    <p className="text-xl font-bold text-green-900">{recette.nombrePortions}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-4 text-center">
                    <Utensils className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-orange-700">Calories</p>
                    <p className="text-xl font-bold text-orange-900">{recette.calories}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <ChefHat className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-purple-700">Difficulté</p>
                    <p className="text-xl font-bold text-purple-900">{recette.difficulte}</p>
                  </CardContent>
                </Card>
                  </div>

              {/* Valeurs nutritionnelles */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">Valeurs Nutritionnelles</CardTitle>
            </CardHeader>
            <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">Protéines</p>
                      <p className="text-2xl font-bold text-gray-800">{recette.proteines}g</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">Glucides</p>
                      <p className="text-2xl font-bold text-gray-800">{recette.glucides}g</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">Lipides</p>
                      <p className="text-2xl font-bold text-gray-800">{recette.lipides}g</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">Fibres</p>
                      <p className="text-2xl font-bold text-gray-800">{recette.fibres}g</p>
                    </div>
                  </div>
              </CardContent>
            </Card>

              {/* Ingrédients */}
              <Card className="bg-white border-gray-200">
              <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">Ingrédients</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {recette.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{ingredient}</span>
                      </div>
                ))}
              </div>
            </CardContent>
          </Card>

              {/* Instructions */}
              <Card className="bg-white border-gray-200">
            <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">Instructions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  {recette.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                </div>
                        <p className="text-gray-700">{instruction}</p>
                </div>
                  ))}
                </div>
              </CardContent>
            </Card>

              {/* Conseils */}
              {recette.conseils && (
                <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
                    <CardTitle className="text-xl font-bold text-yellow-900">💡 Conseils</CardTitle>
          </CardHeader>
          <CardContent>
                    <p className="text-yellow-800">{recette.conseils}</p>
          </CardContent>
        </Card>
              )}

              {/* Tags */}
              <Card className="bg-white border-gray-200">
          <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">Tags</CardTitle>
          </CardHeader>
          <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {recette.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-gray-600 border-gray-300">
                        {tag}
                      </Badge>
                  ))}
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

export default RecetteDetail; 