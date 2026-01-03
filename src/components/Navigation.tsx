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
    <nav className="p-4">
      <div className="space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ease-out group',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )
            }
          >
            {({ isActive }) => (
              <>
                {React.isValidElement(item.icon) ? (
                  item.icon
                ) : (
                  <item.icon className={cn(
                    'w-5 h-5 transition-transform duration-200',
                    isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  )} />
                )}
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant={isActive ? "secondary" : "outline"}
                    className={cn(
                      'ml-auto text-xs',
                      isActive && 'bg-white/20 text-primary-foreground border-white/30'
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
      
      {/* Section utilisateur */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="bg-secondary/50 p-4 rounded-xl">
          <div className="text-sm font-medium mb-2 text-foreground">Progression du jour</div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-3/4 transition-all duration-500"></div>
            </div>
            <span className="text-xs text-muted-foreground font-medium">75%</span>
          </div>
          <div className="text-xs text-muted-foreground">
            3 sur 4 objectifs atteints
          </div>
        </div>
      </div>
    </nav>
  );
};
