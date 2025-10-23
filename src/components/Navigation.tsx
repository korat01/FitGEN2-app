import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Badge } from './ui/badge';
import {
  Dumbbell,
  BarChart3,
  Apple,
  Calendar,
  Settings,
  Trophy,
  Users,
  Target,
  Palette,
  Wand2,
  Zap
} from 'lucide-react';
import CustomHomeIcon from './CustomHomeIcon';
import VitalForceTheme from '../config/VitalForceTheme';

const navigationItems = [
  { to: '/dashboard', icon: CustomHomeIcon, label: 'Accueil', badge: null },
  { to: '/programme', icon: Dumbbell, label: 'Programmes', badge: 'Nouveau' },
  { to: '/quetes', icon: Target, label: 'Quêtes', badge: '3' },
  { to: '/stats', icon: BarChart3, label: 'Statistiques', badge: null },
  { to: '/nutrition', icon: Apple, label: 'Nutrition', badge: null },
  { to: '/blocs-entrainement', icon: Calendar, label: 'Planning', badge: '3' },
  { to: '/communaute', icon: Users, label: 'Communauté', badge: null },
  { to: '/achievements', icon: Trophy, label: 'Succès', badge: null },
  { to: '/ui-test', icon: Palette, label: 'Test UI/DA', badge: 'Test' },
  { to: '/ui-customizer', icon: Wand2, label: '🎨 Personnaliser UI/DA', badge: 'HOT' },
  { to: '/vitalforce', icon: Zap, label: 'VitalForce', badge: 'NEW' },
  { to: '/settings', icon: Settings, label: 'Paramètres', badge: null }
];

export const Navigation: React.FC = () => {
  return (
    <>
      <style>{VitalForceTheme.animations.css}</style>
      <nav 
        className="p-6"
        style={{
          background: VitalForceTheme.colors.primary.darkBg,
          borderRight: `2px solid ${VitalForceTheme.colors.primary.purple}20`
        }}
      >
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden transform hover:scale-105',
                  isActive
                    ? 'text-white shadow-xl'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                )
              }
              style={({ isActive }) => ({
                background: isActive ? VitalForceTheme.colors.gradients.main : 'transparent',
                boxShadow: isActive ? `0 8px 32px ${VitalForceTheme.colors.glow.purple}` : 'none',
                border: isActive ? `2px solid ${VitalForceTheme.colors.primary.purple}40` : '2px solid transparent'
              })}
            >
            {({ isActive }) => (
              <>
                {React.isValidElement(item.icon) ? (
                  React.cloneElement(item.icon as React.ReactElement, {
                    size: 20,
                    className: cn(
                      'transition-transform group-hover:scale-110',
                      isActive && 'text-white',
                      !isActive && 'text-gray-400'
                    )
                  })
                ) : (
                  <item.icon className={cn(
                    'w-5 h-5 transition-transform group-hover:scale-110',
                    isActive && 'text-white',
                    !isActive && 'text-gray-400'
                  )} />
                )}
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <Badge 
                    className={cn(
                      'ml-auto text-xs px-2 py-1 rounded-full',
                      isActive 
                        ? 'bg-white/20 text-white border-white/30' 
                        : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    )}
                    style={{
                      boxShadow: isActive ? `0 0 8px ${VitalForceTheme.colors.glow.purple}` : 'none'
                    }}
                  >
                    {item.badge}
                  </Badge>
                )}
                
                {/* Effet de survol */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </>
            )}
          </NavLink>
        ))}
      </div>
      
      {/* Section utilisateur */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="glass-card p-4 rounded-xl">
          <div className="text-sm font-medium mb-2">Progression du jour</div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-white/10 rounded-full h-2">
              <div className="gradient-success h-2 rounded-full w-3/4"></div>
            </div>
            <span className="text-xs text-muted-foreground">75%</span>
          </div>
          <div className="text-xs text-muted-foreground">
            3 sur 4 objectifs atteints
          </div>
        </div>
        </div>
      </nav>
    </>
  );
}; 