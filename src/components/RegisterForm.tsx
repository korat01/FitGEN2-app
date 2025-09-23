import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, User, Lock, Mail } from 'lucide-react';

interface RegisterFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onCancel }) => {
  const { login } = useAuth(); // Utiliser login pour l'inscription aussi
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    weight: 75,
    age: 28,
    sex: 'male' as 'male' | 'female',
    sportClass: 'classique'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
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
        rank: 'D', // Rang par défaut
        globalScore: 0 // Score par défaut
      };
      
      console.log('Tentative d\'inscription avec:', userData);
      
      // Simuler un délai pour l'effet visuel
      await new Promise(resolve => setTimeout(resolve, 500));
      
      login(userData);
      
      console.log('Inscription réussie, appel de onSuccess');
      
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      alert('Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

      {/* Confirmation mot de passe */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
          Confirmer le mot de passe *
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Confirmez votre mot de passe"
            required
            disabled={isLoading}
          />
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

      {/* Boutons */}
      <div className="flex gap-3">
        <Button
          type="submit"
          className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Inscription...</span>
            </div>
          ) : (
            'S\'inscrire'
          )}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-12"
            disabled={isLoading}
          >
            Annuler
          </Button>
        )}
      </div>
    </form>
  );
}; 