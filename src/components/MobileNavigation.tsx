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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-2xl border-t border-border/50">
      <div className="safe-area-pb flex items-center justify-around h-16 px-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 active:scale-95 ${
              isActive(path)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {isActive(path) && (
              <div className="absolute inset-0 bg-primary/10 rounded-2xl" />
            )}
            <div className={`relative transition-transform ${isActive(path) ? 'scale-110' : ''}`}>
              <Icon className={`w-5 h-5 ${isActive(path) ? 'stroke-[2.5]' : 'stroke-2'}`} />
            </div>
            <span className={`text-[10px] font-medium ${isActive(path) ? 'font-semibold' : ''}`}>
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
