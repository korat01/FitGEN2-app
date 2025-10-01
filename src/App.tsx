import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './lib/theme-provider';
import { Toaster } from './components/ui/toaster';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';
import ProfileSummary from './pages/ProfileSummary';
import Programme from './pages/Programme';
import BlocsEntrainement from './pages/BlocsEntrainement';
import NotFound from './pages/NotFound';
import Nutrition from './pages/Nutrition';
import AlimentDetail from './pages/AlimentDetail';
import RepasDetail from './pages/RepasDetail';

// Composants
import PageLayout from './components/PageLayout';

// Composant pour protéger les routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Composant principal de l'application
const AppContent: React.FC = () => {
  const { user } = useAuth();
  
  return (
      <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <Routes>
          {/* Route publique */}
            <Route path="/login" element={<Login />} />
          
          {/* Routes protégées */}
          <Route path="/" element={
            <ProtectedRoute>
              <PageLayout>
                <Dashboard />
              </PageLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <PageLayout>
                <Dashboard />
              </PageLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/stats" element={
            <ProtectedRoute>
              <PageLayout>
                <Stats />
              </PageLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <PageLayout>
                <ProfileSummary />
              </PageLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/programme" element={
            <ProtectedRoute>
              <PageLayout>
                <Programme />
              </PageLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/blocs-entrainement" element={
            <ProtectedRoute>
              <PageLayout>
                <BlocsEntrainement />
              </PageLayout>
            </ProtectedRoute>
          } />

          <Route path="/nutrition" element={
            <ProtectedRoute>
              <PageLayout>
                <Nutrition />
              </PageLayout>
            </ProtectedRoute>
          } />

          <Route path="/aliment/:id" element={
            <ProtectedRoute>
              <PageLayout>
                <AlimentDetail />
              </PageLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/repas/:id" element={
            <ProtectedRoute>
              <PageLayout>
                <RepasDetail />
              </PageLayout>
            </ProtectedRoute>
          } />
          
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        
          <Toaster />
        </div>
      </Router>
  );
};

// Composant principal avec les providers
const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <AppContent />
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
