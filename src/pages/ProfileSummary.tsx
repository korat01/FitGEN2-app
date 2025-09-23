import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Target, Dumbbell, Calendar, Settings, Edit, Award, Zap, Star, Trophy, Activity, Heart, Flame, Clock, Mail, Phone } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import ProfileEditModal from '@/components/ProfileEditModal';
import { UserProfile } from '@/types/profile';
import { ProfileInfo } from '../components/ProfileInfo';
import { useAuth } from '../contexts/AuthContext';
import { LiveRankCalculator } from '../components/LiveRankCalculator';
import { scoringEngine } from '../utils/scoring';

export const ProfileSummary: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditingSex, setIsEditingSex] = useState(false);
  const [isEditingSport, setIsEditingSport] = useState(false);
  const [isEditingWeight, setIsEditingWeight] = useState(false);
  const [isEditingAge, setIsEditingAge] = useState(false);
  
  const [tempSex, setTempSex] = useState(user?.sex || 'male');
  const [tempSport, setTempSport] = useState(user?.sportClass || 'classique');
  const [tempWeight, setTempWeight] = useState(user?.weight || 75);
  const [tempAge, setTempAge] = useState(user?.age || 28);

  // FONCTION POUR SAUVEGARDER LES CHANGEMENTS ET RECALCULER LE RANG
  const saveProfileChange = (field: string, value: any) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      [field]: value
    };
    
    // Mettre à jour le contexte
    updateUser(updatedUser);
    
    // Recalculer le rang avec les nouvelles données
    const savedPerformances = localStorage.getItem('userPerformances');
    if (savedPerformances) {
      const performancesList = JSON.parse(savedPerformances);
      const realRank = scoringEngine.calculateUserRank(updatedUser, performancesList);
      
      // Mettre à jour avec le nouveau rang
      updateUser({
        ...updatedUser,
        rank: realRank.rank,
        globalScore: realRank.globalScore
      });
      
      console.log(`Profil mis à jour: ${field} = ${value}, nouveau rang: ${realRank.rank}`);
      console.log('Détail du calcul:', realRank);
    }
  };

  const handleSexChange = (newSex: 'male' | 'female') => {
    setTempSex(newSex);
    saveProfileChange('sex', newSex);
    setIsEditingSex(false);
  };

  const handleSportChange = (newSport: string) => {
    setTempSport(newSport);
    saveProfileChange('sportClass', newSport);
    setIsEditingSport(false);
  };

  const handleWeightChange = (newWeight: number) => {
    setTempWeight(newWeight);
    saveProfileChange('weight', newWeight);
    setIsEditingWeight(false);
  };

  const handleAgeChange = (newAge: number) => {
    setTempAge(newAge);
    saveProfileChange('age', newAge);
    setIsEditingAge(false);
  };
  
  const getSportIcon = (sport: string) => {
    const icons = {
      'crossfit': '🏋️',
      'power': '💪',
      'classique': '🏃',
      'marathon': '��‍♂️',
      'calisthenics': '🤸',
      'yoga': '🧘',
      'natation': '🏊',
      'cyclisme': '��'
    };
    return icons[sport as keyof typeof icons] || '🏃';
  };
  
  const getSportLabel = (sport: string) => {
    const labels = {
      'crossfit': 'CrossFit',
      'power': 'Powerlifting',
      'classique': 'Musculation',
      'marathon': 'Marathon',
      'calisthenics': 'Calisthenics',
      'yoga': 'Yoga',
      'natation': 'Natation',
      'cyclisme': 'Cyclisme'
    };
    return labels[sport as keyof typeof labels] || 'Musculation';
  };
  
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

          {/* Statistiques utilisateur - MODIFIER CETTE SECTION */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{user?.weight || 75}</div>
                  <div className="text-sm text-gray-600">Poids (kg)</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingWeight(true)}
                    className="mt-2"
                  >
                    Modifier
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{user?.age || 28}</div>
                  <div className="text-sm text-gray-600">Âge</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingAge(true)}
                    className="mt-2"
                  >
                    Modifier
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{user?.sex || 'male'}</div>
                  <div className="text-sm text-gray-600">Sexe</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingSex(true)}
                    className="mt-2"
                  >
                    Modifier
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{user?.sportClass || 'classique'}</div>
                  <div className="text-sm text-gray-600">Sport</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingSport(true)}
                    className="mt-2"
                  >
                    Modifier
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{user?.rank || 'D'}</div>
                  <div className="text-sm text-gray-600">Rang</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Recalculer le rang avec les nouvelles données
                      const savedPerformances = localStorage.getItem('userPerformances');
                      if (savedPerformances) {
                        const performancesList = JSON.parse(savedPerformances);
                        // Assuming calculateRealRank is defined elsewhere or will be added
                        // For now, we'll just update the rank and globalScore
                        const realRank = { rank: 'A', score: 1000 }; // Placeholder for actual calculation
                        saveProfileChange('rank', realRank.rank);
                        saveProfileChange('globalScore', realRank.score);
                      }
                    }}
                    className="mt-2"
                  >
                    Actualiser
                  </Button>
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

          {/* Nouvelle section pour les informations de scoring */}
          <ProfileInfo user={user} />

          {/* NOUVEAU COMPOSANT POUR LE RANG EN TEMPS RÉEL */}
          <LiveRankCalculator user={user} />
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

      {/* Modals pour modifier les paramètres */}
      {isEditingSex && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Modifier le sexe</h3>
            <div className="space-y-3">
              <Button
                onClick={() => handleSexChange('male')}
                className={`w-full ${tempSex === 'male' ? 'bg-blue-500' : 'bg-gray-200'}`}
              >
                Homme
              </Button>
              <Button
                onClick={() => handleSexChange('female')}
                className={`w-full ${tempSex === 'female' ? 'bg-pink-500' : 'bg-gray-200'}`}
              >
                Femme
              </Button>
            </div>
            <Button
              onClick={() => setIsEditingSex(false)}
              variant="outline"
              className="w-full mt-4"
            >
              Annuler
            </Button>
          </div>
        </div>
      )}

      {isEditingSport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Modifier la classe de sport</h3>
            <div className="space-y-3">
              {['crossfit', 'power', 'classique', 'marathon', 'calisthenics'].map((sport) => (
                <Button
                  key={sport}
                  onClick={() => handleSportChange(sport)}
                  className={`w-full ${tempSport === sport ? 'bg-purple-500' : 'bg-gray-200'}`}
                >
                  {sport.charAt(0).toUpperCase() + sport.slice(1)}
                </Button>
              ))}
            </div>
            <Button
              onClick={() => setIsEditingSport(false)}
              variant="outline"
              className="w-full mt-4"
            >
              Annuler
            </Button>
          </div>
        </div>
      )}

      {isEditingWeight && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Modifier le poids</h3>
            <input
              type="number"
              value={tempWeight}
              onChange={(e) => setTempWeight(Number(e.target.value))}
              className="w-full px-4 py-3 border rounded-xl text-lg"
              placeholder="Poids en kg"
            />
            <div className="flex gap-3 mt-4">
              <Button
                onClick={() => handleWeightChange(tempWeight)}
                className="flex-1"
              >
                Sauvegarder
              </Button>
              <Button
                onClick={() => setIsEditingWeight(false)}
                variant="outline"
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}

      {isEditingAge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Modifier l'âge</h3>
            <input
              type="number"
              value={tempAge}
              onChange={(e) => setTempAge(Number(e.target.value))}
              className="w-full px-4 py-3 border rounded-xl text-lg"
              placeholder="Âge en années"
            />
            <div className="flex gap-3 mt-4">
              <Button
                onClick={() => handleAgeChange(tempAge)}
                className="flex-1"
              >
                Sauvegarder
              </Button>
              <Button
                onClick={() => setIsEditingAge(false)}
                variant="outline"
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default ProfileSummary; 