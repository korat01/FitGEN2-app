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
    <nav className="p-6">
      <div className="space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden',
                isActive
                  ? 'gradient-primary text-white shadow-[var(--shadow-glow-purple)] scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card/50 hover:border hover:border-primary/30 hover:shadow-[0_0_15px_rgba(107,42,255,0.2)] hover:scale-105 backdrop-blur-sm'
              )
            }
          >
            {({ isActive }) => (
              <>
                {React.isValidElement(item.icon) ? (
                  item.icon
                ) : (
                  <item.icon className={cn(
                    'w-5 h-5 transition-all duration-300 group-hover:scale-110',
                    isActive 
                      ? 'text-white icon-glow' 
                      : 'text-muted-foreground group-hover:text-foreground'
                  )} />
                )}
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <Badge 
                    className={cn(
                      'ml-auto text-xs',
                      isActive 
                        ? 'bg-white/20 text-white border-white/30' 
                        : 'bg-primary/10 text-primary border-primary/20'
                    )}
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
      <div className="mt-8 pt-6 border-t border-[rgba(107,42,255,0.2)]">
        <div className="glass-card p-4">
          <div className="text-sm font-semibold mb-3 text-foreground">Progression du jour</div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 vitalforce-progress">
              <div className="vitalforce-progress-bar w-3/4"></div>
            </div>
            <span className="text-xs font-semibold text-primary">75%</span>
          </div>
          <div className="text-xs text-muted-foreground">
            3 sur 4 objectifs atteints
          </div>
        </div>
      </div>
    </nav>
  );
}; 