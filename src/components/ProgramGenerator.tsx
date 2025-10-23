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
import { genererProgrammeAdapte } from '../utils/programmeGeneratorV2';
import { generateSprintProgram } from '../utils/sprintProgramGenerator';

// Import du système de design centralisé
import { useTheme } from '../hooks/useTheme';

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
  
  // Utilisation du système de design centralisé
  const { colors, getGradient, config } = useTheme();

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
    <Card 
      className="backdrop-blur-sm border-0 shadow-xl"
      style={{
        backgroundColor: colors.background + 'E6', // 90% opacity
        borderRadius: config.dimensions.card.borderRadius,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      <CardHeader>
        <CardTitle 
          className="flex items-center gap-3 text-2xl"
          style={{
            color: colors.text.primary,
            fontSize: config.typography.styles.h2.fontSize,
            fontWeight: config.typography.styles.h2.fontWeight
          }}
        >
          <div 
            className="rounded-full p-2"
            style={{
              backgroundColor: colors.success + '20', // 20% opacity
              borderRadius: config.dimensions.border.radius.full
            }}
          >
            <Zap 
              className="h-6 w-6" 
              style={{ color: colors.success }}
            />
          </div>
          Générateur de programmes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <p 
              className="text-lg mb-4"
              style={{
                color: colors.text.secondary,
                fontSize: config.typography.styles.bodyLarge.fontSize,
                fontWeight: config.typography.styles.bodyLarge.fontWeight
              }}
            >
              Génération automatique de programmes pour vos {selectedDays.length} jours d'entraînement
            </p>
            
            <div className="flex justify-center gap-4">
              <Button 
                className="font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={generatePrograms}
                disabled={isGenerating}
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  color: colors.text.inverse,
                  borderRadius: config.dimensions.button.borderRadius.large,
                  padding: `${config.spacing.md}px ${config.spacing.lg}px`,
                  fontSize: config.typography.styles.button.fontSize,
                  fontWeight: config.typography.styles.button.fontWeight,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
              >
                {isGenerating ? (
                  <>
                    <div 
                      className="animate-spin rounded-full h-5 w-5 border-b-2 mr-2"
                      style={{ borderColor: colors.text.inverse }}
                    ></div>
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
                  className="px-6 py-3"
                  style={{
                    borderColor: colors.border,
                    color: colors.text.primary,
                    borderRadius: config.dimensions.button.borderRadius.medium,
                    padding: `${config.spacing.sm}px ${config.spacing.md}px`
                  }}
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
              <h3 
                className="text-lg font-semibold"
                style={{
                  color: colors.text.primary,
                  fontSize: config.typography.styles.h4.fontSize,
                  fontWeight: config.typography.styles.h4.fontWeight
                }}
              >
                Programmes générés :
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedPrograms.map((program, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-xl border"
                    style={{
                      background: `linear-gradient(135deg, ${colors.background}80, ${colors.background}40)`,
                      borderRadius: config.dimensions.card.borderRadius,
                      borderColor: colors.border,
                      padding: config.spacing.md
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 
                        className="font-semibold"
                        style={{
                          color: colors.text.primary,
                          fontSize: config.typography.styles.h5.fontSize,
                          fontWeight: config.typography.styles.h5.fontWeight
                        }}
                      >
                        {program.day}
                      </h4>
                      <Badge 
                        variant="outline" 
                        style={{
                          borderColor: program.difficulty === 'Débutant' ? colors.success :
                                       program.difficulty === 'Intermédiaire' ? colors.warning :
                                       colors.error,
                          color: program.difficulty === 'Débutant' ? colors.success :
                                 program.difficulty === 'Intermédiaire' ? colors.warning :
                                 colors.error,
                          borderRadius: config.dimensions.border.radius.full,
                          padding: `${config.spacing.xs}px ${config.spacing.sm}px`
                        }}
                      >
                        {program.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div 
                        className="font-medium"
                        style={{
                          color: colors.text.primary,
                          fontSize: config.typography.styles.body.fontSize,
                          fontWeight: config.typography.styles.body.fontWeight
                        }}
                      >
                        {program.name}
                      </div>
                      <div 
                        className="flex items-center gap-4 text-sm"
                        style={{
                          color: colors.text.secondary,
                          fontSize: config.typography.styles.bodySmall.fontSize
                        }}
                      >
                        <div className="flex items-center gap-1">
                          <Clock 
                            className="h-4 w-4" 
                            style={{ color: colors.text.secondary }}
                          />
                          {program.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Target 
                            className="h-4 w-4" 
                            style={{ color: colors.text.secondary }}
                          />
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