import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import Index from "./pages/Index";
import Nutrition from "./pages/Nutrition";
import Developer from "./pages/Developer";
import BlocsEntrainement from "./pages/BlocsEntrainement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <AppHeader />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/developer" element={<Developer />} />
              <Route path="/blocs-entrainement" element={<BlocsEntrainement />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
