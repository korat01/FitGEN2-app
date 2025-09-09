import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Target, Dumbbell, Calendar, Settings, Edit, Trophy, Zap, Activity, Heart, Clock, Star, Award, Flame } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import ProfileEditModal from '@/components/ProfileEditModal';
import { UserProfile } from '@/types/profile';

const ProfileSummary: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Données du profil (à remplacer par les vraies données)
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
    console.log('Profil mis à jour:', updatedProfile);
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
      'pecs': 'Pectoraux',
      'epaules': 'Épaules',
      'abdos': 'Abdominaux'
    };
    return labels[focus as keyof typeof labels] || focus;
  };

  const getObjectifColor = (objectif: string) => {
    const colors = {
      'perte_poids': 'from-red-500 to-pink-500',
      'prise_masse': 'from-green-500 to-emerald-500',
      'maintien': 'from-blue-500 to-cyan-500',
      'force': 'from-purple-500 to-violet-500',
      'powerlifting': 'from-orange-500 to-red-500'
    };
    return colors[objectif as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getNiveauColor = (niveau: string) => {
    const colors = {
      'debutant': 'from-green-500 to-emerald-500',
      'intermediaire': 'from-yellow-500 to-orange-500',
      'avance': 'from-red-500 to-pink-500'
    };
    return colors[niveau as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="space-y-8">
          {/* Header avec photo de profil et bouton de modification */}
          <div className="relative">
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 h-32 rounded-t-2xl"></div>
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                <div className="w-28 h-28 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <Button
                onClick={() => setIsEditModalOpen(true)}
                className="bg-white/90 backdrop-blur-sm text-black hover:bg-white shadow-lg border-0"
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier le profil
              </Button>
            </div>
          </div>

          {/* Informations principales */}
          <div className="pt-20 px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-black mb-2">{profile.nom}</h1>
                <p className="text-xl text-gray-600">{profile.email}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-black">{profile.age} ans</div>
                <div className="text-gray-600">{profile.poids} kg • {profile.taille} cm</div>
                <div className="text-sm text-gray-500">
                  IMC: {(profile.poids / ((profile.taille / 100) ** 2)).toFixed(1)}
                </div>
              </div>
            </div>

            {/* Stats rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Activity className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-black mb-1">4</div>
                  <div className="text-sm text-gray-600">Séances/semaine</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-black mb-1">12</div>
                  <div className="text-sm text-gray-600">Séances/mois</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-black mb-1">85%</div>
                  <div className="text-sm text-gray-600">Assiduité</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                <CardContent className="p-6 text-center">
                  <Flame className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-black mb-1">1,250</div>
                  <div className="text-sm text-gray-600">Calories/semaine</div>
                </CardContent>
              </Card>
            </div>

            {/* Objectifs et niveau */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Objectif principal
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Badge className={`text-white text-lg px-6 py-3 bg-gradient-to-r ${getObjectifColor(profile.objectif)}`}>
                      {getObjectifLabel(profile.objectif)}
                    </Badge>
                    <div className="mt-4 text-gray-600">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{profile.preferences.dureeSeance} minutes par séance</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{profile.frequence} jours par semaine</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Niveau d'entraînement
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Badge className={`text-white text-lg px-6 py-3 bg-gradient-to-r ${getNiveauColor(profile.niveau)}`}>
                      {getNiveauLabel(profile.niveau)}
                    </Badge>
                    <div className="mt-4 text-gray-600">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Dumbbell className="w-4 h-4" />
                        <span className="font-medium">Entraînement structuré</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Star className="w-4 h-4" />
                        <span className="font-medium">Progression continue</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Focus d'entraînement */}
            {profile.focus && profile.focus.length > 0 && (
              <Card className="bg-white shadow-lg border-0 mb-8">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Dumbbell className="w-5 h-5" />
                    Focus d'entraînement
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <p className="text-gray-600 mb-4">Zones musculaires prioritaires pour votre objectif</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {profile.focus.map((focus) => (
                        <Badge key={focus} className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg px-6 py-3">
                          {getFocusLabel(focus)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Équipement et préférences */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-lg">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Équipement et préférences
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-3">Équipement disponible</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.preferences.equipement.map((equip) => (
                        <Badge key={equip} variant="outline" className="text-black border-gray-300 px-4 py-2">
                          {equip}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-3">Restrictions</h4>
                    <div className="text-gray-600">
                      {profile.preferences.restrictions.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {profile.preferences.restrictions.map((restriction) => (
                            <Badge key={restriction} variant="outline" className="text-black border-gray-300 px-4 py-2">
                              {restriction}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span>Aucune restriction</span>
                      )}
                    </div>
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
      </div>
    </PageLayout>
  );
};

export default ProfileSummary; 