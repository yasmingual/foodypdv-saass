
import React, { useState } from "react";
import { SettingsLayout } from "./SettingsLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Printer } from "lucide-react";

export const PrinterSettings = () => {
  const { toast } = useToast();
  const [isPrinting, setIsPrinting] = useState(false);
  
  const form = useForm({
    defaultValues: {
      printerName: "EPSON TM-T20",
      printerIP: "192.168.1.100",
      printerPort: "9100",
      autoPrint: true,
      printCopies: "1",
      paperSize: "80mm",
      fontSize: "normal",
      showLogo: true,
      footerText: "Obrigado pela preferência! Volte sempre!",
      printItems: true,
      printPrices: true,
      printQRCode: false,
    }
  });

  const onSubmit = (data: any) => {
    console.log("Configurações de impressão salvas:", data);
    toast({
      title: "Configurações salvas",
      description: "As configurações de impressão foram atualizadas com sucesso!"
    });
  };

  const handleTestPrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      toast({
        title: "Impressão de teste",
        description: "O cupom de teste foi enviado para a impressora!"
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="general">Configuração Geral</TabsTrigger>
          <TabsTrigger value="layout">Layout do Cupom</TabsTrigger>
          <TabsTrigger value="preview">Visualização</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <SettingsLayout
            title="Configuração da Impressora"
            description="Configure a conexão com sua impressora térmica."
          >
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="printerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Impressora</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nome da Impressora" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="printerIP"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço IP</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="192.168.1.100" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="printerPort"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Porta</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="9100" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="paperSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tamanho do Papel</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tamanho do papel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="58mm">58mm</SelectItem>
                          <SelectItem value="80mm">80mm</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="autoPrint"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Impressão Automática</FormLabel>
                        <FormDescription>
                          Imprimir automaticamente ao finalizar pedidos
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
                  name="printCopies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Cópias</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Número de cópias" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 cópia</SelectItem>
                          <SelectItem value="2">2 cópias</SelectItem>
                          <SelectItem value="3">3 cópias</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between mt-6">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleTestPrint}
                    disabled={isPrinting}
                    className="flex gap-2"
                  >
                    <Printer className="h-4 w-4" />
                    {isPrinting ? "Imprimindo..." : "Imprimir Teste"}
                  </Button>
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
        </TabsContent>
        
        <TabsContent value="layout">
          <SettingsLayout
            title="Layout do Cupom"
            description="Personalize como as informações serão exibidas no cupom impresso."
          >
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="showLogo"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Mostrar Logo</FormLabel>
                        <FormDescription>
                          Exibir o logo do estabelecimento no topo do cupom
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
                  name="fontSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tamanho da Fonte</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Tamanho da fonte" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small">Pequena</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="large">Grande</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="footerText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Texto do Rodapé</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Texto que aparecerá no rodapé do cupom" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="printItems"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Imprimir Itens</FormLabel>
                          <FormDescription>
                            Mostrar lista de itens
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
                    name="printPrices"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Imprimir Preços</FormLabel>
                          <FormDescription>
                            Mostrar preços individuais
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
                </div>
                
                <FormField
                  control={form.control}
                  name="printQRCode"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Imprimir QR Code</FormLabel>
                        <FormDescription>
                          Incluir QR Code no cupom para avaliação do cliente
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
        </TabsContent>
        
        <TabsContent value="preview">
          <SettingsLayout
            title="Visualização do Cupom"
            description="Veja como o cupom ficará após a impressão com as configurações atuais."
          >
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold">Restaurante Demo</h2>
                <p>Av. Principal, 1000</p>
                <p>São Paulo</p>
                <p>Tel: (11) 3000-0000</p>
                <p>CNPJ: 00.000.000/0001-00</p>
              </div>
              
              <div className="border-t border-dashed my-4"></div>
              
              <div>
                <h3 className="font-bold">CUPOM NÃO FISCAL</h3>
                <p>Pedido #12345</p>
                <p>Data/Hora: 15:30 - {new Date().toLocaleDateString()}</p>
                <p>Tipo: Mesa</p>
                <p>Mesa: 10</p>
              </div>
              
              <div className="border-t border-dashed my-4"></div>
              
              <div>
                <h3 className="font-bold">ITENS DO PEDIDO</h3>
                <div className="flex justify-between">
                  <span>2x X-Salada</span>
                  <span>R$ 37.00</span>
                </div>
                <div className="flex justify-between">
                  <span>1x Batata Frita G</span>
                  <span>R$ 20.90</span>
                </div>
                <div className="flex justify-between">
                  <span>3x Coca-Cola 600ml</span>
                  <span>R$ 29.70</span>
                </div>
              </div>
              
              <div className="border-t border-dashed my-4"></div>
              
              <div className="font-bold">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ 87.60</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de Serviço (10%):</span>
                  <span>R$ 8.76</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>TOTAL:</span>
                  <span>R$ 96.36</span>
                </div>
              </div>
              
              <div className="border-t border-dashed my-4"></div>
              
              <div className="text-center text-sm mt-6">
                <p>Obrigado pela preferência!</p>
                <p>Volte sempre!</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button 
                type="button" 
                onClick={handleTestPrint}
                disabled={isPrinting}
                className="flex gap-2"
              >
                <Printer className="h-4 w-4" />
                {isPrinting ? "Imprimindo..." : "Imprimir Este Modelo"}
              </Button>
            </div>
          </SettingsLayout>
        </TabsContent>
      </Tabs>
    </div>
  );
};
