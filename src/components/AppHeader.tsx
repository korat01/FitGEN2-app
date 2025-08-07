import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dumbbell, UtensilsCrossed, Home, Code, ScanLine } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const AppHeader = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { t } = useLanguage();

  const navItems = isHomePage ? [] : [
    {
      path: '/dashboard',
      label: t('nav.home'),
      icon: Home,
    },
    {
      path: '/nutrition',
      label: t('nav.nutrition'),
      icon: UtensilsCrossed,
    },
    {
      path: '/scan',
      label: t('nav.scan'),
      icon: ScanLine,
    },
    {
      path: '/blocs-entrainement',
      label: t('nav.training'),
      icon: Dumbbell,
    },
    {
      path: '/developer',
      label: t('nav.developer'),
      icon: Code,
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={isHomePage ? "/" : "/dashboard"} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-lg blur-sm opacity-30"></div>
              <div className="relative p-2 gradient-primary rounded-lg shadow-glow">
                <Dumbbell className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FitGen Pro
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            <LanguageSwitcher />
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  asChild
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`
                    flex items-center space-x-2 transition-all duration-300
                    ${isActive(item.path) 
                      ? 'gradient-primary text-primary-foreground shadow-glow' 
                      : 'hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  <Link to={item.path}>
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;