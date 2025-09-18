import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import PageLayout from '@/components/PageLayout';
import Dashboard from './pages/Dashboard';
import Programme from './pages/Programme';
import Nutrition from './pages/Nutrition';
import Scan from './pages/Scan';
import Stats from './pages/Stats';
import ProfileSummary from './pages/ProfileSummary';
import Login from './pages/Login';
import AlimentDetail from './pages/AlimentDetail';
import RecetteDetail from './pages/RecetteDetail';

// Composant pour les routes protégées
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  return <PageLayout>{children}</PageLayout>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/programme" element={<ProtectedRoute><Programme /></ProtectedRoute>} />
            <Route path="/nutrition" element={<ProtectedRoute><Nutrition /></ProtectedRoute>} />
            <Route path="/nutrition/:id" element={<AlimentDetail />} />
            <Route path="/scan" element={<ProtectedRoute><Scan /></ProtectedRoute>} />
            <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfileSummary /></ProtectedRoute>} />
            <Route path="/repas/:id" element={<RecetteDetail />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
