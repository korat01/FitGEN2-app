import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Save, User, Target, Dumbbell, Settings } from 'lucide-react';
import { UserProfile, FocusArea, ForceFocus } from '@/types/profile';
import FocusSelector from './FocusSelector';

interface ProfileEditModalProps {
  profile: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
  onClose: () => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  profile,
  onSave,
  onClose
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFocusChange = (focus: FocusArea[]) => {
    setFormData(prev => ({
      ...prev,
      focus
    }));
  };

  const handleForceFocusChange = (forceFocus: ForceFocus[]) => {
    setFormData(prev => ({
      ...prev,
      forceFocus
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <Settings className="w-6 h-6" />
              Modifier le profil
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 border-0"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          {/* Informations de base */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black">Informations personnelles</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nom" className="text-lg font-semibold text-black">Nom complet</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => handleInputChange('nom', e.target.value)}
                  className="h-12 text-lg border-2 border-gray-300 focus:border-purple-500 rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg font-semibold text-black">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-12 text-lg border-2 border-gray-300 focus:border-purple-500 rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="text-lg font-semibold text-black">Âge</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  className="h-12 text-lg border-2 border-gray-300 focus:border-purple-500 rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="poids" className="text-lg font-semibold text-black">Poids (kg)</Label>
                <Input
                  id="poids"
                  type="number"
                  value={formData.poids}
                  onChange={(e) => handleInputChange('poids', parseFloat(e.target.value))}
                  className="h-12 text-lg border-2 border-gray-300 focus:border-purple-500 rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="taille" className="text-lg font-semibold text-black">Taille (cm)</Label>
                <Input
                  id="taille"
                  type="number"
                  value={formData.taille}
                  onChange={(e) => handleInputChange('taille', parseFloat(e.target.value))}
                  className="h-12 text-lg border-2 border-gray-300 focus:border-purple-500 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Objectif et niveau */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black">Objectifs d'entraînement</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="objectif" className="text-lg font-semibold text-black">Objectif principal</Label>
                <Select
                  value={formData.objectif}
                  onValueChange={(value) => handleInputChange('objectif', value)}
                >
                  <SelectTrigger className="h-12 text-lg border-2 border-gray-300 focus:border-purple-500 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perte_poids">Perte de poids</SelectItem>
                    <SelectItem value="prise_masse">Prise de masse</SelectItem>
                    <SelectItem value="maintien">Maintien</SelectItem>
                    <SelectItem value="force">Force</SelectItem>
                    <SelectItem value="powerlifting">Powerlifting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="niveau" className="text-lg font-semibold text-black">Niveau</Label>
                <Select
                  value={formData.niveau}
                  onValueChange={(value) => handleInputChange('niveau', value)}
                >
                  <SelectTrigger className="h-12 text-lg border-2 border-gray-300 focus:border-purple-500 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debutant">Débutant</SelectItem>
                    <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                    <SelectItem value="avance">Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="frequence" className="text-lg font-semibold text-black">Fréquence (jours/semaine)</Label>
                <Input
                  id="frequence"
                  type="number"
                  min="1"
                  max="7"
                  value={formData.frequence}
                  onChange={(e) => handleInputChange('frequence', parseInt(e.target.value))}
                  className="h-12 text-lg border-2 border-gray-300 focus:border-purple-500 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Focus pour musculation */}
          {(formData.objectif === 'perte_poids' || formData.objectif === 'prise_masse' || formData.objectif === 'maintien') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black">Focus d'entraînement</h3>
              </div>
              <FocusSelector
                selectedFocus={formData.focus || []}
                onFocusChange={handleFocusChange}
              />
            </div>
          )}

          {/* Focus pour force/powerlifting */}
          {(formData.objectif === 'force' || formData.objectif === 'powerlifting') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black">Focus Force/Powerlifting</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['squat', 'deadlift', 'bench_press', 'overhead_press'].map((exercise) => (
                  <label key={exercise} className="flex items-center space-x-3 p-4 border-2 border-gray-300 rounded-lg hover:border-purple-500 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.focusForce?.includes(exercise as ForceFocus) || false}
                      onChange={(e) => {
                        const currentFocus = formData.focusForce || [];
                        if (e.target.checked) {
                          handleForceFocusChange([...currentFocus, exercise as ForceFocus]);
                        } else {
                          handleForceFocusChange(currentFocus.filter(f => f !== exercise));
                        }
                      }}
                      className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-lg font-medium text-black capitalize">{exercise.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4 pt-8 border-t-2 border-gray-200">
            <Button
              variant="outline"
              onClick={onClose}
              className="h-12 px-8 text-lg font-semibold border-2 border-gray-400 text-black hover:bg-gray-100 hover:border-gray-500 bg-white"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
            >
              <Save className="w-5 h-5 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileEditModal; 