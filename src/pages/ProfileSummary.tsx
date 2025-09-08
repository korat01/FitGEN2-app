import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Target, 
  Calendar, 
  Clock,
  Dumbbell,
  Save,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileSummary = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    age: 28,
    weight: 75,
    height: 180,
    goal: 'Perte de poids',
    experience: 'Intermédiaire',
    selectedDays: ['Lundi', 'Mercredi', 'Vendredi'],
    workoutDuration: 75,
    preferredTime: '18:00'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const goals = ['Perte de poids', 'Prise de masse', 'Maintien', 'Performance'];
  const experienceLevels = ['Débutant', 'Intermédiaire', 'Avancé'];

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setProfile(editedProfile);
      setIsEditing(false);
      setIsSaving(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleDayToggle = (day: string) => {
    if (editedProfile.selectedDays.includes(day)) {
      setEditedProfile({
        ...editedProfile,
        selectedDays: editedProfile.selectedDays.filter(d => d !== day)
      });
    } else {
      setEditedProfile({
        ...editedProfile,
        selectedDays: [...editedProfile.selectedDays, day]
      });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedProfile({
      ...editedProfile,
      [field]: value
    });
  };

  return (
    <PageLayout
      title="Profil utilisateur"
      subtitle="Personnalisez votre expérience d'entraînement"
      icon={<User className="h-6 w-6 text-blue-600" />}
      actions={
        !isEditing ? (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleEdit}
            className="border-2 border-slate-300 hover:border-slate-400"
          >
            Modifier le profil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCancel}
              className="border-2 border-slate-300 hover:border-slate-400"
            >
              Annuler
            </Button>
            <Button 
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </>
              )}
            </Button>
          </div>
        )
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informations personnelles */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800 text-2xl">
              <div className="bg-blue-100 rounded-full p-2">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editedProfile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-slate-800 font-medium mt-1">{profile.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="age">Âge</Label>
                  {isEditing ? (
                    <Input
                      id="age"
                      type="number"
                      value={editedProfile.age}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-slate-800 font-medium mt-1">{profile.age} ans</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Poids (kg)</Label>
                  {isEditing ? (
                    <Input
                      id="weight"
                      type="number"
                      value={editedProfile.weight}
                      onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-slate-800 font-medium mt-1">{profile.weight} kg</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="height">Taille (cm)</Label>
                  {isEditing ? (
                    <Input
                      id="height"
                      type="number"
                      value={editedProfile.height}
                      onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-slate-800 font-medium mt-1">{profile.height} cm</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Objectifs et préférences */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800 text-2xl">
              <div className="bg-emerald-100 rounded-full p-2">
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              Objectifs et préférences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="goal">Objectif</Label>
                {isEditing ? (
                  <select
                    id="goal"
                    value={editedProfile.goal}
                    onChange={(e) => handleInputChange('goal', e.target.value)}
                    className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {goals.map(goal => (
                      <option key={goal} value={goal}>{goal}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-slate-800 font-medium mt-1">{profile.goal}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="experience">Niveau d'expérience</Label>
                {isEditing ? (
                  <select
                    id="experience"
                    value={editedProfile.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-slate-800 font-medium mt-1">{profile.experience}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="duration">Durée d'entraînement (min)</Label>
                {isEditing ? (
                  <Input
                    id="duration"
                    type="number"
                    value={editedProfile.workoutDuration}
                    onChange={(e) => handleInputChange('workoutDuration', parseInt(e.target.value))}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-slate-800 font-medium mt-1">{profile.workoutDuration} minutes</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jours d'entraînement */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800 text-2xl">
              <div className="bg-violet-100 rounded-full p-2">
                <Calendar className="h-6 w-6 text-violet-600" />
              </div>
              Jours d'entraînement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-slate-600">
                Sélectionnez les jours où vous souhaitez vous entraîner. Les autres jours seront des jours de repos.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {days.map(day => {
                  const isSelected = isEditing 
                    ? editedProfile.selectedDays.includes(day)
                    : profile.selectedDays.includes(day);
                  
                  return (
                    <Button
                      key={day}
                      variant={isSelected ? "default" : "outline"}
                      className={`h-16 flex flex-col items-center justify-center gap-1 ${
                        isSelected 
                          ? 'bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white' 
                          : 'border-2 border-slate-300 hover:border-slate-400'
                      }`}
                      onClick={isEditing ? () => handleDayToggle(day) : undefined}
                      disabled={!isEditing}
                    >
                      <span className="text-sm font-medium">{day}</span>
                      {isSelected && (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </Button>
                  );
                })}
              </div>
              
              {isEditing && (
                <div className="text-sm text-slate-600">
                  <p>Jours sélectionnés : {editedProfile.selectedDays.length}</p>
                  <p>Jours de repos : {7 - editedProfile.selectedDays.length}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ProfileSummary; 