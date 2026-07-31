import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
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
import { RankUpScreen } from './components/RankUpScreen';
import type { RankLevel } from './components/RankBadge';
import { useParticles } from './hooks/useParticles';
import { useCelebration } from './hooks/useCelebration';

const RANK_ORDER: RankLevel[] = ['E', 'D', 'C', 'B', 'A', 'S', 'Nation', 'World'];

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
  const { particles, spawnClickParticles, spawnLevelUpParticles } = useParticles();
  const { celebrations, removeCelebration } = useCelebration();

  // Écran plein écran de changement de rang — se déclenche uniquement quand le rang MONTE par
  // rapport au dernier rang connu, jamais sur la toute première synchronisation après connexion
  // (previousRankRef reste null tant qu'aucun rang n'a été vu, donc pas de "rang up" surprise
  // juste après un login). Réinitialisé à la déconnexion pour ne pas fausser la prochaine session.
  const previousRankRef = useRef<string | null>(null);
  const [rankUpTarget, setRankUpTarget] = useState<RankLevel | null>(null);

  useEffect(() => {
    if (!user) {
      previousRankRef.current = null;
      return;
    }
    const currentRank = user.rank || 'D';
    const prev = previousRankRef.current;
    if (prev && prev !== currentRank && RANK_ORDER.indexOf(currentRank as RankLevel) > RANK_ORDER.indexOf(prev as RankLevel)) {
      setRankUpTarget(currentRank as RankLevel);
    }
    previousRankRef.current = currentRank;
  }, [user?.rank, user?.id]);

  // "Mode Hunter" — identité Solo Leveling (voir .hunter-mode dans index.css), réservée aux hauts
  // rangs (S/Nation/World), chacun avec sa propre identité : S (.hunter-s, rouge sombre/braise),
  // Nation (.hunter-nation, violet dominant), World (.hunter-world, noir/gris/bleu glacé).
  // Rangs D/C/B/A : même mécanique indépendante du Mode Hunter (classe sur <html>, retail de
  // --primary/--secondary/fond), sans les décors "fenêtre System" des rangs élite — D en bronze/
  // braise (.rank-d), C en bleu/argent (.rank-c), B en or (.rank-gold), A en platine/éclairs
  // bleus (.rank-a).
  // Uniquement des classes sur <html> : rien d'autre à défaire si ça ne va pas.
  // showRankTheme (réglage utilisateur, voir Stats.tsx) : si désactivé, aucune classe de rang
  // n'est posée -> l'app reste sur le thème violet/cyan par défaut quel que soit le rang.
  const showRankTheme = user?.showRankTheme !== false;
  useEffect(() => {
    const isHunterRank = showRankTheme && (user?.rank === 'S' || user?.rank === 'Nation' || user?.rank === 'World');
    const isSRank = showRankTheme && user?.rank === 'S';
    const isWorldRank = showRankTheme && user?.rank === 'World';
    const isNationRank = showRankTheme && user?.rank === 'Nation';
    const isDRank = showRankTheme && user?.rank === 'D';
    const isBRank = showRankTheme && user?.rank === 'B';
    const isCRank = showRankTheme && user?.rank === 'C';
    const isARank = showRankTheme && user?.rank === 'A';
    document.documentElement.classList.toggle('hunter-mode', isHunterRank);
    document.documentElement.classList.toggle('hunter-s', isSRank);
    document.documentElement.classList.toggle('hunter-world', isWorldRank);
    document.documentElement.classList.toggle('hunter-nation', isNationRank);
    document.documentElement.classList.toggle('rank-d', isDRank);
    document.documentElement.classList.toggle('rank-gold', isBRank);
    document.documentElement.classList.toggle('rank-c', isCRank);
    document.documentElement.classList.toggle('rank-a', isARank);
    return () => {
      document.documentElement.classList.remove(
        'hunter-mode', 'hunter-s', 'hunter-world', 'hunter-nation', 'rank-d', 'rank-gold', 'rank-c', 'rank-a'
      );
    };
  }, [user?.rank, showRankTheme]);

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
      {rankUpTarget && (
        <RankUpScreen
          rank={rankUpTarget}
          onDismiss={() => setRankUpTarget(null)}
          onReveal={spawnLevelUpParticles}
        />
      )}
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
