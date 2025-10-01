import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth, User } from '../contexts/AuthContext';
import { UserProfile } from '../types/profile';
import { Save, User as UserIcon, Calendar, Target, Zap } from 'lucide-react';

interface ProfileFormProps {
  onClose?: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onClose }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialiser les données du formulaire
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        weight: user.weight || 70,
        age: typeof user.age === 'number' ? user.age : 25,
        sex: user.sex === 'male' || user.sex === 'female' ? user.sex : 'male',
        sportClass: (
          user.sportClass === 'classique' ||
          user.sportClass === 'powerlifter' ||
          user.sportClass === 'runner' ||
          user.sportClass === 'allround' ||
          user.sportClass === 'calisthenics' ||
          user.sportClass === 'crossfit' ||
          user.sportClass === 'marathon' ||
          user.sportClass === 'streetlifting' ||
          user.sportClass === 'sprint'
        ) ? user.sportClass : 'classique',
        phone: typeof user.phone === 'string' ? user.phone : '',
        location: typeof user.location === 'string' ? user.location : '',
        height: typeof user.height === 'number' ? user.height : 175,
        goal: (user.goal === 'performance' || user.goal === 'musculation' || user.goal === 'endurance' || user.goal === 'sante') ? user.goal : 'performance',
        generalLevel: (user.generalLevel === 'Débutant' || user.generalLevel === 'Intermédiaire' || user.generalLevel === 'Avancé' || user.generalLevel === 'Expert') ? user.generalLevel : 'Débutant',
        trainingDays: Array.isArray(user.trainingDays) ? user.trainingDays : [],
        trainingMonths: typeof user.trainingMonths === 'number' ? user.trainingMonths : 3,
        // Focus musculaires
        focus_pectoraux: 'focus_pectoraux' in user ? (user as any).focus_pectoraux : false,
        focus_dos: user.focus_dos || false,
        focus_bras: user.focus_bras || false,
        focus_epaules: user.focus_epaules || false,
        focus_abdos: user.focus_abdos || false,
        focus_jambes: user.focus_jambes || false,
        focus_fessiers: user.focus_fessiers || false,
        // Focus spécialisés
        focus_squat: user.focus_squat || false,
        focus_bench: user.focus_bench || false,
        focus_deadlift: user.focus_deadlift || false,
        focus_endurance: user.focus_endurance || false,
        focus_explosivite: user.focus_explosivite || false,
        focus_calisthenics: user.focus_calisthenics || false,
      });
    }
  }, [user]);

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field: keyof UserProfile, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (user) {
        const updatedUser: User = {
          ...user,
          ...formData
        };

        // Mettre à jour l'utilisateur sans inclure le champ 'updatedAt' qui n'est pas reconnu par le type
        await updateUser(updatedUser);
        console.log('✅ Profil mis à jour:', updatedUser);
        
        if (onClose) {
          onClose();
        }
      }
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour:', error);
      alert('Erreur lors de la mise à jour du profil');
    } finally {
      setIsLoading(false);
    }
  };

  const trainingDaysOptions = [
    { value: 'lundi', label: 'Lundi' },
    { value: 'mardi', label: 'Mardi' },
    { value: 'mercredi', label: 'Mercredi' },
    { value: 'jeudi', label: 'Jeudi' },
    { value: 'vendredi', label: 'Vendredi' },
    { value: 'samedi', label: 'Samedi' },
    { value: 'dimanche', label: 'Dimanche' }
  ];

  const sportClassOptions = [
    { value: 'Classique', label: 'Classique' },
    { value: 'Powerlifting', label: 'Powerlifting' },
    { value: 'Crossfit', label: 'Crossfit' },
    { value: 'Marathon', label: 'Marathon' },
    { value: 'Calisthenics', label: 'Calisthenics' },
    { value: 'Streetlifting', label: 'Streetlifting' }
  ];

  const levelOptions = [
    { value: 'Débutant', label: 'Débutant' },
    { value: 'Intermédiaire', label: 'Intermédiaire' },
    { value: 'Avancé', label: 'Avancé' }
  ];

  const durationOptions = [
    { value: 1, label: '1 mois' },
    { value: 2, label: '2 mois' },
    { value: 3, label: '3 mois' },
    { value: 6, label: '6 mois' },
    { value: 12, label: '12 mois' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            Modifier le Profil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations de base */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-blue-500" />
                Informations Personnelles
              </h3>
              
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
              <Input
                    id="name"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Votre nom"
              />
            </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="votre@email.com"
              />
            </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Poids (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight || ''}
                    onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || 70)}
                    placeholder="70"
                  />
          </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Âge</Label>
              <Input
                id="age"
                type="number"
                    value={formData.age || ''}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 25)}
                    placeholder="25"
              />
            </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sex">Sexe</Label>
                  <Select value={formData.sex || 'male'} onValueChange={(value) => handleInputChange('sex', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Homme</SelectItem>
                      <SelectItem value="female">Femme</SelectItem>
                    </SelectContent>
                  </Select>
            </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Taille (cm)</Label>
              <Input
                    id="height"
                type="number"
                    value={formData.height || ''}
                    onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 175)}
                    placeholder="175"
              />
            </div>
          </div>
            </div>

            {/* Paramètres d'entraînement */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                Paramètres d'Entraînement
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sportClass">Classe de Sport</Label>
                  <Select value={formData.sportClass || 'Classique'} onValueChange={(value) => handleInputChange('sportClass', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre sport" />
              </SelectTrigger>
              <SelectContent>
                      {sportClassOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
              </SelectContent>
            </Select>
          </div>

                <div className="space-y-2">
                  <Label htmlFor="generalLevel">Niveau Général</Label>
                  <Select value={formData.generalLevel || 'Débutant'} onValueChange={(value) => handleInputChange('generalLevel', value)}>
                    <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre niveau" />
                </SelectTrigger>
                <SelectContent>
                      {levelOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>

                <div className="space-y-2">
                  <Label htmlFor="trainingMonths">Durée d'Entraînement</Label>
              <Select
                    value={formData.trainingMonths?.toString() || '3'}
                    onValueChange={(value) => handleInputChange('trainingMonths', parseInt(value))}
              >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez la durée" />
                </SelectTrigger>
                <SelectContent>
                      {durationOptions.map(option => (
                        <SelectItem key={option.value} value={option.value.toString()}>
                          {option.label}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>
          </div>
              
              <div className="space-y-3">
                <Label>Jours d'Entraînement</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {trainingDaysOptions.map(day => (
                    <div key={day.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={day.value}
                        checked={formData.trainingDays?.includes(day.value) || false}
                        onCheckedChange={(checked) => {
                          const currentDays = formData.trainingDays || [];
                          if (checked) {
                            handleInputChange('trainingDays', [...currentDays, day.value]);
                          } else {
                            handleInputChange('trainingDays', currentDays.filter(d => d !== day.value));
                          }
                        }}
                      />
                      <Label htmlFor={day.value} className="text-sm">{day.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Zones de Focus */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Zones de Focus
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Groupes Musculaires</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { key: 'focus_pectoraux', label: 'Pectoraux' },
                      { key: 'focus_dos', label: 'Dos' },
                      { key: 'focus_bras', label: 'Bras' },
                      { key: 'focus_epaules', label: 'Épaules' },
                      { key: 'focus_abdos', label: 'Abdominaux' },
                      { key: 'focus_jambes', label: 'Jambes' },
                      { key: 'focus_fessiers', label: 'Fessiers' }
                    ].map(focus => (
                      <div key={focus.key} className="flex items-center space-x-2">
                        <Checkbox
                          id={focus.key}
                          checked={formData[focus.key as keyof UserProfile] as boolean || false}
                          onCheckedChange={(checked) => handleCheckboxChange(focus.key as keyof UserProfile, checked as boolean)}
                        />
                        <Label htmlFor={focus.key} className="text-sm">{focus.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Focus Spécialisés</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { key: 'focus_squat', label: 'Squat' },
                      { key: 'focus_bench', label: 'Bench Press' },
                      { key: 'focus_deadlift', label: 'Deadlift' },
                      { key: 'focus_endurance', label: 'Endurance' },
                      { key: 'focus_explosivite', label: 'Explosivité' },
                      { key: 'focus_calisthenics', label: 'Calisthenics' }
                    ].map(focus => (
                      <div key={focus.key} className="flex items-center space-x-2">
                        <Checkbox
                          id={focus.key}
                          checked={formData[focus.key as keyof UserProfile] as boolean || false}
                          onCheckedChange={(checked) => handleCheckboxChange(focus.key as keyof UserProfile, checked as boolean)}
                        />
                        <Label htmlFor={focus.key} className="text-sm">{focus.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              {onClose && (
                <Button type="button" variant="outline" onClick={onClose}>
                  Annuler
                </Button>
              )}
              <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </>
                )}
        </Button>
      </div>
    </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm; 