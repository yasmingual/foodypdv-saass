
import React, { useState, useEffect } from "react";
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
import { 
  loadGeneralSettings, 
  loadPrinterSettings, 
  savePrinterSettings, 
  defaultPrinterSettings,
  PrinterSettingsType
} from "@/utils/settingsUtils";

export const PrinterSettings = () => {
  const { toast } = useToast();
  const [isPrinting, setIsPrinting] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState(loadGeneralSettings());
  const [printerSettings, setPrinterSettings] = useState<PrinterSettingsType>(loadPrinterSettings());
  
  const form = useForm({
    defaultValues: printerSettings
  });

  useEffect(() => {
    // Carregar as configurações do restaurante ao montar o componente
    setRestaurantInfo(loadGeneralSettings());
    
    // Carregar as configurações da impressora
    const storedPrinterSettings = loadPrinterSettings();
    setPrinterSettings(storedPrinterSettings);
    form.reset(storedPrinterSettings); // Atualiza o formulário com as configurações salvas
  }, [form]);

  const onSubmit = (data: PrinterSettingsType) => {
    console.log("Configurações de impressão salvas:", data);
    savePrinterSettings(data);
    setPrinterSettings(data);
    toast({
      title: "Configurações salvas",
      description: "As configurações de impressão foram atualizadas com sucesso!"
    });
  };

  const handleTestPrint = () => {
    setIsPrinting(true);
    
    // Cria uma janela temporária para exibir o recibo de teste
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      // Cria o conteúdo do cupom na janela de impressão com as configurações atuais
      printWindow.document.write(`
        <html>
          <head>
            <title>Teste de Impressão</title>
            <style>
              body {
                font-family: ${printerSettings.fontFamily === 'courier' ? "'Courier New', monospace" : 
                               printerSettings.fontFamily === 'arial' ? "Arial, sans-serif" : 
                               printerSettings.fontFamily === 'times' ? "'Times New Roman', serif" : 
                               "'Courier New', monospace"};
                margin: 0;
                padding: 20px;
                max-width: 300px;
                font-size: ${printerSettings.fontSize === 'small' ? '12px' : 
                             printerSettings.fontSize === 'large' ? '16px' : 
                             '14px'};
              }
              .receipt {
                width: 100%;
              }
              .header {
                text-align: center;
                margin-bottom: 10px;
              }
              .divider {
                border-top: 1px dashed #000;
                margin: 10px 0;
              }
              .item {
                display: flex;
                justify-content: space-between;
                margin: 5px 0;
              }
              .total {
                font-weight: bold;
                margin-top: 10px;
                text-align: right;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 0.8rem;
              }
              h1, h2 {
                margin: 5px 0;
              }
              @media print {
                body {
                  width: 100%;
                  margin: 0;
                  padding: 0;
                }
              }
            </style>
          </head>
          <body>
            <div class="receipt">
              <div class="header">
                <h1>${restaurantInfo.restaurantName}</h1>
                <p>${restaurantInfo.address}</p>
                <p>${restaurantInfo.city}</p>
                <p>Tel: ${restaurantInfo.phone}</p>
                <p>CNPJ: ${restaurantInfo.cnpj}</p>
              </div>
              
              <div class="divider"></div>
              
              <div>
                <h2>TESTE DE IMPRESSÃO</h2>
                <p>Este é um teste de configurações de impressão</p>
                <p>Data/Hora: ${new Date().toLocaleTimeString()} - ${new Date().toLocaleDateString()}</p>
                <p>Tamanho do papel: ${printerSettings.paperSize}</p>
                <p>Fonte: ${printerSettings.fontFamily}</p>
                <p>Tamanho da fonte: ${printerSettings.fontSize}</p>
              </div>
              
              <div class="divider"></div>
              
              <div>
                <h2>ITENS DE EXEMPLO</h2>
                <div class="item">
                  <span>2x X-Salada</span>
                  <span>R$ 37.00</span>
                </div>
                <div class="item">
                  <span>1x Batata Frita G</span>
                  <span>R$ 20.90</span>
                </div>
                <div class="item">
                  <span>3x Coca-Cola 600ml</span>
                  <span>R$ 29.70</span>
                </div>
              </div>
              
              <div class="divider"></div>
              
              <div class="total">
                <div class="item">
                  <span>Subtotal:</span>
                  <span>R$ 87.60</span>
                </div>
                <div class="item">
                  <span>TOTAL:</span>
                  <span>R$ 87.60</span>
                </div>
              </div>
              
              <div class="divider"></div>
              
              <div class="footer">
                <p>${printerSettings.footerText}</p>
              </div>
            </div>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(function() { window.close(); }, 500);
              };
            </script>
          </body>
        </html>
      `);
      
      printWindow.document.close();
    } else {
      alert('Por favor, permita popups para imprimir o cupom de teste.');
    }
    
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
              <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="printerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Impressora</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nome da Impressora" />
                      </FormControl>
                      <FormDescription>
                        Digite o nome exato da impressora como aparece no Windows (ex: POS-80C)
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="connectionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Conexão</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de conexão" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="windows">Impressora Local/USB</SelectItem>
                          <SelectItem value="network">Impressora de Rede (TCP/IP)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Para impressoras USB conectadas diretamente, selecione "Impressora Local/USB"
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                {form.watch("connectionType") === "network" && (
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
                )}
                
                <FormField
                  control={form.control}
                  name="paperSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tamanho do Papel</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
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
                        value={field.value}
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
              <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="fontSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tamanho da Fonte</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
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
                  name="fontFamily"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Família da Fonte</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Família da fonte" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="courier">Courier (monoespaçada)</SelectItem>
                          <SelectItem value="arial">Arial (sans-serif)</SelectItem>
                          <SelectItem value="times">Times New Roman (serif)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Escolha a fonte para o cupom impresso
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
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
            <div 
              className="bg-gray-100 p-4 rounded-lg overflow-auto"
              style={{
                fontFamily: printerSettings.fontFamily === 'courier' ? "'Courier New', monospace" : 
                            printerSettings.fontFamily === 'arial' ? "Arial, sans-serif" : 
                            printerSettings.fontFamily === 'times' ? "'Times New Roman', serif" : 
                            "'Courier New', monospace",
                fontSize: printerSettings.fontSize === 'small' ? '12px' : 
                          printerSettings.fontSize === 'large' ? '16px' : 
                          '14px'
              }}
            >
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold">{restaurantInfo.restaurantName}</h2>
                <p>{restaurantInfo.address}</p>
                <p>{restaurantInfo.city}</p>
                <p>Tel: {restaurantInfo.phone}</p>
                <p>CNPJ: {restaurantInfo.cnpj}</p>
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
                <p>{printerSettings.footerText}</p>
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
