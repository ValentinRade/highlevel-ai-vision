
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Pipeline from "./pages/Pipeline";
import Automations from "./pages/Automations";
import Chatbot from "./pages/Chatbot";
import Analytics from "./pages/Analytics";
import AILab from "./pages/AILab";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Layout
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="kontakte" element={<Contacts />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="automatisierungen" element={<Automations />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="analysen" element={<Analytics />} />
            <Route path="ai-lab" element={<AILab />} />
            <Route path="einstellungen" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
