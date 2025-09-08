import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dumbbell, 
  Target, 
  Clock, 
  Zap,
  RefreshCw,
  Settings
} from 'lucide-react';

interface ProgramGeneratorProps {
  selectedDays: string[];
  onProgramsGenerated: (programs: any[]) => void;
}

const ProgramGenerator: React.FC<ProgramGeneratorProps> = ({
  selectedDays,
  onProgramsGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrograms, setGeneratedPrograms] = useState<any[]>([]);

  // Types de programmes disponibles
  const programTypes = [
    {
      name: 'Push Day',
      exercises: ['Développé couché', 'Dips', 'Élévations latérales', 'Développé incliné'],
      duration: '75 min',
      difficulty: 'Intermédiaire',
      category: 'Push'
    },
    {
      name: 'Pull Day',
      exercises: ['Tractions', 'Rowing', 'Curl biceps', 'Face pull'],
      duration: '80 min',
      difficulty: 'Intermédiaire',
      category: 'Pull'
    },
    {
      name: 'Leg Day',
      exercises: ['Squat', 'Fentes', 'Soulevé de terre', 'Extensions'],
      duration: '90 min',
      difficulty: 'Avancé',
      category: 'Legs'
    },
    {
      name: 'Full Body',
      exercises: ['Squat', 'Développé couché', 'Tractions', 'Planche'],
      duration: '60 min',
      difficulty: 'Débutant',
      category: 'Full Body'
    }
  ];

  const generatePrograms = () => {
    setIsGenerating(true);
    
    // Simulation de la génération
    setTimeout(() => {
      const programs = selectedDays.map((day, index) => {
        const programType = programTypes[index % programTypes.length];
        return {
          day,
          name: programType.name,
          exercises: programType.exercises,
          duration: programType.duration,
          difficulty: programType.difficulty,
          category: programType.category,
          completed: false,
          isToday: day === new Date().toLocaleDateString('fr-FR', { weekday: 'long' })
        };
      });
      
      setGeneratedPrograms(programs);
      onProgramsGenerated(programs);
      setIsGenerating(false);
    }, 2000);
  };

  const regeneratePrograms = () => {
    generatePrograms();
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-slate-900 text-2xl">
          <div className="bg-green-100 rounded-full p-2">
            <Zap className="h-6 w-6 text-green-600" />
          </div>
          Générateur de programmes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-slate-700 text-lg mb-4">
              Génération automatique de programmes pour vos {selectedDays.length} jours d'entraînement
            </p>
            
            <div className="flex justify-center gap-4">
              <Button 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={generatePrograms}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Génération...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Générer les programmes
                  </>
                )}
              </Button>
              
              {generatedPrograms.length > 0 && (
                <Button 
                  variant="outline"
                  onClick={regeneratePrograms}
                  disabled={isGenerating}
                  className="border-2 border-slate-300 hover:border-slate-400 px-6 py-3"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Régénérer
                </Button>
              )}
            </div>
          </div>

          {/* Programmes générés */}
          {generatedPrograms.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Programmes générés :</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedPrograms.map((program, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-slate-900">{program.day}</h4>
                      <Badge 
                        variant="outline" 
                        className={`${
                          program.difficulty === 'Débutant' ? 'border-green-300 text-green-700' :
                          program.difficulty === 'Intermédiaire' ? 'border-yellow-300 text-yellow-700' :
                          'border-red-300 text-red-700'
                        }`}
                      >
                        {program.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium text-slate-900">{program.name}</div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {program.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          {program.exercises.length} exercices
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramGenerator; 