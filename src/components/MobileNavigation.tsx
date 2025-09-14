import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Dumbbell, Apple, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNavigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      to: "/stats",
      icon: BarChart3,
      label: "Stats",
      isActive: isActive("/stats") || isActive("/")
    },
    {
      to: "/programme",
      icon: Dumbbell,
      label: "Sport",
      isActive: isActive("/programme")
    },
    {
      to: "/nutrition",
      icon: Apple,
      label: "Nutrition",
      isActive: isActive("/nutrition")
    },
    {
      to: "/profile",
      icon: User,
      label: "Profil",
      isActive: isActive("/profile")
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border shadow-float">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 mobile-nav-item",
              item.isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div className={cn(
              "p-2 rounded-lg transition-all duration-300",
              item.isActive 
                ? "bg-primary/10 shadow-glow" 
                : "hover:bg-muted/50"
            )}>
              <item.icon className={cn(
                "w-5 h-5 transition-all duration-300",
                item.isActive ? "scale-110" : ""
              )} />
            </div>
            <span className={cn(
              "text-xs font-medium transition-all duration-300",
              item.isActive ? "scale-105" : ""
            )}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;