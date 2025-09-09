import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, Home, Dumbbell, Apple, Calendar, Scan, User, Sparkles, Globe } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const AppHeader: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et navigation */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 group">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                FitGEN22
              </h1>
            </div>
            
            {/* Navigation principale */}
            <nav className="hidden lg:flex items-center space-x-2">
              <Link 
                to="/stats" 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  isActive('/stats') 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'text-slate-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Stats
              </Link>
              <Link 
                to="/dashboard" 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  isActive('/dashboard') 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'text-slate-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700'
                }`}
              >
                <Home className="w-4 h-4" />
                Dashboard
              </Link>
              <Link 
                to="/programme" 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  isActive('/programme') 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'text-slate-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700'
                }`}
              >
                <Dumbbell className="w-4 h-4" />
                Programme
              </Link>
              <Link 
                to="/nutrition" 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  isActive('/nutrition') 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'text-slate-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700'
                }`}
              >
                <Apple className="w-4 h-4" />
                Nutrition
              </Link>
              <Link 
                to="/planning" 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  isActive('/planning') 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'text-slate-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Planning
              </Link>
              <Link 
                to="/scan" 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  isActive('/scan') 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'text-slate-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700'
                }`}
              >
                <Scan className="w-4 h-4" />
                Scan
              </Link>
            </nav>
          </div>

          {/* Actions utilisateur avec nom et langue */}
          <div className="flex items-center space-x-4">
            {/* Sélecteur de langue */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors duration-300">
              <Globe className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">FR</span>
            </div>
            
            {/* Nom d'utilisateur */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Alexandre Martin</span>
            </div>
            
            {/* Bouton utilisateur pour mobile */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden p-3 rounded-xl hover:bg-slate-100 transition-colors duration-300"
            >
              <User className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;