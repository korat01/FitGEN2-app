import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Play, Apple, BarChart3, User } from 'lucide-react';

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Accueil' },
    { path: '/programme', icon: Play, label: 'Programme' },
    { path: '/nutrition', icon: Apple, label: 'Nutrition' },
    { path: '/stats', icon: BarChart3, label: 'Stats' },
    { path: '/profile', icon: User, label: 'Profil' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 gaming-nav">
      {/* Pas de hauteur fixe : avec .safe-area-pb (padding-bottom) sur une boîte à hauteur figée,
          l'espace pour l'icône + le texte se retrouvait écrasé sur les iPhone à encoche/barre home
          (padding de sécurité ~34px grignotant une boîte de 64px), d'où les icônes qui débordaient.
          Ici le padding de sécurité s'AJOUTE à un padding normal, la hauteur suit le contenu. */}
      <div
        className="flex items-center justify-around px-2 pt-2 max-w-xl md:mx-auto"
        style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
      >
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = isActive(path);

          return (
            <Link
              key={path}
              to={path}
              className={`relative flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-300 active:scale-95 ${
                active
                  ? 'text-secondary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {active && (
                <div
                  className="absolute inset-0 bg-secondary/15 rounded-xl border border-secondary/40"
                  style={{ boxShadow: '0 0 18px hsl(var(--secondary) / 0.35)' }}
                />
              )}
              <div className={`relative transition-transform duration-300 ${
                active ? 'scale-110' : ''
              }`}>
                {Icon && (
                  <Icon
                    className={`w-6 h-6 transition-all duration-300 ${
                      active
                        ? 'stroke-[2.5] drop-shadow-[0_0_14px_hsl(var(--secondary)/0.95)]'
                        : 'stroke-[2.25]'
                    }`}
                  />
                )}
              </div>
              <span className={`text-[11px] font-medium leading-none ${
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