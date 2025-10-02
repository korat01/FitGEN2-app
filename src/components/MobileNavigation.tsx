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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border shadow-elegant safe-area-inset-bottom">
      <div className="flex items-center justify-around py-3 px-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              isActive(path)
                ? 'text-primary scale-105'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive(path) ? 'scale-110' : ''} transition-transform`} />
            <span className={`text-xs font-medium ${isActive(path) ? 'font-semibold' : ''}`}>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
