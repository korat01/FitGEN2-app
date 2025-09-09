import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import PageLayout from '@/components/PageLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Programme from './pages/Programme';
import Nutrition from './pages/Nutrition';
import Planning from './pages/Planning';
import Scan from './pages/Scan';
import Stats from './pages/Stats';
import ProfileSummary from './pages/ProfileSummary';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PageLayout><Home /></PageLayout>} />
          <Route path="/dashboard" element={<PageLayout><Dashboard /></PageLayout>} />
          <Route path="/programme" element={<PageLayout><Programme /></PageLayout>} />
          <Route path="/nutrition" element={<PageLayout><Nutrition /></PageLayout>} />
          <Route path="/planning" element={<PageLayout><Planning /></PageLayout>} />
          <Route path="/scan" element={<PageLayout><Scan /></PageLayout>} />
          <Route path="/stats" element={<PageLayout><Stats /></PageLayout>} />
          <Route path="/profile" element={<PageLayout><ProfileSummary /></PageLayout>} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
