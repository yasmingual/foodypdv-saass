
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for orders in the kitchen
const mockOrders = [
  {
    id: 1001,
    type: "Mesa",
    identifier: "Mesa 3",
    time: "10:15",
    status: "pending",
    items: [
      { name: "X-Bacon", quantity: 1, notes: "Sem cebola" },
      { name: "Batata Frita M", quantity: 1, notes: "" },
      { name: "Coca-Cola 600ml", quantity: 2, notes: "" }
    ]
  },
  {
    id: 1002,
    type: "Retirada",
    identifier: "João",
    time: "10:20",
    status: "pending",
    items: [
      { name: "X-Tudo", quantity: 2, notes: "Um sem tomate" },
      { name: "Batata Frita G", quantity: 1, notes: "Cheddar extra" },
      { name: "Água Mineral", quantity: 2, notes: "" }
    ]
  },
  {
    id: 1003,
    type: "Delivery",
    identifier: "Maria",
    time: "10:25",
    status: "in-progress",
    items: [
      { name: "X-Salada", quantity: 1, notes: "" },
      { name: "X-Bacon", quantity: 1, notes: "" },
      { name: "Batata Frita P", quantity: 2, notes: "" },
      { name: "Coca-Cola Lata", quantity: 2, notes: "" }
    ]
  },
  {
    id: 1004,
    type: "Mesa",
    identifier: "Mesa 5",
    time: "10:30",
    status: "ready",
    items: [
      { name: "X-Bacon", quantity: 2, notes: "" },
      { name: "Coca-Cola 600ml", quantity: 2, notes: "" }
    ]
  }
];

type Order = typeof mockOrders[0];

const KDS = () => {
  const [orders, setOrders] = useState(mockOrders);
  
  const handleStatusChange = (orderId: number, newStatus: "pending" | "in-progress" | "ready" | "completed") => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const pendingOrders = orders.filter(order => order.status === "pending");
  const inProgressOrders = orders.filter(order => order.status === "in-progress");
  const readyOrders = orders.filter(order => order.status === "ready");
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-pdv-accent text-black";
      case "in-progress": return "bg-pdv-primary text-white";
      case "ready": return "bg-pdv-secondary text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };
  
  const renderOrderCard = (order: Order) => (
    <Card key={order.id} className="mb-4">
      <CardHeader className={`${getStatusColor(order.status)} py-2 px-4 rounded-t-lg`}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">
            <span className="font-bold">#{order.id}</span> - {order.type}: {order.identifier}
          </CardTitle>
          <Badge variant="outline" className={order.status === "pending" ? "bg-white text-black" : "bg-white/20 text-white"}>
            {order.time}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-2 mb-4">
          {order.items.map((item, idx) => (
            <li key={idx} className="flex justify-between items-start">
              <div>
                <span className="font-medium">{item.quantity}x {item.name}</span>
                {item.notes && (
                  <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>
                )}
              </div>
              <input type="checkbox" className="h-5 w-5 accent-pdv-secondary" />
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="bg-muted/20 px-4 py-3 flex justify-between">
        {order.status === "pending" && (
          <Button 
            variant="default" 
            className="bg-pdv-primary hover:bg-pdv-primary/80 w-full"
            onClick={() => handleStatusChange(order.id, "in-progress")}
          >
            Iniciar Preparo
          </Button>
        )}
        {order.status === "in-progress" && (
          <Button 
            variant="default" 
            className="bg-pdv-secondary hover:bg-pdv-secondary/80 w-full"
            onClick={() => handleStatusChange(order.id, "ready")}
          >
            Marcar como Pronto
          </Button>
        )}
        {order.status === "ready" && (
          <Button 
            variant="default" 
            className="bg-gray-500 hover:bg-gray-600 w-full"
            onClick={() => handleStatusChange(order.id, "completed")}
          >
            Entregue
          </Button>
        )}
      </CardFooter>
    </Card>
  );
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="KDS" subtitle="Sistema de Exibição da Cozinha" />
        <main className="flex-1 p-6 overflow-auto">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">
                  Todos <Badge className="ml-2 bg-gray-500">{orders.length - orders.filter(o => o.status === "completed").length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pendentes <Badge className="ml-2 bg-pdv-accent text-black">{pendingOrders.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="in-progress">
                  Em Preparo <Badge className="ml-2 bg-pdv-primary">{inProgressOrders.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="ready">
                  Prontos <Badge className="ml-2 bg-pdv-secondary">{readyOrders.length}</Badge>
                </TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  Filtrar
                </Button>
                <Button variant="outline" size="sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Adicionar
                </Button>
              </div>
            </div>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders
                  .filter(order => order.status !== "completed")
                  .map(renderOrderCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="pending">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingOrders.map(renderOrderCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="in-progress">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressOrders.map(renderOrderCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="ready">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {readyOrders.map(renderOrderCard)}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default KDS;
