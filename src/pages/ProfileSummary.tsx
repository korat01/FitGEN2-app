import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../contexts/AuthContext';
import { scoringEngine } from '../utils/scoring';
import {
  Edit, Save, X, Weight, Calendar, Users, Trophy, Mail, Phone, MapPin,
  Target, Activity, Heart, Dumbbell,
  Star, TrendingUp, Flame,
  Zap as Lightning,
  Timer, Wind, Gauge, Sparkles
} from 'lucide-react';
import { RankBadge } from '@/components/RankBadge';
import { SelectableTile } from '@/components/profile/SelectableTile';

interface MuscleGroup {
  name: string;
  key: string;
  icon: React.ReactNode;
  gradient: string;
  borderClass: string;
}

const MUSCLE_GROUPS: MuscleGroup[] = [
  { name: 'Bras', key: 'bras', icon: <Users className="w-5 h-5" />, gradient: 'from-red-500 to-pink-500', borderClass: 'border-red-500/40' },
  { name: 'Épaules', key: 'epaules', icon: <Users className="w-5 h-5" />, gradient: 'from-blue-500 to-cyan-500', borderClass: 'border-blue-500/40' },
  { name: 'Poitrine', key: 'poitrine', icon: <Heart className="w-5 h-5" />, gradient: 'from-green-500 to-emerald-500', borderClass: 'border-green-500/40' },
  { name: 'Dos', key: 'dos', icon: <Users className="w-5 h-5" />, gradient: 'from-purple-500 to-violet-500', borderClass: 'border-purple-500/40' },
  { name: 'Jambes', key: 'jambes', icon: <Activity className="w-5 h-5" />, gradient: 'from-orange-500 to-yellow-500', borderClass: 'border-orange-500/40' },
  { name: 'Fesses', key: 'fesses', icon: <Activity className="w-5 h-5" />, gradient: 'from-pink-500 to-rose-500', borderClass: 'border-pink-500/40' },
  { name: 'Abdominaux', key: 'abdominaux', icon: <Activity className="w-5 h-5" />, gradient: 'from-indigo-500 to-blue-500', borderClass: 'border-indigo-500/40' },
];

interface SportFocus {
  key: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  borderClass: string;
}

const SPORT_LABELS: Record<string, string> = {
  power: 'Powerlifting',
  marathon: 'Marathon',
  crossfit: 'Crossfit',
  calisthenics: 'Calisthéniques',
  streetlifting: 'Streetlifting',
  sprint: 'Sprint',
  classique: 'Classique',
};

const SPORT_FOCUS: Record<string, SportFocus[]> = {
  power: [
    { key: 'squat', label: 'Squat', description: 'Force des jambes et du dos', icon: <Dumbbell className="w-5 h-5" />, gradient: 'from-red-500 to-pink-500', borderClass: 'border-red-500/40' },
    { key: 'bench', label: 'Bench Press', description: 'Force de la poitrine et des bras', icon: <Dumbbell className="w-5 h-5" />, gradient: 'from-blue-500 to-cyan-500', borderClass: 'border-blue-500/40' },
    { key: 'deadlift', label: 'Deadlift', description: 'Force totale du corps', icon: <Dumbbell className="w-5 h-5" />, gradient: 'from-purple-500 to-violet-500', borderClass: 'border-purple-500/40' },
  ],
  marathon: [
    { key: 'endurance', label: 'Endurance', description: 'Résistance sur longue distance', icon: <Activity className="w-5 h-5" />, gradient: 'from-blue-500 to-cyan-500', borderClass: 'border-blue-500/40' },
    { key: 'vo2max', label: 'VO2 Max', description: 'Capacité aérobie maximale', icon: <Heart className="w-5 h-5" />, gradient: 'from-green-500 to-emerald-500', borderClass: 'border-green-500/40' },
    { key: 'economie', label: 'Économie de course', description: 'Efficacité énergétique', icon: <TrendingUp className="w-5 h-5" />, gradient: 'from-yellow-500 to-orange-500', borderClass: 'border-yellow-500/40' },
  ],
  crossfit: [
    { key: 'force_fonctionnelle', label: 'Force fonctionnelle', description: 'Haltérophilie et mouvements composés', icon: <Dumbbell className="w-5 h-5" />, gradient: 'from-red-500 to-orange-500', borderClass: 'border-red-500/40' },
    { key: 'metcon', label: 'Metcon / Cardio', description: 'Capacité conditionnelle et endurance', icon: <Gauge className="w-5 h-5" />, gradient: 'from-blue-500 to-cyan-500', borderClass: 'border-blue-500/40' },
    { key: 'gymnastique', label: 'Gymnastique', description: 'Tractions, muscle-up, handstand', icon: <Sparkles className="w-5 h-5" />, gradient: 'from-purple-500 to-violet-500', borderClass: 'border-purple-500/40' },
  ],
  calisthenics: [
    { key: 'traction', label: 'Force de traction', description: 'Tractions, tractions lestées', icon: <Dumbbell className="w-5 h-5" />, gradient: 'from-purple-500 to-violet-500', borderClass: 'border-purple-500/40' },
    { key: 'poussee', label: 'Poussée', description: 'Dips, pompes, développé', icon: <Dumbbell className="w-5 h-5" />, gradient: 'from-blue-500 to-cyan-500', borderClass: 'border-blue-500/40' },
    { key: 'skills', label: 'Skills statiques', description: 'Planche, front lever, handstand', icon: <Star className="w-5 h-5" />, gradient: 'from-yellow-500 to-orange-500', borderClass: 'border-yellow-500/40' },
  ],
  streetlifting: [
    { key: 'tractions_lestees', label: 'Tractions lestées', description: 'Force de tirage maximale', icon: <Dumbbell className="w-5 h-5" />, gradient: 'from-purple-500 to-violet-500', borderClass: 'border-purple-500/40' },
    { key: 'dips_lestes', label: 'Dips lestés', description: 'Force de poussée maximale', icon: <Dumbbell className="w-5 h-5" />, gradient: 'from-blue-500 to-cyan-500', borderClass: 'border-blue-500/40' },
    { key: 'squat_street', label: 'Squat', description: 'Force des jambes', icon: <Dumbbell className="w-5 h-5" />, gradient: 'from-red-500 to-pink-500', borderClass: 'border-red-500/40' },
  ],
  sprint: [
    { key: 'vitesse', label: 'Vitesse pure', description: 'Vitesse maximale sur courte distance', icon: <Lightning className="w-5 h-5" />, gradient: 'from-yellow-500 to-orange-500', borderClass: 'border-yellow-500/40' },
    { key: 'explosivite', label: 'Explosivité', description: 'Puissance et départ', icon: <Flame className="w-5 h-5" />, gradient: 'from-red-500 to-orange-500', borderClass: 'border-red-500/40' },
    { key: 'technique_course', label: 'Technique de course', description: 'Foulée et posture', icon: <Wind className="w-5 h-5" />, gradient: 'from-blue-500 to-cyan-500', borderClass: 'border-blue-500/40' },
  ],
  classique: [
    { key: 'force_generale', label: 'Force générale', description: 'Développement musculaire global', icon: <Dumbbell className="w-5 h-5" />, gradient: 'from-purple-500 to-violet-500', borderClass: 'border-purple-500/40' },
    { key: 'cardio_general', label: 'Cardio', description: 'Santé cardiovasculaire', icon: <Heart className="w-5 h-5" />, gradient: 'from-blue-500 to-cyan-500', borderClass: 'border-blue-500/40' },
    { key: 'mobilite_generale', label: 'Mobilité', description: 'Souplesse et récupération', icon: <Activity className="w-5 h-5" />, gradient: 'from-green-500 to-emerald-500', borderClass: 'border-green-500/40' },
  ],
};

const LEVEL_OPTIONS = [
  { value: 'Débutant', label: 'Débutant' },
  { value: 'Intermédiaire', label: 'Intermédiaire' },
  { value: 'Avancé', label: 'Avancé' },
  { value: 'Expert', label: 'Expert' },
];

const DAYS_OF_WEEK = [
  { key: 'lundi', label: 'Lundi' },
  { key: 'mardi', label: 'Mardi' },
  { key: 'mercredi', label: 'Mercredi' },
  { key: 'jeudi', label: 'Jeudi' },
  { key: 'vendredi', label: 'Vendredi' },
  { key: 'samedi', label: 'Samedi' },
  { key: 'dimanche', label: 'Dimanche' },
];

const TIME_OPTIONS = [
  { value: 1, label: '1 mois' },
  { value: 2, label: '2 mois' },
  { value: 3, label: '3 mois' },
  { value: 6, label: '6 mois' },
  { value: 9, label: '9 mois' },
  { value: 12, label: '12 mois' },
  { value: 18, label: '18 mois' },
  { value: 24, label: '24 mois' },
];

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
          updateUser({ rank: realRank.rank, globalScore: realRank.globalScore, scoreLabel: realRank.scoreLabel });
        } catch (error) {
          console.error('Erreur lors du calcul du rang:', error);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.weight, user?.age, user?.sex, user?.sportClass]);

  const handleFieldChange = (field: string, value: any) => {
    if (!user) return;

    const updatedUser = { ...user, [field]: value };
    updateUser(updatedUser);

    if (['weight', 'age', 'sex', 'sportClass'].includes(field)) {
      const savedPerformances = localStorage.getItem('userPerformances');
      if (savedPerformances) {
        try {
          const performancesList = JSON.parse(savedPerformances);
          const realRank = scoringEngine.calculateUserRank(updatedUser, performancesList);
          updateUser({ rank: realRank.rank, globalScore: realRank.globalScore, scoreLabel: realRank.scoreLabel });
        } catch (error) {
          console.error('Erreur lors du recalcul du rang:', error);
        }
      }
    }
  };

  const toggleFocus = (key: string) => {
    if (!user) return;
    updateUser({ ...user, [`focus_${key}`]: !user?.[`focus_${key}`] });
  };

  const handleTrainingDaysChange = (day: string) => {
    const updatedDays = tempTrainingDays.includes(day)
      ? tempTrainingDays.filter((d) => d !== day)
      : [...tempTrainingDays, day];
    setTempTrainingDays(updatedDays);
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
    icon?: React.ReactNode
  ) => {
    return (
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-200">
        <div className="flex items-center gap-2 mb-2">
          {icon && <div className="text-muted-foreground">{icon}</div>}
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
        </div>
        {isEditing ? (
          <div className="flex items-center gap-2">
            {type === 'select' && options ? (
              <Select value={tempValue} onValueChange={setTempValue}>
                <SelectTrigger className="flex-1 h-11 glass-card border-2 border-white/15 focus:border-primary/50 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-card border-0 shadow-xl rounded-xl">
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
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
                className="flex-1 h-11 glass-card border-2 border-white/15 focus:border-primary/50 rounded-xl text-lg font-semibold"
                autoFocus
              />
            )}
            <Button size="sm" onClick={onSave} className="h-11 w-11 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shrink-0">
              <Save className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel} className="h-11 w-11 border-2 border-white/15 hover:border-destructive/50 hover:text-destructive rounded-xl shrink-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <div className="text-lg font-bold text-foreground truncate">{value}</div>
            <Button size="sm" variant="outline" onClick={onEdit} className="h-9 w-9 border-2 border-white/15 hover:border-primary/50 hover:text-primary rounded-xl shrink-0">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
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

  const performancesCount = (() => {
    try {
      const raw = localStorage.getItem('userPerformances');
      return raw ? JSON.parse(raw).length : 0;
    } catch {
      return 0;
    }
  })();

  const imc = user.weight && user.height ? Math.round((user.weight / Math.pow(user.height / 100, 2)) * 10) / 10 : null;

  const sportFocusList = SPORT_FOCUS[user.sportClass || 'classique'] || [];

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header Principal */}
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-6 md:p-8 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-24 -translate-x-24" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <RankBadge rank={user.rank || 'D'} size="md" />
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{user.name}</h1>
                  <p className="text-white/80 text-sm mt-1">Rang {user.rank || 'D'} · {SPORT_LABELS[user.sportClass || 'classique']}</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/15 backdrop-blur-sm self-start md:self-auto">
                <Flame className="w-6 h-6" />
                <div>
                  <div className="text-2xl font-bold leading-none">{user.globalScore || 0}</div>
                  <div className="text-xs text-white/80">{user.scoreLabel || 'points'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Focus unifié */}
          <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                Mes Zones de Focus
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-1">Sélectionnez les zones que vous voulez travailler en priorité</p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h4 className="text-sm font-semibold text-foreground/80 mb-3 flex items-center gap-2 uppercase tracking-wide">
                  <Dumbbell className="w-4 h-4 text-primary" />
                  Groupes musculaires
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {MUSCLE_GROUPS.map((muscle) => (
                    <SelectableTile
                      key={muscle.key}
                      icon={muscle.icon}
                      label={muscle.name}
                      selected={!!user?.[`focus_${muscle.key}`]}
                      onClick={() => toggleFocus(muscle.key)}
                      gradient={muscle.gradient}
                      borderClass={muscle.borderClass}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground/80 mb-3 flex items-center gap-2 uppercase tracking-wide">
                  <Star className="w-4 h-4 text-secondary" />
                  Focus spécialisés — {SPORT_LABELS[user.sportClass || 'classique']}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {sportFocusList.map((focus) => (
                    <SelectableTile
                      key={focus.key}
                      layout="horizontal"
                      icon={focus.icon}
                      label={focus.label}
                      description={focus.description}
                      selected={!!user?.[`focus_${focus.key}`]}
                      onClick={() => toggleFocus(focus.key)}
                      gradient={focus.gradient}
                      borderClass={focus.borderClass}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Niveau général */}
          <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                Niveau Général
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-md">
                <Select value={user?.generalLevel || 'Débutant'} onValueChange={(value) => handleFieldChange('generalLevel', value)}>
                  <SelectTrigger className="w-full h-11 glass-card border-2 border-white/15 focus:border-primary/50 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-0 shadow-xl rounded-xl">
                    {LEVEL_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-2">Ce niveau sera utilisé pour adapter vos programmes d'entraînement.</p>
              </div>
            </CardContent>
          </Card>

          {/* Jours d'entraînement */}
          <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  Jours d'entraînement
                  <span className="text-sm font-normal text-muted-foreground">({(isEditingTrainingDays ? tempTrainingDays : user?.trainingDays)?.length || 0}/7)</span>
                </CardTitle>
                {!isEditingTrainingDays && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditingTrainingDays(true)} className="border-2 border-white/15 hover:border-primary/50 hover:text-primary rounded-xl">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {DAYS_OF_WEEK.map((day) => {
                  const isSelected = isEditingTrainingDays ? tempTrainingDays.includes(day.key) : user?.trainingDays?.includes(day.key) || false;
                  return (
                    <SelectableTile
                      key={day.key}
                      icon={<Calendar className="w-5 h-5" />}
                      label={day.label}
                      selected={isSelected}
                      onClick={isEditingTrainingDays ? () => handleTrainingDaysChange(day.key) : undefined}
                    />
                  );
                })}
              </div>

              {isEditingTrainingDays && (
                <div className="flex gap-3 mt-4">
                  <Button onClick={saveTrainingDays} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl">
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button variant="outline" onClick={cancelTrainingDays} className="border-2 border-white/15 hover:border-destructive/50 hover:text-destructive rounded-xl">
                    <X className="w-4 h-4 mr-2" />
                    Annuler
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Durée d'entraînement */}
          <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
                    <Timer className="w-5 h-5 text-white" />
                  </div>
                  Durée d'entraînement
                </CardTitle>
                {!isEditingTrainingTime && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditingTrainingTime(true)} className="border-2 border-white/15 hover:border-primary/50 hover:text-primary rounded-xl">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TIME_OPTIONS.map((option) => {
                  const isSelected = (isEditingTrainingTime ? tempTrainingTime : user?.trainingMonths || 3) === option.value;
                  return (
                    <SelectableTile
                      key={option.value}
                      icon={<Timer className="w-5 h-5" />}
                      label={option.label}
                      selected={isSelected}
                      onClick={isEditingTrainingTime ? () => setTempTrainingTime(option.value) : undefined}
                    />
                  );
                })}
              </div>

              {isEditingTrainingTime && (
                <div className="flex gap-3 mt-4">
                  <Button onClick={saveTrainingTime} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl">
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button variant="outline" onClick={cancelTrainingTime} className="border-2 border-white/15 hover:border-destructive/50 hover:text-destructive rounded-xl">
                    <X className="w-4 h-4 mr-2" />
                    Annuler
                  </Button>
                </div>
              )}

              <div className="mt-4 p-4 bg-secondary/10 rounded-2xl border border-secondary/30">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span className="font-semibold text-secondary text-sm">Planification</span>
                </div>
                <p className="text-sm text-secondary/90">
                  Vous vous entraînerez pendant <strong>{user?.trainingMonths || 3} mois</strong> sur <strong>{user?.trainingDays?.length || 0} jours par semaine</strong>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Informations du profil */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informations personnelles */}
            <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {renderEditableField(
                  'Nom complet', user.name || 'Non défini', isEditingName,
                  () => { setTempName(user.name || ''); setIsEditingName(true); },
                  () => { handleFieldChange('name', tempName); setIsEditingName(false); },
                  () => setIsEditingName(false),
                  tempName, setTempName, 'text', undefined, <Users className="w-4 h-4" />
                )}
                {renderEditableField(
                  'Email', user.email || 'Non défini', isEditingEmail,
                  () => { setTempEmail(user.email || ''); setIsEditingEmail(true); },
                  () => { handleFieldChange('email', tempEmail); setIsEditingEmail(false); },
                  () => setIsEditingEmail(false),
                  tempEmail, setTempEmail, 'text', undefined, <Mail className="w-4 h-4" />
                )}
                {renderEditableField(
                  'Téléphone', user.phone || 'Non défini', isEditingPhone,
                  () => { setTempPhone(user.phone || ''); setIsEditingPhone(true); },
                  () => { handleFieldChange('phone', tempPhone); setIsEditingPhone(false); },
                  () => setIsEditingPhone(false),
                  tempPhone, setTempPhone, 'text', undefined, <Phone className="w-4 h-4" />
                )}
                {renderEditableField(
                  'Localisation', user.location || 'Non défini', isEditingLocation,
                  () => { setTempLocation(user.location || ''); setIsEditingLocation(true); },
                  () => { handleFieldChange('location', tempLocation); setIsEditingLocation(false); },
                  () => setIsEditingLocation(false),
                  tempLocation, setTempLocation, 'text', undefined, <MapPin className="w-4 h-4" />
                )}
              </CardContent>
            </Card>

            {/* Informations physiques */}
            <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
                    <Weight className="w-5 h-5 text-white" />
                  </div>
                  Informations physiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {renderEditableField(
                  'Poids', `${user.weight || 75} kg`, isEditingWeight,
                  () => { setTempWeight(user.weight || 75); setIsEditingWeight(true); },
                  () => { handleFieldChange('weight', tempWeight); setIsEditingWeight(false); },
                  () => setIsEditingWeight(false),
                  tempWeight, setTempWeight, 'number', undefined, <Weight className="w-4 h-4" />
                )}
                {renderEditableField(
                  'Taille', `${user.height || 175} cm`, isEditingHeight,
                  () => { setTempHeight(user.height || 175); setIsEditingHeight(true); },
                  () => { handleFieldChange('height', tempHeight); setIsEditingHeight(false); },
                  () => setIsEditingHeight(false),
                  tempHeight, setTempHeight, 'number', undefined, <Activity className="w-4 h-4" />
                )}
                {renderEditableField(
                  'Âge', `${user.age || 25} ans`, isEditingAge,
                  () => { setTempAge(user.age || 25); setIsEditingAge(true); },
                  () => { handleFieldChange('age', tempAge); setIsEditingAge(false); },
                  () => setIsEditingAge(false),
                  tempAge, setTempAge, 'number', undefined, <Calendar className="w-4 h-4" />
                )}
                {renderEditableField(
                  'Sexe', user.sex === 'male' ? 'Homme' : 'Femme', isEditingSex,
                  () => { setTempSex(user.sex || 'male'); setIsEditingSex(true); },
                  () => { handleFieldChange('sex', tempSex); setIsEditingSex(false); },
                  () => setIsEditingSex(false),
                  tempSex, setTempSex, 'select',
                  [{ value: 'male', label: 'Homme' }, { value: 'female', label: 'Femme' }],
                  <Users className="w-4 h-4" />
                )}
              </CardContent>
            </Card>

            {/* Informations sportives */}
            <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  Informations sportives
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {renderEditableField(
                  'Classe de sport', SPORT_LABELS[user.sportClass || 'classique'], isEditingSport,
                  () => { setTempSport(user.sportClass || 'classique'); setIsEditingSport(true); },
                  () => { handleFieldChange('sportClass', tempSport); setIsEditingSport(false); },
                  () => setIsEditingSport(false),
                  tempSport, setTempSport, 'select',
                  Object.entries(SPORT_LABELS).map(([value, label]) => ({ value, label })),
                  <Lightning className="w-4 h-4" />
                )}
                {renderEditableField(
                  'Objectif principal',
                  user.goal === 'performance' ? 'Performance' :
                  user.goal === 'musculation' ? 'Musculation' :
                  user.goal === 'endurance' ? 'Endurance' :
                  user.goal === 'sante' ? 'Santé' : 'Performance',
                  isEditingGoal,
                  () => { setTempGoal(user.goal || 'performance'); setIsEditingGoal(true); },
                  () => { handleFieldChange('goal', tempGoal); setIsEditingGoal(false); },
                  () => setIsEditingGoal(false),
                  tempGoal, setTempGoal, 'select',
                  [
                    { value: 'performance', label: 'Performance' },
                    { value: 'musculation', label: 'Musculation' },
                    { value: 'endurance', label: 'Endurance' },
                    { value: 'sante', label: 'Santé' },
                  ],
                  <Target className="w-4 h-4" />
                )}
              </CardContent>
            </Card>

            {/* Statistiques */}
            <Card className="glass-card border-primary/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-primary/10 rounded-xl border border-primary/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="w-4 h-4 text-primary" />
                      <div className="text-xs font-medium text-primary uppercase tracking-wide">Performances</div>
                    </div>
                    <div className="text-2xl font-bold text-primary">{performancesCount}</div>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-xl border border-accent/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-accent" />
                      <div className="text-xs font-medium text-accent uppercase tracking-wide">IMC</div>
                    </div>
                    <div className="text-2xl font-bold text-accent">{imc ?? 'N/A'}</div>
                  </div>

                  <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-secondary" />
                      <div className="text-xs font-medium text-secondary uppercase tracking-wide">Jours / semaine</div>
                    </div>
                    <div className="text-2xl font-bold text-secondary">{user?.trainingDays?.length || 0}</div>
                  </div>

                  <div className="p-4 surface-accent rounded-xl border border-primary/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Timer className="w-4 h-4 text-primary" />
                      <div className="text-xs font-medium text-primary uppercase tracking-wide">Programme</div>
                    </div>
                    <div className="text-2xl font-bold text-primary">{user?.trainingMonths || 3} mois</div>
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
