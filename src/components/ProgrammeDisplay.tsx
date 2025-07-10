
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ClientProfile, ProgrammeHebdomadaire, BlocExercice } from '@/types/programme';
import { Calendar, Clock, Target, Dumbbell, User, Download, Mail, Zap, TrendingUp } from 'lucide-react';

interface ProgrammeDisplayProps {
  programme: ProgrammeHebdomadaire;
  clientProfile: ClientProfile;
}

const ProgrammeDisplay: React.FC<ProgrammeDisplayProps> = ({ programme, clientProfile }) => {
  const getBadgeColor = (difficulte: number) => {
    if (difficulte <= 2) return 'bg-green-100 text-green-800';
    if (difficulte <= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getDifficulteLabel = (difficulte: number) => {
    if (difficulte <= 2) return 'Facile';
    if (difficulte <= 4) return 'Modéré';
    return 'Difficile';
  };

  const getVitesseLabel = (vitesse: string) => {
    switch (vitesse) {
      case 'maintien':
        return { label: 'Maintien', color: 'bg-blue-100 text-blue-800' };
      case 'progression_legere':
        return { label: 'Modérée', color: 'bg-orange-100 text-orange-800' };
      case 'progression_rapide':
        return { label: 'Rapide', color: 'bg-red-100 text-red-800' };
      default:
        return { label: 'Standard', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const vitesseInfo = getVitesseLabel(clientProfile.vitesse_progression);

  const joursOrdonnés = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  const joursAvecSeances = joursOrdonnés.filter(jour => programme[jour]);

  const hasRM = clientProfile.rm_values && Object.values(clientProfile.rm_values).some(val => val && val > 0);

  return (
    <div className="space-y-6">
      {/* En-tête du programme */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Programme de {clientProfile.nom}</span>
              </CardTitle>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4" />
                  <span>{clientProfile.objectif.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{joursAvecSeances.length} séance{joursAvecSeances.length > 1 ? 's' : ''}/semaine</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4" />
                  <Badge className={vitesseInfo.color}>{vitesseInfo.label}</Badge>
                </div>
                {hasRM && (
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4" />
                    <span>1RM configuré</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-500">Niveau</div>
              <Badge variant="secondary" className="mt-1">{clientProfile.niveau}</Badge>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Âge</div>
              <div className="mt-1">{clientProfile.age} ans</div>
            </div>
            {clientProfile.poids && (
              <div>
                <div className="text-sm font-medium text-gray-500">Poids</div>
                <div className="mt-1">{clientProfile.poids} kg</div>
              </div>
            )}
            <div>
              <div className="text-sm font-medium text-gray-500">Format</div>
              <div className="mt-1 capitalize">{clientProfile.format_souhaite.replace('_', ' ')}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Équipement</div>
              <div className="mt-1 text-sm">
                {clientProfile.equipement_disponible.length > 0 
                  ? clientProfile.equipement_disponible.slice(0, 2).join(', ') 
                  : 'Aucun'}
                {clientProfile.equipement_disponible.length > 2 && '...'}
              </div>
            </div>
          </div>

          {hasRM && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">1RM configurés :</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {clientProfile.rm_values?.developpe_couche && (
                  <div>Développé couché: <strong>{clientProfile.rm_values.developpe_couche}kg</strong></div>
                )}
                {clientProfile.rm_values?.squat && (
                  <div>Squat: <strong>{clientProfile.rm_values.squat}kg</strong></div>
                )}
                {clientProfile.rm_values?.souleve_de_terre && (
                  <div>Soulevé de terre: <strong>{clientProfile.rm_values.souleve_de_terre}kg</strong></div>
                )}
                {clientProfile.rm_values?.developpe_militaire && (
                  <div>Développé militaire: <strong>{clientProfile.rm_values.developpe_militaire}kg</strong></div>
                )}
                {clientProfile.rm_values?.rowing && (
                  <div>Rowing: <strong>{clientProfile.rm_values.rowing}kg</strong></div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Séances par jour */}
      <div className="grid gap-6">
        {joursAvecSeances.map((jour) => {
          const seance = programme[jour];
          const totalBlocs = seance.blocs.length;
          const dureeEstimee = totalBlocs * 8; // Estimation: 8 min par bloc

          return (
            <Card key={jour}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 capitalize">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span>{jour}</span>
                    <Badge variant="outline">{seance.focus.replace('_', ' ')}</Badge>
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Dumbbell className="h-4 w-4" />
                      <span>{totalBlocs} exercices</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>~{dureeEstimee} min</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {seance.blocs.map((bloc: BlocExercice, index: number) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{bloc.nom}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant="secondary" 
                              className={getBadgeColor(bloc.difficulté)}
                            >
                              {getDifficulteLabel(bloc.difficulté)}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {bloc.type}
                            </Badge>
                            {bloc.exercice_rm && hasRM && (
                              <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                                <Zap className="h-3 w-3 mr-1" />
                                % 1RM
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div className="font-medium">
                            {typeof bloc.répétitions === 'number' 
                              ? `${bloc.répétitions} reps` 
                              : bloc.répétitions}
                          </div>
                          {bloc.séries && (
                            <div className="text-gray-500">{bloc.séries} séries</div>
                          )}
                          {bloc.charge > 0 && (
                            <div className="text-blue-600 font-medium">{bloc.charge}kg</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Muscles:</strong> {bloc.muscles_sollicités.join(', ')}
                      </div>
                      
                      {bloc.description && (
                        <div className="text-sm text-gray-600 mb-2 italic">
                          {bloc.description}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div>
                          <strong>Équipement:</strong> {bloc.équipement.join(', ')}
                        </div>
                        {bloc.temps_repos && (
                          <div>
                            <strong>Repos:</strong> {bloc.temps_repos}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Conseils et notes */}
      <Card>
        <CardHeader>
          <CardTitle>Conseils et notes importantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg">
              <strong>💡 Progression:</strong> Augmentez progressivement l'intensité chaque semaine selon votre ressenti.
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <strong>⚠️ Sécurité:</strong> Respectez les temps de repos et arrêtez en cas de douleur inhabituelle.
            </div>
            {hasRM && (
              <div className="p-3 bg-purple-50 rounded-lg">
                <strong>⚡ 1RM:</strong> Les charges sont calculées automatiquement selon vos maximales. Ajustez si nécessaire selon votre forme du jour.
              </div>
            )}
            {clientProfile.contraintes_medicales.length > 0 && (
              <div className="p-3 bg-red-50 rounded-lg">
                <strong>🏥 Contraintes médicales:</strong> Tenez compte de vos contraintes: {clientProfile.contraintes_medicales.join(', ')}.
              </div>
            )}
            <div className="p-3 bg-green-50 rounded-lg">
              <strong>📈 Suivi:</strong> Notez vos performances pour adapter le programme aux prochaines séances.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgrammeDisplay;
