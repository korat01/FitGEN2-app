import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, Home, Dumbbell, Apple, Calendar, Scan, User, Globe } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import UserDropdown from '@/components/UserDropdown';

const AppHeader: React.FC = () => {
  const location = useLocation();

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border shadow-elegant">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-4">
            <h1 className="text-lg md:text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              FitGEN22
            </h1>
            
            {/* Navigation principale - hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <Link to="/" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/nutrition" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Nutrition
              </Link>
              <Link to="/blocs-entrainement" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Exercices
              </Link>
              <Link to="/programme" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Programme
              </Link>
            </nav>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <UserDropdown
              userName="Alexandre"
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