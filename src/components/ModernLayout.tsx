import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import MobileNavigation from './MobileNavigation';
import UserDropdown from './UserDropdown';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../contexts/AuthContext';
import { useIsMobile } from '../hooks/use-mobile';
import { Bell, Search, Menu, ArrowLeft, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { VitalForceLogo } from './VitalForceLogo';

export const ModernLayout: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#0A0E1F]">
      {/* Header VitalForce style */}
      <header className="sticky top-0 z-50 glass-card border-b border-[rgba(107,42,255,0.2)]">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          {/* Logo et menu mobile */}
          <div className="flex items-center gap-4">
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-white/20"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center gap-3">
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-[rgba(107,42,255,0.1)]"
                >
                  <ArrowLeft className="h-5 w-5 text-foreground" />
                </Button>
              )}
              <div className="flex items-center gap-2">
                <VitalForceLogo size={28} glow={true} />
                <span className="font-bold text-xl text-white tracking-wide" style={{
                  textShadow: '0 0 20px rgba(107, 42, 255, 0.5)',
                }}>
                  VitalForce
                </span>
              </div>
            </div>
          </div>

          {/* Barre de recherche centrale */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un exercice, un programme..."
                className="pl-10 glass-card border-[rgba(107,42,255,0.2)] focus:border-[rgba(107,42,255,0.5)] focus:shadow-[var(--shadow-glow-purple)] transition-all duration-200 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-[rgba(107,42,255,0.1)] transition-colors"
            >
              <Bell className="h-5 w-5 text-white icon-glow" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0A0E1F]"></div>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-[rgba(107,42,255,0.1)] transition-colors"
            >
              <Mic className="h-5 w-5 text-white" />
            </Button>
            
            <LanguageSwitcher />
            
            {user && <UserDropdown 
              userName={user.name || user.firstName || 'Utilisateur'}
              onProfileClick={() => window.location.href = '/profile'}
              onSettingsClick={() => window.location.href = '/settings'}
              onProClick={() => window.location.href = '/pro'}
            />}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {!isMobile && (
          <aside className="w-64 glass-card border-r border-[rgba(107,42,255,0.2)] min-h-[calc(100vh-4rem)] sticky top-16">
            <Navigation />
          </aside>
        )}

        {/* Contenu principal */}
        <main className="flex-1 overflow-hidden">
          <div className="container mx-auto p-6 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Navigation mobile */}
      {isMobile && <MobileNavigation />}
      
      {/* Overlay mobile sidebar */}
      {isMobile && sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] glass-card border-r border-[rgba(107,42,255,0.2)] z-50 animate-slide-up">
            <Navigation />
          </aside>
        </>
      )}
    </div>
  );
}; 