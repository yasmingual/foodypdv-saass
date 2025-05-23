
// Utilitários para gerenciamento de assinaturas

import { getCurrentRestaurantId, loadRestaurants, saveRestaurants } from "./settingsUtils";
import { TenantType } from "./settingsUtils";

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  description: string;
  features: string[];
  recommended?: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic_monthly',
    name: 'Básico',
    price: 49.90,
    interval: 'month',
    description: 'Ideal para pequenos estabelecimentos',
    features: [
      'Acesso ao PDV',
      'Gerenciamento de pedidos',
      'Controle de caixa básico',
      'Suporte por e-mail',
      'Limite de 100 pedidos por mês'
    ]
  },
  {
    id: 'standard_monthly',
    name: 'Padrão',
    price: 99.90,
    interval: 'month',
    description: 'Perfeito para restaurantes em crescimento',
    features: [
      'Todas as funcionalidades do plano Básico',
      'Suporte ao KDS (Cozinha)',
      'Gerenciamento de estoque',
      'Estatísticas e relatórios',
      'Suporte prioritário',
      'Pedidos ilimitados'
    ],
    recommended: true
  },
  {
    id: 'premium_monthly',
    name: 'Premium',
    price: 199.90,
    interval: 'month',
    description: 'Solução completa para estabelecimentos de médio e grande porte',
    features: [
      'Todas as funcionalidades do plano Padrão',
      'Integração com delivery',
      'Dashboard avançado',
      'Múltiplas impressoras',
      'API para integrações',
      'Suporte 24/7',
      'Treinamento personalizado'
    ]
  },
  {
    id: 'basic_yearly',
    name: 'Básico Anual',
    price: 479.00,
    interval: 'year',
    description: 'Economize pagando anualmente',
    features: [
      'Acesso ao PDV',
      'Gerenciamento de pedidos',
      'Controle de caixa básico',
      'Suporte por e-mail',
      'Limite de 100 pedidos por mês',
      '2 meses grátis'
    ]
  },
  {
    id: 'standard_yearly',
    name: 'Padrão Anual',
    price: 999.00,
    interval: 'year',
    description: 'Melhor custo-benefício',
    features: [
      'Todas as funcionalidades do plano Básico',
      'Suporte ao KDS (Cozinha)',
      'Gerenciamento de estoque',
      'Estatísticas e relatórios',
      'Suporte prioritário',
      'Pedidos ilimitados',
      '2 meses grátis'
    ],
    recommended: true
  },
  {
    id: 'premium_yearly',
    name: 'Premium Anual',
    price: 1999.00,
    interval: 'year',
    description: 'Solução completa com maior economia',
    features: [
      'Todas as funcionalidades do plano Padrão',
      'Integração com delivery',
      'Dashboard avançado',
      'Múltiplas impressoras',
      'API para integrações',
      'Suporte 24/7',
      'Treinamento personalizado',
      '2 meses grátis'
    ]
  }
];

// Interface para representar dados da assinatura
export interface SubscriptionData {
  id: string;
  restaurantId: string;
  planId: string;
  status: 'trial' | 'active' | 'canceled' | 'expired';
  startDate: string; // ISO string
  expiryDate: string; // ISO string
  paymentMethod?: string;
  latestInvoice?: string;
}

// Função para calcular a data de expiração do teste de 7 dias
export function calculateTrialEndDate(): string {
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 7);
  return trialEndDate.toISOString();
}

// Função para obter os dados da assinatura do restaurante atual
export function getRestaurantSubscription(): SubscriptionData | null {
  try {
    const restaurantId = getCurrentRestaurantId();
    const storedData = localStorage.getItem(`subscription_${restaurantId}`);
    
    if (storedData) {
      return JSON.parse(storedData);
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao carregar dados da assinatura:', error);
    return null;
  }
}

// Função para salvar dados da assinatura
export function saveSubscription(subscription: SubscriptionData): void {
  try {
    localStorage.setItem(`subscription_${subscription.restaurantId}`, JSON.stringify(subscription));
  } catch (error) {
    console.error('Erro ao salvar dados da assinatura:', error);
  }
}

// Função para criar uma nova assinatura de teste
export function createTrialSubscription(restaurantId: string): SubscriptionData {
  const subscription: SubscriptionData = {
    id: `sub_${Date.now()}`,
    restaurantId,
    planId: 'trial',
    status: 'trial',
    startDate: new Date().toISOString(),
    expiryDate: calculateTrialEndDate()
  };
  
  saveSubscription(subscription);
  return subscription;
}

// Função para atualizar um restaurante para um plano específico
export function upgradeSubscription(restaurantId: string, planId: string): SubscriptionData {
  const plan = subscriptionPlans.find(p => p.id === planId);
  if (!plan) {
    throw new Error('Plano de assinatura não encontrado');
  }
  
  let expiryDate = new Date();
  if (plan.interval === 'month') {
    expiryDate.setMonth(expiryDate.getMonth() + 1);
  } else {
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  }
  
  const subscription: SubscriptionData = {
    id: `sub_${Date.now()}`,
    restaurantId,
    planId,
    status: 'active',
    startDate: new Date().toISOString(),
    expiryDate: expiryDate.toISOString(),
    paymentMethod: 'credit_card', // Simplificado para este exemplo
    latestInvoice: `inv_${Date.now()}`
  };
  
  saveSubscription(subscription);
  
  // Atualizar o tenant com o novo plano
  const restaurants = loadRestaurants();
  const updatedRestaurants = restaurants.map(restaurant => {
    if (restaurant.id === restaurantId) {
      return {
        ...restaurant,
        plan: planId.includes('premium') ? 'premium' : 
              planId.includes('standard') ? 'basic' : 'free'
      };
    }
    return restaurant;
  });
  
  saveRestaurants(updatedRestaurants);
  
  return subscription;
}

// Função para verificar o status da assinatura
export function checkSubscriptionStatus(restaurantId: string): { 
  isValid: boolean; 
  subscription: SubscriptionData | null;
  daysRemaining: number;
  isTrialPeriod: boolean;
} {
  const subscription = getRestaurantSubscription();
  
  if (!subscription) {
    // Se não tiver assinatura, criar uma de teste
    const trialSubscription = createTrialSubscription(restaurantId);
    return { 
      isValid: true, 
      subscription: trialSubscription,
      daysRemaining: 7,
      isTrialPeriod: true
    };
  }
  
  const now = new Date();
  const expiryDate = new Date(subscription.expiryDate);
  const isValid = expiryDate > now;
  
  // Calcular dias restantes
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.max(0, Math.ceil((expiryDate.getTime() - now.getTime()) / msPerDay));
  
  return {
    isValid,
    subscription,
    daysRemaining,
    isTrialPeriod: subscription.status === 'trial'
  };
}

// Função para cancelar uma assinatura
export function cancelSubscription(restaurantId: string): SubscriptionData | null {
  const subscription = getRestaurantSubscription();
  
  if (!subscription) {
    return null;
  }
  
  const updatedSubscription: SubscriptionData = {
    ...subscription,
    status: 'canceled'
  };
  
  saveSubscription(updatedSubscription);
  return updatedSubscription;
}

// Obter um plano por ID
export function getPlanById(planId: string): SubscriptionPlan | undefined {
  return subscriptionPlans.find(p => p.id === planId);
}
