
import React, { useState } from "react";
import { SettingsLayout } from "./SettingsLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export const BackupSettings = () => {
  const { toast } = useToast();
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRestoring, setIsRestoring] = useState(false);
  
  const form = useForm({
    defaultValues: {
      autoBackup: true,
      backupFrequency: "daily",
      backupTime: "00:00",
      keepBackups: "7",
      backupLocation: "local",
      cloudProvider: "none",
      cloudKey: "",
      cloudSecret: "",
      cloudBucket: "",
      backupDatabase: true,
      backupFiles: false,
      backupConfigurations: true,
      encryptBackups: false,
      compressionLevel: "medium",
    }
  });

  const onSubmit = (data: any) => {
    console.log("Configurações de backup salvas:", data);
    toast({
      title: "Configurações salvas",
      description: "As configurações de backup foram atualizadas com sucesso!"
    });
  };

  const handleBackupNow = () => {
    setIsBackingUp(true);
    setProgress(0);
    
    // Simulação de progresso
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          toast({
            title: "Backup concluído",
            description: "O backup foi realizado com sucesso!"
          });
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
  };

  const handleRestore = () => {
    setIsRestoring(true);
    
    setTimeout(() => {
      setIsRestoring(false);
      toast({
        title: "Restauração concluída",
        description: "O sistema foi restaurado com sucesso!"
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <SettingsLayout
        title="Backup Automático"
        description="Configure as opções de backup automático do sistema."
      >
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="autoBackup"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Backup Automático</FormLabel>
                    <FormDescription>
                      Realizar backups automáticos periodicamente
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
            
            {form.watch("autoBackup") && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="backupFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequência</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a frequência" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hourly">A cada hora</SelectItem>
                            <SelectItem value="daily">Diariamente</SelectItem>
                            <SelectItem value="weekly">Semanalmente</SelectItem>
                            <SelectItem value="monthly">Mensalmente</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="backupTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horário</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="time" 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="keepBackups"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manter Backups</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o período" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="3">3 dias</SelectItem>
                          <SelectItem value="7">7 dias</SelectItem>
                          <SelectItem value="14">14 dias</SelectItem>
                          <SelectItem value="30">30 dias</SelectItem>
                          <SelectItem value="90">90 dias</SelectItem>
                          <SelectItem value="unlimited">Sem limite</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Por quanto tempo manter os arquivos de backup
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </>
            )}
          </form>
        </Form>
      </SettingsLayout>
      
      <SettingsLayout
        title="Armazenamento de Backup"
        description="Configure onde os backups serão armazenados."
      >
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="backupLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local de Armazenamento</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o local" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="local">Local (Servidor)</SelectItem>
                      <SelectItem value="cloud">Nuvem</SelectItem>
                      <SelectItem value="both">Ambos</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            {(form.watch("backupLocation") === "cloud" || form.watch("backupLocation") === "both") && (
              <>
                <FormField
                  control={form.control}
                  name="cloudProvider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provedor de Nuvem</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o provedor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">Selecione...</SelectItem>
                          <SelectItem value="aws">Amazon S3</SelectItem>
                          <SelectItem value="gcp">Google Cloud Storage</SelectItem>
                          <SelectItem value="azure">Microsoft Azure</SelectItem>
                          <SelectItem value="dropbox">Dropbox</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                {form.watch("cloudProvider") !== "none" && (
                  <div className="space-y-4 border rounded-md p-4">
                    <FormField
                      control={form.control}
                      name="cloudKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chave de Acesso</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="password"
                              placeholder="Chave de acesso do provedor de nuvem" 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cloudSecret"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chave Secreta</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="password"
                              placeholder="Chave secreta do provedor de nuvem" 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cloudBucket"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bucket / Container</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Nome do bucket ou container" 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </>
            )}
          </form>
        </Form>
      </SettingsLayout>
      
      <SettingsLayout
        title="Opções Avançadas"
        description="Configure opções avançadas de backup."
      >
        <Form {...form}>
          <form className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="backupDatabase"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Banco de Dados</FormLabel>
                      <FormDescription>
                        Incluir banco de dados no backup
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
                name="backupFiles"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Arquivos de Upload</FormLabel>
                      <FormDescription>
                        Incluir arquivos enviados pelos usuários
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
                name="backupConfigurations"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Configurações</FormLabel>
                      <FormDescription>
                        Incluir configurações do sistema
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
                name="encryptBackups"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Criptografar Backups</FormLabel>
                      <FormDescription>
                        Adicionar camada de criptografia aos arquivos de backup
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
                name="compressionLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nível de Compressão</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">Sem compressão</SelectItem>
                        <SelectItem value="low">Baixa</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Níveis mais altos economizam espaço, mas levam mais tempo
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            
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
        title="Backup Manual e Restauração"
        description="Realize backups manualmente ou restaure o sistema a partir de um backup."
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Backup Manual</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Crie um backup completo do sistema agora
            </p>
            
            <div>
              {isBackingUp && (
                <div className="mb-4">
                  <p className="text-sm mb-2">Criando backup... {progress}%</p>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
              
              <Button 
                onClick={handleBackupNow}
                disabled={isBackingUp}
                className="w-full sm:w-auto"
              >
                {isBackingUp ? "Criando Backup..." : "Criar Backup Agora"}
              </Button>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="text-sm font-medium mb-2">Backups Disponíveis</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Selecione um backup para restaurar o sistema
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between border rounded-md p-3">
                <div>
                  <p className="font-medium">Backup Completo</p>
                  <p className="text-sm text-muted-foreground">
                    19/05/2025 - 08:30 • 156MB
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRestore}
                  disabled={isRestoring}
                >
                  {isRestoring ? "Restaurando..." : "Restaurar"}
                </Button>
              </div>
              
              <div className="flex items-center justify-between border rounded-md p-3">
                <div>
                  <p className="font-medium">Backup Automático</p>
                  <p className="text-sm text-muted-foreground">
                    18/05/2025 - 00:00 • 152MB
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  Restaurar
                </Button>
              </div>
              
              <div className="flex items-center justify-between border rounded-md p-3">
                <div>
                  <p className="font-medium">Backup Automático</p>
                  <p className="text-sm text-muted-foreground">
                    17/05/2025 - 00:00 • 149MB
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  Restaurar
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button variant="outline">Ver Todos os Backups</Button>
            </div>
          </div>
        </div>
      </SettingsLayout>
    </div>
  );
};
