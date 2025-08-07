import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dumbbell, Users, FileText, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ClientForm from '@/components/ClientForm';
import ProgrammeDisplay from '@/components/ProgrammeDisplay';

const Dashboard = () => {
  const { t } = useLanguage();
  const [currentTab, setCurrentTab] = useState('form');
  const [clientProfile, setClientProfile] = useState(null);
  const [programme, setProgramme] = useState(null);

  const handleProgrammeGenerated = (profile: any, generatedProgramme: any) => {
    setClientProfile(profile);
    setProgramme(generatedProgramme);
    setCurrentTab('programme');
  };

  return (
    <div className="bg-background">
      {/* Page Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary rounded-xl">
              <Dumbbell className="h-10 w-10 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary">
                {t('page.title.generator')}
              </h1>
              <p className="text-muted-foreground text-lg mt-1">
                {t('page.subtitle.generator')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-14">
            <TabsTrigger value="form" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{t('tab.client')}</span>
            </TabsTrigger>
            <TabsTrigger value="programme" disabled={!programme} className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{t('tab.program')}</span>
            </TabsTrigger>
            <TabsTrigger value="export" disabled={!programme} className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{t('tab.export')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-primary rounded-lg">
                    <Users className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-2xl">{t('card.client.title')}</span>
                </CardTitle>
                <CardDescription className="text-base">
                  {t('card.client.desc')}
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
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-primary rounded-lg">
                    <FileText className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-2xl">{t('card.export.title')}</span>
                </CardTitle>
                <CardDescription className="text-base">
                  {t('card.export.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button className="h-24 flex-col space-y-3">
                    <FileText className="h-8 w-8" />
                    <span className="font-semibold">{t('btn.export.pdf')}</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col space-y-3">
                    <span className="text-2xl">📧</span>
                    <span className="font-semibold">{t('btn.send.email')}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;