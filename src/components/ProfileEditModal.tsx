import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Save, User, Target, Dumbbell, Calendar, Settings, Mail, Phone } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-white shadow-2xl rounded-3xl">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-3xl">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <User className="w-6 h-6" />
              Modifier le profil
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-white hover:bg-white/20 w-10 h-10 p-0 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-10 bg-white">
          {/* Informations de base */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-200">
              <User className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">Informations personnelles</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="nom" className="text-sm font-semibold text-gray-700">Nom complet</Label>
                <Input
                  id="nom"
                  value={editedProfile.nom}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, nom: e.target.value }))}
                  className="text-gray-900 bg-white border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-12 text-base rounded-lg"
                  placeholder="Votre nom complet"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="age" className="text-sm font-semibold text-gray-700">Âge</Label>
                <Input
                  id="age"
                  type="number"
                  value={editedProfile.age}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                  className="text-gray-900 bg-white border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-12 text-base rounded-lg"
                  placeholder="Votre âge"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="poids" className="text-sm font-semibold text-gray-700">Poids (kg)</Label>
                <Input
                  id="poids"
                  type="number"
                  step="0.1"
                  value={editedProfile.poids}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, poids: parseFloat(e.target.value) }))}
                  className="text-gray-900 bg-white border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-12 text-base rounded-lg"
                  placeholder="Votre poids en kg"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="taille" className="text-sm font-semibold text-gray-700">Taille (cm)</Label>
                <Input
                  id="taille"
                  type="number"
                  value={editedProfile.taille}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, taille: parseInt(e.target.value) }))}
                  className="text-gray-900 bg-white border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-12 text-base rounded-lg"
                  placeholder="Votre taille en cm"
                />
              </div>
            </div>
          </div>

          {/* Objectif et niveau */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-200">
              <Target className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">Objectif et niveau</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="objectif" className="text-sm font-semibold text-gray-700">Objectif principal</Label>
                <Select
                  value={editedProfile.objectif}
                  onValueChange={(value: any) => setEditedProfile(prev => ({ ...prev, objectif: value }))}
                >
                  <SelectTrigger className="text-gray-900 bg-white border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-12 text-base rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-300">
                    <SelectItem value="perte_poids" className="text-gray-900 hover:bg-gray-100">Perte de poids</SelectItem>
                    <SelectItem value="prise_masse" className="text-gray-900 hover:bg-gray-100">Prise de masse</SelectItem>
                    <SelectItem value="maintien" className="text-gray-900 hover:bg-gray-100">Maintien</SelectItem>
                    <SelectItem value="force" className="text-gray-900 hover:bg-gray-100">Force</SelectItem>
                    <SelectItem value="powerlifting" className="text-gray-900 hover:bg-gray-100">Powerlifting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="niveau" className="text-sm font-semibold text-gray-700">Niveau d'expérience</Label>
                <Select
                  value={editedProfile.niveau}
                  onValueChange={(value: any) => setEditedProfile(prev => ({ ...prev, niveau: value }))}
                >
                  <SelectTrigger className="text-gray-900 bg-white border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-12 text-base rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-300">
                    <SelectItem value="debutant" className="text-gray-900 hover:bg-gray-100">Débutant</SelectItem>
                    <SelectItem value="intermediaire" className="text-gray-900 hover:bg-gray-100">Intermédiaire</SelectItem>
                    <SelectItem value="avance" className="text-gray-900 hover:bg-gray-100">Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Focus pour musculation */}
          {(editedProfile.objectif === 'perte_poids' || editedProfile.objectif === 'prise_masse' || editedProfile.objectif === 'maintien') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-200">
                <Dumbbell className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">Focus musculation</h3>
              </div>
              <FocusSelector
                selectedFocus={editedProfile.focus || []}
                onFocusChange={handleFocusChange}
              />
            </div>
          )}

          {/* Focus pour force/powerlifting */}
          {(editedProfile.objectif === 'force' || editedProfile.objectif === 'powerlifting') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-200">
                <Dumbbell className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-900">Focus force/powerlifting</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['squat', 'deadlift', 'bench_press'] as ForceFocus[]).map((focus) => (
                  <Button
                    key={focus}
                    variant={editedProfile.focusForce?.includes(focus) ? "default" : "outline"}
                    onClick={() => {
                      const currentFocus = editedProfile.focusForce || [];
                      const newFocus = currentFocus.includes(focus)
                        ? currentFocus.filter(f => f !== focus)
                        : [...currentFocus, focus];
                      setEditedProfile(prev => ({ ...prev, focusForce: newFocus }));
                    }}
                    className={`h-16 text-base font-semibold rounded-lg ${
                      editedProfile.focusForce?.includes(focus)
                        ? 'bg-orange-600 hover:bg-orange-700 text-white'
                        : 'border-2 border-orange-300 text-orange-700 hover:bg-orange-50 bg-white'
                    }`}
                  >
                    {focus === 'squat' ? 'Squat' : focus === 'deadlift' ? 'Deadlift' : 'Bench Press'}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Fréquence */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-200">
              <Calendar className="w-6 h-6 text-indigo-600" />
              <h3 className="text-xl font-bold text-gray-900">Fréquence d'entraînement</h3>
            </div>
            <div className="space-y-3">
              <Label htmlFor="frequence" className="text-sm font-semibold text-gray-700">Jours par semaine</Label>
              <Input
                id="frequence"
                type="number"
                min="1"
                max="7"
                value={editedProfile.frequence}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, frequence: parseInt(e.target.value) }))}
                className="text-gray-900 bg-white border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-12 text-base rounded-lg"
                placeholder="Nombre de jours par semaine"
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="px-8 py-3 text-gray-700 border-2 border-gray-300 hover:bg-gray-50 text-base font-semibold rounded-lg bg-white"
            >
              Annuler
            </Button>
            <Button 
              onClick={handleSave} 
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 text-base font-semibold rounded-lg"
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