import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, Dumbbell, Apple, User } from 'lucide-react';

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', icon: Home, label: 'Accueil' },
    { path: '/stats', icon: BarChart3, label: 'Stats' },
    { path: '/programme', icon: Dumbbell, label: 'Programme' },
    { path: '/nutrition', icon: Apple, label: 'Nutrition' },
    { path: '/profile', icon: User, label: 'Profil' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/98 backdrop-blur-xl border-t border-border shadow-elegant">
      <div className="safe-area-pb flex items-center justify-around h-16">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 transition-all duration-200 active:scale-95 ${
              isActive(path)
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <div className={`relative ${isActive(path) ? 'scale-110' : ''} transition-transform`}>
              <Icon className="w-6 h-6" />
              {isActive(path) && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </div>
            <span className="text-[10px] font-medium mt-0.5">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
