import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Target, Dumbbell, Calendar, Settings, Edit, Award, Zap, Star, Trophy, Activity, Heart, Flame, Clock, Mail, Phone } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import ProfileEditModal from '@/components/ProfileEditModal';
import { UserProfile } from '@/types/profile';

const ProfileSummary: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Profil utilisateur par défaut
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
    focus: ['fesses', 'bras'],
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
      'abdos': 'Abdominaux'
    };
    return labels[focus as keyof typeof labels] || focus;
  };

  const getForceFocusLabel = (focus: string) => {
    const labels = {
      'squat': 'Squat',
      'deadlift': 'Deadlift',
      'bench_press': 'Bench Press'
    };
    return labels[focus as keyof typeof labels] || focus;
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Header principal */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{profile.nom}</h1>
                    <div className="flex items-center gap-2 mb-3">
                      <Mail className="w-4 h-4 text-white/80" />
                      <p className="text-white/90 text-lg">{profile.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-semibold">
                        {getObjectifLabel(profile.objectif)}
                      </Badge>
                      <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-semibold">
                        {getNiveauLabel(profile.niveau)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-6 py-3 text-base font-semibold backdrop-blur-sm"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Modifier le profil
                </Button>
              </div>
            </div>
          </div>

          {/* Stats principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Âge</p>
                    <p className="text-3xl font-bold text-gray-900">{profile.age} ans</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Poids</p>
                    <p className="text-3xl font-bold text-gray-900">{profile.poids} kg</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Taille</p>
                    <p className="text-3xl font-bold text-gray-900">{profile.taille} cm</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Fréquence</p>
                    <p className="text-3xl font-bold text-gray-900">{profile.frequence}/semaine</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal en 2 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Colonne gauche */}
            <div className="space-y-6">
              {/* Focus musculation */}
              {profile.focus && profile.focus.length > 0 && (
                <Card className="bg-white border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <Dumbbell className="w-6 h-6 text-purple-600" />
                      Focus Musculation
                    </CardTitle>
                    <p className="text-gray-600 text-sm">Zones prioritaires pour votre développement musculaire</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-3">
                      {profile.focus.map((focus, index) => (
                        <Badge 
                          key={index} 
                          className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-2 text-sm font-semibold"
                        >
                          {getFocusLabel(focus)}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Focus force/powerlifting */}
              {profile.focusForce && profile.focusForce.length > 0 && (
                <Card className="bg-white border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <Award className="w-6 h-6 text-orange-600" />
                      Focus Force/Powerlifting
                    </CardTitle>
                    <p className="text-gray-600 text-sm">Exercices prioritaires pour votre développement de force</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-3">
                      {profile.focusForce.map((focus, index) => (
                        <Badge 
                          key={index} 
                          className="bg-orange-100 text-orange-800 border-orange-200 px-4 py-2 text-sm font-semibold"
                        >
                          {getForceFocusLabel(focus)}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Colonne droite */}
            <div className="space-y-6">
              {/* Préférences d'entraînement */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <Settings className="w-6 h-6 text-green-600" />
                    Préférences d'entraînement
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Durée des séances</p>
                      <p className="text-2xl font-bold text-gray-900">{profile.preferences.dureeSeance} minutes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Fréquence d'entraînement</p>
                      <p className="text-2xl font-bold text-gray-900">{profile.frequence} jours/semaine</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Équipement */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <Dumbbell className="w-6 h-6 text-indigo-600" />
                    Équipement disponible
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {profile.preferences.equipement.map((equip, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="bg-white text-gray-700 border-gray-300 px-3 py-2 text-sm font-medium"
                      >
                        {equip}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Progression */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-indigo-600" />
                Progression et objectifs
              </CardTitle>
              <p className="text-gray-600 text-sm">Votre progression actuelle et vos objectifs</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-600">Niveau actuel</span>
                    <span className="text-lg font-bold text-gray-900">{getNiveauLabel(profile.niveau)}</span>
                  </div>
                  <Progress 
                    value={profile.niveau === 'debutant' ? 33 : profile.niveau === 'intermediaire' ? 66 : 100} 
                    className="h-3 bg-gray-200" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-600">Objectif</span>
                    <span className="text-lg font-bold text-gray-900">{getObjectifLabel(profile.objectif)}</span>
                  </div>
                  <Progress value={75} className="h-3 bg-gray-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de modification */}
      {isEditModalOpen && (
        <ProfileEditModal
          profile={profile}
          onSave={handleSaveProfile}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </PageLayout>
  );
};

export default ProfileSummary; 