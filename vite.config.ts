import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs', '@radix-ui/react-toast'],
          'chart-vendor': ['recharts'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'utils-vendor': ['date-fns', 'clsx', 'tailwind-merge'],
          
          // App chunks
          'pages': [
            './src/pages/Login',
            './src/pages/Dashboard', 
            './src/pages/Stats',
            './src/pages/ProfileSummary',
            './src/pages/Programme',
            './src/pages/BlocsEntrainement',
            './src/pages/Nutrition'
          ],
          'utils': [
            './src/utils/programmeGenerator',
            './src/utils/scoring',
            './src/utils/blocsExercices'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
}));