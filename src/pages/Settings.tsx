
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "@/components/settings/GeneralSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import PrinterSettings from "@/components/settings/PrinterSettings";
import IntegrationSettings from "@/components/settings/IntegrationSettings";
import BackupSettings from "@/components/settings/BackupSettings";
import SubscriptionSettings from "@/components/settings/SubscriptionSettings";
import { useLocalStorage } from "@/hooks/use-local-storage";

const Settings = () => {
  const [activeTab, setActiveTab] = useLocalStorage("settings-tab", "general");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>
      
      <Tabs 
        defaultValue={activeTab} 
        className="w-full" 
        onValueChange={(value) => setActiveTab(value)}
      >
        <div className="mb-6 border-b">
          <TabsList className="h-10">
            <TabsTrigger value="general" className="data-[state=active]:bg-background">
              Geral
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-background">
              Aparência
            </TabsTrigger>
            <TabsTrigger value="printer" className="data-[state=active]:bg-background">
              Impressão
            </TabsTrigger>
            <TabsTrigger value="shifts" className="data-[state=active]:bg-background">
              Turnos
            </TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-background">
              Integrações
            </TabsTrigger>
            <TabsTrigger value="subscription" className="data-[state=active]:bg-background">
              Assinatura
            </TabsTrigger>
            <TabsTrigger value="backup" className="data-[state=active]:bg-background">
              Backup
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="general" className="mt-0">
          <GeneralSettings />
        </TabsContent>
        
        <TabsContent value="appearance" className="mt-0">
          <AppearanceSettings />
        </TabsContent>
        
        <TabsContent value="printer" className="mt-0">
          <PrinterSettings />
        </TabsContent>
        
        <TabsContent value="shifts" className="mt-0">
          <h2 className="text-2xl font-bold mb-4">Configurações de Turnos</h2>
          <p className="text-muted-foreground">Configurações para o gerenciamento de turnos estarão disponíveis em breve.</p>
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-0">
          <IntegrationSettings />
        </TabsContent>
        
        <TabsContent value="subscription" className="mt-0">
          <SubscriptionSettings />
        </TabsContent>
        
        <TabsContent value="backup" className="mt-0">
          <BackupSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
