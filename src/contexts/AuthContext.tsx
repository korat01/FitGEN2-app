import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
  // Nouveaux champs pour le système de scoring
  weight?: number;
  age?: number;
  sex?: 'male' | 'female';
  profileType?: 'powerlifter' | 'runner' | 'allround' | 'calisthenics';
  weights?: {
    force: number;
    endurance: number;
    explosivite: number;
    calisthenics: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement de l'app
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: User) => {
    const userWithAuth = { ...userData, isAuthenticated: true };
    setUser(userWithAuth);
    localStorage.setItem('user', JSON.stringify(userWithAuth));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Rediriger vers la page de connexion
    window.location.href = '/login';
  };

  const isAuthenticated = user?.isAuthenticated || false;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
