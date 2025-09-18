import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserProfile, FocusArea, ForceFocus } from '@/types/profile';
import FocusSelector from './FocusSelector';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile, focusAreas: FocusArea[], forceFocus: ForceFocus[]) => void;
  initialData?: Partial<UserProfile>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, initialData }) => {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    nom: '',
    email: '',
    age: 25,
    poids: 70,
    taille: 175,
    objectif: 'maintien',
    niveau: 'debutant',
    frequence: 3,
    preferences: {
      dureeSeance: 60,
      equipement: [],
      restrictions: []
    },
    ...initialData
  });

  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([]);
  const [forceFocus, setForceFocus] = useState<ForceFocus[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.nom && profile.email) {
      const completeProfile: UserProfile = {
        id: Date.now().toString(),
        nom: profile.nom,
        email: profile.email,
        age: profile.age || 25,
        poids: profile.poids || 70,
        taille: profile.taille || 175,
        objectif: profile.objectif as any,
        niveau: profile.niveau as any,
        frequence: profile.frequence || 3,
        focus: focusAreas,
        focusForce: forceFocus,
        preferences: profile.preferences || {
          dureeSeance: 60,
          equipement: [],
          restrictions: []
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      onSubmit(completeProfile, focusAreas, forceFocus);
    }
  };

  const isMusculation = ['perte_poids', 'prise_masse', 'maintien'].includes(profile.objectif || '');
  const isForce = ['force', 'powerlifting'].includes(profile.objectif || '');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-300 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nom" className="text-black font-medium">Nom</Label>
              <Input
                id="nom"
                value={profile.nom}
                onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-black font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="mt-1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age" className="text-black font-medium">Âge</Label>
              <Input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="poids" className="text-black font-medium">Poids (kg)</Label>
              <Input
                id="poids"
                type="number"
                value={profile.poids}
                onChange={(e) => setProfile({ ...profile, poids: parseInt(e.target.value) })}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="taille" className="text-black font-medium">Taille (cm)</Label>
              <Input
                id="taille"
                type="number"
                value={profile.taille}
                onChange={(e) => setProfile({ ...profile, taille: parseInt(e.target.value) })}
                className="mt-1"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">Objectifs d'entraînement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="objectif" className="text-black font-medium">Objectif principal</Label>
            <Select
              value={profile.objectif}
              onValueChange={(value) => setProfile({ ...profile, objectif: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Sélectionnez votre objectif" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="niveau" className="text-black font-medium">Niveau</Label>
              <Select
                value={profile.niveau}
                onValueChange={(value) => setProfile({ ...profile, niveau: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionnez votre niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debutant">Débutant</SelectItem>
                  <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                  <SelectItem value="avance">Avancé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="frequence" className="text-black font-medium">Fréquence (jours/semaine)</Label>
              <Select
                value={profile.frequence?.toString()}
                onValueChange={(value) => setProfile({ ...profile, frequence: parseInt(value) })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionnez la fréquence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 jours</SelectItem>
                  <SelectItem value="3">3 jours</SelectItem>
                  <SelectItem value="4">4 jours</SelectItem>
                  <SelectItem value="5">5 jours</SelectItem>
                  <SelectItem value="6">6 jours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Focus Selector */}
      <FocusSelector
        objectif={profile.objectif || ''}
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