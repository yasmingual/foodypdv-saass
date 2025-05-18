
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { useOrders, Order } from "@/context/OrderContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const Orders = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

  // Filtrar pedidos por status
  const pendingOrders = orders.filter(order => order.status === "pending" || order.status === "in-progress" || order.status === "ready");
  const completedOrders = orders.filter(order => order.status === "completed");

  const handleMarkAsDelivered = (orderId: number) => {
    updateOrderStatus(orderId, "completed");
    toast.success("Pedido marcado como entregue");
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setViewDetailsOpen(true);
  };

  // Função para exibir a cor correta do status
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending": return "bg-pdv-accent text-black";
      case "in-progress": return "bg-pdv-primary text-white";
      case "ready": return "bg-pdv-secondary text-white";
      case "completed": return "bg-gray-500 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // Função para traduzir o status
  const translateStatus = (status: Order["status"]) => {
    switch (status) {
      case "pending": return "Pendente";
      case "in-progress": return "Em Preparo";
      case "ready": return "Pronto";
      case "completed": return "Entregue";
      default: return status;
    }
  };

  // Função para traduzir o tipo de pedido
  const translateOrderType = (type: Order["type"]) => {
    switch (type) {
      case "Mesa": return "Mesa";
      case "Retirada": return "Retirada";
      case "Delivery": return "Delivery";
      default: return type;
    }
  };

  // Renderizar card de pedido
  const renderOrderCard = (order: Order) => (
    <Card key={order.id} className="mb-4">
      <CardHeader className={`${getStatusColor(order.status)} py-2 px-4 rounded-t-lg`}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">
            <span className="font-bold">#{order.id}</span> - {translateOrderType(order.type)}: {order.identifier}
          </CardTitle>
          <Badge variant="outline" className={order.status === "pending" ? "bg-white text-black" : "bg-white/20 text-white"}>
            {order.time}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-2">
          {order.items.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <div>
                <span className="font-medium">{item.quantity}x {item.name}</span>
                {item.notes && (
                  <p className="text-xs text-muted-foreground">{item.notes}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="bg-muted/20 px-4 py-3 flex justify-between gap-2">
        <Button 
          variant="outline" 
          className="w-1/2"
          onClick={() => handleViewDetails(order)}
        >
          Ver Detalhes
        </Button>
        
        {order.status === "ready" && (
          <Button 
            variant="default" 
            className="bg-pdv-secondary hover:bg-pdv-secondary/80 w-1/2"
            onClick={() => handleMarkAsDelivered(order.id)}
          >
            Entregar
          </Button>
        )}
        
        {(order.status === "pending" || order.status === "in-progress") && (
          <Button 
            variant="outline" 
            className="w-1/2"
            disabled
          >
            {translateStatus(order.status)}
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Pedidos" subtitle="Gerenciamento de Pedidos para Atendentes" />
        <main className="flex-1 p-6 overflow-auto">
          <Tabs defaultValue="pending" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="pending">
                  Em Aberto <Badge className="ml-2 bg-pdv-accent text-black">{pendingOrders.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Finalizados <Badge className="ml-2 bg-gray-500">{completedOrders.length}</Badge>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="pending">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingOrders.map(renderOrderCard)}
                
                {pendingOrders.length === 0 && (
                  <div className="col-span-full flex justify-center items-center p-8">
                    <p className="text-muted-foreground">Nenhum pedido em aberto no momento.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedOrders.map(renderOrderCard)}
                
                {completedOrders.length === 0 && (
                  <div className="col-span-full flex justify-center items-center p-8">
                    <p className="text-muted-foreground">Nenhum pedido finalizado.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Diálogo de Detalhes do Pedido */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              {selectedOrder?.type}: {selectedOrder?.identifier} - {selectedOrder?.time}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-4">
              <Badge className={`${selectedOrder?.status ? getStatusColor(selectedOrder.status) : ''} mb-2`}>
                {selectedOrder?.status ? translateStatus(selectedOrder.status) : ''}
              </Badge>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Qtd</TableHead>
                  <TableHead>Observações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedOrder?.items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.notes || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <DialogFooter>
            {selectedOrder?.status === "ready" && (
              <Button
                onClick={() => {
                  if (selectedOrder) {
                    handleMarkAsDelivered(selectedOrder.id);
                    setViewDetailsOpen(false);
                  }
                }}
                className="bg-pdv-secondary hover:bg-pdv-secondary/80"
              >
                Marcar como Entregue
              </Button>
            )}
            <Button variant="outline" onClick={() => setViewDetailsOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
