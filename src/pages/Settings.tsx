
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Header } from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { PrinterSettings } from "@/components/settings/PrinterSettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { IntegrationSettings } from "@/components/settings/IntegrationSettings";
import { BackupSettings } from "@/components/settings/BackupSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <Layout>
      <Header 
        title="Configurações do Sistema" 
        subtitle="Personalize o sistema conforme suas necessidades" 
      />
      
      <div className="p-6">
        <Card className="p-6">
          <Tabs 
            defaultValue="general" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="printer">Impressão</TabsTrigger>
              <TabsTrigger value="appearance">Aparência</TabsTrigger>
              <TabsTrigger value="integrations">Integrações</TabsTrigger>
              <TabsTrigger value="backup">Backup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <GeneralSettings />
            </TabsContent>
            
            <TabsContent value="printer">
              <PrinterSettings />
            </TabsContent>
            
            <TabsContent value="appearance">
              <AppearanceSettings />
            </TabsContent>
            
            <TabsContent value="integrations">
              <IntegrationSettings />
            </TabsContent>
            
            <TabsContent value="backup">
              <BackupSettings />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
