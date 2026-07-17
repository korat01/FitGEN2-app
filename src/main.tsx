import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AppErrorBoundary } from './components/AppErrorBoundary'
import { initNativeApp } from './lib/nativeSetup'

// En dev : désactiver le service worker PWA pour éviter l'ancien cache (Weekly Progress, etc.)
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister())
  })
}

initNativeApp();

createRoot(document.getElementById("root")!).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
