
import React from "react";
import { SettingsLayout } from "./SettingsLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export const GeneralSettings = () => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      restaurantName: "Restaurante Demo",
      address: "Av. Principal, 1000",
      city: "São Paulo",
      phone: "(11) 3000-0000",
      cnpj: "00.000.000/0001-00",
      automaticBackup: true,
      notificationSound: true
    }
  });

  const onSubmit = (data: any) => {
    console.log("Configurações gerais salvas:", data);
    // Em um sistema real, salvaríamos essas configurações em um banco de dados
    toast({
      title: "Configurações salvas",
      description: "As configurações gerais foram atualizadas com sucesso!"
    });
  };

  return (
    <div className="space-y-6">
      <SettingsLayout
        title="Informações do Estabelecimento"
        description="Configure as informações básicas do seu estabelecimento que aparecerão nos cupons e relatórios."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="restaurantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Estabelecimento</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome do Estabelecimento" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Endereço" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Cidade" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Telefone" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="CNPJ" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end mt-4">
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        </Form>
      </SettingsLayout>
      
      <SettingsLayout
        title="Notificações"
        description="Configure como e quando o sistema deve notificá-lo."
      >
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="notificationSound"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Som de Notificação</FormLabel>
                    <FormDescription>
                      Ativar som para novos pedidos e alertas
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
            
            <FormField
              control={form.control}
              name="automaticBackup"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Backup Automático</FormLabel>
                    <FormDescription>
                      Realizar backup dos dados automaticamente a cada 24 horas
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
            
            <div className="flex justify-end mt-4">
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Salvar Alterações</Button>
            </div>
          </form>
        </Form>
      </SettingsLayout>
    </div>
  );
};
