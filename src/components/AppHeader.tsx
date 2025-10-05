import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, Home, Dumbbell, Apple, Calendar, Scan, User, Globe } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import UserDropdown from '@/components/UserDropdown';
import { useAuth } from '../contexts/AuthContext';

const AppHeader: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleProfileClick = () => {
    window.location.href = '/profile';
  };

  const handleSettingsClick = () => {
    window.location.href = '/settings';
  };

  const handleProClick = () => {
    window.location.href = '/pro';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-2xl border-b border-border/50 safe-area-pt">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5 md:gap-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg md:hidden">
              <span className="text-primary-foreground font-bold text-base">FG</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              <span className="hidden md:inline">FitGEN22</span>
              <span className="md:hidden">FitGEN</span>
            </h1>
            
            {/* Navigation principale - hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/nutrition" className="text-foreground/70 hover:text-foreground transition-colors">
                Nutrition
              </Link>
              <Link to="/blocs-entrainement" className="text-foreground/70 hover:text-foreground transition-colors">
                Exercices
              </Link>
              <Link to="/programme" className="text-foreground/70 hover:text-foreground transition-colors">
                Programme
              </Link>
            </nav>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center gap-1.5 md:gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <UserDropdown
              userName={user?.name || user?.firstName || 'Utilisateur'}
              onProfileClick={handleProfileClick}
              onSettingsClick={handleSettingsClick}
              onProClick={handleProClick}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;