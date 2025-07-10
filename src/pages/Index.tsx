
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dumbbell, Users, FileText, Calendar } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">FitGen Pro</h1>
              <p className="text-gray-600">Générateur de programmes sportifs personnalisés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
            <TabsTrigger value="form" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Client</span>
            </TabsTrigger>
            <TabsTrigger value="programme" disabled={!programme} className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Programme</span>
            </TabsTrigger>
            <TabsTrigger value="export" disabled={!programme} className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Export</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Base</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Fiche technique client</span>
                </CardTitle>
                <CardDescription>
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

          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Export et partage</CardTitle>
                <CardDescription>
                  Exportez le programme en PDF ou envoyez-le par email
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-20 flex-col space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>Exporter en PDF</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <span>📧</span>
                    <span>Envoyer par email</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Base de données clients</CardTitle>
                <CardDescription>
                  Gérez vos clients et leurs programmes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Fonctionnalité à venir</p>
                  <p className="text-sm">Sauvegarde et gestion des clients</p>
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
