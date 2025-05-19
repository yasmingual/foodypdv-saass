
import React, { useEffect } from "react";
import { SettingsLayout } from "./SettingsLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  AppearanceSettingsType, 
  loadAppearanceSettings, 
  saveAppearanceSettings,
  applyAppearanceSettings
} from "@/utils/settingsUtils";

export const AppearanceSettings = () => {
  const { toast } = useToast();
  
  const form = useForm<AppearanceSettingsType>({
    defaultValues: loadAppearanceSettings()
  });

  // Carregar configurações salvas ao montar o componente
  useEffect(() => {
    const savedSettings = loadAppearanceSettings();
    form.reset(savedSettings);
    
    // Aplicar configurações
    applyAppearanceSettings(savedSettings);
  }, [form]);

  const onSubmit = (data: AppearanceSettingsType) => {
    console.log("Configurações de aparência salvas:", data);
    saveAppearanceSettings(data);
    
    // Aplicar configurações imediatamente
    applyAppearanceSettings(data);
    
    toast({
      title: "Configurações salvas",
      description: "As configurações de aparência foram atualizadas com sucesso!"
    });
  };

  return (
    <div className="space-y-6">
      <SettingsLayout
        title="Tema e Cor"
        description="Personalize a aparência do sistema."
      >
        <Form {...form}>
          <form className="space-y-5">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tema</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tema" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="preferredColorScheme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Esquema de Cores</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-4"
                    >
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="purple" className="sr-only" />
                          </FormControl>
                          <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                            <div className="space-y-2 rounded-sm bg-[#8B5CF6] p-2">
                              <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-2 w-[80px] rounded-lg bg-[#8B5CF6]" />
                                <div className="h-2 w-[100px] rounded-lg bg-slate-200" />
                              </div>
                            </div>
                          </div>
                          <span className="block w-full p-2 text-center font-normal">
                            Roxo
                          </span>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="blue" className="sr-only" />
                          </FormControl>
                          <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                            <div className="space-y-2 rounded-sm bg-[#2563EB] p-2">
                              <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-2 w-[80px] rounded-lg bg-[#2563EB]" />
                                <div className="h-2 w-[100px] rounded-lg bg-slate-200" />
                              </div>
                            </div>
                          </div>
                          <span className="block w-full p-2 text-center font-normal">
                            Azul
                          </span>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="green" className="sr-only" />
                          </FormControl>
                          <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                            <div className="space-y-2 rounded-sm bg-[#10B981] p-2">
                              <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-2 w-[80px] rounded-lg bg-[#10B981]" />
                                <div className="h-2 w-[100px] rounded-lg bg-slate-200" />
                              </div>
                            </div>
                          </div>
                          <span className="block w-full p-2 text-center font-normal">
                            Verde
                          </span>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="animationsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Animações</FormLabel>
                    <FormDescription>
                      Habilitar animações na interface
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
        title="Layout"
        description="Configure a disposição dos elementos na interface."
      >
        <Form {...form}>
          <form className="space-y-5">
            <FormField
              control={form.control}
              name="sidebarPosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Posição da Barra Lateral</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a posição" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="left">Esquerda</SelectItem>
                      <SelectItem value="right">Direita</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="sidebarSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Largura da Barra Lateral (%)</FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={field.value}
                      max={40}
                      min={10}
                      step={1}
                      onValueChange={field.onChange}
                      className="py-4"
                    />
                  </FormControl>
                  <FormDescription className="text-center">
                    {field.value}%
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="compactMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Modo Compacto</FormLabel>
                    <FormDescription>
                      Reduzir espaçamento entre elementos
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
                        <SelectValue placeholder="Selecione o tamanho da fonte" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="small">Pequeno</SelectItem>
                      <SelectItem value="medium">Médio</SelectItem>
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
                  <FormLabel>Fonte</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a fonte" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="system">Padrão do Sistema</SelectItem>
                      <SelectItem value="sans">Sans-serif</SelectItem>
                      <SelectItem value="serif">Serif</SelectItem>
                      <SelectItem value="mono">Mono</SelectItem>
                    </SelectContent>
                  </Select>
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
      
      <SettingsLayout
        title="Visualização"
        description="Prévia das configurações visuais."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-2">Tema Claro</h3>
            <div className="bg-white border rounded-md p-4">
              <div className="space-y-2">
                <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                <div className="mt-3 flex gap-2">
                  <div className="h-6 w-16 bg-blue-500 rounded"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-2">Tema Escuro</h3>
            <div className="bg-gray-900 border border-gray-800 rounded-md p-4">
              <div className="space-y-2">
                <div className="h-3 w-3/4 bg-gray-700 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-700 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-700 rounded"></div>
                <div className="mt-3 flex gap-2">
                  <div className="h-6 w-16 bg-blue-600 rounded"></div>
                  <div className="h-6 w-16 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button 
            type="submit" 
            onClick={form.handleSubmit(onSubmit)}
          >
            Aplicar Configurações
          </Button>
        </div>
      </SettingsLayout>
    </div>
  );
};
