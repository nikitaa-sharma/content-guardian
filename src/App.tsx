import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage";
import LicensePage from "./pages/LicensePage";
import DashboardPage from "./pages/DashboardPage";
import DocumentationPage from "./pages/DocumentationPage";
import FAQPage from "./pages/FAQPage";
import APIPage from "./pages/APIPage";
import NotFound from "./pages/NotFound";
import { WalletProvider } from "./contexts/WalletContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WalletProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/license" element={<LicensePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/docs" element={<DocumentationPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/api" element={<APIPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
