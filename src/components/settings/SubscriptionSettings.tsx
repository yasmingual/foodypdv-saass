
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Check, AlertTriangle, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SettingsLayout } from './SettingsLayout';
import { 
  checkSubscriptionStatus, 
  subscriptionPlans, 
  upgradeSubscription,
  cancelSubscription,
  SubscriptionPlan
} from '@/utils/subscriptionUtils';
import { getCurrentRestaurantId } from '@/utils/settingsUtils';

interface PlanCardProps {
  plan: SubscriptionPlan;
  currentPlanId?: string;
  onSelectPlan: (planId: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, currentPlanId, onSelectPlan }) => {
  const isCurrentPlan = currentPlanId === plan.id;
  
  return (
    <Card className={`${isCurrentPlan ? 'border-primary border-2' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center">
          {plan.name}
          {isCurrentPlan && (
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-normal">
              Plano Atual
            </span>
          )}
        </CardTitle>
        <div className="text-2xl font-bold">
          R$ {plan.price.toFixed(2)}
          <span className="text-sm font-normal text-muted-foreground">
            /{plan.interval === 'month' ? 'mês' : 'ano'}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <Check className="h-4 w-4 text-primary mr-2 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onSelectPlan(plan.id)} 
          className="w-full" 
          variant={isCurrentPlan ? "outline" : "default"} 
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? 'Plano Atual' : 'Selecionar Plano'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const SubscriptionSettings: React.FC = () => {
  const { toast } = useToast();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState<'month' | 'year'>('month');
  const restaurantId = getCurrentRestaurantId();
  
  const { 
    isValid, 
    subscription, 
    daysRemaining, 
    isTrialPeriod 
  } = checkSubscriptionStatus(restaurantId);
  
  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
    setShowDialog(true);
  };
  
  const handleSubscribe = () => {
    if (!selectedPlanId) return;
    
    try {
      upgradeSubscription(restaurantId, selectedPlanId);
      
      toast({
        title: "Assinatura atualizada com sucesso!",
        description: "Seu plano foi atualizado e já está ativo.",
        variant: "default",
      });
      
      setShowDialog(false);
    } catch (error) {
      toast({
        title: "Erro ao atualizar assinatura",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    }
  };
  
  const handleCancelSubscription = () => {
    try {
      cancelSubscription(restaurantId);
      
      toast({
        title: "Assinatura cancelada",
        description: "Sua assinatura foi cancelada com sucesso. Você ainda terá acesso ao sistema até o final do período pago.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erro ao cancelar assinatura",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <SettingsLayout
      title="Assinatura"
      description="Gerencie o plano de assinatura para seu restaurante"
    >
      {/* Status da assinatura */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Status da Assinatura</CardTitle>
          <CardDescription>
            Informações sobre o status atual da sua assinatura
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isTrialPeriod ? (
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Período de Avaliação</AlertTitle>
              <AlertDescription>
                Você está utilizando o período de avaliação gratuito de 7 dias.
                {daysRemaining > 0 ? (
                  <>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Dias restantes: {daysRemaining}/7</span>
                        <span>{Math.round((daysRemaining / 7) * 100)}%</span>
                      </div>
                      <Progress value={(daysRemaining / 7) * 100} className="h-2" />
                    </div>
                  </>
                ) : (
                  <div className="mt-2 text-destructive">
                    Seu período de avaliação expirou. Escolha um plano para continuar utilizando.
                  </div>
                )}
              </AlertDescription>
            </Alert>
          ) : subscription?.status === 'active' ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">
                    {subscriptionPlans.find(p => p.id === subscription.planId)?.name || 'Plano Ativo'}
                  </h3>
                  <p className="text-muted-foreground">
                    Válido até {new Date(subscription.expiryDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    Ativo
                  </span>
                </div>
              </div>
              
              {daysRemaining <= 7 && (
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Renovação em Breve</AlertTitle>
                  <AlertDescription>
                    Sua assinatura será renovada em {daysRemaining} dias.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={handleCancelSubscription}>Cancelar Assinatura</Button>
                <Button variant="default">
                  <CreditCard className="mr-2 h-4 w-4" /> Atualizar Método de Pagamento
                </Button>
              </div>
            </div>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Assinatura Expirada</AlertTitle>
              <AlertDescription>
                Sua assinatura expirou ou foi cancelada. Escolha um novo plano para continuar utilizando o sistema.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Seleção de planos */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-4">Planos disponíveis</h2>
        
        <Tabs 
          defaultValue="month" 
          onValueChange={(value) => setSelectedInterval(value as 'month' | 'year')}
          className="w-[300px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="month">Mensal</TabsTrigger>
            <TabsTrigger value="year">Anual</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {subscriptionPlans
            .filter(plan => plan.interval === selectedInterval)
            .map((plan) => (
              <PlanCard 
                key={plan.id}
                plan={plan}
                currentPlanId={subscription?.planId}
                onSelectPlan={handlePlanSelect}
              />
            ))
          }
        </div>
      </div>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar assinatura</DialogTitle>
            <DialogDescription>
              Você está prestes a assinar o plano{' '}
              {subscriptionPlans.find(p => p.id === selectedPlanId)?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-2 font-medium">Detalhes do plano:</p>
            <div className="bg-muted p-4 rounded-md">
              <p>
                <strong>Plano:</strong>{' '}
                {subscriptionPlans.find(p => p.id === selectedPlanId)?.name}
              </p>
              <p>
                <strong>Valor:</strong> R${' '}
                {subscriptionPlans.find(p => p.id === selectedPlanId)?.price.toFixed(2)}
                /
                {subscriptionPlans.find(p => p.id === selectedPlanId)?.interval === 'month'
                  ? 'mês'
                  : 'ano'}
              </p>
              <p>
                <strong>Renovação:</strong>{' '}
                {subscriptionPlans.find(p => p.id === selectedPlanId)?.interval === 'month'
                  ? 'Mensal'
                  : 'Anual'}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubscribe}>
              Confirmar e Assinar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SettingsLayout>
  );
};

export default SubscriptionSettings;
