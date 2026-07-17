// vite.config.ts
import { defineConfig } from "file:///D:/FitGEN222-app/node_modules/vite/dist/node/index.js";
import react from "file:///D:/FitGEN222-app/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///D:/FitGEN222-app/node_modules/lovable-tagger/dist/index.js";
import { VitePWA } from "file:///D:/FitGEN222-app/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_dirname = "D:\\FitGEN222-app";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "FitGEN - G\xE9n\xE9rateur de Programmes Sportifs",
        short_name: "FitGEN",
        description: "G\xE9n\xE9rateur intelligent de programmes d'entra\xEEnement personnalis\xE9s",
        theme_color: "#3b82f6",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait-primary",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-tabs", "@radix-ui/react-toast"],
          "chart-vendor": ["recharts"],
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],
          "utils-vendor": ["date-fns", "clsx", "tailwind-merge"],
          // App chunks
          "pages": [
            "./src/pages/Login",
            "./src/pages/Dashboard",
            "./src/pages/Stats",
            "./src/pages/ProfileSummary",
            "./src/pages/Programme",
            "./src/pages/BlocsEntrainement",
            "./src/pages/Nutrition"
          ],
          "utils": [
            "./src/utils/programmeGenerator",
            "./src/utils/scoring",
            "./src/utils/blocsExercices"
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1e3
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxGaXRHRU4yMjItYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxGaXRHRU4yMjItYXBwXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9GaXRHRU4yMjItYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6IFwiOjpcIixcclxuICAgIHBvcnQ6IDgwODAsXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgbW9kZSA9PT0gJ2RldmVsb3BtZW50JyAmJiBjb21wb25lbnRUYWdnZXIoKSxcclxuICAgIFZpdGVQV0Eoe1xyXG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcclxuICAgICAgZGV2T3B0aW9uczoge1xyXG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgICB3b3JrYm94OiB7XHJcbiAgICAgICAgY2xlYW51cE91dGRhdGVkQ2FjaGVzOiB0cnVlLFxyXG4gICAgICAgIGNsaWVudHNDbGFpbTogdHJ1ZSxcclxuICAgICAgICBza2lwV2FpdGluZzogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgICAgaW5jbHVkZUFzc2V0czogWydmYXZpY29uLmljbycsICdhcHBsZS10b3VjaC1pY29uLnBuZycsICdtYXNrZWQtaWNvbi5zdmcnXSxcclxuICAgICAgbWFuaWZlc3Q6IHtcclxuICAgICAgICBuYW1lOiAnRml0R0VOIC0gR1x1MDBFOW5cdTAwRTlyYXRldXIgZGUgUHJvZ3JhbW1lcyBTcG9ydGlmcycsXHJcbiAgICAgICAgc2hvcnRfbmFtZTogJ0ZpdEdFTicsXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICdHXHUwMEU5blx1MDBFOXJhdGV1ciBpbnRlbGxpZ2VudCBkZSBwcm9ncmFtbWVzIGRcXCdlbnRyYVx1MDBFRW5lbWVudCBwZXJzb25uYWxpc1x1MDBFOXMnLFxyXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnIzNiODJmNicsXHJcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcclxuICAgICAgICBvcmllbnRhdGlvbjogJ3BvcnRyYWl0LXByaW1hcnknLFxyXG4gICAgICAgIHNjb3BlOiAnLycsXHJcbiAgICAgICAgc3RhcnRfdXJsOiAnLycsXHJcbiAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnaWNvbnMvaWNvbi0xOTJ4MTkyLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpY29ucy9pY29uLTUxMng1MTIucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcclxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgXS5maWx0ZXIoQm9vbGVhbiksXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICAvLyBWZW5kb3IgY2h1bmtzXHJcbiAgICAgICAgICAncmVhY3QtdmVuZG9yJzogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxyXG4gICAgICAgICAgJ3VpLXZlbmRvcic6IFsnQHJhZGl4LXVpL3JlYWN0LWRpYWxvZycsICdAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24tbWVudScsICdAcmFkaXgtdWkvcmVhY3QtdGFicycsICdAcmFkaXgtdWkvcmVhY3QtdG9hc3QnXSxcclxuICAgICAgICAgICdjaGFydC12ZW5kb3InOiBbJ3JlY2hhcnRzJ10sXHJcbiAgICAgICAgICAnZm9ybS12ZW5kb3InOiBbJ3JlYWN0LWhvb2stZm9ybScsICdAaG9va2Zvcm0vcmVzb2x2ZXJzJywgJ3pvZCddLFxyXG4gICAgICAgICAgJ3V0aWxzLXZlbmRvcic6IFsnZGF0ZS1mbnMnLCAnY2xzeCcsICd0YWlsd2luZC1tZXJnZSddLFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvLyBBcHAgY2h1bmtzXHJcbiAgICAgICAgICAncGFnZXMnOiBbXHJcbiAgICAgICAgICAgICcuL3NyYy9wYWdlcy9Mb2dpbicsXHJcbiAgICAgICAgICAgICcuL3NyYy9wYWdlcy9EYXNoYm9hcmQnLCBcclxuICAgICAgICAgICAgJy4vc3JjL3BhZ2VzL1N0YXRzJyxcclxuICAgICAgICAgICAgJy4vc3JjL3BhZ2VzL1Byb2ZpbGVTdW1tYXJ5JyxcclxuICAgICAgICAgICAgJy4vc3JjL3BhZ2VzL1Byb2dyYW1tZScsXHJcbiAgICAgICAgICAgICcuL3NyYy9wYWdlcy9CbG9jc0VudHJhaW5lbWVudCcsXHJcbiAgICAgICAgICAgICcuL3NyYy9wYWdlcy9OdXRyaXRpb24nXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgJ3V0aWxzJzogW1xyXG4gICAgICAgICAgICAnLi9zcmMvdXRpbHMvcHJvZ3JhbW1lR2VuZXJhdG9yJyxcclxuICAgICAgICAgICAgJy4vc3JjL3V0aWxzL3Njb3JpbmcnLFxyXG4gICAgICAgICAgICAnLi9zcmMvdXRpbHMvYmxvY3NFeGVyY2ljZXMnXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwXHJcbiAgfVxyXG59KSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFzTyxTQUFTLG9CQUFvQjtBQUNuUSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsZUFBZTtBQUp4QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixTQUFTLGlCQUFpQixnQkFBZ0I7QUFBQSxJQUMxQyxRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxZQUFZO0FBQUEsUUFDVixTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsdUJBQXVCO0FBQUEsUUFDdkIsY0FBYztBQUFBLFFBQ2QsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUNBLGVBQWUsQ0FBQyxlQUFlLHdCQUF3QixpQkFBaUI7QUFBQSxNQUN4RSxVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixTQUFTO0FBQUEsUUFDVCxhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQTtBQUFBLFVBRVosZ0JBQWdCLENBQUMsU0FBUyxhQUFhLGtCQUFrQjtBQUFBLFVBQ3pELGFBQWEsQ0FBQywwQkFBMEIsaUNBQWlDLHdCQUF3Qix1QkFBdUI7QUFBQSxVQUN4SCxnQkFBZ0IsQ0FBQyxVQUFVO0FBQUEsVUFDM0IsZUFBZSxDQUFDLG1CQUFtQix1QkFBdUIsS0FBSztBQUFBLFVBQy9ELGdCQUFnQixDQUFDLFlBQVksUUFBUSxnQkFBZ0I7QUFBQTtBQUFBLFVBR3JELFNBQVM7QUFBQSxZQUNQO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFVBQ0EsU0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
