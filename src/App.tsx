import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
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
import { VitalForceBackground } from './components/VitalForceBackground';
import MobileNavigation from './components/MobileNavigation';
import type { RankLevel } from './components/RankBadge';
import { useParticles } from './hooks/useParticles';
import { useCelebration } from './hooks/useCelebration';
import { Smartphone } from 'lucide-react';

const RANK_ORDER: RankLevel[] = ['E', 'D', 'C', 'B', 'A', 'S', 'Nation', 'World'];

// Lazy loading des pages — fonctions d'import nommées séparément (pas juste inline dans lazy())
// pour pouvoir les rappeler nous-mêmes ensuite et précharger les paquets en tâche de fond une fois
// l'app au repos (voir le useEffect de préchargement plus bas) : sans ça, CHAQUE page affichait un
// petit flash de chargement à sa toute première visite, même une fois le découpage des paquets par
// page corrigé — inévitable avec du lazy-loading pur tant que le paquet n'est pas déjà en cache.
const loginImport = () => import('./pages/Login');
const dashboardImport = () => import('./pages/Dashboard');
const statsImport = () => import('./pages/Stats');
const progressionImport = () => import('./pages/Progression');
const profileImport = () => import('./pages/ProfileSummary');
const programmeImport = () => import('./pages/Programme');
const blocsImport = () => import('./pages/BlocsEntrainement');
const nutritionImport = () => import('./pages/Nutrition');
const alimentImport = () => import('./pages/AlimentDetail');
const recetteImport = () => import('./pages/RecetteDetail');
const dailyQuestsImport = () => import('./components/DailyQuests');
const coachingImport = () => import('./pages/Coaching');
const coachClientImport = () => import('./pages/CoachClientDetail');
const coachProgramImport = () => import('./pages/CoachProgramBuilder');
const mealPlanImport = () => import('./pages/MealPlanGenerator');

const Login = lazy(loginImport);
const Dashboard = lazy(dashboardImport);
const Stats = lazy(statsImport);
const Progression = lazy(progressionImport);
const ProfileSummary = lazy(profileImport);
const Programme = lazy(programmeImport);
const BlocsEntrainement = lazy(blocsImport);
const NotFound = lazy(() => import('./pages/NotFound'));
const Nutrition = lazy(nutritionImport);
const AlimentDetail = lazy(alimentImport);
const RecetteDetail = lazy(recetteImport);
const DailyQuests = lazy(dailyQuestsImport);
const Coaching = lazy(coachingImport);
const CoachClientDetail = lazy(coachClientImport);
const CoachProgramBuilder = lazy(coachProgramImport);
const MealPlanGenerator = lazy(mealPlanImport);

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
  const { t } = useLanguage();
  const { particles, spawnClickParticles, spawnLevelUpParticles } = useParticles();
  const { celebrations, removeCelebration } = useCelebration();

  // Verrouillage actif de l'orientation (Android/Chrome en PWA installée) — l'API Screen Orientation
  // n'existe que dans un contexte plein écran/standalone, d'où le retry sur 'visibilitychange' (au
  // premier lancement l'app peut ne pas encore être fullscreen). Sur iOS Safari, screen.orientation.lock
  // n'existe pas du tout (jamais implémenté par WebKit) : le catch silencieux laisse alors le relais total
  // à l'écran de blocage CSS (.landscape-lock, voir index.css) qui reste le seul recours possible.
  useEffect(() => {
    const tryLock = () => {
      const orientation = (screen as unknown as { orientation?: { lock?: (o: string) => Promise<void> } }).orientation;
      orientation?.lock?.('portrait').catch(() => {});
    };
    tryLock();
    document.addEventListener('visibilitychange', tryLock);
    return () => document.removeEventListener('visibilitychange', tryLock);
  }, []);

  // Précharge les paquets des autres pages une fois connecté, en tâche de fond une fois l'app au
  // repos — sans ça, même avec un paquet dédié par page (déjà corrigé), la TOUTE PREMIÈRE visite de
  // chaque page affiche un flash de chargement le temps de télécharger son paquet. requestIdleCallback
  // n'existe pas sur Safari iOS (jamais implémenté) : setTimeout est le vrai chemin utilisé sur iPhone,
  // pas juste un filet de secours.
  useEffect(() => {
    if (!user) return;
    const schedule =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 1500);

    const handle = schedule(() => {
      [
        dashboardImport, statsImport, progressionImport, profileImport, programmeImport,
        blocsImport, nutritionImport, alimentImport, recetteImport, dailyQuestsImport,
        coachingImport, coachClientImport, coachProgramImport, mealPlanImport,
      ].forEach((importFn) => importFn().catch(() => {}));
    });

    return () => {
      if (typeof window.cancelIdleCallback === 'function' && typeof handle === 'number') {
        window.cancelIdleCallback(handle);
      } else {
        window.clearTimeout(handle as unknown as number);
      }
    };
  }, [user]);

  // Mode simplifié (voir ProfileSummary.tsx) — DA épurée façon Réglages/App Store, sans rang ni
  // niveau : coupe le thème de rang, le fond animé VitalForce et l'écran de changement de rang,
  // et pose .simple-mode sur <html> (palette plate bleu système, voir index.css).
  const simplifiedMode = user?.simplifiedMode === true;
  useEffect(() => {
    document.documentElement.classList.toggle('simple-mode', simplifiedMode);
    return () => document.documentElement.classList.remove('simple-mode');
  }, [simplifiedMode]);

  // Écran plein écran de changement de rang — se déclenche uniquement quand le rang MONTE par
  // rapport au dernier rang connu, jamais sur la toute première synchronisation après connexion
  // (previousRankRef reste null tant qu'aucun rang n'a été vu, donc pas de "rang up" surprise
  // juste après un login). Réinitialisé à la déconnexion pour ne pas fausser la prochaine session.
  // Jamais déclenché en mode simplifié : pas de système de rang, pas de célébration de rang.
  const previousRankRef = useRef<string | null>(null);
  const [rankUpTarget, setRankUpTarget] = useState<RankLevel | null>(null);

  useEffect(() => {
    if (!user || simplifiedMode) {
      previousRankRef.current = null;
      return;
    }
    const currentRank = user.rank || 'D';
    const prev = previousRankRef.current;
    if (prev && prev !== currentRank && RANK_ORDER.indexOf(currentRank as RankLevel) > RANK_ORDER.indexOf(prev as RankLevel)) {
      setRankUpTarget(currentRank as RankLevel);
    }
    previousRankRef.current = currentRank;
  }, [user?.rank, user?.id, simplifiedMode]);

  // "Mode Hunter" — identité Solo Leveling (voir .hunter-mode dans index.css), réservée aux hauts
  // rangs (S/Nation/World), chacun avec sa propre identité : S (.hunter-s, rouge sombre/braise),
  // Nation (.hunter-nation, violet dominant), World (.hunter-world, noir/gris/bleu glacé).
  // Rangs D/C/B/A : même mécanique indépendante du Mode Hunter (classe sur <html>, retail de
  // --primary/--secondary/fond), sans les décors "fenêtre System" des rangs élite — D en bronze/
  // braise (.rank-d), C en bleu/argent (.rank-c), B en or (.rank-gold), A en platine/éclairs
  // bleus (.rank-a).
  // Uniquement des classes sur <html> : rien d'autre à défaire si ça ne va pas.
  // showRankTheme (réglage utilisateur, voir ProfileSummary.tsx) : si désactivé, aucune classe de
  // rang n'est posée -> l'app reste sur le thème violet/cyan par défaut quel que soit le rang.
  // Mode simplifié : même chose, jamais de classe de rang (indépendamment de showRankTheme).
  const showRankTheme = user?.showRankTheme !== false && !simplifiedMode;
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
      {/* Toujours dans le DOM, visible uniquement en paysage téléphone via CSS (.landscape-lock,
          voir index.css) — pas de JS d'orientation nécessaire, marche même avant hydratation. */}
      <div className="landscape-lock fixed inset-0 z-[200] flex-col items-center justify-center gap-4 bg-background text-center p-8">
        <Smartphone className="w-12 h-12 text-secondary animate-pulse" />
        <p className="text-lg font-semibold text-foreground">{t('landscape.title')}</p>
        <p className="text-sm text-muted-foreground max-w-xs">{t('landscape.subtitle')}</p>
      </div>
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
      <div className="min-h-screen bg-background relative">
        {/* Rendu une seule fois pour toute la session (pas par page — voir PageLayout.tsx) : le
            fond animé et la nav du bas sont des éléments d'app globaux, pas du contenu de page. */}
        {user && <VitalForceBackground intensity={simplifiedMode ? 'none' : 'medium'} />}
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

          <Route path="/progression" element={
            <ProtectedRoute>
              <PageLayout>
                <Progression />
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

          {/* Mode Coach — prototype sans backend, voir src/utils/coachingData.ts */}
          <Route path="/coaching" element={
            <ProtectedRoute>
              <PageLayout>
                <Coaching />
              </PageLayout>
            </ProtectedRoute>
          } />

          <Route path="/coaching/:id" element={
            <ProtectedRoute>
              <PageLayout>
                <CoachClientDetail />
              </PageLayout>
            </ProtectedRoute>
          } />

          <Route path="/coaching/:id/programme" element={
            <ProtectedRoute>
              <PageLayout>
                <CoachProgramBuilder />
              </PageLayout>
            </ProtectedRoute>
          } />

          {/* Programme "libre", sans coaché rattaché — pour un client qui n'a pas de compte dans
              l'app (export PDF seulement, voir CoachProgramBuilder.tsx). */}
          <Route path="/coaching/programme" element={
            <ProtectedRoute>
              <PageLayout>
                <CoachProgramBuilder />
              </PageLayout>
            </ProtectedRoute>
          } />

          <Route path="/nutrition/plan" element={
            <ProtectedRoute>
              <PageLayout>
                <MealPlanGenerator />
              </PageLayout>
            </ProtectedRoute>
          } />

          {/* Ancienne page démo VitalForce — redirection vers l'accueil */}
          <Route path="/vitalforce" element={<Navigate to="/dashboard" replace />} />
          
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

          {user && <MobileNavigation />}
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
