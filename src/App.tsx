import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import PageLayout from '@/components/PageLayout';
import Dashboard from './pages/Dashboard';
import Programme from './pages/Programme';
import Nutrition from './pages/Nutrition';
import Stats from './pages/Stats';
import ProfileSummary from './pages/ProfileSummary';
import Login from './pages/Login';
import Success from './pages/Success';
import Exercices from './pages/Exercices';

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
      <SubscriptionProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/programme" element={<ProtectedRoute><Programme /></ProtectedRoute>} />
              <Route path="/exercices" element={<ProtectedRoute><Exercices /></ProtectedRoute>} />
              <Route path="/nutrition" element={<ProtectedRoute><Nutrition /></ProtectedRoute>} />
              <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfileSummary /></ProtectedRoute>} />
              <Route path="/" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;
