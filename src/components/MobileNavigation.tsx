import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Play, Square, Mail, User } from 'lucide-react';
import { VitalForceLogo } from './VitalForceLogo';

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', icon: Home, label: 'Accueil' },
    { path: '/programme', icon: Play, label: 'Programme' },
    { path: '/vitalforce', icon: null, label: 'VitalForce', isLogo: true },
    { path: '/stats', icon: Mail, label: 'Stats' },
    { path: '/profile', icon: User, label: 'Profil' }
  ];
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 gaming-nav">
      <div className="safe-area-pb flex items-center justify-around h-16 px-2">
        {navItems.map(({ path, icon: Icon, label, isLogo }) => {
          const active = isActive(path);
          
          if (isLogo) {
            return (
              <Link
                key={path}
                to={path}
                className={`relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 active:scale-95 ${
                  active ? 'text-secondary' : 'text-muted-foreground'
                }`}
              >
                {active && (
                  <div className="absolute inset-0 gradient-primary opacity-20 rounded-xl border border-[rgba(107,42,255,0.4)]" />
                )}
                <div className={`relative transition-transform duration-300 ${
                  active ? 'scale-110' : ''
                }`}>
                  <VitalForceLogo size={28} glow={active} />
                </div>
              </Link>
            );
          }
          
          return (
            <Link
              key={path}
              to={path}
              className={`relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 active:scale-95 ${
                active 
                  ? 'text-secondary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {active && (
                <div className="absolute inset-0 bg-secondary/10 rounded-xl border border-secondary/30" />
              )}
              <div className={`relative transition-transform duration-300 ${
                active ? 'scale-110' : ''
              }`}>
                {Icon && (
                  <Icon 
                    className={`w-5 h-5 transition-all duration-300 ${
                      active 
                        ? 'stroke-[2.5] drop-shadow-[0_0_10px_rgba(0,194,255,0.8)]' 
                        : 'stroke-2'
                    }`} 
                  />
                )}
              </div>
              <span className={`text-[10px] font-medium ${
                active ? 'font-semibold text-secondary' : ''
              }`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;