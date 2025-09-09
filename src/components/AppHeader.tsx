import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { User, LogOut, Settings, Home, BarChart3, Calendar, Dumbbell, Apple, Scan } from 'lucide-react';

const AppHeader = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              FitGEN22
            </span>
          </Link>
          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/planning" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/planning' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Planning
              </Link>
              <Link 
                to="/nutrition" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/nutrition' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Nutrition
              </Link>
              <Link 
                to="/blocs-entrainement" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/blocs-entrainement' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Blocs
              </Link>
              <Link 
                to="/stats" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/stats' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Stats
              </Link>
            </nav>
          )}
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <LanguageSwitcher />
          </div>
          <nav className="flex items-center space-x-1">
            <Link to="/stats" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100">
              <BarChart3 className="w-4 h-4" />
              Stats
            </Link>
            <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100">
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <Link to="/programme" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100">
              <Dumbbell className="w-4 h-4" />
              Programme
            </Link>
            <Link to="/nutrition" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100">
              <Apple className="w-4 h-4" />
              Nutrition
            </Link>
            <Link to="/planning" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100">
              <Calendar className="w-4 h-4" />
              Planning
            </Link>
            <Link to="/scan" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100">
              <Scan className="w-4 h-4" />
              Scan
            </Link>
          </nav>
          <nav className="flex items-center space-x-2">
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile-summary" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Mon Profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Modifier le profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;