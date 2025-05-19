
import React from "react";
import { SettingsLayout } from "./SettingsLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

export const IntegrationSettings = () => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      enableIfood: false,
      ifoodToken: "",
      enablePaymentGateway: false,
      paymentGatewayKey: "",
      enableWhatsapp: false,
      whatsappNumber: "",
      enableMercadoLivre: false,
      mercadoLivreKey: "",
      enableApiAccess: false,
      apiKey: "sk_test_api_key_123456789",
    }
  });

  const onSubmit = (data: any) => {
    console.log("Configurações de integrações salvas:", data);
    toast({
      title: "Configurações salvas",
      description: "As configurações de integrações foram atualizadas com sucesso!"
    });
  };

  const generateApiKey = () => {
    const newApiKey = `sk_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
    form.setValue("apiKey", newApiKey);
    toast({
      title: "Nova chave API gerada",
      description: "Uma nova chave de API foi gerada com sucesso!"
    });
  };

  return (
    <div className="space-y-6">
      <SettingsLayout
        title="Integrações de Delivery"
        description="Configure as integrações com plataformas de delivery."
      >
        <Form {...form}>
          <form className="space-y-5">
            <FormField
              control={form.control}
              name="enableIfood"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>iFood</FormLabel>
                    <FormDescription>
                      Integrar com a plataforma iFood para receber pedidos automaticamente
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {form.watch("enableIfood") && (
              <FormField
                control={form.control}
                name="ifoodToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token de Acesso iFood</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="password" 
                        placeholder="Token de acesso da API iFood" 
                      />
                    </FormControl>
                    <FormDescription>
                      Para obter seu token de acesso, entre em contato com o iFood
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
      </SettingsLayout>
      
      <SettingsLayout
        title="Gateway de Pagamento"
        description="Configure a integração com gateway de pagamento."
      >
        <Form {...form}>
          <form className="space-y-5">
            <FormField
              control={form.control}
              name="enablePaymentGateway"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Gateway de Pagamento</FormLabel>
                    <FormDescription>
                      Processar pagamentos online através de gateway de pagamento
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {form.watch("enablePaymentGateway") && (
              <FormField
                control={form.control}
                name="paymentGatewayKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chave da API</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="password" 
                        placeholder="Chave secreta da API" 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
      </SettingsLayout>
      
      <SettingsLayout
        title="Outras Integrações"
        description="Configure integrações adicionais."
      >
        <Form {...form}>
          <form className="space-y-5">
            <FormField
              control={form.control}
              name="enableWhatsapp"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>WhatsApp</FormLabel>
                    <FormDescription>
                      Enviar notificações via WhatsApp
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {form.watch("enableWhatsapp") && (
              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número do WhatsApp</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Ex: +5511999999999" 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="enableMercadoLivre"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Mercado Livre</FormLabel>
                    <FormDescription>
                      Integrar com Mercado Livre para gerenciamento de estoque
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </SettingsLayout>
      
      <SettingsLayout
        title="API do Sistema"
        description="Configure o acesso à API do sistema."
      >
        <Form {...form}>
          <form className="space-y-5">
            <FormField
              control={form.control}
              name="enableApiAccess"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Acesso à API</FormLabel>
                    <FormDescription>
                      Permitir acesso externo à API do sistema
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {form.watch("enableApiAccess") && (
              <>
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chave da API</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input 
                            {...field} 
                            readOnly
                            className="font-mono text-xs"
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={generateApiKey}
                        >
                          Gerar Nova
                        </Button>
                      </div>
                      <FormDescription>
                        Esta chave é necessária para autenticar requisições à API
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <Card className="mt-4">
                  <CardContent className="pt-6">
                    <h4 className="text-sm font-medium mb-2">Exemplo de uso da API:</h4>
                    <pre className="bg-gray-100 p-3 rounded text-xs font-mono overflow-x-auto">
                      {`curl -X GET https://api.seudominio.com/orders \\
  -H "Authorization: Bearer ${form.watch("apiKey")}" \\
  -H "Content-Type: application/json"`}
                    </pre>
                  </CardContent>
                </Card>
              </>
            )}
            
            <div className="flex justify-end mt-6">
              <Button 
                type="submit" 
                onClick={form.handleSubmit(onSubmit)}
              >
                Salvar Alterações
              </Button>
            </div>
          </form>
        </Form>
      </SettingsLayout>
    </div>
  );
};
