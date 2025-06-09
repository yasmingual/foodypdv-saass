
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Check, Star, Users, ShieldCheck, 
  Clock, BarChart, Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { subscriptionPlans, SubscriptionPlan } from '@/utils/subscriptionUtils';

const PlanCard = ({ plan, selectedInterval }: { plan: SubscriptionPlan, selectedInterval: 'month' | 'year' }) => {
  // Filtrar apenas os planos do intervalo selecionado
  if (plan.interval !== selectedInterval) {
    return null;
  }
  
  return (
    <Card className={`relative flex flex-col h-full ${plan.recommended ? 'border-primary border-2' : ''}`}>
      {plan.recommended && (
        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-semibold rounded-bl-md rounded-tr-md">
          RECOMENDADO
        </div>
      )}
      <CardHeader>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
          <p className="text-4xl font-bold">
            R$ {plan.price.toFixed(2)}
            <span className="text-sm font-normal text-muted-foreground">
              /{plan.interval === 'month' ? 'mês' : 'ano'}
            </span>
          </p>
          <p className="text-muted-foreground">{plan.description}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-full justify-between">
        <div className="space-y-4">
          <p className="font-medium">Funcionalidades inclusas:</p>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-6">
          <Button className="w-full" size="lg">
            Escolher plano <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => (
  <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
    <CardContent className="p-6">
      <div className="mb-4 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Landing = () => {
  const [selectedInterval, setSelectedInterval] = useState<'month' | 'year'>('month');
  
  const handleIntervalChange = (value: string) => {
    setSelectedInterval(value as 'month' | 'year');
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold">FoodPOS</div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Teste Grátis 7 Dias
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-background pt-20 pb-32 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Sistema de PDV Completo para seu Restaurante</h1>
          <p className="text-xl max-w-3xl mx-auto mb-10 opacity-90">
            Gerencie pedidos, estoque, cozinha e caixa com uma solução completa e fácil de usar.
            Revolucione seu negócio de alimentação hoje.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="default" className="bg-white text-primary hover:bg-white/90">
                Comece agora
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Veja como funciona
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Funcionalidades Principais</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nossa solução completa foi desenvolvida especificamente para atender
            às necessidades de restaurantes, bares, cafeterias e outros estabelecimentos de alimentação.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Store size={24} />}
            title="PDV Intuitivo"
            description="Interface simples e prática para registrar pedidos rapidamente sem complicações."
          />
          <FeatureCard
            icon={<Clock size={24} />}
            title="KDS para Cozinha"
            description="Sistema de exibição para a cozinha, organizando os pedidos por prioridade."
          />
          <FeatureCard
            icon={<Users size={24} />}
            title="Gestão de Clientes"
            description="Cadastre e acompanhe seus clientes, visualize histórico de pedidos."
          />
          <FeatureCard
            icon={<BarChart size={24} />}
            title="Relatórios Detalhados"
            description="Análise completa das suas vendas, produtos mais vendidos e lucratividade."
          />
          <FeatureCard
            icon={<ShieldCheck size={24} />}
            title="Controle de Estoque"
            description="Gerencie seu estoque automaticamente a cada venda realizada."
          />
          <FeatureCard
            icon={<Star size={24} />}
            title="Personalização"
            description="Adapte o sistema às necessidades específicas do seu negócio."
          />
        </div>
      </section>
      
      {/* Pricing */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Planos e Preços</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio. Todos incluem 7 dias de teste grátis.
            </p>
            
            <div className="mt-6">
              <Tabs 
                defaultValue="month" 
                onValueChange={handleIntervalChange}
                className="w-[300px] mx-auto"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="month">Mensal</TabsTrigger>
                  <TabsTrigger value="year">Anual</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans
              .filter(plan => plan.interval === selectedInterval)
              .map((plan) => (
                <PlanCard 
                  key={plan.id} 
                  plan={plan} 
                  selectedInterval={selectedInterval}
                />
              ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Pronto para revolucionar seu negócio?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Comece agora com 7 dias grátis. Sem compromisso, cancele quando quiser.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Experimente Grátis por 7 Dias
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">FoodPOS</h3>
              <p className="text-sm text-muted-foreground">
                Sistema completo de gestão para estabelecimentos de alimentação.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Produto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Funcionalidades</li>
                <li>Preços</li>
                <li>Demonstração</li>
                <li>Casos de sucesso</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Suporte</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Central de Ajuda</li>
                <li>Documentação</li>
                <li>Contato</li>
                <li>Status do Sistema</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Entre em contato</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>contato@foodpos.com.br</li>
                <li>(11) 3000-0000</li>
                <li>São Paulo - SP</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} FoodPOS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
