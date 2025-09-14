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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          {/* Logo FitGEN - 3 fois plus gros */}
          <img 
            src="/Logo_FITGEN_6_Calligraphique.png" 
            alt="FitGEN Logo" 
            className="h-24 w-auto"
          />
          
          {/* Navigation principale - plus grande */}
          {!isMobile && (
            <nav className="flex items-center space-x-1">
              <Link 
                to="/stats" 
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-base",
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
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-base",
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
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-base",
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