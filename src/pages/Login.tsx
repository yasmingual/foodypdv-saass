
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUserStore } from '@/stores/userStore';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useUserStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simular login (em produção seria uma chamada para API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular dados do usuário (em produção viria do backend)
      const userData = {
        id: "1",
        name: "Administrador",
        email: formData.email,
        role: "Gerente",
        createdAt: "2025-01-01T00:00:00Z",
      };

      login(userData);

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta ao FoodPOS.",
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">FoodPOS</h1>
          <p className="text-muted-foreground">Acesse sua conta</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Fazer login</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
            
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Não tem uma conta? </span>
              <Link to="/register" className="text-primary hover:underline">
                Cadastre-se grátis
              </Link>
            </div>
            
            <div className="mt-2 text-center text-sm">
              <Link to="/landing" className="text-muted-foreground hover:underline">
                ← Voltar para página inicial
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
