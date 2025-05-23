
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/hooks/use-subscription';
import { useNavigate } from 'react-router-dom';

const SubscriptionAlert: React.FC = () => {
  const { isValid, daysRemaining, isTrialPeriod } = useSubscription();
  const navigate = useNavigate();
  
  // Não exibir nada se a assinatura for válida e não estiver no período de teste
  // ou se estiver no período de teste mas com mais de 2 dias restantes
  if (isValid && (!isTrialPeriod || (isTrialPeriod && daysRemaining > 2))) {
    return null;
  }

  const handleNavigateToSubscription = () => {
    navigate('/settings');
    // Aguardar a navegação e então selecionar a aba de assinatura
    setTimeout(() => {
      const tabsElement = document.querySelector('[value="subscription"]');
      if (tabsElement) {
        (tabsElement as HTMLElement).click();
      }
    }, 100);
  };
  
  return (
    <div className={`p-2 ${!isValid ? 'bg-destructive/10' : 'bg-yellow-50'} rounded-md mb-4 flex flex-wrap gap-2 items-center justify-between`}>
      <div className="flex items-center">
        <AlertTriangle className={`h-5 w-5 mr-2 ${!isValid ? 'text-destructive' : 'text-yellow-500'}`} />
        <span>
          {!isValid ? (
            <strong>Assinatura expirada.</strong>
          ) : isTrialPeriod ? (
            daysRemaining <= 0 ? (
              <strong>Seu período de avaliação expirou.</strong>
            ) : (
              <strong>Seu período de avaliação termina em {daysRemaining} dia{daysRemaining !== 1 ? 's' : ''}.</strong>
            )
          ) : null}
          {' '}Atualize para continuar usando todos os recursos.
        </span>
      </div>
      <Button 
        size="sm"
        onClick={handleNavigateToSubscription}
        variant={!isValid ? "destructive" : "outline"}
      >
        {!isValid ? "Atualizar Assinatura" : "Ver Planos"}
      </Button>
    </div>
  );
};

export default SubscriptionAlert;
