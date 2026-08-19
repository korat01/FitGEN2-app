import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Play, Apple, BarChart3, User, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { user } = useAuth();
  const simplified = user?.simplifiedMode === true;
  const isCoach = user?.isCoach === true;
  const isActive = (path: string) => location.pathname === path || (path === '/coaching' && location.pathname.startsWith('/coaching'));

  const navItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    isCoach
      ? { path: '/coaching', icon: Users, label: t('nav.coaching') }
      : { path: '/programme', icon: Play, label: t('nav.programme') },
    { path: '/nutrition', icon: Apple, label: t('nav.nutrition') },
    { path: '/stats', icon: BarChart3, label: t('nav.stats') },
    { path: '/profile', icon: User, label: t('nav.profile') }
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
                  style={simplified ? undefined : { boxShadow: '0 0 18px hsl(var(--secondary) / 0.35)' }}
                />
              )}
              <div className={`relative transition-transform duration-300 ${
                active && !simplified ? 'scale-110' : ''
              }`}>
                {Icon && (
                  <Icon
                    className={`w-6 h-6 transition-all duration-300 ${
                      active
                        ? `stroke-[2.5] ${simplified ? '' : 'drop-shadow-[0_0_14px_hsl(var(--secondary)/0.95)]'}`
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