import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Camera, Upload, Loader2, ScanLine, Save } from 'lucide-react';

interface NutritionalInfo {
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  portion: string;
}

const Scan = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<NutritionalInfo | null>(null);
  const [progress, setProgress] = useState(0);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulation d'une analyse progressive
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Simulation d'appel API - remplacer par vraie analyse IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Résultats simulés basés sur l'image
      const mockResult: NutritionalInfo = {
        name: "Salade mixte aux légumes",
        calories: 120,
        proteins: 4.2,
        carbs: 8.5,
        fats: 6.8,
        fiber: 3.2,
        sugar: 2.1,
        sodium: 45,
        portion: "1 bol (150g)"
      };

      setProgress(100);
      setAnalysisResult(mockResult);
      
      toast({
        title: "Analyse terminée",
        description: "Les valeurs nutritionnelles ont été calculées avec succès",
      });
      
    } catch (error) {
      toast({
        title: t('scan.error'),
        description: "Impossible d'analyser cette image",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
    }
  };

  const saveFood = () => {
    if (analysisResult) {
      toast({
        title: "Aliment sauvegardé",
        description: `${analysisResult.name} a été ajouté à votre bibliothèque`,
      });
    }
  };

  const resetScan = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 gradient-primary rounded-full shadow-glow">
              <ScanLine className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            {t('scan.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('scan.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="gradient-card border-border/50 shadow-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                {t('scan.upload')}
              </CardTitle>
              <CardDescription>
                Prenez une photo ou sélectionnez une image depuis votre galerie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Image Preview */}
                {selectedImage && (
                  <div className="relative">
                    <img 
                      src={selectedImage} 
                      alt="Selected food" 
                      className="w-full h-64 object-cover rounded-lg border border-border"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">{t('scan.analyzing')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Progress Bar */}
                {isAnalyzing && (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-center text-muted-foreground">
                      Analyse: {progress}%
                    </p>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Button 
                      variant="outline" 
                      className="w-full border-primary/20 hover:bg-primary/10"
                      disabled={isAnalyzing}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choisir une image
                    </Button>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    capture="environment"
                  />
                  
                  {(selectedImage || analysisResult) && (
                    <Button 
                      variant="ghost" 
                      onClick={resetScan}
                      className="w-full"
                    >
                      {t('scan.try.again')}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ScanLine className="h-5 w-5 text-accent" />
                {t('scan.results')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!analysisResult ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ScanLine className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Sélectionnez une image pour voir les résultats</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Food Name */}
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {analysisResult.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {analysisResult.portion}
                    </Badge>
                  </div>

                  {/* Nutritional Values */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {analysisResult.calories}
                      </div>
                      <div className="text-sm text-muted-foreground">kcal</div>
                    </div>
                    <div className="bg-accent/10 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-accent">
                        {analysisResult.proteins}g
                      </div>
                      <div className="text-sm text-muted-foreground">protéines</div>
                    </div>
                    <div className="bg-blue-500/10 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        {analysisResult.carbs}g
                      </div>
                      <div className="text-sm text-muted-foreground">glucides</div>
                    </div>
                    <div className="bg-orange-500/10 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-orange-400">
                        {analysisResult.fats}g
                      </div>
                      <div className="text-sm text-muted-foreground">lipides</div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {analysisResult.fiber && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Informations complémentaires</h4>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-medium">{analysisResult.fiber}g</div>
                          <div className="text-muted-foreground">fibres</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-medium">{analysisResult.sugar}g</div>
                          <div className="text-muted-foreground">sucres</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-medium">{analysisResult.sodium}mg</div>
                          <div className="text-muted-foreground">sodium</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <Button 
                    onClick={saveFood} 
                    className="w-full gradient-primary text-primary-foreground shadow-glow"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {t('scan.save.food')}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Scan;