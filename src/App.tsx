import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AppHeader from "@/components/AppHeader";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Nutrition from "./pages/Nutrition";
import Scan from "./pages/Scan";
import Developer from "./pages/Developer";
import BlocsEntrainement from "./pages/BlocsEntrainement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <AppHeader />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/nutrition" element={<Nutrition />} />
                <Route path="/scan" element={<Scan />} />
                <Route path="/developer" element={<Developer />} />
                <Route path="/blocs-entrainement" element={<BlocsEntrainement />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
