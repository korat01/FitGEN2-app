import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, Home, Dumbbell, Apple, Calendar, User, Globe } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import UserDropdown from '@/components/UserDropdown';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const AppHeader: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => location.pathname === path;

  const handleProfileClick = () => {
    window.location.href = '/profile';
  };

  const handleSettingsClick = () => {
    window.location.href = '/settings';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border shadow-elegant">
      <div className={cn(
        "flex items-center justify-between py-3",
        isMobile ? "px-4" : "container mx-auto px-6"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent animate-bounce-in">
            FitGEN22
          </h1>
          
          {/* Navigation principale - cachée sur mobile */}
          {!isMobile && (
            <nav className="flex items-center space-x-1">
              <Link 
                to="/stats" 
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                  isActive("/stats") || isActive("/")
                    ? "bg-primary/10 text-primary shadow-glow" 
                    : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                )}
              >
                <BarChart3 className="w-4 h-4" />
                Stats
              </Link>
              <Link 
                to="/programme" 
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                  isActive("/programme")
                    ? "bg-primary/10 text-primary shadow-glow" 
                    : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                )}
              >
                <Dumbbell className="w-4 h-4" />
                Programme
              </Link>
              <Link 
                to="/nutrition" 
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                  isActive("/nutrition")
                    ? "bg-primary/10 text-primary shadow-glow" 
                    : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                )}
              >
                <Apple className="w-4 h-4" />
                Nutrition
              </Link>
            </nav>
          )}
        </div>

        {/* Actions utilisateur */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <UserDropdown
            userName="Alexandre"
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;