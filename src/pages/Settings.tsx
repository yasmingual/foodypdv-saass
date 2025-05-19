
import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { PrinterSettings } from "@/components/settings/PrinterSettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { IntegrationSettings } from "@/components/settings/IntegrationSettings";
import { BackupSettings } from "@/components/settings/BackupSettings";
import { useOrders, Shift } from "@/context/OrderContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ShiftDetailsDialog from "@/components/cashier/ShiftDetailsDialog";
import { toast } from "sonner";

const Settings = () => {
  // Recuperamos o último tab ativo do localStorage, se disponível
  const getInitialTab = () => {
    try {
      const savedTab = localStorage.getItem('settingsActiveTab');
      return savedTab || "general";
    } catch (error) {
      return "general";
    }
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const { shifts } = useOrders();
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  // Salvamos o tab ativo no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('settingsActiveTab', activeTab);
  }, [activeTab]);

  // Função para abrir o diálogo de detalhes do turno
  const handleViewShiftDetails = (shift: Shift) => {
    setSelectedShift(shift);
    setDetailsDialogOpen(true);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar já está implementada globalmente */}
      <div className="flex-1 flex flex-col">
        <Header 
          title="Configurações do Sistema" 
          subtitle="Personalize o sistema conforme suas necessidades" 
        />
        
        <div className="p-6 flex-1 overflow-y-auto">
          <Card className="p-6">
            <Tabs 
              defaultValue={activeTab} 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-6 mb-8">
                <TabsTrigger value="general">Geral</TabsTrigger>
                <TabsTrigger value="printer">Impressão</TabsTrigger>
                <TabsTrigger value="appearance">Aparência</TabsTrigger>
                <TabsTrigger value="integrations">Integrações</TabsTrigger>
                <TabsTrigger value="backup">Backup</TabsTrigger>
                <TabsTrigger value="shifts">Turnos</TabsTrigger>
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
              
              <TabsContent value="shifts">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Histórico de Turnos</h2>
                  
                  {shifts.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      Nenhum turno registrado
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Operador</TableHead>
                          <TableHead>Início</TableHead>
                          <TableHead>Fim</TableHead>
                          <TableHead>Transações</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {shifts.map((shift) => (
                          <TableRow key={shift.id}>
                            <TableCell>#{shift.id}</TableCell>
                            <TableCell>{shift.operatorName}</TableCell>
                            <TableCell>{shift.startTime}</TableCell>
                            <TableCell>{shift.endTime || "-"}</TableCell>
                            <TableCell>{shift.totalTransactions}</TableCell>
                            <TableCell>
                              <Badge className={shift.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                                {shift.status === "active" ? "Ativo" : "Fechado"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleViewShiftDetails(shift)}
                              >
                                Detalhes
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
      
      {/* Diálogo de detalhes do turno */}
      <ShiftDetailsDialog 
        shift={selectedShift}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      />
    </div>
  );
};

export default Settings;
