import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Upload, ScanLine, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NutritionalInfo {
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

const Scan = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<NutritionalInfo | null>(null);

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
    
    // Simulation de l'analyse
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Résultat simulé
    setAnalysisResult({
      name: 'Assiette mixte',
      calories: 450,
      proteins: 28,
      carbs: 35,
      fats: 18
    });
    
    setIsAnalyzing(false);
    
    toast({
      title: "Analyse terminée",
      description: "Les valeurs nutritionnelles ont été calculées",
    });
  };

  const resetScan = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setProgress(0);
    setIsAnalyzing(false);
  };

  const saveFood = () => {
    if (analysisResult) {
      toast({
        title: "Aliment sauvegardé",
        description: `${analysisResult.name} a été ajouté à votre journal`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/nutrition')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Scanner de repas</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Télécharger une photo
              </CardTitle>
              <CardDescription>
                Prenez une photo de votre repas pour l'analyser
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!selectedImage ? (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <ScanLine className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Cliquez pour sélectionner une image
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button asChild>
                      <span>Choisir une image</span>
                    </Button>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <img 
                    src={selectedImage} 
                    alt="Repas à analyser" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  
                  {isAnalyzing && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Analyse en cours...</p>
                      <Progress value={progress} className="w-full" />
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    onClick={resetScan}
                    className="w-full"
                  >
                    Nouvelle analyse
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card>
            <CardHeader>
              <CardTitle>Résultats de l'analyse</CardTitle>
              <CardDescription>
                Informations nutritionnelles détectées
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!analysisResult ? (
                <div className="text-center py-8 text-muted-foreground">
                  Aucune analyse disponible
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{analysisResult.name}</h3>
                    <p className="text-sm text-muted-foreground">Portion estimée: 1 assiette</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">{analysisResult.calories}</div>
                      <div className="text-sm text-muted-foreground">Calories</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">{analysisResult.proteins}g</div>
                      <div className="text-sm text-muted-foreground">Protéines</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">{analysisResult.carbs}g</div>
                      <div className="text-sm text-muted-foreground">Glucides</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">{analysisResult.fats}g</div>
                      <div className="text-sm text-muted-foreground">Lipides</div>
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={saveFood}>
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder le repas
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