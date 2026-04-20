import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound.tsx";
import AppLayout from "./components/app/AppLayout";
import Dashboard from "./pages/app/Dashboard";
import MapPage from "./pages/app/MapPage";
import Festivals from "./pages/app/Festivals";
import Assistant from "./pages/app/Assistant";
import Roads from "./pages/app/Roads";
import Integrations from "./pages/app/Integrations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mapa" element={<MapPage />} />
            <Route path="/festividades" element={<Festivals />} />
            <Route path="/asistente" element={<Assistant />} />
            <Route path="/vias" element={<Roads />} />
            <Route path="/integraciones" element={<Integrations />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
