import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AppHeader from "@/components/AppHeader";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import Programme from "./pages/Programme";
import Nutrition from "./pages/Nutrition";
import Scan from "./pages/Scan";
import Developer from "./pages/Developer";
import BlocsEntrainement from "./pages/BlocsEntrainement";
import NotFound from "./pages/NotFound";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar, Target, Dumbbell, Clock, Settings, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import Planning from "./pages/Planning";
import Repas from './pages/Repas';
import RecetteDetail from './pages/RecetteDetail';
import AlimentDetail from './pages/AlimentDetail';

const queryClient = new QueryClient();

const ProfileSummary = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>Chargement...</div>;
  }

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'débutant': return 'bg-green-100 text-green-800';
      case 'intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'avancé': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getObjectiveColor = (objective?: string) => {
    switch (objective) {
      case 'perte_poids': return 'bg-blue-100 text-blue-800';
      case 'prise_masse': return 'bg-purple-100 text-purple-800';
      case 'maintien': return 'bg-green-100 text-green-800';
      case 'performance': return 'bg-orange-100 text-orange-800';
      case 'santé': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mon Profil</h1>
          <p className="text-gray-600">Récapitulatif de vos informations personnelles</p>
        </div>

        <div className="grid gap-6">
          {/* Informations personnelles */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-lg">
                    {user.name?.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{user.phone}</span>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{user.address}</span>
                  </div>
                )}
                {user.birthDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{user.birthDate}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Objectifs et niveau */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Objectifs et niveau
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {user.level && (
                  <Badge className={getLevelColor(user.level)}>
                    Niveau: {user.level}
                  </Badge>
                )}
                {user.mainObjective && (
                  <Badge className={getObjectiveColor(user.mainObjective)}>
                    Objectif: {user.mainObjective.replace('_', ' ')}
                  </Badge>
                )}
                {user.goal && (
                  <Badge variant="outline">
                    {user.goal}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Informations physiques */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-purple-600" />
                Informations physiques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {user.age && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{user.age}</p>
                    <p className="text-sm text-gray-600">Âge</p>
                  </div>
                )}
                {user.height && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{user.height}</p>
                    <p className="text-sm text-gray-600">Taille</p>
                  </div>
                )}
                {user.weight && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{user.weight}</p>
                    <p className="text-sm text-gray-600">Poids</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Préférences d'entraînement */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Préférences d'entraînement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.trainingFrequency && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Fréquence</p>
                    <p className="text-lg text-gray-900">{user.trainingFrequency} séances/semaine</p>
                  </div>
                )}
                {user.trainingDuration && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Durée</p>
                    <p className="text-lg text-gray-900">{user.trainingDuration} minutes/séance</p>
                  </div>
                )}
              </div>
              
              {user.trainingLocation && user.trainingLocation.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Lieux d'entraînement</p>
                  <div className="flex flex-wrap gap-2">
                    {user.trainingLocation.map((location, index) => (
                      <Badge key={index} variant="outline">
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informations médicales */}
          {(user.injuries?.length || user.medicalConditions?.length || user.medications?.length || user.allergies?.length) && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Informations médicales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.injuries && user.injuries.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Blessures</p>
                    <div className="flex flex-wrap gap-2">
                      {user.injuries.map((injury, index) => (
                        <Badge key={index} variant="destructive">
                          {injury}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {user.medicalConditions && user.medicalConditions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Conditions médicales</p>
                    <div className="flex flex-wrap gap-2">
                      {user.medicalConditions.map((condition, index) => (
                        <Badge key={index} variant="destructive">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Modifier le profil
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  Retour à l'accueil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen bg-background">
                <AppHeader />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/profile-summary" element={<ProtectedRoute><ProfileSummary /></ProtectedRoute>} />
                    <Route path="/planning" element={<ProtectedRoute><Planning /></ProtectedRoute>} />
                    <Route path="/nutrition" element={<ProtectedRoute><Nutrition /></ProtectedRoute>} />
                    <Route path="/nutrition/:id" element={<AlimentDetail />} />
                    <Route path="/blocs-entrainement" element={<ProtectedRoute><BlocsEntrainement /></ProtectedRoute>} />
                    <Route path="/scan" element={<ProtectedRoute><Scan /></ProtectedRoute>} />
                    <Route path="/overview" element={<ProtectedRoute><Overview /></ProtectedRoute>} />
                    <Route path="/repas" element={<Repas />} />
                    <Route path="/repas/:id" element={<RecetteDetail />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
