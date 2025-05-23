
import { useState, useEffect } from 'react';
import { checkSubscriptionStatus, SubscriptionData } from '@/utils/subscriptionUtils';
import { getCurrentRestaurantId } from '@/utils/settingsUtils';

interface UseSubscriptionReturn {
  isValid: boolean;
  isLoading: boolean;
  subscription: SubscriptionData | null;
  daysRemaining: number;
  isTrialPeriod: boolean;
  checkStatus: () => void;
}

export function useSubscription(): UseSubscriptionReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    isValid: true,
    subscription: null as SubscriptionData | null,
    daysRemaining: 0,
    isTrialPeriod: false,
  });
  
  const checkStatus = () => {
    setIsLoading(true);
    try {
      const restaurantId = getCurrentRestaurantId();
      const status = checkSubscriptionStatus(restaurantId);
      setSubscriptionStatus(status);
    } catch (error) {
      console.error('Erro ao verificar assinatura:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    checkStatus();
    
    // Verificar a assinatura a cada hora
    const intervalId = setInterval(checkStatus, 60 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return {
    ...subscriptionStatus,
    isLoading,
    checkStatus,
  };
}
