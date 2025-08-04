import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dumbbell, 
  Apple, 
  ScanLine, 
  Users, 
  TrendingUp, 
  Shield,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: t('page.title.generator'),
      description: 'Créez des programmes sportifs personnalisés pour vos clients',
      color: 'text-primary'
    },
    {
      icon: Apple,
      title: t('page.title.nutrition'),
      description: 'Gestion complète de l\'alimentation et des repas',
      color: 'text-accent'
    },
    {
      icon: ScanLine,
      title: t('scan.title'),
      description: 'Analysez les valeurs nutritionnelles par photo',
      color: 'text-blue-400'
    },
    {
      icon: Dumbbell,
      title: t('training.title'),
      description: 'Bibliothèque complète d\'exercices',
      color: 'text-green-400'
    }
  ];

  const benefits = [
    'Interface intuitive et moderne',
    'Génération automatique de programmes',
    'Base de données nutritionnelle complète',
    'Analyse par intelligence artificielle',
    'Export PDF et partage email',
    'Multi-langues (FR/EN)'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center animate-fade-in">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 gradient-primary rounded-full blur-xl opacity-30"></div>
                  <div className="relative p-6 gradient-primary rounded-full shadow-glow">
                    <Dumbbell className="h-16 w-16 text-primary-foreground" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  FITGEN
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-4xl mx-auto">
                La plateforme tout-en-un pour créer des programmes sportifs et nutritionnels personnalisés
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="gradient-primary text-primary-foreground shadow-glow hover-lift text-lg px-8 py-6"
                  onClick={() => navigate('/dashboard')}
                >
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary/20 hover:bg-primary/10 text-lg px-8 py-6"
                  onClick={() => navigate('/nutrition')}
                >
                  Explorer les fonctionnalités
                </Button>
              </div>
              
              <div className="flex items-center justify-center mt-8 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
                <span>Utilisé par plus de 1000+ professionnels</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Fonctionnalités
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour créer des programmes exceptionnels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="gradient-card shadow-card border-0 hover-lift animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 gradient-primary rounded-xl shadow-glow w-fit">
                    <feature.icon className={`h-8 w-8 text-primary-foreground`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Pourquoi choisir <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">FITGEN</span> ?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Une solution complète conçue par et pour les professionnels du fitness et de la nutrition.
                </p>
              </div>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                size="lg" 
                className="gradient-primary text-primary-foreground shadow-glow hover-lift"
                onClick={() => navigate('/dashboard')}
              >
                Démarrer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-3xl blur-3xl opacity-20"></div>
              <Card className="relative gradient-card shadow-elegant border-0 p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Résultats garantis</h3>
                    <p className="text-muted-foreground">
                      Augmentez l'efficacité de vos programmes et la satisfaction de vos clients
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">95%</div>
                      <div className="text-sm text-muted-foreground">Satisfaction client</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-accent mb-1">3x</div>
                      <div className="text-sm text-muted-foreground">Plus rapide</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <Shield className="h-20 w-20 text-primary mx-auto" />
            <h2 className="text-4xl font-bold">
              Prêt à transformer votre pratique ?
            </h2>
            <p className="text-xl text-muted-foreground">
              Rejoignez les milliers de professionnels qui font déjà confiance à FITGEN
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gradient-primary text-primary-foreground shadow-glow hover-lift text-lg px-8 py-6"
                onClick={() => navigate('/dashboard')}
              >
                Créer mon premier programme
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Aucune carte de crédit requise • Configuration en 2 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;