import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Apple, ArrowLeft, ScanLine, Plus } from 'lucide-react';

const Nutrition = () => {
  const navigate = useNavigate();

  const nutritionFeatures = [
    {
      icon: ScanLine,
      title: 'Scanner de repas',
      description: 'Analysez les valeurs nutritionnelles par photo',
      action: () => navigate('/scan')
    },
    {
      icon: Apple,
      title: 'Base de données',
      description: 'Accédez à une large base de données alimentaires',
      action: () => console.log('Base de données')
    },
    {
      icon: Plus,
      title: 'Ajouter un aliment',
      description: 'Ajoutez manuellement des aliments à votre journal',
      action: () => console.log('Ajouter aliment')
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Nutrition</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {nutritionFeatures.map((feature, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={feature.action}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Journal nutritionnel</CardTitle>
            <CardDescription>Suivez vos apports quotidiens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Aucun repas enregistré aujourd'hui
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Nutrition;