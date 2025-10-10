import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App.tsx';
import './src/index.css';

// Expo web entry point
if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
  }
}

export default App;
