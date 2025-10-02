import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { Dumbbell, Eye, EyeOff, User, Lock, Mail } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    weight: 75,
    age: 28,
    sex: 'male' as 'male' | 'female',
    sportClass: 'classique'
  });

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user) {
      console.log('✅ Utilisateur déjà connecté, redirection vers le dashboard');
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 DÉBUT DE LA CONNEXION');
    console.log('Données du formulaire:', formData);
    
    if (!formData.name || !formData.email || !formData.password) {
      alert('❌ Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Créer un utilisateur avec toutes les données nécessaires
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        weight: formData.weight,
        age: formData.age,
        sex: formData.sex,
        sportClass: formData.sportClass,
        rank: 'D',
        globalScore: 0
      };
      
      console.log(' Données utilisateur créées:', userData);
      
      // Simuler un délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Appeler la fonction login
      console.log('🔐 Appel de la fonction login...');

      // Compléter les champs manquants pour correspondre au type User
      const userComplet = {
        ...userData,
        focus_trapezes: false,
        focus_avant_bras: false,
        focus_mollets: false,
        focus_ischio_jambiers: false,
        focus_quadriceps: false,
        focus_fessiers: false,
        focus_pectoraux: false,
        focus_dos: false,
        focus_abdos: false,
        focus_epaules: false,
        focus_biceps: false,
        focus_triceps: false,
        focus_cardio: false,
        focus_mobilite: false,
        focus_explosivite: false,
        focus_endurance: false,
        focus_force: false,
        focus_vitesse: false,
        focus_technique: false,
        focus_equilibre: false,
        focus_coordination: false,
        focus_proprioception: false,
        focus_autre: '',
        objectifs: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        photoURL: '',
        phone: '',
        isAdmin: false,
        isPremium: false,
        isActive: true,
        notifications: [],
        settings: {},
        theme: 'light',
        language: 'fr',
      };

      // Correction : ajout des champs manquants pour correspondre au type User
      const userFinal = {
        ...userComplet,
        focus_abdominaux: false,
        duration: 0,
        level: '',
        sport: '',
        sexe: '',
        birthday: '',
        taille: 0,
        poids: 0,
        email: formData.email,
        name: formData.name,
        uid: '', // à compléter si besoin
        // Ajoutez ici d'autres champs requis par le type User si nécessaire
      };

      // Correction : ajout des champs manquants pour correspondre au type User
      // Veillez à ce que tous les champs requis par le type User soient présents dans userFinal
      if (
        userFinal.hasOwnProperty('focus_calisthenics') &&
        userFinal.hasOwnProperty('focus_jambes') &&
        userFinal.hasOwnProperty('focus_bras') &&
        userFinal.hasOwnProperty('location') &&
        userFinal.hasOwnProperty('globalScore')
      ) {
        // Vérification supplémentaire : s'assurer que tous les champs obligatoires du type User sont bien présents
        login(userFinal as User); // Correction du cast pour éviter l'erreur de type
        console.log('✅ Connexion réussie !');
        navigate('/dashboard');
      } else {
        alert("Certains champs obligatoires du type User sont manquants dans userFinal.");
        return;
      }
    } catch (error) {
      console.error('❌ Erreur lors de la connexion:', error);
      alert('❌ Erreur lors de la connexion: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Connexion à FitGEN2
          </CardTitle>
          <p className="text-gray-600">
            Accédez à votre tableau de bord personnel
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Nom complet *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Votre nom"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="votre@email.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Mot de passe *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Votre mot de passe"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Informations personnelles</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Poids */}
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-sm font-semibold text-gray-700">
                    Poids (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="75"
                    min="30"
                    max="200"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Âge */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-semibold text-gray-700">
                    Âge
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="28"
                    min="16"
                    max="100"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Sexe */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Sexe</Label>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant={formData.sex === 'male' ? 'default' : 'outline'}
                    onClick={() => setFormData({ ...formData, sex: 'male' })}
                    className="flex-1 h-12"
                    disabled={isLoading}
                  >
                    Homme
                  </Button>
                  <Button
                    type="button"
                    variant={formData.sex === 'female' ? 'default' : 'outline'}
                    onClick={() => setFormData({ ...formData, sex: 'female' })}
                    className="flex-1 h-12"
                    disabled={isLoading}
                  >
                    Femme
                  </Button>
                </div>
              </div>

              {/* Classe de sport */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Type de sport</Label>
                <select
                  value={formData.sportClass}
                  onChange={(e) => setFormData({ ...formData, sportClass: e.target.value })}
                  className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  <option value="classique">Classique</option>
                  <option value="crossfit">CrossFit</option>
                  <option value="power">Powerlifting</option>
                  <option value="marathon">Marathon</option>
                  <option value="calisthenics">Calisthenics</option>
                </select>
              </div>
            </div>

            {/* Bouton de connexion */}
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Connexion en cours...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5" />
                  <span>Se connecter</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login; 