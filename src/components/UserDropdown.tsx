import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Settings, Crown, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700 transition-all duration-300 group"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="hidden md:block text-sm font-medium text-black group-hover:text-purple-700">
          {userName}
        </span>
        <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-full mt-2 w-64 bg-white border-2 border-slate-300 shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
          <CardContent className="p-2">
            <div className="space-y-1">
              <Button
                onClick={handleProfileClick}
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700 transition-all duration-300 text-black"
              >
                <User className="w-4 h-4 text-black" />
                <span className="font-medium text-black">Profil</span>
              </Button>

              <Button
                onClick={handleSettingsClick}
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700 transition-all duration-300 text-black"
              >
                <Settings className="w-4 h-4 text-black" />
                <span className="font-medium text-black">Paramètres</span>
              </Button>

              <Button
                onClick={handleProClick}
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-2 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 hover:text-orange-700 transition-all duration-300 text-black"
              >
                <Crown className="w-4 h-4 text-black" />
                <span className="font-medium text-black">Devenir Pro</span>
              </Button>

              <div className="border-t border-slate-200 my-1"></div>

              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-2 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 transition-all duration-300 text-black"
              >
                <LogOut className="w-4 h-4 text-black" />
                <span className="font-medium text-black">Déconnexion</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserDropdown; 