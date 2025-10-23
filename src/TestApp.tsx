import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UITestPage from './pages/UITestPage';

// Composant de navigation simple pour accéder à la page de test
const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">FitGEN - Test UI/DA</h1>
        <div className="space-x-4">
          <Link 
            to="/" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Page de Test
          </Link>
          <Link 
            to="/dashboard" 
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Dashboard Original
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Composant principal de l'application de test
const TestApp: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<UITestPage />} />
          <Route path="/dashboard" element={<div className="p-8"><h1 className="text-2xl">Dashboard Original</h1></div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default TestApp;
