import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserProfile, FocusArea, ForceFocus } from '@/types/profile';
import FocusSelector from './FocusSelector';
import { useAuth } from '@/hooks/useAuth';
import PageLayout from './PageLayout';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile, focusAreas: FocusArea[], forceFocus: ForceFocus[]) => void;
  initialData?: Partial<UserProfile>;
  onCancel?: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    // ... existing fields ...
    
    // AJOUTER CES CHAMPS
    weight: user?.weight || 75,
    age: user?.age || 28,
    sex: user?.sex || 'male',
    profileType: user?.profileType || 'allround',
    taille: user?.taille || 180
  });

  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([]);
  const [forceFocus, setForceFocus] = useState<ForceFocus[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      const completeProfile: UserProfile = {
        id: Date.now().toString(),
        nom: formData.name,
        email: formData.email,
        age: formData.age || 25,
        poids: formData.weight || 70,
        taille: formData.taille || 180,
        objectif: 'maintien', // Placeholder, will be updated from user
        niveau: 'debutant', // Placeholder, will be updated from user
        frequence: 3, // Placeholder, will be updated from user
        focus: focusAreas,
        focusForce: forceFocus,
        preferences: {
          dureeSeance: 60,
          equipement: [],
          restrictions: []
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        // AJOUTER CES CHAMPS
        sex: formData.sex,
        profileType: formData.profileType
      };
      onSubmit(completeProfile, focusAreas, forceFocus);
    }
  };

  const isMusculation = ['perte_poids', 'prise_masse', 'maintien'].includes(formData.objectif || '');
  const isForce = ['force', 'powerlifting'].includes(formData.objectif || '');

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... existing fields ... */}
      
      {/* AJOUTER CETTE SECTION AVANT LE FOCUS SELECTOR */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium">Informations personnelles</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom complet</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Âge</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
              min="16"
              max="100"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Poids (kg)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
              min="30"
              max="200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Taille (cm)</label>
            <input
              type="number"
              value={formData.taille}
              onChange={(e) => setFormData({ ...formData, taille: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
              min="100"
              max="250"
            />
          </div>
        </div>
        
        {/* NOUVEAU CHAMP SEXE */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Sexe</label>
            <select
              value={formData.sex}
              onChange={(e) => setFormData({ ...formData, sex: e.target.value as 'male' | 'female' })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="male">Homme</option>
              <option value="female">Femme</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Type de profil</label>
            <select
              value={formData.profileType}
              onChange={(e) => setFormData({ ...formData, profileType: e.target.value as any })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="powerlifter">Powerlifter</option>
              <option value="runner">Coureur</option>
              <option value="allround">Polyvalent</option>
              <option value="calisthenics">Calisthenics</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* ... existing fields ... */}

      {/* Focus Selector */}
      <FocusSelector
        objectif={formData.objectif || ''}
        onFocusChange={(focus, force) => {
          setFocusAreas(focus);
          setForceFocus(force);
        }}
        initialFocus={focusAreas}
        initialForceFocus={forceFocus}
      />

      <div className="text-center">
        <Button
          type="submit"
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold px-8 py-4"
        >
          Créer mon profil
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm; 