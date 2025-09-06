import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Apple, ScanLine, Users, TrendingUp, Shield, ArrowRight, Star, CheckCircle } from 'lucide-react';
const Home = () => {
  const navigate = useNavigate();
  const features = [{
    icon: Users,
    title: 'Générateur de programmes',
    description: 'Créez des programmes sportifs personnalisés pour vos clients',
    color: 'text-primary'
  }, {
    icon: Apple,
    title: 'Nutrition',
    description: 'Gestion complète de l\'alimentation et des repas',
    color: 'text-accent'
  }, {
    icon: ScanLine,
    title: 'Scanner de repas',
    description: 'Analysez les valeurs nutritionnelles par photo',
    color: 'text-blue-400'
  }, {
    icon: Dumbbell,
    title: 'Exercices',
    description: 'Bibliothèque complète d\'exercices',
    color: 'text-green-400'
  }];
  const benefits = ['Interface intuitive et moderne', 'Génération automatique de programmes', 'Base de données nutritionnelle complète', 'Analyse par intelligence artificielle', 'Export PDF et partage email', 'Multi-langues (FR/EN)'];
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="p-6 bg-primary rounded-full shadow-elegant">
                  <Dumbbell className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              FITGEN
            </h1>
            
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Votre plateforme de fitness personnalisée
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3"
                onClick={() => navigate('/dashboard')}
              >
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Fonctionnalités
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour créer des programmes exceptionnels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Simple CTA Section */}
      <div className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Prêt à commencer ?
          </h2>
          <p className="text-muted-foreground mb-8">
            Créez votre premier programme personnalisé en quelques minutes
          </p>
          
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3"
            onClick={() => navigate('/dashboard')}
          >
            Créer mon programme
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>;
};
export default Home;