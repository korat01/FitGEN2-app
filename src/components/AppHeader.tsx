import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Dumbbell, Apple, Activity, Menu, X, Bell, User } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import UserDropdown from '@/components/UserDropdown';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const AppHeader: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const isActive = (p: string) => location.pathname === p;

  const nav = [
    { to: '/stats', label: 'Stats', icon: BarChart3 },
    { to: '/programme', label: 'Programme', icon: Dumbbell },
    { to: '/exercices', label: 'Exercices', icon: Activity },
    { to: '/nutrition', label: 'Nutrition', icon: Apple },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-app">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/Logo_FITGEN_6_Calligraphique.png" alt="FitGEN" className="h-8 w-auto" />
            <span className="hidden sm:block font-semibold">FitGEN</span>
          </Link>

          {!isMobile && (
            <nav className="flex items-center gap-1">
              {nav.map((n) => {
                const Icon = n.icon;
                return (
                  <Link key={n.to} to={n.to} className={cn('nav-link', isActive(n.to) && 'active')}>
                    <Icon className="w-4 h-4 mr-2" /> {n.label}
                  </Link>
                );
              })}
            </nav>
          )}

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <LanguageSwitcher />
            <UserDropdown userName="Alexandre" onProfileClick={() => (window.location.href = '/profile')} onSettingsClick={() => (window.location.href = '/settings')} />
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setOpen((v) => !v)}>
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            )}
          </div>
        </div>

        {isMobile && open && (
          <nav className="border-t py-2">
            {nav.map((n) => {
              const Icon = n.icon;
              return (
                <Link key={n.to} to={n.to} className={cn('nav-link block', isActive(n.to) && 'active')} onClick={() => setOpen(false)}>
                  <Icon className="w-4 h-4 mr-2 inline-block" /> {n.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};

export default AppHeader;