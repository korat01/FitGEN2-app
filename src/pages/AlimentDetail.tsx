import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Apple, Utensils, Clock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';

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
      <PageLayout>
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-card">
            <CardContent className="p-8 text-center">
              <Apple className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Aliment non trouvé</h2>
              <Button onClick={() => navigate('/nutrition')} className="gradient-primary text-primary-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la nutrition
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div>
          <Button
            onClick={() => navigate('/nutrition')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>

        {/* Informations principales */}
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
              <Apple className="w-8 h-8 text-primary" />
              {aliment.nom}
            </CardTitle>
            <p className="text-muted-foreground text-base md:text-lg">{aliment.description}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
              <div className="text-center p-3 md:p-4 bg-primary/10 rounded-lg">
                <div className="text-xl md:text-2xl font-bold text-primary">{aliment.calories}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Calories</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-primary/10 rounded-lg">
                <div className="text-xl md:text-2xl font-bold text-primary">{aliment.proteines}g</div>
                <div className="text-xs md:text-sm text-muted-foreground">Protéines</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-primary/10 rounded-lg">
                <div className="text-xl md:text-2xl font-bold text-primary">{aliment.glucides}g</div>
                <div className="text-xs md:text-sm text-muted-foreground">Glucides</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-primary/10 rounded-lg">
                <div className="text-xl md:text-2xl font-bold text-primary">{aliment.lipides}g</div>
                <div className="text-xs md:text-sm text-muted-foreground">Lipides</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informations nutritionnelles */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">Informations nutritionnelles</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm md:text-base">Fibres:</span>
                    <span className="font-semibold text-sm md:text-base">{aliment.fibres}g</span>
                  </div>
                  <div className="flex justify-between flex-wrap gap-2">
                    <span className="text-muted-foreground text-sm md:text-base">Vitamines:</span>
                    <div className="flex gap-1 flex-wrap">
                      {aliment.vitamines.map((vit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">{vit}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between flex-wrap gap-2">
                    <span className="text-muted-foreground text-sm md:text-base">Minéraux:</span>
                    <div className="flex gap-1 flex-wrap">
                      {aliment.mineraux.map((min, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{min}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations pratiques */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">Informations pratiques</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm md:text-base">Catégorie:</span>
                    <Badge variant="secondary">{aliment.categorie}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm md:text-base">Saison:</span>
                    <Badge variant="outline">{aliment.saison}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm md:text-base">Conservation:</span>
                    <span className="font-semibold text-sm md:text-base">{aliment.conservation}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Préparation et conseils */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary" />
                Préparation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                {aliment.preparation.map((step, index) => (
                  <li key={index} className="text-foreground text-sm md:text-base">{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Conseils
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground text-sm md:text-base">{aliment.conseils}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};