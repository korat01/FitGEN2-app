import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { MobileNavigation } from './MobileNavigation';
import { UserDropdown } from './UserDropdown';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from '../contexts/AuthContext';
import { useMobile } from '../hooks/use-mobile';
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

export const ModernLayout: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header moderne */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/20 shadow-lg">
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FG</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FitGEN
              </span>
              <Badge variant="secondary" className="text-xs">
                v2.0
              </Badge>
            </div>
          </div>

          {/* Barre de recherche centrale */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un exercice, un programme..."
                className="pl-10 glass-effect border-white/30 focus:border-blue-400 transition-all duration-200"
              />
            </div>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-white/20 transition-colors"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs gradient-secondary border-0">
                3
              </Badge>
            </Button>
            
            <LanguageSwitcher />
            
            {user && <UserDropdown />}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {!isMobile && (
          <aside className="w-64 glass-effect border-r border-white/20 min-h-[calc(100vh-4rem)] sticky top-16">
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
          <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] glass-effect border-r border-white/20 z-50 animate-slide-up">
            <Navigation />
          </aside>
        </>
      )}
    </div>
  );
}; 