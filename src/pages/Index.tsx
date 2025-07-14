
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dumbbell, Users, FileText, Calendar, UtensilsCrossed } from 'lucide-react';
import ClientForm from '@/components/ClientForm';
import ProgrammeDisplay from '@/components/ProgrammeDisplay';
import { ClientProfile, ProgrammeHebdomadaire } from '@/types/programme';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('form');
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null);
  const [programme, setProgramme] = useState<ProgrammeHebdomadaire | null>(null);

  const handleProgrammeGenerated = (profile: ClientProfile, generatedProgramme: ProgrammeHebdomadaire) => {
    setClientProfile(profile);
    setProgramme(generatedProgramme);
    setCurrentTab('programme');
  };

  return (
    <div className="bg-background animate-fade-in">
      {/* Page Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div className="relative bg-card/80 backdrop-blur-sm border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-4 animate-slide-up">
              <div className="relative">
                <div className="absolute inset-0 gradient-primary rounded-xl blur-lg opacity-30"></div>
                <div className="relative p-3 gradient-primary rounded-xl shadow-glow">
                  <Dumbbell className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Générateur de Programmes
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  Créez des programmes sportifs personnalisés pour vos clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-4/5 xl:w-3/5 h-14 p-1 gradient-card shadow-card">
            <TabsTrigger value="form" className="flex items-center space-x-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Client</span>
            </TabsTrigger>
            <TabsTrigger value="programme" disabled={!programme} className="flex items-center space-x-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Programme</span>
            </TabsTrigger>
            <TabsTrigger value="export" disabled={!programme} className="flex items-center space-x-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center space-x-2 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-300">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Base</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-6 animate-fade-in">
            <Card className="gradient-card shadow-card border-0 hover-lift">
              <CardHeader className="relative">
                <div className="absolute top-0 left-0 w-full h-1 gradient-primary rounded-t-lg"></div>
                <CardTitle className="flex items-center space-x-3 mt-2">
                  <div className="p-2 gradient-primary rounded-lg">
                    <Users className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-2xl">Fiche technique client</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Remplissez les informations du client pour générer un programme personnalisé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ClientForm onProgrammeGenerated={handleProgrammeGenerated} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programme" className="space-y-6">
            {programme && clientProfile && (
              <ProgrammeDisplay 
                programme={programme} 
                clientProfile={clientProfile}
              />
            )}
          </TabsContent>

          <TabsContent value="export" className="space-y-6 animate-fade-in">
            <Card className="gradient-card shadow-card border-0 hover-lift">
              <CardHeader className="relative">
                <div className="absolute top-0 left-0 w-full h-1 gradient-accent rounded-t-lg"></div>
                <CardTitle className="flex items-center space-x-3 mt-2">
                  <div className="p-2 gradient-accent rounded-lg">
                    <FileText className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <span className="text-2xl">Export et partage</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Exportez le programme en PDF ou envoyez-le par email
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button className="h-24 flex-col space-y-3 gradient-primary hover:gradient-accent transition-all duration-300 shadow-glow hover:shadow-elegant">
                    <FileText className="h-8 w-8" />
                    <span className="font-semibold">Exporter en PDF</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col space-y-3 border-2 border-primary/20 hover:border-primary hover:gradient-card transition-all duration-300">
                    <span className="text-2xl">📧</span>
                    <span className="font-semibold">Envoyer par email</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6 animate-fade-in">
            <Card className="gradient-card shadow-card border-0 hover-lift">
              <CardHeader className="relative">
                <div className="absolute top-0 left-0 w-full h-1 gradient-primary rounded-t-lg"></div>
                <CardTitle className="flex items-center space-x-3 mt-2">
                  <div className="p-2 gradient-primary rounded-lg">
                    <Users className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-2xl">Base de données clients</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Gérez vos clients et leurs programmes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 gradient-primary rounded-full blur-xl opacity-20"></div>
                    <Users className="relative h-16 w-16 mx-auto text-primary" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">Fonctionnalité à venir</p>
                  <p className="text-muted-foreground">Sauvegarde et gestion des clients</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
