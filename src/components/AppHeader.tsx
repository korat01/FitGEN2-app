import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, Home, Dumbbell, Apple, Calendar, Scan, User, Sparkles, Globe } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import UserDropdown from '@/components/UserDropdown';

const AppHeader: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleProfileClick = () => {
    // Navigation vers la page de profil
    window.location.href = '/profile';
  };

  const handleSettingsClick = () => {
    // Navigation vers les paramètres
    window.location.href = '/settings';
  };

  const handleProClick = () => {
    // Navigation vers la page Pro
    window.location.href = '/pro';
  };

  const handleLogout = () => {
    // Logique de déconnexion
    console.log('Déconnexion');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              FitGEN22
            </h1>
            
            {/* Navigation principale */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link to="/stats" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">
                <BarChart3 className="w-4 h-4" />
                <span className="text-black">Stats</span>
              </Link>
              <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">
                <Home className="w-4 h-4" />
                <span className="text-black">Accueil</span>
              </Link>
              <Link to="/programme" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">
                <Dumbbell className="w-4 h-4" />
                <span className="text-black">Programme</span>
              </Link>
              <Link to="/nutrition" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">
                <Apple className="w-4 h-4" />
                <span className="text-black">Nutrition</span>
              </Link>
              <Link to="/planning" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="text-black">Planning</span>
              </Link>
              <Link to="/scan" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">
                <Scan className="w-4 h-4" />
                <span className="text-black">Scan</span>
              </Link>
            </nav>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <UserDropdown
              userName="Alexandre"
              onProfileClick={handleProfileClick}
              onSettingsClick={handleSettingsClick}
              onProClick={handleProClick}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;