import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../contexts/AuthContext';
import { scoringEngine } from '../utils/scoring';
import { 
  User, Edit, Save, X, Weight, Calendar, Users, Trophy, Mail, Phone, MapPin, 
  Target, Activity, Zap, Heart, Dumbbell, 
  ChevronRight, Star, TrendingUp, Award, Crown, Shield, Flame, AlertTriangle, 
  CheckCircle, ArrowUp, ArrowDown, Minus, Plus, Focus, UserCheck, Zap as Lightning,
  Clock, Timer
} from 'lucide-react';

export const ProfileSummary: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingSex, setIsEditingSex] = useState(false);
  const [isEditingSport, setIsEditingSport] = useState(false);
  const [isEditingWeight, setIsEditingWeight] = useState(false);
  const [isEditingAge, setIsEditingAge] = useState(false);
  const [isEditingHeight, setIsEditingHeight] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [isEditingTrainingDays, setIsEditingTrainingDays] = useState(false);
  const [isEditingTrainingTime, setIsEditingTrainingTime] = useState(false);

  // États pour les groupes musculaires
  const [isEditingMuscleGroup, setIsEditingMuscleGroup] = useState<string | null>(null);
  const [tempMuscleLevel, setTempMuscleLevel] = useState<string>('');

  const [tempName, setTempName] = useState(user?.name || '');
  const [tempEmail, setTempEmail] = useState(user?.email || '');
  const [tempPhone, setTempPhone] = useState(user?.phone || '');
  const [tempLocation, setTempLocation] = useState(user?.location || '');
  const [tempSex, setTempSex] = useState(user?.sex || 'male');
  const [tempSport, setTempSport] = useState(user?.sportClass || 'classique');
  const [tempWeight, setTempWeight] = useState(user?.weight || 75);
  const [tempAge, setTempAge] = useState(user?.age || 25);
  const [tempHeight, setTempHeight] = useState(user?.height || 175);
  const [tempGoal, setTempGoal] = useState(user?.goal || 'performance');
  const [tempTrainingDays, setTempTrainingDays] = useState(user?.trainingDays || []);
  const [tempTrainingTime, setTempTrainingTime] = useState(user?.trainingMonths || 3);

  // Recalculer le rang quand les données changent
  useEffect(() => {
    if (user) {
      const savedPerformances = localStorage.getItem('userPerformances');
      if (savedPerformances) {
        try {
          const performancesList = JSON.parse(savedPerformances);
          const realRank = scoringEngine.calculateUserRank(user, performancesList);
          updateUser({ rank: realRank.rank, globalScore: realRank.globalScore });
        } catch (error) {
          console.error('Erreur lors du calcul du rang:', error);
        }
      }
    }
  }, [user, updateUser]);

  const handleFieldChange = (field: string, value: any) => {
    if (!user) return;
    
    const updatedUser = { ...user, [field]: value };
    updateUser(updatedUser);
    
    // Recalculer le rang pour les champs qui l'affectent
    if (['weight', 'age', 'sex', 'sportClass'].includes(field)) {
      const savedPerformances = localStorage.getItem('userPerformances');
      if (savedPerformances) {
        try {
          const performancesList = JSON.parse(savedPerformances);
          const realRank = scoringEngine.calculateUserRank(updatedUser, performancesList);
          updateUser({ rank: realRank.rank, globalScore: realRank.globalScore });
        } catch (error) {
          console.error('Erreur lors du recalcul du rang:', error);
        }
      }
    }
  };

  const handleMuscleGroupChange = (muscleGroup: string, level: string) => {
    if (!user) return;
    
    const updatedUser = { ...user, [`muscleGroup_${muscleGroup}`]: level };
    updateUser(updatedUser);
    setIsEditingMuscleGroup(null);
  };

  const handleTrainingDaysChange = (day: string) => {
    if (!user) return;
    
    const updatedDays = tempTrainingDays.includes(day)
      ? tempTrainingDays.filter(d => d !== day)
      : [...tempTrainingDays, day];
    
    setTempTrainingDays(updatedDays);
  };

  const handleTrainingTimeChange = (months: number) => {
    setTempTrainingTime(months);
  };

  const saveTrainingDays = () => {
    if (!user) return;
    updateUser({ trainingDays: tempTrainingDays });
    setIsEditingTrainingDays(false);
  };

  const saveTrainingTime = () => {
    if (!user) return;
    updateUser({ trainingMonths: tempTrainingTime });
    setIsEditingTrainingTime(false);
  };

  const cancelTrainingDays = () => {
    setTempTrainingDays(user?.trainingDays || []);
    setIsEditingTrainingDays(false);
  };

  const cancelTrainingTime = () => {
    setTempTrainingTime(user?.trainingMonths || 3);
    setIsEditingTrainingTime(false);
  };

  const renderEditableField = (
    label: string,
    value: any,
    isEditing: boolean,
    onEdit: () => void,
    onSave: () => void,
    onCancel: () => void,
    tempValue: any,
    setTempValue: (value: any) => void,
    type: 'text' | 'number' | 'select' = 'text',
    options?: { value: string; label: string }[],
    icon?: React.ReactNode,
    gradient?: string
  ) => {
  return (
      <div className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-lg ${gradient || 'surface-panel'} border border-white/10 hover:border-white/20`}>
        <div className="flex items-center gap-3 mb-3">
          {icon && <div className="text-muted-foreground">{icon}</div>}
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
                  </div>
        {isEditing ? (
                    <div className="flex items-center gap-3">
            {type === 'select' && options ? (
              <Select value={tempValue} onValueChange={setTempValue}>
                <SelectTrigger className="flex-1 h-12 glass-card border-primary/20 border-2 border-white/15 focus:border-blue-500 focus:ring-2 focus:ring-primary/30 transition-all duration-200 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-card border-primary/20 bg-white/10 backdrop-blur-sm border-0 shadow-xl rounded-xl">
                  {options.map(option => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="hover:bg-blue-500/10 focus:bg-blue-500/10 transition-colors duration-200"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={type}
                value={tempValue}
                onChange={(e) => setTempValue(type === 'number' ? Number(e.target.value) : e.target.value)}
                className="flex-1 h-12 glass-card border-primary/20 border-2 border-white/15 focus:border-blue-500 focus:ring-2 focus:ring-primary/30 transition-all duration-200 rounded-xl text-lg font-semibold"
                autoFocus
              />
            )}
            <Button
              size="sm"
              onClick={onSave}
              className="h-12 w-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 rounded-xl"
            >
              <Save className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onCancel}
              className="h-12 w-12 border-2 border-white/15 hover:border-red-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 hover:scale-105 rounded-xl"
            >
              <X className="w-4 h-4" />
            </Button>
                    </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-foreground">{value}</div>
                <Button 
              size="sm"
              variant="outline"
              onClick={onEdit}
              className="h-10 w-10 border-2 border-white/15 hover:border-blue-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-200 hover:scale-105 rounded-xl"
            >
              <Edit className="w-4 h-4" />
                </Button>
              </div>
        )}
            </div>
    );
  };

  // Mémoriser les groupes musculaires pour éviter les recalculs
  const muscleGroups = useMemo(() => [
    { 
      name: 'Bras', 
      key: 'bras',
      icon: <UserCheck className="w-6 h-6" />, 
      color: 'from-red-500 to-pink-500', 
      bgColor: 'from-red-500/10 to-pink-500/10', 
      borderColor: 'border-red-500/30', 
      textColor: 'text-red-400',
      level: user?.[`muscleGroup_bras`] || 'Débutant'
    },
    { 
      name: 'Épaules', 
      key: 'epaules',
      icon: <Users className="w-6 h-6" />, 
      color: 'from-blue-500 to-cyan-500', 
      bgColor: 'from-blue-500/10 to-cyan-500/10', 
      borderColor: 'border-blue-500/30', 
      textColor: 'text-blue-400',
      level: user?.[`muscleGroup_epaules`] || 'Débutant'
    },
    { 
      name: 'Poitrine', 
      key: 'poitrine',
      icon: <Heart className="w-6 h-6" />, 
      color: 'from-green-500 to-emerald-500', 
      bgColor: 'from-green-500/10 to-emerald-500/10', 
      borderColor: 'border-green-500/30', 
      textColor: 'text-green-400',
      level: user?.[`muscleGroup_poitrine`] || 'Débutant'
    },
    { 
      name: 'Dos', 
      key: 'dos',
      icon: <Users className="w-6 h-6" />, 
      color: 'from-purple-500 to-violet-500', 
      bgColor: 'from-purple-500/10 to-violet-500/10', 
      borderColor: 'border-purple-500/30', 
      textColor: 'text-purple-400',
      level: user?.[`muscleGroup_dos`] || 'Débutant'
    },
    { 
      name: 'Jambes', 
      key: 'jambes',
      icon: <Activity className="w-6 h-6" />, 
      color: 'from-orange-500 to-yellow-500', 
      bgColor: 'from-orange-500/10 to-yellow-500/10', 
      borderColor: 'border-orange-500/30', 
      textColor: 'text-orange-400',
      level: user?.[`muscleGroup_jambes`] || 'Débutant'
    },
    { 
      name: 'Fesses', 
      key: 'fesses',
      icon: <Activity className="w-6 h-6" />, 
      color: 'from-pink-500 to-rose-500', 
      bgColor: 'from-pink-500/10 to-rose-500/10', 
      borderColor: 'border-pink-500/30', 
      textColor: 'text-pink-400',
      level: user?.[`muscleGroup_fesses`] || 'Débutant'
    },
    { 
      name: 'Abdominaux', 
      key: 'abdominaux',
      icon: <Activity className="w-6 h-6" />, 
      color: 'from-indigo-500 to-blue-500', 
      bgColor: 'from-indigo-500/10 to-blue-500/10', 
      borderColor: 'border-indigo-500/30', 
      textColor: 'text-secondary',
      level: user?.[`muscleGroup_abdominaux`] || 'Débutant'
    }
  ], [user]);

  const levelOptions = [
    { value: 'Débutant', label: 'Débutant' },
    { value: 'Intermédiaire', label: 'Intermédiaire' },
    { value: 'Avancé', label: 'Avancé' },
    { value: 'Expert', label: 'Expert' }
  ];

  const daysOfWeek = [
    { key: 'lundi', label: 'Lundi', icon: '📅' },
    { key: 'mardi', label: 'Mardi', icon: '🌟' },
    { key: 'mercredi', label: 'Mercredi', icon: '📅' },
    { key: 'jeudi', label: 'Jeudi', icon: '🌟' },
    { key: 'vendredi', label: 'Vendredi', icon: '📅' },
    { key: 'samedi', label: 'Samedi', icon: '🌟' },
    { key: 'dimanche', label: 'Dimanche', icon: '🌟' }
  ];

  const timeOptions = [
    { value: 1, label: '1 mois' },
    { value: 2, label: '2 mois' },
    { value: 3, label: '3 mois' },
    { value: 6, label: '6 mois' },
    { value: 9, label: '9 mois' },
    { value: 12, label: '12 mois' },
    { value: 18, label: '18 mois' },
    { value: 24, label: '24 mois' }
  ];

  // Mémoriser les focus pour éviter les recalculs constants
  const focusAreas = useMemo(() => {
    const focusAreas = [];
    
    muscleGroups.forEach(muscle => {
      const level = muscle.level;
      if (level === 'Débutant') {
        focusAreas.push({
          ...muscle,
          priority: 'high',
          reason: 'Niveau débutant - Priorité haute',
          icon: <AlertTriangle className="w-5 h-5" />,
          color: 'from-red-500 to-pink-500',
          bgColor: 'from-red-500/10 to-pink-500/10'
        });
      } else if (level === 'Intermédiaire') {
        focusAreas.push({
          ...muscle,
          priority: 'medium',
          reason: 'Niveau intermédiaire - À améliorer',
          icon: <ArrowUp className="w-5 h-5" />,
          color: 'from-yellow-500 to-orange-500',
          bgColor: 'from-yellow-500/10 to-orange-500/10'
        });
      }
    });

    // Ajouter des focus basés sur le sport (seulement si pas déjà présent)
    if (user?.sportClass === 'power') {
      const hasForceFocus = focusAreas.some(focus => focus.name === 'Force maximale');
      if (!hasForceFocus) {
        focusAreas.push({
          name: 'Force maximale',
          key: 'force_max',
          icon: <Dumbbell className="w-6 h-6" />,
          color: 'from-purple-500 to-violet-500',
          bgColor: 'from-purple-500/10 to-violet-500/10',
          priority: 'high',
          reason: 'Powerlifter - Développer la force maximale',
          // Correction : ne pas dupliquer la propriété icon, elle est déjà définie plus haut
        });
      }
    } else if (user?.sportClass === 'marathon') {
      const hasEnduranceFocus = focusAreas.some(focus => focus.name === 'Endurance');
      if (!hasEnduranceFocus) {
        focusAreas.push({
          name: 'Endurance',
          key: 'endurance',
          icon: <Activity className="w-6 h-6" />,
          color: 'from-blue-500 to-cyan-500',
          bgColor: 'from-blue-500/10 to-cyan-500/10',
          priority: 'high',
          reason: 'Marathonien - Améliorer l\'endurance',
          // Correction : ne pas dupliquer la propriété icon, elle est déjà définie plus haut
        });
      }
    }

    return focusAreas.sort((a, b) => {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }, [muscleGroups, user?.sportClass]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md glass-card border-primary/20">
          <CardContent className="p-8 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h2 className="text-xl font-semibold text-muted-foreground">Profil non trouvé</h2>
            <p className="text-muted-foreground mt-2">Veuillez vous connecter pour accéder à votre profil.</p>
          </CardContent>
        </Card>
          </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header Principal */}
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                      <Users className="w-8 h-8" />
                    </div>
                  <div>
                      <h1 className="text-4xl font-bold tracking-tight">
                        Profil de {user.name}
                      </h1>
                      <p className="text-white/90 text-lg mt-2">Gérez vos informations personnelles</p>
                  </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 text-white font-semibold shadow-lg backdrop-blur-sm">
                      <Trophy className="w-5 h-5" />
                      <span>Rang {user.rank || "D"}</span>
                </div>
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 text-white font-semibold shadow-lg backdrop-blur-sm">
                      <Flame className="w-5 h-5" />
                      <span>{user.globalScore || 0}/1000</span>
                    </div>
                  </div>
                </div>

                <div className="lg:text-right space-y-4">
                  <div className="text-white/90 font-medium">Score global</div>
                  <div className="text-4xl font-bold text-white">
                    {user.globalScore || 0}
                  </div>
                  <div className="text-sm text-white/80">
                    sur 1000 points
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Focus unifié */}
          <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <Focus className="w-6 h-6 text-white" />
                </div>
                Mes Zones de Focus
              </CardTitle>
              <p className="text-muted-foreground mt-2">Sélectionnez les zones que vous voulez travailler en priorité</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Groupes musculaires */}
                  <div>
                  <h4 className="text-lg font-semibold text-foreground/90 mb-4 flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-blue-500" />
                    Groupes Musculaires
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {muscleGroups.map((muscle, index) => {
                      const isSelected = user?.[`focus_${muscle.key}`] || false;
                      
                      return (
                        <div 
                          key={muscle.key}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                            isSelected 
                              ? `bg-gradient-to-r ${muscle.bgColor} border-${muscle.color.split(' ')[1]} shadow-lg` 
                              : 'bg-white/5 border-white/10 hover:border-white/15'
                          }`}
                          onClick={() => {
                            const updatedUser = { ...user, [`focus_${muscle.key}`]: !isSelected };
                            updateUser(updatedUser);
                          }}
                        >
                          <div className="flex flex-col items-center text-center space-y-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                              isSelected 
                                ? `bg-gradient-to-r ${muscle.color}` 
                                : 'bg-white/15 group-hover:bg-white/25'
                            }`}>
                              {muscle.icon}
                  </div>
                  <div>
                              <div className={`font-bold text-lg transition-colors ${
                                isSelected ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {muscle.name}
                  </div>
                </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              isSelected 
                                ? 'bg-success border-success'
                                : 'border-white/15 group-hover:border-white/30'
                            }`}>
                              {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Focus spécialisés par classe de sport */}
                  <div>
                  <h4 className="text-lg font-semibold text-foreground/90 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Focus Spécialisés - {user?.sportClass === 'power' ? 'Powerlifting' : 
                                       user?.sportClass === 'marathon' ? 'Marathon' :
                                       user?.sportClass === 'crossfit' ? 'Crossfit' :
                                       user?.sportClass === 'calisthenics' ? 'Calisthéniques' :
                                       user?.sportClass === 'streetlifting' ? 'Streetlifting' :
                                       user?.sportClass === 'sprint' ? 'Sprint' : 'Classique'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Tous les focus spécialisés par classe de sport */}
                    {/* Powerlifting */}
                    {user?.sportClass === 'power' && (
                      <>
                        <div 
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                            user?.focus_squat 
                              ? 'bg-gradient-to-r from-red-500/10 to-pink-500/10 border-red-500/40 shadow-lg' 
                              : 'bg-white/5 border-white/10 hover:border-white/15'
                          }`}
                          onClick={() => {
                            const updatedUser = { ...user, focus_squat: !user?.focus_squat };
                            updateUser(updatedUser);
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                              user?.focus_squat 
                                ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                                : 'bg-white/15 group-hover:bg-white/25'
                            }`}>
                              <Dumbbell className="w-6 h-6" />
                  </div>
                            <div className="flex-1">
                              <h5 className={`font-bold text-lg transition-colors ${
                                user?.focus_squat ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                Squat
                              </h5>
                              <p className={`text-sm transition-colors ${
                                user?.focus_squat ? 'text-muted-foreground' : 'text-muted-foreground'
                              }`}>
                                Force des jambes et du dos
                              </p>
                  </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              user?.focus_squat 
                                ? 'bg-success border-success'
                                : 'border-white/15 group-hover:border-white/30'
                            }`}>
                              {user?.focus_squat && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                          </div>
          </div>

                        <div 
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                            user?.focus_bench 
                              ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/40 shadow-lg' 
                              : 'bg-white/5 border-white/10 hover:border-white/15'
                          }`}
                          onClick={() => {
                            const updatedUser = { ...user, focus_bench: !user?.focus_bench };
                            updateUser(updatedUser);
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                              user?.focus_bench 
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                                : 'bg-white/15 group-hover:bg-white/25'
                            }`}>
                              <Dumbbell className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h5 className={`font-bold text-lg transition-colors ${
                                user?.focus_bench ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                Bench Press
                              </h5>
                              <p className={`text-sm transition-colors ${
                                user?.focus_bench ? 'text-muted-foreground' : 'text-muted-foreground'
                              }`}>
                                Force de la poitrine et des bras
                              </p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              user?.focus_bench 
                                ? 'bg-success border-success'
                                : 'border-white/15 group-hover:border-white/30'
                            }`}>
                              {user?.focus_bench && <CheckCircle className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                        </div>

                        <div 
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                            user?.focus_deadlift 
                              ? 'bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-purple-500/40 shadow-lg' 
                              : 'bg-white/5 border-white/10 hover:border-white/15'
                          }`}
                          onClick={() => {
                            const updatedUser = { ...user, focus_deadlift: !user?.focus_deadlift };
                            updateUser(updatedUser);
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                              user?.focus_deadlift 
                                ? 'bg-gradient-to-r from-purple-500 to-violet-500' 
                                : 'bg-white/15 group-hover:bg-white/25'
                            }`}>
                              <Dumbbell className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h5 className={`font-bold text-lg transition-colors ${
                                user?.focus_deadlift ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                Deadlift
                              </h5>
                              <p className={`text-sm transition-colors ${
                                user?.focus_deadlift ? 'text-muted-foreground' : 'text-muted-foreground'
                              }`}>
                                Force totale du corps
                              </p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              user?.focus_deadlift 
                                ? 'bg-success border-success'
                                : 'border-white/15 group-hover:border-white/30'
                            }`}>
                              {user?.focus_deadlift && <CheckCircle className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Marathon */}
                    {user?.sportClass === 'marathon' && (
                      <>
                        <div 
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                            user?.focus_endurance 
                              ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/40 shadow-lg' 
                              : 'bg-white/5 border-white/10 hover:border-white/15'
                          }`}
                          onClick={() => {
                            const updatedUser = { ...user, focus_endurance: !user?.focus_endurance };
                            updateUser(updatedUser);
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                              user?.focus_endurance 
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                                : 'bg-white/15 group-hover:bg-white/25'
                            }`}>
                              <Activity className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h5 className={`font-bold text-lg transition-colors ${
                                user?.focus_endurance ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                Endurance
                              </h5>
                              <p className={`text-sm transition-colors ${
                                user?.focus_endurance ? 'text-muted-foreground' : 'text-muted-foreground'
                              }`}>
                                Résistance sur longue distance
                              </p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              user?.focus_endurance 
                                ? 'bg-success border-success'
                                : 'border-white/15 group-hover:border-white/30'
                            }`}>
                              {user?.focus_endurance && <CheckCircle className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                        </div>

                        <div 
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                            user?.focus_vo2max 
                              ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/40 shadow-lg' 
                              : 'bg-white/5 border-white/10 hover:border-white/15'
                          }`}
                          onClick={() => {
                            const updatedUser = { ...user, focus_vo2max: !user?.focus_vo2max };
                            updateUser(updatedUser);
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                              user?.focus_vo2max 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                : 'bg-white/15 group-hover:bg-white/25'
                            }`}>
                              <Heart className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h5 className={`font-bold text-lg transition-colors ${
                                user?.focus_vo2max ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                VO2 Max
                              </h5>
                              <p className={`text-sm transition-colors ${
                                user?.focus_vo2max ? 'text-muted-foreground' : 'text-muted-foreground'
                              }`}>
                                Capacité aérobie maximale
                              </p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              user?.focus_vo2max 
                                ? 'bg-success border-success'
                                : 'border-white/15 group-hover:border-white/30'
                            }`}>
                              {user?.focus_vo2max && <CheckCircle className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                        </div>

                        <div 
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                            user?.focus_economie 
                              ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/40 shadow-lg' 
                              : 'bg-white/5 border-white/10 hover:border-white/15'
                          }`}
                          onClick={() => {
                            const updatedUser = { ...user, focus_economie: !user?.focus_economie };
                            updateUser(updatedUser);
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                              user?.focus_economie 
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                                : 'bg-white/15 group-hover:bg-white/25'
                            }`}>
                              <TrendingUp className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h5 className={`font-bold text-lg transition-colors ${
                                user?.focus_economie ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                Économie de Course
                              </h5>
                              <p className={`text-sm transition-colors ${
                                user?.focus_economie ? 'text-muted-foreground' : 'text-muted-foreground'
                              }`}>
                                Efficacité énergétique
                              </p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              user?.focus_economie 
                                ? 'bg-success border-success'
                                : 'border-white/15 group-hover:border-white/30'
                            }`}>
                              {user?.focus_economie && <CheckCircle className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Autres classes de sport... */}
                  </div>
                  </div>
                    </div>
                  </CardContent>
                </Card>

          {/* Niveau général */}
          <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                Niveau Général
                    </CardTitle>
              <p className="text-muted-foreground mt-2">Définissez votre niveau général d'entraînement</p>
                  </CardHeader>
            <CardContent>
              <div className="max-w-md">
                <label className="block text-sm font-medium text-foreground/90 mb-3">
                  Votre niveau d'entraînement
                </label>
                <Select 
                  value={user?.generalLevel || 'Débutant'} 
                  onValueChange={(value) => handleFieldChange('generalLevel', value)}
                >
                  <SelectTrigger className="w-full h-12 glass-card border-primary/20 border-2 border-white/15 focus:border-blue-500 focus:ring-2 focus:ring-primary/30 transition-all duration-200 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-primary/20 bg-white/10 backdrop-blur-sm border-0 shadow-xl rounded-xl">
                    {levelOptions.map(option => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="hover:bg-blue-500/10 focus:bg-blue-500/10 transition-colors duration-200"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  Ce niveau sera utilisé pour adapter les programmes d'entraînement
                </p>
                    </div>
                  </CardContent>
                </Card>

          {/* Jours d'entraînement */}
          <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                Jours d'Entraînement
                  </CardTitle>
              <p className="text-muted-foreground mt-2">Sélectionnez les jours où vous voulez vous entraîner</p>
                </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-foreground">
                    Jours sélectionnés : {user?.trainingDays?.length || 0}/7
                    </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingTrainingDays(true)}
                    className="border-2 border-white/15 hover:border-blue-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-200 hover:scale-105 rounded-xl"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                    </div>

                {isEditingTrainingDays ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {daysOfWeek.map((day) => {
                        const isSelected = tempTrainingDays.includes(day.key);
                        return (
                          <div
                            key={day.key}
                            className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                              isSelected 
                                ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/40 shadow-lg' 
                                : 'bg-white/5 border-white/10 hover:border-white/15'
                            }`}
                            onClick={() => handleTrainingDaysChange(day.key)}
                          >
                            <div className="flex flex-col items-center text-center space-y-2">
                              <div className="text-2xl">{day.icon}</div>
                              <div className={`font-bold text-lg transition-colors ${
                                isSelected ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {day.label}
                              </div>
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                isSelected 
                                  ? 'bg-blue-500/20 border-blue-500' 
                                  : 'border-white/15 group-hover:border-white/30'
                              }`}>
                                {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  
                    <div className="flex gap-3">
                      <Button
                        onClick={saveTrainingDays}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 rounded-xl"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </Button>
                      <Button
                        variant="outline"
                        onClick={cancelTrainingDays}
                        className="border-2 border-white/15 hover:border-red-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 hover:scale-105 rounded-xl"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Annuler
                      </Button>
                    </div>
                    </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {daysOfWeek.map((day) => {
                      const isSelected = user?.trainingDays?.includes(day.key) || false;
                      return (
                        <div
                          key={day.key}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                            isSelected 
                              ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/40 shadow-lg' 
                              : 'bg-white/5 border-white/10'
                          }`}
                        >
                          <div className="flex flex-col items-center text-center space-y-2">
                            <div className="text-2xl">{day.icon}</div>
                            <div className={`font-bold text-lg transition-colors ${
                              isSelected ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {day.label}
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              isSelected 
                                ? 'bg-blue-500/20 border-blue-500' 
                                : 'border-white/15'
                            }`}>
                              {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                  </div>
                </CardContent>
              </Card>

          {/* Durée d'entraînement */}
          <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <Timer className="w-6 h-6 text-white" />
                </div>
                Durée d'Entraînement
                  </CardTitle>
              <p className="text-muted-foreground mt-2">Combien de mois voulez-vous vous entraîner ?</p>
                </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-foreground">
                    Durée actuelle : {user?.trainingMonths || 3} mois
                  </div>
                  <Button
                        variant="outline" 
                    onClick={() => setIsEditingTrainingTime(true)}
                    className="border-2 border-white/15 hover:border-blue-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-200 hover:scale-105 rounded-xl"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                </div>

                {isEditingTrainingTime ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {timeOptions.map((option) => {
                        const isSelected = tempTrainingTime === option.value;
                        return (
                          <div
                            key={option.value}
                            className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                              isSelected 
                                ? 'bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-purple-500/40 shadow-lg' 
                                : 'bg-white/5 border-white/10 hover:border-white/15'
                            }`}
                            onClick={() => handleTrainingTimeChange(option.value)}
                          >
                            <div className="flex flex-col items-center text-center space-y-2">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                                isSelected 
                                  ? 'bg-gradient-to-r from-purple-500 to-violet-500' 
                                  : 'bg-white/15 group-hover:bg-white/25'
                              }`}>
                                <Timer className="w-6 h-6" />
                              </div>
                              <div className={`font-bold text-lg transition-colors ${
                                isSelected ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {option.label}
                              </div>
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                isSelected 
                                  ? 'bg-purple-500 border-purple-500' 
                                  : 'border-white/15 group-hover:border-white/30'
                              }`}>
                                {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={saveTrainingTime}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 rounded-xl"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </Button>
                      <Button
                        variant="outline"
                        onClick={cancelTrainingTime}
                        className="border-2 border-white/15 hover:border-red-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 hover:scale-105 rounded-xl"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Annuler
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {timeOptions.map((option) => {
                      const isSelected = (user?.trainingMonths || 3) === option.value;
                      return (
                        <div
                          key={option.value}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                            isSelected 
                              ? 'bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-purple-500/40 shadow-lg' 
                              : 'bg-white/5 border-white/10'
                          }`}
                        >
                          <div className="flex flex-col items-center text-center space-y-2">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                              isSelected 
                                ? 'bg-gradient-to-r from-purple-500 to-violet-500' 
                                : 'bg-white/15 group-hover:bg-white/25'
                            }`}>
                              <Timer className="w-6 h-6" />
                            </div>
                            <div className={`font-bold text-lg transition-colors ${
                              isSelected ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {option.label}
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              isSelected 
                                ? 'bg-purple-500 border-purple-500' 
                                : 'border-white/15'
                            }`}>
                              {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-4 p-4 bg-secondary/10 rounded-2xl border border-secondary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span className="font-semibold text-secondary">Planification</span>
                  </div>
                  <p className="text-sm text-secondary/90">
                    Vous vous entraînerez pendant <strong>{user?.trainingMonths || 3} mois</strong> sur 
                    <strong> {user?.trainingDays?.length || 0} jours par semaine</strong>
                  </p>
                </div>
                  </div>
                </CardContent>
              </Card>

          {/* Informations du profil */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informations personnelles */}
            <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
            </div>
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Nom */}
                {renderEditableField(
                  "Nom complet",
                  user.name || "Non défini",
                  isEditingName,
                  () => {
                    setTempName(user.name || '');
                    setIsEditingName(true);
                  },
                  () => {
                    handleFieldChange('name', tempName);
                    setIsEditingName(false);
                  },
                  () => setIsEditingName(false),
                  tempName,
                  setTempName,
                  'text',
                  undefined,
                  <Users className="w-5 h-5" />,
                  'bg-gradient-to-r from-blue-500/10 to-indigo-500/10'
                )}

                {/* Email */}
                {renderEditableField(
                  "Email",
                  user.email || "Non défini",
                  isEditingEmail,
                  () => {
                    setTempEmail(user.email || '');
                    setIsEditingEmail(true);
                  },
                  () => {
                    handleFieldChange('email', tempEmail);
                    setIsEditingEmail(false);
                  },
                  () => setIsEditingEmail(false),
                  tempEmail,
                  setTempEmail,
                  'text',
                  undefined,
                  <Mail className="w-5 h-5" />,
                  'bg-gradient-to-r from-green-500/10 to-emerald-500/10'
                )}

                {/* Téléphone */}
                {renderEditableField(
                  "Téléphone",
                  user.phone || "Non défini",
                  isEditingPhone,
                  () => {
                    setTempPhone(user.phone || '');
                    setIsEditingPhone(true);
                  },
                  () => {
                    handleFieldChange('phone', tempPhone);
                    setIsEditingPhone(false);
                  },
                  () => setIsEditingPhone(false),
                  tempPhone,
                  setTempPhone,
                  'text',
                  undefined,
                  <Phone className="w-5 h-5" />,
                  'surface-accent'
                )}

                {/* Localisation */}
                {renderEditableField(
                  "Localisation",
                  user.location || "Non défini",
                  isEditingLocation,
                  () => {
                    setTempLocation(user.location || '');
                    setIsEditingLocation(true);
                  },
                  () => {
                    handleFieldChange('location', tempLocation);
                    setIsEditingLocation(false);
                  },
                  () => setIsEditingLocation(false),
                  tempLocation,
                  setTempLocation,
                  'text',
                  undefined,
                  <MapPin className="w-5 h-5" />,
                  'bg-gradient-to-r from-yellow-500/10 to-orange-500/10'
                )}
              </CardContent>
            </Card>

            {/* Informations physiques */}
            <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                    <Weight className="w-6 h-6 text-white" />
          </div>
                  Informations physiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Poids */}
                {renderEditableField(
                  "Poids",
                  `${user.weight || 75} kg`,
                  isEditingWeight,
                  () => {
                    setTempWeight(user.weight || 75);
                    setIsEditingWeight(true);
                  },
                  () => {
                    handleFieldChange('weight', tempWeight);
                    setIsEditingWeight(false);
                  },
                  () => setIsEditingWeight(false),
                  tempWeight,
                  setTempWeight,
                  'number',
                  undefined,
                  <Weight className="w-5 h-5" />,
                  'bg-gradient-to-r from-red-500/10 to-pink-500/10'
                )}

                {/* Taille */}
                {renderEditableField(
                  "Taille",
                  `${user.height || 175} cm`,
                  isEditingHeight,
                  () => {
                    setTempHeight(user.height || 175);
                    setIsEditingHeight(true);
                  },
                  () => {
                    handleFieldChange('height', tempHeight);
                    setIsEditingHeight(false);
                  },
                  () => setIsEditingHeight(false),
                  tempHeight,
                  setTempHeight,
                  'number',
                  undefined,
                  <Activity className="w-5 h-5" />,
                  'bg-gradient-to-r from-indigo-500/10 to-purple-500/10'
                )}

                {/* Âge */}
                {renderEditableField(
                  "Âge",
                  `${user.age || 25} ans`,
                  isEditingAge,
                  () => {
                    setTempAge(user.age || 25);
                    setIsEditingAge(true);
                  },
                  () => {
                    handleFieldChange('age', tempAge);
                    setIsEditingAge(false);
                  },
                  () => setIsEditingAge(false),
                  tempAge,
                  setTempAge,
                  'number',
                  undefined,
                  <Calendar className="w-5 h-5" />,
                  'bg-gradient-to-r from-yellow-500/10 to-orange-500/10'
                )}

                {/* Sexe */}
                {renderEditableField(
                  "Sexe",
                  user.sex === 'male' ? 'Homme' : 'Femme',
                  isEditingSex,
                  () => {
                    setTempSex(user.sex || 'male');
                    setIsEditingSex(true);
                  },
                  () => {
                    handleFieldChange('sex', tempSex);
                    setIsEditingSex(false);
                  },
                  () => setIsEditingSex(false),
                  tempSex,
                  setTempSex,
                  'select',
                  [
                    { value: 'male', label: 'Homme' },
                    { value: 'female', label: 'Femme' }
                  ],
                  <Users className="w-5 h-5" />,
                  'bg-gradient-to-r from-cyan-500/10 to-blue-500/10'
                )}
              </CardContent>
            </Card>

            {/* Informations sportives */}
            <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  Informations sportives
              </CardTitle>
            </CardHeader>
              <CardContent className="space-y-4">
                {/* Classe de sport */}
                {renderEditableField(
                  "Classe de sport",
                  user.sportClass === 'power' ? 'Powerlifting' :
                  user.sportClass === 'marathon' ? 'Marathon' :
                  user.sportClass === 'crossfit' ? 'Crossfit' :
                  user.sportClass === 'calisthenics' ? 'Calisthéniques' :
                  user.sportClass === 'streetlifting' ? 'Streetlifting' :
                  user.sportClass === 'sprint' ? 'Sprint' :
                  'Classique',
                  isEditingSport,
                  () => {
                    setTempSport(user.sportClass || 'classique');
                    setIsEditingSport(true);
                  },
                  () => {
                    handleFieldChange('sportClass', tempSport);
                    setIsEditingSport(false);
                  },
                  () => setIsEditingSport(false),
                  tempSport,
                  setTempSport,
                  'select',
                  [
                    { value: 'power', label: 'Powerlifting' },
                    { value: 'marathon', label: 'Marathon' },
                    { value: 'crossfit', label: 'Crossfit' },
                    { value: 'calisthenics', label: 'Calisthéniques' },
                    { value: 'streetlifting', label: 'Streetlifting' },
                    { value: 'sprint', label: 'Sprint' },
                    { value: 'classique', label: 'Classique' }
                  ],
                  <Lightning className="w-5 h-5" />,
                  'bg-gradient-to-r from-orange-500/10 to-red-500/10'
                )}

                {/* Objectif */}
                {renderEditableField(
                  "Objectif principal",
                  user.goal === 'performance' ? 'Performance' :
                  user.goal === 'musculation' ? 'Musculation' :
                  user.goal === 'endurance' ? 'Endurance' :
                  user.goal === 'sante' ? 'Santé' :
                  'Performance',
                  isEditingGoal,
                  () => {
                    setTempGoal(user.goal || 'performance');
                    setIsEditingGoal(true);
                  },
                  () => {
                    handleFieldChange('goal', tempGoal);
                    setIsEditingGoal(false);
                  },
                  () => setIsEditingGoal(false),
                  tempGoal,
                  setTempGoal,
                  'select',
                  [
                    { value: 'performance', label: 'Performance' },
                    { value: 'musculation', label: 'Musculation' },
                    { value: 'endurance', label: 'Endurance' },
                    { value: 'sante', label: 'Santé' }
                  ],
                  <Target className="w-5 h-5" />,
                  'bg-gradient-to-r from-green-500/10 to-emerald-500/10'
                )}
              </CardContent>
            </Card>

            {/* Statistiques */}
            <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  Statistiques
                    </CardTitle>
                  </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-primary/10 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Trophy className="w-5 h-5 text-primary" />
                      <div className="text-sm font-medium text-primary uppercase tracking-wide">Rang actuel</div>
                    </div>
                    <div className="text-3xl font-bold text-primary">{user.rank || "D"}</div>
                </div>

                  <div className="p-6 bg-secondary/10 rounded-2xl border border-secondary/30 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Weight className="w-5 h-5 text-secondary" />
                      <div className="text-sm font-medium text-secondary uppercase tracking-wide">Score global</div>
                  </div>
                    <div className="text-3xl font-bold text-secondary">{user.globalScore || 0}</div>
            </div>

                  <div className="p-6 surface-accent rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div className="text-sm font-medium text-primary uppercase tracking-wide">Performances</div>
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {localStorage.getItem('userPerformances') ?
                        JSON.parse(localStorage.getItem('userPerformances')!).length : 0}
                    </div>
                  </div>

                  <div className="p-6 bg-accent/10 rounded-2xl border border-accent/30 hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Activity className="w-5 h-5 text-accent" />
                      <div className="text-sm font-medium text-accent uppercase tracking-wide">IMC</div>
                    </div>
                    <div className="text-3xl font-bold text-accent">
                      {user.weight && user.height ? 
                        Math.round((user.weight / Math.pow(user.height / 100, 2)) * 10) / 10 : 'N/A'}
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfileSummary; 