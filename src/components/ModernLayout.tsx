import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SoundButton } from '@/components/ui/sound-button';
import { 
  Menu, X, Home, BarChart3, Dumbbell, Heart, Users, 
  Settings, Bell, Search, Sun, Moon, Zap 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSounds } from '../utils/sounds';

interface ModernLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  showProgress?: boolean;
  progressValue?: number;
  progressLabel?: string;
}

export const ModernLayout: React.FC<ModernLayoutProps> = ({
  children,
  title,
  subtitle,
  icon,
  showProgress = false,
  progressValue = 0,
  progressLabel = "Progression"
}) => {
  const { user } = useAuth();
  const { playClick, playNotification } = useSounds();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, active: true },
    { name: 'Stats', href: '/stats', icon: BarChart3, active: false },
    { name: 'Programme', href: '/programme', icon: Dumbbell, active: false },
    { name: 'Nutrition', href: '/nutrition', icon: Heart, active: false },
    { name: 'Profil', href: '/profile', icon: Users, active: false },
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${darkMode ? 'bg-gray-800' : 'bg-white/90 backdrop-blur-sm'} shadow-2xl`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">FitGEN</span>
            </div>
            <SoundButton
              soundType="click"
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </SoundButton>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {navigationItems.map((item) => (
              <SoundButton
                key={item.name}
                soundType="click"
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  item.active 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </SoundButton>
            ))}
          </nav>

          {/* User info */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{user?.name?.[0] || 'U'}</span>
              </div>
              <div>
                <div className="font-semibold text-gray-800">{user?.name || 'Utilisateur'}</div>
                <div className="text-sm text-gray-500">Rang A</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Top bar */}
        <header className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm border-b border-gray-200 shadow-sm`}>
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <SoundButton
                soundType="click"
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </SoundButton>
              
              <div className="flex items-center gap-3">
                {icon && (
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                    {icon}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                  {subtitle && <p className="text-gray-600">{subtitle}</p>}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Notifications */}
              <SoundButton
                soundType="notification"
                onClick={() => playNotification()}
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </SoundButton>

              {/* Dark mode toggle */}
              <SoundButton
                soundType="click"
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </SoundButton>

              {/* Settings */}
              <SoundButton
                soundType="click"
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Settings className="w-5 h-5" />
              </SoundButton>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {/* Header card */}
          <Card className={`mb-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-0'} shadow-xl`}>
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl">
                      {icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">
                        {getGreeting()}, {user?.name || "Champion"} !
                      </h2>
                      <p className="text-gray-600 text-lg">{subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg">
                      <span className="text-xl">🏆</span>
                      <span>Rang A</span>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm">
                      <Zap className="w-4 h-4" />
                      <span>7 jours de streak</span>
                    </div>
                  </div>
                </div>

                {showProgress && (
                  <div className="lg:text-right space-y-4">
                    <div className="text-gray-600 font-medium">{progressLabel}</div>
                    <div className="w-80">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${progressValue}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-800 font-bold text-xl">{progressValue}</span> 
                      <span className="text-gray-600"> / 100 points</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Page content */}
          <div className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {children}
          </div>
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}; 