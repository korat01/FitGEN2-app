import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { scoringEngine } from '../utils/scoring';

export interface User {
  id: string;
  name: string;
  firstName?: string;
  email: string;
  weight: number;
  age: number;
  sex: 'male' | 'female';
  sportClass: string;
  rank?: string;
  globalScore?: number;
  /** Nom de l'unité de globalScore (ex: "IPF GL Points" vs "Score") — l'échelle diffère selon la méthode de calcul. */
  scoreLabel?: string;
  
  // Optional fields
  focus_trapezes?: any;
  focus_avant_bras?: any;
  focus_mollets?: any;
  focus_ischio_jambiers?: any;
  focus_abdominaux?: any;
  focus_biceps?: any;
  focus_quadriceps?: any;
  focus_pectoraux?: any;
  duration?: number;
  level?: string;
  sport?: string;
  focus_calisthenics?: boolean;
  focus_explosivite?: boolean;
  focus_fessiers?: boolean;
  focus_jambes?: boolean;
  focus_abdos?: boolean;
  focus_epaules?: boolean;
  focus_bras?: boolean;
  focus_dos?: boolean;
  phone?: string;
  location?: string;
  height?: number;
  birthDate?: string;
  goal?: string;
  trainingDays?: any[];
  trainingMonths?: number;
  focus_squat?: any;
  focus_bench?: any;
  focus_deadlift?: any;
  focus_endurance?: any;
  focus_vo2max?: any;
  focus_economie?: any;
  generalLevel?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        const savedPerformances = localStorage.getItem('userPerformances');
        if (savedPerformances) {
          const performancesList = JSON.parse(savedPerformances);
          const realRank = scoringEngine.calculateUserRank(userData, performancesList);
          const updatedUser = {
            ...userData,
            rank: realRank.rank,
            globalScore: realRank.globalScore,
            scoreLabel: realRank.scoreLabel,
          };
          setUser(updatedUser);
          localStorage.setItem('userData', JSON.stringify(updatedUser));
        } else {
          setUser(userData);
        }
      } catch (error) {
        console.error('Erreur chargement utilisateur:', error);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }, [user]);

  const login = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('userPerformances');
  }, []);

  const updateUser = useCallback((updatedUser: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;

      // Évite un re-render + boucle si rien n'a changé (ex. rank/score)
      const hasChange = (Object.keys(updatedUser) as Array<keyof User>).some(
        (key) => prev[key] !== updatedUser[key]
      );
      if (!hasChange) return prev;

      return { ...prev, ...updatedUser };
    });
  }, []);

  const value = useMemo(
    () => ({ user, login, logout, updateUser, isLoading }),
    [user, login, logout, updateUser, isLoading]
  );

  return (
    <AuthContext.Provider value={value}>
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
