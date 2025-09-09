import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AppHeader from "@/components/AppHeader";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import Programme from "./pages/Programme";
import Nutrition from "./pages/Nutrition";
import Scan from "./pages/Scan";
import Developer from "./pages/Developer";
import BlocsEntrainement from "./pages/BlocsEntrainement";
import NotFound from "./pages/NotFound";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar, Target, Dumbbell, Clock, Settings, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import Planning from "./pages/Planning";
import Repas from './pages/Repas';
import RecetteDetail from './pages/RecetteDetail';
import AlimentDetail from './pages/AlimentDetail';
import Stats from './pages/Stats';
import ProfileSummary from './pages/ProfileSummary';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen bg-background">
                <AppHeader />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/profile-summary" element={<ProtectedRoute><ProfileSummary /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProfileSummary />} />
                    <Route path="/planning" element={<ProtectedRoute><Planning /></ProtectedRoute>} />
                    <Route path="/nutrition" element={<ProtectedRoute><Nutrition /></ProtectedRoute>} />
                    <Route path="/nutrition/:id" element={<AlimentDetail />} />
                    <Route path="/blocs-entrainement" element={<ProtectedRoute><BlocsEntrainement /></ProtectedRoute>} />
                    <Route path="/scan" element={<ProtectedRoute><Scan /></ProtectedRoute>} />
                    <Route path="/overview" element={<ProtectedRoute><Overview /></ProtectedRoute>} />
                    <Route path="/programme" element={<Programme />} />
                    <Route path="/repas" element={<Repas />} />
                    <Route path="/repas/:id" element={<RecetteDetail />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
