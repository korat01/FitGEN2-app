import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ExerciseProvider } from './contexts/ExerciseContext';
import { QuestProvider } from './contexts/QuestContext';
import { ThemeProvider } from './lib/theme-provider';
import { Toaster } from './components/ui/toaster';

// Composants
import PageLayout from './components/PageLayout';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { ParticleContainer } from './components/ParticleContainer';
import { useParticles } from './hooks/useParticles';

// Lazy loading des pages
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Stats = lazy(() => import('./pages/Stats'));
const ProfileSummary = lazy(() => import('./pages/ProfileSummary'));
const Programme = lazy(() => import('./pages/Programme'));
const BlocsEntrainement = lazy(() => import('./pages/BlocsEntrainement'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Nutrition = lazy(() => import('./pages/Nutrition'));
const AlimentDetail = lazy(() => import('./pages/AlimentDetail'));
const RepasDetail = lazy(() => import('./pages/RepasDetail'));
const DailyQuests = lazy(() => import('./components/DailyQuests'));
const UITestPage = lazy(() => import('./pages/UITestPage'));
const UICustomizer = lazy(() => import('./pages/UICustomizer'));
const VitalForcePage = lazy(() => import('./pages/VitalForcePage'));

// Composant de chargement
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-lg text-gray-600">Chargement...</p>
    </div>
  </div>
);

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
  const { particles, spawnClickParticles } = useParticles();

  // Effet de clic global sur les éléments interactifs
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Ne déclencher que sur les boutons et éléments interactifs
      if (
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]')
      ) {
        spawnClickParticles(e as any);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [spawnClickParticles]);
  
  return (
      <>
      <ParticleContainer particles={particles} />
      <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
          {/* Route publique - Redirige vers dashboard si déjà connecté */}
            <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
          
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

          <Route path="/quetes" element={
            <ProtectedRoute>
              <PageLayout>
                <DailyQuests />
              </PageLayout>
            </ProtectedRoute>
          } />

          {/* Route de test UI/DA */}
          <Route path="/ui-test" element={
            <ProtectedRoute>
              <UITestPage />
            </ProtectedRoute>
          } />

          {/* Route de personnalisation UI/DA */}
          <Route path="/ui-customizer" element={
            <ProtectedRoute>
              <UICustomizer />
            </ProtectedRoute>
          } />
          
          {/* Route VitalForce */}
          <Route path="/vitalforce" element={
            <ProtectedRoute>
              <VitalForcePage />
            </ProtectedRoute>
          } />
          
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        
          <Toaster />
          <PWAInstallPrompt />
        </div>
      </Router>
      </>
  );
};

// Composant principal avec les providers
const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <QuestProvider>
          <ExerciseProvider>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <AppContent />
            </ThemeProvider>
          </ExerciseProvider>
        </QuestProvider>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
