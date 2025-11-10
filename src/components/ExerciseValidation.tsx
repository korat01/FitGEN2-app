import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { CheckCircle, XCircle, Clock, Target, Zap } from 'lucide-react';
import { useParticles } from '../hooks/useParticles';

interface ExerciseValidationProps {
  exercise: any;
  onValidation: (exerciseId: string, success: boolean) => void;
  isCompleted?: boolean;
  isSuccess?: boolean;
  isRestDay?: boolean;
}

export const ExerciseValidation: React.FC<ExerciseValidationProps> = ({
  exercise,
  onValidation,
  isCompleted = false,
  isSuccess = false,
  isRestDay = false
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const { spawnSuccessParticles, spawnErrorParticles } = useParticles();
  const successButtonRef = useRef<HTMLButtonElement>(null);
  const errorButtonRef = useRef<HTMLButtonElement>(null);

  const handleValidation = async (success: boolean) => {
    setIsValidating(true);
    
    // Déclencher les particules
    if (success && successButtonRef.current) {
      spawnSuccessParticles(successButtonRef.current);
    } else if (!success && errorButtonRef.current) {
      spawnErrorParticles(errorButtonRef.current);
    }
    
    // Simuler une petite animation
    setTimeout(() => {
      onValidation(exercise.id || exercise.nom, success);
      setIsValidating(false);
    }, 300);
  };

  // Si c'est un jour de repos, ne pas afficher les boutons
  if (isRestDay) {
    return (
      <div className="flex items-center justify-center p-4">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <Clock className="w-4 h-4 mr-2" />
          Jour de repos
        </Badge>
      </div>
    );
  }

  // Si l'exercice est déjà validé
  if (isCompleted) {
    return (
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {isSuccess ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500" />
          )}
          <div>
            <p className="font-medium text-sm">
              {isSuccess ? 'Exercice réussi' : 'Exercice échoué'}
            </p>
            <p className="text-xs text-gray-500">
              {isSuccess ? '+50 XP' : '+10 XP'}
            </p>
          </div>
        </div>
        <Badge 
          variant={isSuccess ? "default" : "destructive"}
          className={isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
        >
          {isSuccess ? 'Réussi' : 'Échoué'}
        </Badge>
      </div>
    );
  }

  return (
    <Card className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Informations de l'exercice */}
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">{exercise.nom}</h3>
            <div className="flex justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span>{exercise.series || exercise.sets || 3} séries</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                <span>{exercise.repetitions || exercise.reps || 10} reps</span>
              </div>
              {exercise.poids && (
                <div className="flex items-center gap-1">
                  <span>💪</span>
                  <span>{exercise.poids}kg</span>
                </div>
              )}
            </div>
          </div>

          {/* Boutons de validation */}
          <div className="flex gap-3">
            <Button
              ref={successButtonRef}
              onClick={() => handleValidation(true)}
              disabled={isValidating}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Réussi
            </Button>
            <Button
              ref={errorButtonRef}
              onClick={() => handleValidation(false)}
              disabled={isValidating}
              variant="destructive"
              className="flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Échoué
            </Button>
          </div>

          {/* Indication XP */}
          <div className="text-center text-xs text-gray-500">
            <p>Réussi: +50 XP • Échoué: +10 XP</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
