
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
import { ClientProfile, ProgrammeHebdomadaire } from '@/types/programme';
import { creerProgrammeOptimise } from '@/utils/programmeGenerator';
import { toast } from 'sonner';

interface ClientFormProps {
  onProgrammeGenerated: (profile: ClientProfile, programme: ProgrammeHebdomadaire) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ onProgrammeGenerated }) => {
  const [formData, setFormData] = useState<Partial<ClientProfile>>({
    jours_disponibles: [],
    contraintes_medicales: [],
    equipement_disponible: []
  });

  const [isLoading, setIsLoading] = useState(false);

  const joursOptions = [
    'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'
  ];

  const equipementOptions = [
    'aucun', 'tapis', 'élastiques', 'haltères', 'barre', 'kettlebell', 
    'swiss_ball', 'machine_guidée', 'cardio', 'piscine'
  ];

  const contraintesOptions = [
    'genou_fragile', 'dos_sensible', 'épaule_limitée', 'cheville_faible',
    'hypertension', 'asthme', 'diabète', 'arthrose', 'hernie_discale'
  ];

  const handleJourChange = (jour: string, checked: boolean) => {
    const newJours = checked 
      ? [...(formData.jours_disponibles || []), jour]
      : (formData.jours_disponibles || []).filter(j => j !== jour);
    
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.age || !formData.niveau || !formData.objectif) {
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
        niveau: formData.niveau!,
        objectif: formData.objectif!,
        jours_disponibles: formData.jours_disponibles!,
        contraintes_medicales: formData.contraintes_medicales!,
        limitations_physiques: formData.limitations_physiques,
        equipement_disponible: formData.equipement_disponible!,
        format_souhaite: formData.format_souhaite || 'salle'
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
            </div>

            <Separator />

            <div>
              <Label>Format souhaité</Label>
              <RadioGroup
                value={formData.format_souhaite}
                onValueChange={(value: any) => setFormData(prev => ({ ...prev, format_souhaite: value }))}
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
