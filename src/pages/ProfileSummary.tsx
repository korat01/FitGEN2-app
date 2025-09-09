import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Target, Dumbbell, Calendar, Settings, Edit, Trophy, Star, Mail, Phone, MapPin, Activity, Heart, Zap, Award, Clock, Weight, Ruler } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import ProfileEditModal from '@/components/ProfileEditModal';
import { UserProfile } from '@/types/profile';

const ProfileSummary: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Données de profil simulées - à remplacer par les vraies données
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    nom: 'Alexandre Martin',
    email: 'alexandre.martin@email.com',
    age: 28,
    poids: 75,
    taille: 180,
    objectif: 'prise_masse',
    niveau: 'intermediaire',
    frequence: 4,
    focus: ['bras', 'fesses', 'jambes'],
    preferences: {
      dureeSeance: 60,
      equipement: ['haltères', 'barre', 'rack'],
      restrictions: []
    },
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  const getObjectifLabel = (objectif: string) => {
    const labels = {
      'perte_poids': 'Perte de poids',
      'prise_masse': 'Prise de masse',
      'maintien': 'Maintien',
      'force': 'Force',
      'powerlifting': 'Powerlifting'
    };
    return labels[objectif as keyof typeof labels] || objectif;
  };

  const getNiveauLabel = (niveau: string) => {
    const labels = {
      'debutant': 'Débutant',
      'intermediaire': 'Intermédiaire',
      'avance': 'Avancé'
    };
    return labels[niveau as keyof typeof labels] || niveau;
  };

  const getFocusLabel = (focus: string) => {
    const labels = {
      'bras': 'Bras',
      'fesses': 'Fesses',
      'jambes': 'Jambes',
      'dos': 'Dos',
      'pectoraux': 'Pectoraux',
      'epaules': 'Épaules',
      'abdos': 'Abdominaux',
      'cardio': 'Cardio'
    };
    return labels[focus as keyof typeof labels] || focus;
  };

  const getFocusIcon = (focus: string) => {
    const icons = {
      'bras': Dumbbell,
      'fesses': Activity,
      'jambes': Activity,
      'dos': Dumbbell,
      'pectoraux': Heart,
      'epaules': Dumbbell,
      'abdos': Activity,
      'cardio': Heart
    };
    return icons[focus as keyof typeof icons] || Dumbbell;
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header avec avatar et bouton modifier */}
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{profile.nom}</h1>
                  <p className="text-white/80 text-lg">{getObjectifLabel(profile.objectif)} • {getNiveauLabel(profile.niveau)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-white/20 text-white border-white/30">
                      {profile.frequence} jours/semaine
                    </Badge>
                    <Badge className="bg-white/20 text-white border-white/30">
                      {profile.preferences.dureeSeance} min/séance
                    </Badge>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-6 py-3 rounded-xl shadow-lg"
              >
                <Edit className="w-5 h-5 mr-2" />
                Modifier le profil
              </Button>
            </div>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Weight className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-blue-900">{profile.poids} kg</p>
              <p className="text-blue-700 font-medium">Poids</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Ruler className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-green-900">{profile.taille} cm</p>
              <p className="text-green-700 font-medium">Taille</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-purple-900">
                {(profile.poids / ((profile.taille / 100) ** 2)).toFixed(1)}
              </p>
              <p className="text-purple-700 font-medium">IMC</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-orange-900">{profile.age}</p>
              <p className="text-orange-700 font-medium">Ans</p>
            </CardContent>
          </Card>
        </div>

        {/* Informations détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations personnelles */}
          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
              <CardTitle className="text-xl font-bold text-black flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-lg font-semibold text-black">{profile.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Membre depuis</p>
                    <p className="text-lg font-semibold text-black">
                      {profile.createdAt.toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Objectif et niveau */}
          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200">
              <CardTitle className="text-xl font-bold text-black flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                Objectif et niveau
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="text-center">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-base px-4 py-2 mb-2">
                    {getObjectifLabel(profile.objectif)}
                  </Badge>
                  <p className="text-sm text-gray-600">Objectif principal</p>
                </div>
                
                <div className="text-center">
                  <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-base px-4 py-2 mb-2">
                    {getNiveauLabel(profile.niveau)}
                  </Badge>
                  <p className="text-sm text-gray-600">Niveau d'expérience</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Focus d'entraînement */}
        {profile.focus && profile.focus.length > 0 && (
          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200">
              <CardTitle className="text-xl font-bold text-black flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                Focus d'entraînement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {profile.focus.map((focus, index) => {
                  const Icon = getFocusIcon(focus);
                  return (
                    <div key={index} className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="font-semibold text-black">{getFocusLabel(focus)}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Focus Force */}
        {profile.focusForce && profile.focusForce.length > 0 && (
          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-gray-200">
              <CardTitle className="text-xl font-bold text-black flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                Focus Force/Powerlifting
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {profile.focusForce.map((focus, index) => (
                  <div key={index} className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-semibold text-black">{focus.replace('_', ' ').toUpperCase()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Préférences d'entraînement */}
        <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <CardTitle className="text-xl font-bold text-black flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              Préférences d'entraînement
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-black">{profile.frequence}</p>
                <p className="text-gray-600 font-medium">Jours/semaine</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-black">{profile.preferences.dureeSeance}</p>
                <p className="text-gray-600 font-medium">Minutes/séance</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <p className="text-lg font-bold text-black">{profile.preferences.equipement.length}</p>
                <p className="text-gray-600 font-medium">Équipements</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-medium text-gray-600 mb-2">Équipements disponibles :</p>
              <div className="flex flex-wrap gap-2">
                {profile.preferences.equipement.map((equip, index) => (
                  <Badge key={index} className="bg-gray-200 text-gray-800">
                    {equip}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de modification */}
      {isEditing && (
        <ProfileEditModal
          profile={profile}
          onSave={handleSaveProfile}
          onClose={() => setIsEditing(false)}
        />
      )}
    </PageLayout>
  );
};

export default ProfileSummary; 