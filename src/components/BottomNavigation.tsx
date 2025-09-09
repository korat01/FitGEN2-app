import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Home, Dumbbell, Apple, Calendar, Scan } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: '/stats', label: 'Stats', icon: BarChart3 },
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/programme', label: 'Programme', icon: Dumbbell },
    { path: '/nutrition', label: 'Nutrition', icon: Apple },
    { path: '/planning', label: 'Planning', icon: Calendar },
    { path: '/scan', label: 'Scan', icon: Scan },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-6 h-16">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive(item.path)
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive(item.path) ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation; 