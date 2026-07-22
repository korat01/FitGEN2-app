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
import { CelebrationContainer } from './components/CelebrationContainer';
import { useParticles } from './hooks/useParticles';
import { useCelebration } from './hooks/useCelebration';

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
const RecetteDetail = lazy(() => import('./pages/RecetteDetail'));
const DailyQuests = lazy(() => import('./components/DailyQuests'));

// Composant de chargement
const LoadingSpinner = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-lg text-muted-foreground">Chargement...</p>
    </div>
  </div>
);

// Composant pour protéger les routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Chargement...</p>
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
  const { celebrations, removeCelebration } = useCelebration();

  // "Mode Hunter" — identité Solo Leveling (voir .hunter-mode dans index.css), réservée aux hauts
  // rangs (S/Nation/World), chacun avec sa propre identité : S (.hunter-s, rouge sombre/braise),
  // Nation (.hunter-nation, violet dominant), World (.hunter-world, noir/gris/bleu glacé).
  // Uniquement des classes sur <html> : rien d'autre à défaire si ça ne va pas.
  useEffect(() => {
    const isHunterRank = user?.rank === 'S' || user?.rank === 'Nation' || user?.rank === 'World';
    const isSRank = user?.rank === 'S';
    const isWorldRank = user?.rank === 'World';
    const isNationRank = user?.rank === 'Nation';
    document.documentElement.classList.toggle('hunter-mode', isHunterRank);
    document.documentElement.classList.toggle('hunter-s', isSRank);
    document.documentElement.classList.toggle('hunter-world', isWorldRank);
    document.documentElement.classList.toggle('hunter-nation', isNationRank);
    return () => {
      document.documentElement.classList.remove('hunter-mode', 'hunter-s', 'hunter-world', 'hunter-nation');
    };
  }, [user?.rank]);

  // Effet de clic global sur les éléments interactifs
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]')
      ) {
        spawnClickParticles(e as any);
      }
    };

    document.addEventListener('click', handleClick, { passive: true });
    return () => document.removeEventListener('click', handleClick);
  }, [spawnClickParticles]);
  
  return (
      <>
      <ParticleContainer particles={particles} />
      <CelebrationContainer 
        celebrations={celebrations} 
        onCelebrationComplete={removeCelebration}
      />
      <Router>
      <div className="min-h-screen bg-background">
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
          
          <Route path="/recette/:id" element={
            <ProtectedRoute>
              <PageLayout>
                <RecetteDetail />
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

          {/* Ancienne page démo VitalForce — redirection vers l'accueil */}
          <Route path="/vitalforce" element={<Navigate to="/dashboard" replace />} />
          
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
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" attribute="class">
              <AppContent />
            </ThemeProvider>
          </ExerciseProvider>
        </QuestProvider>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
