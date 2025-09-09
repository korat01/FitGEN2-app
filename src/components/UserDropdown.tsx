import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Settings, Crown, LogOut, ChevronDown } from 'lucide-react';

interface UserDropdownProps {
  userName: string;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onProClick: () => void;
  onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  userName,
  onProfileClick,
  onSettingsClick,
  onProClick,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    onProfileClick();
    setIsOpen(false);
  };

  const handleSettingsClick = () => {
    onSettingsClick();
    setIsOpen(false);
  };

  const handleProClick = () => {
    onProClick();
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="relative overflow-hidden flex items-center gap-3 text-black hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 px-4 py-2 rounded-lg transition-all duration-300 group"
      >
        {/* Avatar avec gradient */}
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
        
        {/* Nom avec gradient */}
        <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:animate-pulse">
          {userName}
        </span>
        
        {/* Badge PRO */}
        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
          <Crown className="w-3 h-3 text-white" />
          <span className="text-xs font-bold text-white">PRO</span>
        </div>
        
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-full mt-2 w-56 z-50 shadow-xl border-0 bg-white">
          <CardContent className="p-2">
            <div className="space-y-1">
              <Button
                variant="ghost"
                onClick={handleProfileClick}
                className="w-full justify-start text-gray-700 hover:bg-gray-100 h-12 px-4 rounded-lg transition-colors"
              >
                <User className="w-5 h-5 mr-3 text-gray-600" />
                <span className="font-medium">Profil</span>
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleSettingsClick}
                className="w-full justify-start text-gray-700 hover:bg-gray-100 h-12 px-4 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 mr-3 text-gray-600" />
                <span className="font-medium">Paramètres</span>
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleProClick}
                className="w-full justify-start text-gray-700 hover:bg-gray-100 h-12 px-4 rounded-lg transition-colors"
              >
                <Crown className="w-5 h-5 mr-3 text-yellow-600" />
                <span className="font-medium">Devenir Pro</span>
              </Button>
              
              <div className="border-t border-gray-200 my-2"></div>
              
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-red-600 hover:bg-red-50 h-12 px-4 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3 text-red-600" />
                <span className="font-medium">Déconnexion</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserDropdown; 