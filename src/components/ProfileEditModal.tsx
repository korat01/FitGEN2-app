import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Save, User, Target, Dumbbell, Mail, Calendar, Weight, Ruler } from 'lucide-react';
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
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    onSave(editedProfile);
    onClose();
  };

  const handleFocusChange = (focus: FocusArea[]) => {
    setEditedProfile(prev => ({ ...prev, focus }));
  };

  const handleForceFocusChange = (forceFocus: ForceFocus[]) => {
    setEditedProfile(prev => ({ ...prev, focusForce: forceFocus }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <User className="w-6 h-6" />
              Modifier le profil
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          {/* Informations de base */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-black flex items-center gap-3 border-b border-gray-200 pb-3">
              <User className="w-6 h-6 text-purple-600" />
              Informations personnelles
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nom" className="text-black font-semibold">Nom complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="nom"
                    value={editedProfile.nom}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, nom: e.target.value }))}
                    className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Votre nom complet"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black font-semibold">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="text-black font-semibold">Âge</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="age"
                    type="number"
                    value={editedProfile.age}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="25"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="poids" className="text-black font-semibold">Poids (kg)</Label>
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="poids"
                    type="number"
                    value={editedProfile.poids}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, poids: parseFloat(e.target.value) }))}
                    className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="70"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="taille" className="text-black font-semibold">Taille (cm)</Label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="taille"
                    type="number"
                    value={editedProfile.taille}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, taille: parseFloat(e.target.value) }))}
                    className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="175"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Objectif et niveau */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-black flex items-center gap-3 border-b border-gray-200 pb-3">
              <Target className="w-6 h-6 text-green-600" />
              Objectif et niveau
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="objectif" className="text-black font-semibold">Objectif</Label>
                <Select
                  value={editedProfile.objectif}
                  onValueChange={(value: any) => setEditedProfile(prev => ({ ...prev, objectif: value }))}
                >
                  <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
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
                <Label htmlFor="niveau" className="text-black font-semibold">Niveau</Label>
                <Select
                  value={editedProfile.niveau}
                  onValueChange={(value: any) => setEditedProfile(prev => ({ ...prev, niveau: value }))}
                >
                  <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debutant">Débutant</SelectItem>
                    <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                    <SelectItem value="avance">Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Focus - seulement pour musculation */}
          {(editedProfile.objectif === 'perte_poids' || editedProfile.objectif === 'prise_masse' || editedProfile.objectif === 'maintien') && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-black flex items-center gap-3 border-b border-gray-200 pb-3">
                <Dumbbell className="w-6 h-6 text-orange-600" />
                Focus d'entraînement
              </h3>
              <FocusSelector
                selectedFocus={editedProfile.focus || []}
                onFocusChange={handleFocusChange}
              />
            </div>
          )}

          {/* Focus Force - seulement pour force/powerlifting */}
          {(editedProfile.objectif === 'force' || editedProfile.objectif === 'powerlifting') && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-black flex items-center gap-3 border-b border-gray-200 pb-3">
                <Dumbbell className="w-6 h-6 text-yellow-600" />
                Focus Force/Powerlifting
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['squat', 'deadlift', 'bench_press', 'overhead_press'].map((exercise) => (
                  <label key={exercise} className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editedProfile.focusForce?.includes(exercise as ForceFocus) || false}
                      onChange={(e) => {
                        const currentFocus = editedProfile.focusForce || [];
                        if (e.target.checked) {
                          setEditedProfile(prev => ({
                            ...prev,
                            focusForce: [...currentFocus, exercise as ForceFocus]
                          }));
                        } else {
                          setEditedProfile(prev => ({
                            ...prev,
                            focusForce: currentFocus.filter(f => f !== exercise)
                          }));
                        }
                      }}
                      className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-black font-medium capitalize">{exercise.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Fréquence */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-black flex items-center gap-3 border-b border-gray-200 pb-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              Fréquence d'entraînement
            </h3>
            <div className="max-w-xs">
              <Label htmlFor="frequence" className="text-black font-semibold">Jours par semaine</Label>
              <Input
                id="frequence"
                type="number"
                min="1"
                max="7"
                value={editedProfile.frequence}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, frequence: parseInt(e.target.value) }))}
                className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={onClose} className="h-12 px-8">
              Annuler
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-12 px-8 hover:from-purple-700 hover:to-blue-700">
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