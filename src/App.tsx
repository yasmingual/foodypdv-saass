
import { useEffect, createContext, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { OrderProvider } from "./context/OrderContext";
import { StockProvider } from "./context/StockContext";
import { ProductProvider } from "./context/ProductContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { initializeSystem } from "./utils/settingsUtils";
import { checkSubscriptionStatus } from "./utils/subscriptionUtils";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PDV from "./pages/PDV";
import PDVMobile from "./pages/PDVMobile";
import KDS from "./pages/KDS";
import Stock from "./pages/Stock";
import Cashier from "./pages/Cashier";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useIsMobile } from "./hooks/use-mobile";

const queryClient = new QueryClient();

// Componente para lidar com redirecionamento inteligente para PDV
const PDVRedirect = () => {
  const isMobile = useIsMobile();
  return isMobile ? <Navigate to="/pdv-mobile" /> : <PDV />;
};

// Criar um contexto para assinatura que pode ser usado em toda a aplicação
export const SubscriptionContext = createContext({
  isValid: true,
  isTrialPeriod: false,
  daysRemaining: 0,
  checkSubscriptionStatus: () => {},
});

const App = () => {
  const [subscriptionState, setSubscriptionState] = useState({
    isValid: true,
    isTrialPeriod: false,
    daysRemaining: 0,
  });

  // Inicializar sistema no carregamento
  useEffect(() => {
    const tenant = initializeSystem();
    
    // Verificar status da assinatura
    const status = checkSubscriptionStatus(tenant.id);
    setSubscriptionState({
      isValid: status.isValid,
      isTrialPeriod: status.isTrialPeriod,
      daysRemaining: status.daysRemaining,
    });
  }, []);

  // Função para verificar o status da assinatura
  const verifySubscriptionStatus = () => {
    const tenant = initializeSystem();
    const status = checkSubscriptionStatus(tenant.id);
    setSubscriptionState({
      isValid: status.isValid,
      isTrialPeriod: status.isTrialPeriod,
      daysRemaining: status.daysRemaining,
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StockProvider>
          <ProductProvider>
            <OrderProvider>
              <SubscriptionContext.Provider 
                value={{
                  ...subscriptionState,
                  checkSubscriptionStatus: verifySubscriptionStatus
                }}
              >
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/pdv" element={<PDVRedirect />} />
                    <Route path="/pdv-mobile" element={<PDVMobile />} />
                    <Route path="/kds" element={<KDS />} />
                    <Route path="/stock" element={<Stock />} />
                    <Route path="/cashier" element={<Cashier />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </SubscriptionContext.Provider>
            </OrderProvider>
          </ProductProvider>
        </StockProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
