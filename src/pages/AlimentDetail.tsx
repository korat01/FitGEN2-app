import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Apple, Utensils, Clock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface Aliment {
  id: string;
  nom: string;
  description: string;
  calories: number;
  proteines: number;
  glucides: number;
  lipides: number;
  fibres: number;
  vitamines: string[];
  mineraux: string[];
  allergenes: string[];
  categorie: string;
  saison: string;
  conservation: string;
  preparation: string[];
  conseils: string;
}

export const AlimentDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [aliment, setAliment] = useState<Aliment | null>(null);

  // Données de test
  React.useEffect(() => {
    const aliments: Aliment[] = [
      {
        id: '1',
        nom: 'Pomme',
        description: 'Fruit croquant et rafraîchissant',
        calories: 52,
        proteines: 0.3,
        glucides: 14,
        lipides: 0.2,
        fibres: 2.4,
        vitamines: ['C', 'K', 'B6'],
        mineraux: ['Potassium', 'Magnésium'],
        allergenes: [],
        categorie: 'Fruit',
        saison: 'Automne',
        conservation: 'Réfrigérateur',
        preparation: ['Laver', 'Couper en quartiers'],
        conseils: 'Manger avec la peau pour plus de fibres'
      }
    ];
    
    const found = aliments.find(a => a.id === id);
    setAliment(found || null);
  }, [id]);

  if (!aliment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8 text-center">
              <Apple className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Aliment non trouvé</h2>
              <Button onClick={() => navigate('/nutrition')} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la nutrition
            </Button>
          </CardContent>
        </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
        <Button
          onClick={() => navigate('/nutrition')}
            className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:bg-white/90 mb-4"
        >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>

        {/* Informations principales */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Apple className="w-8 h-8 text-green-500" />
              {aliment.nom}
                  </CardTitle>
            <p className="text-gray-600 text-lg">{aliment.description}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{aliment.calories}</div>
                <div className="text-sm text-gray-600">Calories</div>
                  </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{aliment.proteines}g</div>
                <div className="text-sm text-gray-600">Protéines</div>
                </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{aliment.glucides}g</div>
                <div className="text-sm text-gray-600">Glucides</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{aliment.lipides}g</div>
                <div className="text-sm text-gray-600">Lipides</div>
                </div>
                </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informations nutritionnelles */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Informations nutritionnelles</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fibres:</span>
                    <span className="font-semibold">{aliment.fibres}g</span>
              </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vitamines:</span>
                    <div className="flex gap-1">
                      {aliment.vitamines.map((vit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">{vit}</Badge>
                      ))}
            </div>
              </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minéraux:</span>
                    <div className="flex gap-1">
                      {aliment.mineraux.map((min, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{min}</Badge>
                      ))}
              </div>
              </div>
              </div>
        </div>

              {/* Informations pratiques */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Informations pratiques</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Catégorie:</span>
                    <Badge variant="secondary">{aliment.categorie}</Badge>
                </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saison:</span>
                    <Badge variant="outline">{aliment.saison}</Badge>
                </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conservation:</span>
                    <span className="font-semibold">{aliment.conservation}</span>
                </div>
                </div>
                </div>
              </div>
            </CardContent>
          </Card>

        {/* Préparation et conseils */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-orange-500" />
                Préparation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                {aliment.preparation.map((step, index) => (
                  <li key={index} className="text-gray-700">{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Conseils
              </CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-gray-700">{aliment.conseils}</p>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
  );
};