
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, User, Mail, Calendar, Edit3, Save, X, Dumbbell, Phone, MapPin, Clock, Target, Zap, AlertTriangle, Shield, Star, TrendingUp, Activity, Heart, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    birthDate: user?.birthDate || '',
    age: user?.age || 0,
    height: user?.height || '',
    weight: user?.weight || '',
    goal: user?.goal || '',
    level: user?.level || 'débutant',
    mainObjective: user?.mainObjective || 'tonification',
    progressionSpeed: user?.progressionSpeed || 'modéré',
    availableDays: user?.availableDays || [],
    preferredFormat: user?.preferredFormat || 'salle',
    benchPress: user?.benchPress || 0,
    squat: user?.squat || 0,
    deadlift: user?.deadlift || 0,
    overheadPress: user?.overheadPress || 0,
    rowing: user?.rowing || 0,
    availableEquipment: user?.availableEquipment || [],
    medicalConstraints: user?.medicalConstraints || [],
    physicalLimitations: user?.physicalLimitations || '',
    emergencyContact: user?.emergencyContact || '',
    emergencyPhone: user?.emergencyPhone || '',
  });
  const [message, setMessage] = useState('');

  const steps = [
    { id: 1, title: 'Informations générales', description: 'Vos données de base' },
    { id: 2, title: 'Objectifs & Niveau', description: 'Définir vos ambitions' },
    { id: 3, title: 'Disponibilités', description: 'Quand et comment vous entraîner' },
    { id: 4, title: 'Performance', description: 'Vos capacités actuelles' },
    { id: 5, title: 'Équipement', description: 'Matériel disponible' },
    { id: 6, title: 'Contraintes', description: 'Limitations et sécurité' }
  ];

  const handleSave = async () => {
    const success = await updateProfile(user);
    if (success) {
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées avec succès.",
      });
      
      // Rediriger immédiatement vers l'accueil si le profil est complet
      if (user.isProfileComplete) {
        navigate('/');
      }
    } else {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    if (checked) {
      setFormData({ ...formData, [field]: [...currentArray, value] });
    } else {
      setFormData({ ...formData, [field]: currentArray.filter(item => item !== value) });
    }
  };

  const handleComplete = async () => {
    const success = await updateProfile(user);
    if (success) {
      // Rediriger immédiatement vers l'accueil
      navigate('/');
    } else {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    }
  };

  const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  const equipment = ['aucun', 'kettlebell', 'tapis', 'swiss ball', 'élastiques', 'machine guidée', 'haltères', 'cardio', 'barre', 'piscine'];
  const medicalConstraints = ['genou fragile', 'dos sensible', 'cheville faible', 'hypertension', 'diabète', 'arthrose', 'épaule limitée', 'asthme', 'hernie discale'];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'débutant': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermédiaire': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'avancé': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'expert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getObjectiveColor = (objective: string) => {
    switch (objective) {
      case 'perte_poids': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'prise_muscle': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'endurance': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'force': return 'bg-red-100 text-red-800 border-red-200';
      case 'tonification': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rehabilitation': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
  return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User className="h-4 w-4 text-blue-500" />
                Nom complet
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Votre nom complet"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar className="h-4 w-4 text-green-500" />
                Âge
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                placeholder="28"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Dumbbell className="h-4 w-4 text-orange-500" />
                Poids (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="75"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                Taille (cm)
              </Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="175"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
                </div>
              </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="level" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Target className="h-4 w-4 text-indigo-500" />
                Niveau
              </Label>
              <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value as any })}>
                <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                  <SelectValue placeholder="Sélectionner le niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="débutant">Débutant</SelectItem>
                  <SelectItem value="intermédiaire">Intermédiaire</SelectItem>
                  <SelectItem value="avancé">Avancé</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainObjective" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Heart className="h-4 w-4 text-pink-500" />
                Objectif principal
              </Label>
              <Select value={formData.mainObjective} onValueChange={(value) => setFormData({ ...formData, mainObjective: value as any })}>
                <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-pink-500 focus:ring-2 focus:ring-pink-200">
                  <SelectValue placeholder="Sélectionner l'objectif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perte_poids">Perte de poids</SelectItem>
                  <SelectItem value="prise_muscle">Prise de muscle</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="force">Force</SelectItem>
                  <SelectItem value="tonification">Tonification</SelectItem>
                  <SelectItem value="rehabilitation">Réhabilitation</SelectItem>
                </SelectContent>
              </Select>
              </div>

            <div className="space-y-2">
              <Label htmlFor="progressionSpeed" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Zap className="h-4 w-4 text-yellow-500" />
                Vitesse de progression souhaitée
              </Label>
              <Select value={formData.progressionSpeed} onValueChange={(value) => setFormData({ ...formData, progressionSpeed: value as any })}>
                <SelectTrigger className="bg-white border-gray-300 text-gray-900 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200">
                  <SelectValue placeholder="Sélectionner la vitesse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lent">Lent</SelectItem>
                  <SelectItem value="modéré">Modéré</SelectItem>
                  <SelectItem value="rapide">Rapide</SelectItem>
                  <SelectItem value="très_rapide">Très rapide</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
              <Label className="text-lg font-semibold text-gray-800 mb-4 block">Jours disponibles</Label>
              <div className="grid grid-cols-2 gap-3">
                {days.map((day) => (
                  <div key={day} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors duration-200">
                    <Checkbox
                      id={day}
                      checked={formData.availableDays.includes(day)}
                      onCheckedChange={(checked) => handleCheckboxChange('availableDays', day, checked as boolean)}
                      className="data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                    />
                    <Label htmlFor={day} className="text-sm font-medium text-gray-700 capitalize cursor-pointer">
                      {day}
                    </Label>
                  </div>
                ))}
        </div>
      </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <Label className="text-lg font-semibold text-gray-800 mb-4 block">Format souhaité</Label>
              <RadioGroup
                value={formData.preferredFormat}
                onValueChange={(value) => setFormData({ ...formData, preferredFormat: value as any })}
                className="space-y-3"
              >
                {[
                  { value: 'salle', label: 'Salle de sport', icon: '🏋️' },
                  { value: 'extérieur', label: 'Extérieur', icon: '🌳' },
                  { value: 'park', label: 'Park', icon: '🏃' },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                    <RadioGroupItem value={option.value} id={option.value} className="text-purple-500" />
                    <Label htmlFor={option.value} className="text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-2">
                      <span className="text-lg">{option.icon}</span>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">1RM - Répétitions maximales (optionnel)</h3>
              <p className="text-gray-600 text-sm">
                Renseignez vos charges maximales pour une répétition si vous les connaissez. Cela permet de calculer des pourcentages précis.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { key: 'benchPress', label: 'Développé couché (kg)', icon: '🛏️' },
                { key: 'squat', label: 'Squat (kg)', icon: '🏋️' },
                { key: 'deadlift', label: 'Soulevé de terre (kg)', icon: '⚡' },
                { key: 'overheadPress', label: 'Développé militaire (kg)', icon: '💪' },
                { key: 'rowing', label: 'Rowing (kg)', icon: '🚣' }
              ].map((exercise) => (
                <div key={exercise.key} className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span className="text-lg">{exercise.icon}</span>
                    {exercise.label}
                  </Label>
                  <Input
                    type="number"
                    value={formData[exercise.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [exercise.key]: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              ))}
            </div>
                  </div>
        );

      case 5:
        return (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Équipement disponible</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {equipment.map((item) => (
                <div key={item} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                  <Checkbox
                    id={item}
                    checked={formData.availableEquipment.includes(item)}
                    onCheckedChange={(checked) => handleCheckboxChange('availableEquipment', item, checked as boolean)}
                    className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                  />
                  <Label htmlFor={item} className="text-sm font-medium text-gray-700 capitalize cursor-pointer">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <Label className="text-lg font-semibold text-gray-800 mb-4 block">Contraintes médicales</Label>
              <div className="grid grid-cols-1 gap-3">
                {medicalConstraints.map((constraint) => (
                  <div key={constraint} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors duration-200">
                    <Checkbox
                      id={constraint}
                      checked={formData.medicalConstraints.includes(constraint)}
                      onCheckedChange={(checked) => handleCheckboxChange('medicalConstraints', constraint, checked as boolean)}
                      className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                    />
                    <Label htmlFor={constraint} className="text-sm font-medium text-gray-700 cursor-pointer">
                      {constraint}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200">
              <Label htmlFor="physicalLimitations" className="text-lg font-semibold text-gray-800 mb-4 block">
                Limitations physiques particulières
              </Label>
              <Textarea
                id="physicalLimitations"
                value={formData.physicalLimitations}
                onChange={(e) => setFormData({ ...formData, physicalLimitations: e.target.value })}
                placeholder="Douleurs lombaires, ancienne blessure à l'épaule..."
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                rows={6}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* En-tête avec logo et animations */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <Dumbbell className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Configuration de votre profil
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Remplissez ces informations pour générer un programme personnalisé adapté à vos besoins
          </p>
                  </div>

        {/* Barre de progression */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    currentStep > step.id ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">{steps[currentStep - 1].title}</h2>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {message && (
          <Alert className="mb-8 max-w-4xl mx-auto border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{message}</AlertDescription>
          </Alert>
        )}

        {/* Carte principale avec design amélioré */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 max-w-4xl mx-auto">
          {renderStepContent()}

          {/* Boutons de navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2 bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <X className="h-4 w-4" />
              Précédent
            </Button>

            {currentStep < steps.length ? (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Suivant
                <TrendingUp className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex gap-4">
                  <Button 
                    onClick={handleSave}
                    variant="outline"
                    className="flex-1"
                  >
                    Sauvegarder
                  </Button>
                  <Button 
                    onClick={handleComplete}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Terminer la configuration
                  </Button>
                </div>
            )}
                  </div>
                </div>
      </div>
    </div>
  );
};

export default Dashboard;
