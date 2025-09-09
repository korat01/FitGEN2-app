import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, Home, Dumbbell, Apple, Calendar, Scan, User, Globe } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const AppHeader: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="group">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 transition-all duration-300">
                FitGEN22
              </h1>
            </Link>
            
            {/* Navigation principale */}
            <nav className="hidden lg:flex items-center space-x-2">
              <Link 
                to="/stats" 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  isActive('/stats') 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105' 
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Stats</span>
              </Link>
              <Link 
                to="/dashboard" 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  isActive('/dashboard') 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105' 
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/programme" 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  isActive('/programme') 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105' 
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Dumbbell className="w-5 h-5" />
                <span>Programme</span>
              </Link>
              <Link 
                to="/nutrition" 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  isActive('/nutrition') 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105' 
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Apple className="w-5 h-5" />
                <span>Nutrition</span>
              </Link>
              <Link 
                to="/planning" 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  isActive('/planning') 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105' 
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span>Planning</span>
              </Link>
              <Link 
                to="/scan" 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  isActive('/scan') 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105' 
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Scan className="w-5 h-5" />
                <span>Scan</span>
              </Link>
            </nav>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <User className="w-5 h-5 text-slate-700 group-hover:text-slate-900 transition-colors duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;