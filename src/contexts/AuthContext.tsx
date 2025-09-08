import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
  age?: number;
  height?: string;
  weight?: string;
  goal?: string;
  level?: 'débutant' | 'intermédiaire' | 'avancé' | 'expert';
  mainObjective?: 'perte_poids' | 'prise_masse' | 'maintien' | 'performance' | 'santé';
  trainingFrequency?: number;
  trainingDuration?: number;
  trainingLocation?: string[];
  trainingPreferences?: string[];
  equipment?: string[];
  injuries?: string[];
  medicalConditions?: string[];
  medications?: string[];
  allergies?: string[];
  emergencyContact?: string;
  emergencyPhone?: string;
  createdAt: string;
  isProfileComplete?: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedUser = localStorage.getItem('fitgen_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'authentification:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0],
          phone: '+33 6 12 34 56 78',
          address: '123 Rue de la Paix, 75001 Paris',
          birthDate: '1990-01-01',
          age: 28,
          height: '175',
          weight: '75',
          goal: 'Perdre du poids et se muscler',
          level: 'intermédiaire',
          mainObjective: 'perte_poids',
          progressionSpeed: 'modéré',
          availableDays: ['lundi', 'mercredi', 'vendredi'],
          preferredFormat: 'salle',
          benchPress: 80,
          squat: 100,
          deadlift: 120,
          overheadPress: 50,
          rowing: 70,
          availableEquipment: ['haltères', 'barre', 'cardio'],
          medicalConstraints: ['dos_sensible'],
          physicalLimitations: 'Douleurs lombaires, ancienne blessure à l\'épaule...',
          emergencyContact: 'Marie Dupont',
          emergencyPhone: '+33 6 98 76 54 32',
          createdAt: new Date().toISOString(),
        };
        
        setUser(newUser);
        localStorage.setItem('fitgen_user', JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (name && email && password) {
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          phone: '',
          address: '',
          birthDate: '',
          age: 0,
          height: '',
          weight: '',
          goal: '',
          level: 'débutant',
          mainObjective: 'tonification',
          progressionSpeed: 'modéré',
          availableDays: [],
          preferredFormat: 'salle',
          benchPress: 0,
          squat: 0,
          deadlift: 0,
          overheadPress: 0,
          rowing: 0,
          availableEquipment: [],
          medicalConstraints: [],
          physicalLimitations: '',
          emergencyContact: '',
          emergencyPhone: '',
          createdAt: new Date().toISOString(),
        };
        
        setUser(newUser);
        localStorage.setItem('fitgen_user', JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitgen_user');
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      const updatedUser = { ...user, ...data };
      
      // Vérifier si le profil est complet
      const isComplete = checkProfileCompleteness(updatedUser);
      updatedUser.isProfileComplete = isComplete;
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      return false;
    }
  };

  const checkProfileCompleteness = (user: User): boolean => {
    const requiredFields = [
      'name', 'email', 'age', 'height', 'weight', 'goal', 
      'level', 'mainObjective', 'trainingFrequency', 'trainingDuration'
    ];
    
    return requiredFields.every(field => {
      const value = user[field as keyof User];
      return value !== undefined && value !== null && value !== '';
    });
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};
