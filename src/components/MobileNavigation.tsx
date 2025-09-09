import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, BarChart3, Home, Dumbbell, Apple, Calendar, Scan, User, Settings, Crown, LogOut } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import UserDropdown from '@/components/UserDropdown';

const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleProfileClick = () => {
    setIsOpen(false);
    window.location.href = '/profile';
  };

  const handleSettingsClick = () => {
    setIsOpen(false);
    window.location.href = '/settings';
  };

  const handleProClick = () => {
    setIsOpen(false);
    window.location.href = '/pro';
  };

  const handleLogout = () => {
    setIsOpen(false);
    console.log('Déconnexion');
  };

  const navigationItems = [
    { path: '/stats', label: 'Stats', icon: BarChart3 },
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/programme', label: 'Programme', icon: Dumbbell },
    { path: '/nutrition', label: 'Nutrition', icon: Apple },
    { path: '/planning', label: 'Planning', icon: Calendar },
    { path: '/scan', label: 'Scan', icon: Scan },
  ];

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="text-black">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 bg-white">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                FitGEN22
              </h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-black"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-lg font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User section */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-3 mb-4">
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation; 