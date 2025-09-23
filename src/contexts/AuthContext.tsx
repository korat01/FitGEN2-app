import React, { createContext, useContext, useState, useEffect } from 'react';
import { scoringEngine } from '../utils/scoring';

export interface User {
  id: string;
  name: string;
  email: string;
  weight: number;
  age: number;
  sex: 'male' | 'female';
  sportClass: string;
  rank?: string;
  globalScore?: number;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger l'utilisateur depuis le localStorage au démarrage
  useEffect(() => {
    console.log('🔄 Chargement de l\'utilisateur depuis localStorage...');
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        console.log('✅ Utilisateur chargé:', userData);
        
        // Recalculer le rang au chargement
        const savedPerformances = localStorage.getItem('userPerformances');
        if (savedPerformances) {
          const performancesList = JSON.parse(savedPerformances);
          console.log('📊 Performances chargées:', performancesList);
          
          const realRank = scoringEngine.calculateUserRank(userData, performancesList);
          
          // Mettre à jour avec le vrai rang
          const updatedUser = {
            ...userData,
            rank: realRank.rank,
            globalScore: realRank.globalScore
          };
          
          setUser(updatedUser);
          localStorage.setItem('userData', JSON.stringify(updatedUser));
          
          console.log('✅ Rang recalculé au chargement:', realRank);
        } else {
          console.log('⚠️ Aucune performance trouvée');
        }
      } catch (error) {
        console.error('❌ Erreur lors du chargement des données utilisateur:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Sauvegarder automatiquement les changements d'utilisateur
  useEffect(() => {
    if (user) {
      console.log('💾 Sauvegarde de l\'utilisateur:', user);
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }, [user]);

  const login = (userData: User) => {
    console.log('🔐 Fonction login appelée avec:', userData);
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log('✅ Utilisateur connecté et sauvegardé');
  };

  const logout = () => {
    console.log('🚪 Déconnexion de l\'utilisateur');
    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('userPerformances');
  };

  const updateUser = (updatedUser: Partial<User>) => {
    console.log('🔄 Mise à jour de l\'utilisateur:', updatedUser);
    setUser(prev => {
      if (!prev) return null;
      const newUser = { ...prev, ...updatedUser };
      console.log('✅ Utilisateur mis à jour:', newUser);
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
