import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ClientProfile, ProgrammeHebdomadaire } from '@/types/programme';
import { creerProgrammeOptimise } from '@/utils/programmeGenerator';
import { toast } from 'sonner';
import { AlertTriangle, Info } from 'lucide-react';

interface ClientFormProps {
  onProgrammeGenerated: (profile: ClientProfile, programme: ProgrammeHebdomadaire) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ onProgrammeGenerated }) => {
  const [formData, setFormData] = useState<Partial<ClientProfile>>({
    jours_disponibles: [],
    contraintes_medicales: [],
    equipement_disponible: [],
    rm_values: {}
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDaysCount, setSelectedDaysCount] = useState(0);

  const joursOptions = [
    'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'
  ];

  const equipementOptions = [
    'aucun', 'tapis', 'élastiques', 'haltères', 'barre', 'kettlebell', 
    'swiss_ball', 'machine_guidée', 'cardio', 'piscine'
  ];

  const equipementSalle = [
    'haltères', 'barre', 'machine_guidée', 'cardio', 'swiss_ball', 'kettlebell'
  ];

  const contraintesOptions = [
    'genou_fragile', 'dos_sensible', 'épaule_limitée', 'cheville_faible',
    'hypertension', 'asthme', 'diabète', 'arthrose', 'hernie_discale'
  ];

  // Fonction pour obtenir la notice selon la vitesse et les jours disponibles
  const getVitesseNotice = () => {
    const joursDispos = formData.jours_disponibles?.length || 0;
    
    if (formData.vitesse_progression === 'progression_rapide') {
      if (joursDispos < 5) {
        return {
          type: 'warning' as const,
          message: `Pour une progression rapide optimale, 5 jours d'entraînement sont recommandés. Vous n'avez sélectionné que ${joursDispos} jour(s). Considérez ajouter plus de jours si possible.`
        };
      } else if (joursDispos === 7) {
        return {
          type: 'info' as const,
          message: 'Programme rapide : 5 jours seront automatiquement sélectionnés parmi vos 7 jours disponibles pour optimiser la récupération.'
        };
      } else if (joursDispos >= 5) {
        return {
          type: 'info' as const,
          message: `Programme rapide : ${Math.min(5, joursDispos)} jours seront utilisés pour maximiser les résultats.`
        };
      }
    } else if (formData.vitesse_progression === 'progression_legere') {
      if (joursDispos > 4) {
        return {
          type: 'info' as const,
          message: 'Programme modéré : 3-4 jours seront sélectionnés automatiquement parmi vos jours disponibles.'
        };
      }
    } else if (formData.vitesse_progression === 'maintien') {
      if (joursDispos > 3) {
        return {
          type: 'info' as const,
          message: 'Programme maintien : 2-3 jours seront sélectionnés pour préserver votre condition physique.'
        };
      }
    }
    
    return null;
  };

  // Fonction pour gérer le changement de vitesse de progression
  const handleVitesseProgressionChange = (vitesse: string) => {
    setFormData(prev => ({ ...prev, vitesse_progression: vitesse as any }));
  };

  // Fonction pour gérer le changement de format
  const handleFormatChange = (format: string) => {
    setFormData(prev => ({ ...prev, format_souhaite: format as any }));
    
    // Si "salle" est sélectionné, présélectionner l'équipement de salle
    if (format === 'salle') {
      setFormData(prev => ({ 
        ...prev, 
        equipement_disponible: [...equipementSalle],
        format_souhaite: format as any
      }));
      toast.info('Équipement de salle de sport présélectionné');
    }
  };

  const handleJourChange = (jour: string, checked: boolean) => {
    if (checked && selectedDaysCount >= 7) {
      toast.warning('Vous ne pouvez sélectionner que 7 jours maximum');
      return;
    }

    const newJours = checked 
      ? [...(formData.jours_disponibles || []), jour]
      : (formData.jours_disponibles || []).filter(j => j !== jour);
    
    setSelectedDaysCount(newJours.length);
    setFormData(prev => ({ ...prev, jours_disponibles: newJours }));
  };

  const handleEquipementChange = (equipement: string, checked: boolean) => {
    const newEquipement = checked 
      ? [...(formData.equipement_disponible || []), equipement]
      : (formData.equipement_disponible || []).filter(e => e !== equipement);
    
    setFormData(prev => ({ ...prev, equipement_disponible: newEquipement }));
  };

  const handleContrainteChange = (contrainte: string, checked: boolean) => {
    const newContraintes = checked 
      ? [...(formData.contraintes_medicales || []), contrainte]
      : (formData.contraintes_medicales || []).filter(c => c !== contrainte);
    
    setFormData(prev => ({ ...prev, contraintes_medicales: newContraintes }));
  };

  const handleRMChange = (exercice: string, value: string) => {
    const numValue = value ? parseInt(value) : undefined;
    setFormData(prev => ({
      ...prev,
      rm_values: {
        ...prev.rm_values,
        [exercice]: numValue
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.age || !formData.niveau || !formData.objectif || !formData.vitesse_progression) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if ((formData.jours_disponibles || []).length === 0) {
      toast.error('Veuillez sélectionner au moins un jour d\'entraînement');
      return;
    }

    setIsLoading(true);
    
    try {
      const clientProfile: ClientProfile = {
        nom: formData.nom!,
        age: formData.age!,
        poids: formData.poids,
        niveau: formData.niveau!,
        objectif: formData.objectif!,
        vitesse_progression: formData.vitesse_progression!,
        jours_disponibles: formData.jours_disponibles!,
        contraintes_medicales: formData.contraintes_medicales!,
        limitations_physiques: formData.limitations_physiques,
        equipement_disponible: formData.equipement_disponible!,
        format_souhaite: formData.format_souhaite || 'salle',
        rm_values: formData.rm_values
      };

      const programme = creerProgrammeOptimise(
        clientProfile,
        clientProfile.objectif,
        {
          médicales: clientProfile.contraintes_medicales,
          limitations: clientProfile.limitations_physiques,
          équipement: clientProfile.equipement_disponible
        },
        clientProfile.jours_disponibles
      );

      onProgrammeGenerated(clientProfile, programme);
      toast.success('Programme généré avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la génération du programme');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const vitesseNotice = getVitesseNotice();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informations générales */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nom">Nom complet *</Label>
              <Input
                id="nom"
                value={formData.nom || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                placeholder="Kevin Dupont"
                required
              />
            </div>

            <div>
              <Label htmlFor="age">Âge *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                placeholder="28"
                min="12"
                max="90"
                required
              />
            </div>

            <div>
              <Label htmlFor="poids">Poids (kg)</Label>
              <Input
                id="poids"
                type="number"
                value={formData.poids || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, poids: parseInt(e.target.value) }))}
                placeholder="75"
                min="30"
                max="200"
              />
            </div>

            <div>
              <Label>Niveau *</Label>
              <Select onValueChange={(value: any) => setFormData(prev => ({ ...prev, niveau: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="débutant">Débutant</SelectItem>
                  <SelectItem value="intermédiaire">Intermédiaire</SelectItem>
                  <SelectItem value="avancé">Avancé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Objectif principal *</Label>
              <Select onValueChange={(value: any) => setFormData(prev => ({ ...prev, objectif: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner l'objectif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prise_de_masse">Prise de masse</SelectItem>
                  <SelectItem value="perte_de_poids">Perte de poids</SelectItem>
                  <SelectItem value="remise_en_forme">Remise en forme</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="force">Force</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Vitesse de progression souhaitée *</Label>
              <Select onValueChange={handleVitesseProgressionChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la vitesse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintien">
                    <div className="flex flex-col">
                      <span className="font-medium">Maintien</span>
                      <span className="text-xs text-gray-500">Préserver la condition actuelle</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="progression_legere">
                    <div className="flex flex-col">
                      <span className="font-medium">Modérée</span>
                      <span className="text-xs text-gray-500">Prise de force et muscle modérée</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="progression_rapide">
                    <div className="flex flex-col">
                      <span className="font-medium">Rapide</span>
                      <span className="text-xs text-gray-500">Préparation compétition / gains maximaux</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Disponibilités et format */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Disponibilités</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Jours disponibles *</Label>
              <div className="text-sm text-gray-500 mb-2">
                {selectedDaysCount}/7 jours sélectionnés
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {joursOptions.map((jour) => (
                  <div key={jour} className="flex items-center space-x-2">
                    <Checkbox
                      id={jour}
                      checked={(formData.jours_disponibles || []).includes(jour)}
                      onCheckedChange={(checked) => handleJourChange(jour, !!checked)}
                    />
                    <Label htmlFor={jour} className="capitalize text-sm">
                      {jour}
                    </Label>
                  </div>
                ))}
              </div>
              
              {/* Notice dynamique selon la vitesse */}
              {vitesseNotice && (
                <Alert className="mt-3">
                  {vitesseNotice.type === 'warning' ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : (
                    <Info className="h-4 w-4" />
                  )}
                  <AlertDescription className="text-sm">
                    {vitesseNotice.message}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <Separator />

            <div>
              <Label>Format souhaité</Label>
              <RadioGroup
                value={formData.format_souhaite}
                onValueChange={handleFormatChange}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="salle" id="salle" />
                  <Label htmlFor="salle">Salle de sport</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exterieur" id="exterieur" />
                  <Label htmlFor="exterieur">Extérieur</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en_ligne" id="en_ligne" />
                  <Label htmlFor="en_ligne">En ligne (domicile)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="presentiel" id="presentiel" />
                  <Label htmlFor="presentiel">Présentiel (coaching)</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 1RM (Répétitions Maximales) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">1RM - Répétitions maximales (optionnel)</CardTitle>
          <p className="text-sm text-gray-600">
            Renseignez vos charges maximales pour une répétition si vous les connaissez. Cela permettra de calculer des pourcentages précis.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="developpe_couche">Développé couché (kg)</Label>
              <Input
                id="developpe_couche"
                type="number"
                value={formData.rm_values?.developpe_couche || ''}
                onChange={(e) => handleRMChange('developpe_couche', e.target.value)}
                placeholder="80"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="squat">Squat (kg)</Label>
              <Input
                id="squat"
                type="number"
                value={formData.rm_values?.squat || ''}
                onChange={(e) => handleRMChange('squat', e.target.value)}
                placeholder="100"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="souleve_de_terre">Soulevé de terre (kg)</Label>
              <Input
                id="souleve_de_terre"
                type="number"
                value={formData.rm_values?.souleve_de_terre || ''}
                onChange={(e) => handleRMChange('souleve_de_terre', e.target.value)}
                placeholder="120"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="developpe_militaire">Développé militaire (kg)</Label>
              <Input
                id="developpe_militaire"
                type="number"
                value={formData.rm_values?.developpe_militaire || ''}
                onChange={(e) => handleRMChange('developpe_militaire', e.target.value)}
                placeholder="50"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="rowing">Rowing (kg)</Label>
              <Input
                id="rowing"
                type="number"
                value={formData.rm_values?.rowing || ''}
                onChange={(e) => handleRMChange('rowing', e.target.value)}
                placeholder="70"
                min="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Équipement disponible */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Équipement disponible</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {equipementOptions.map((equipement) => (
              <div key={equipement} className="flex items-center space-x-2">
                <Checkbox
                  id={equipement}
                  checked={(formData.equipement_disponible || []).includes(equipement)}
                  onCheckedChange={(checked) => handleEquipementChange(equipement, !!checked)}
                />
                <Label htmlFor={equipement} className="text-sm">
                  {equipement.replace('_', ' ')}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contraintes et limitations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contraintes médicales et limitations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Contraintes médicales</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {contraintesOptions.map((contrainte) => (
                <div key={contrainte} className="flex items-center space-x-2">
                  <Checkbox
                    id={contrainte}
                    checked={(formData.contraintes_medicales || []).includes(contrainte)}
                    onCheckedChange={(checked) => handleContrainteChange(contrainte, !!checked)}
                  />
                  <Label htmlFor={contrainte} className="text-sm">
                    {contrainte.replace('_', ' ')}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="limitations">Limitations physiques particulières</Label>
            <Textarea
              id="limitations"
              value={formData.limitations_physiques || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, limitations_physiques: e.target.value }))}
              placeholder="Douleurs lombaires, ancienne blessure à l'épaule..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          type="submit" 
          size="lg" 
          disabled={isLoading}
          className="w-full md:w-auto px-8"
        >
          {isLoading ? 'Génération en cours...' : 'Générer le programme'}
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;
