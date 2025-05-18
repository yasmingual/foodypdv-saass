
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { useOrders, Order, OrderItem } from "@/context/OrderContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock data para produtos
const mockProducts = [
  { id: 1, name: "X-Bacon", price: 20.9, category: "Lanches" },
  { id: 2, name: "X-Salada", price: 18.5, category: "Lanches" },
  { id: 3, name: "X-Tudo", price: 25.9, category: "Lanches" },
  { id: 4, name: "Batata Frita P", price: 10.5, category: "Porções" },
  { id: 5, name: "Batata Frita M", price: 15.9, category: "Porções" },
  { id: 6, name: "Batata Frita G", price: 20.9, category: "Porções" },
  { id: 7, name: "Coca-Cola Lata", price: 6.5, category: "Bebidas" },
  { id: 8, name: "Coca-Cola 600ml", price: 9.9, category: "Bebidas" },
  { id: 9, name: "Água Mineral", price: 4.5, category: "Bebidas" },
];

const Orders = () => {
  const { orders, updateOrderStatus, addItemsToOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [editOrderOpen, setEditOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null);
  const [productObservation, setProductObservation] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);

  // Filtrar pedidos por status
  const pendingOrders = orders.filter(order => order.status === "pending" || order.status === "in-progress" || order.status === "ready");
  const completedOrders = orders.filter(order => order.status === "completed");

  // Filtrar produtos por categoria e pesquisa
  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Categorias disponíveis
  const categories = ["Todos", "Lanches", "Porções", "Bebidas"];

  const handleMarkAsDelivered = (orderId: number) => {
    updateOrderStatus(orderId, "completed");
    toast.success("Pedido marcado como entregue");
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setViewDetailsOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setEditOrderOpen(true);
  };

  const handleOpenAddProductDialog = () => {
    setSelectedProduct(null);
    setProductObservation("");
    setProductQuantity(1);
    setAddProductDialogOpen(true);
  };

  const handleSelectProduct = (product: typeof mockProducts[0]) => {
    setSelectedProduct(product);
  };

  const handleAddProductToOrder = () => {
    if (!selectedOrder || !selectedProduct) return;
    
    const newItem: OrderItem = {
      name: selectedProduct.name,
      quantity: productQuantity,
      notes: productObservation
    };
    
    addItemsToOrder(selectedOrder.id, [newItem]);
    setAddProductDialogOpen(false);
    toast.success(`${productQuantity}x ${selectedProduct.name} adicionado ao pedido #${selectedOrder.id}`);
    
    // Atualizar o pedido selecionado para refletir as mudanças no diálogo de detalhes
    const updatedOrder = orders.find(order => order.id === selectedOrder.id);
    if (updatedOrder) {
      setSelectedOrder(updatedOrder);
    }
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
          className="w-1/3"
          onClick={() => handleViewDetails(order)}
        >
          Ver Detalhes
        </Button>
        
        {(order.status === "pending" || order.status === "in-progress") && (
          <Button 
            variant="default"
            className="w-1/3 bg-pdv-primary hover:bg-pdv-primary/80"
            onClick={() => handleEditOrder(order)}
          >
            Editar
          </Button>
        )}
        
        {order.status === "ready" && (
          <Button 
            variant="default" 
            className="bg-pdv-secondary hover:bg-pdv-secondary/80 w-1/3"
            onClick={() => handleMarkAsDelivered(order.id)}
          >
            Entregar
          </Button>
        )}
        
        {(order.status === "pending" || order.status === "in-progress") && (
          <Button 
            variant="outline" 
            className="w-1/3"
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
            {(selectedOrder?.status === "pending" || selectedOrder?.status === "in-progress") && (
              <Button
                onClick={() => {
                  setViewDetailsOpen(false);
                  handleEditOrder(selectedOrder);
                }}
                className="bg-pdv-primary hover:bg-pdv-primary/80"
              >
                Editar Pedido
              </Button>
            )}
            <Button variant="outline" onClick={() => setViewDetailsOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Edição de Pedido */}
      <Dialog open={editOrderOpen} onOpenChange={setEditOrderOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Editar Pedido #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              {selectedOrder?.type}: {selectedOrder?.identifier} - {selectedOrder?.time}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="font-medium mb-3">Itens atuais</h3>
            <Table className="mb-4">
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
            
            <Button 
              className="w-full bg-pdv-primary hover:bg-pdv-primary/80 mt-2"
              onClick={handleOpenAddProductDialog}
            >
              Adicionar Mais Itens
            </Button>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOrderOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para Adicionar Produtos */}
      <Dialog open={addProductDialogOpen} onOpenChange={setAddProductDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Adicionar Produtos ao Pedido #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Selecione os produtos para adicionar ao pedido
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {/* Área de pesquisa e filtros */}
            <div className="mb-4 space-y-3">
              <Input 
                placeholder="Buscar produtos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Grid de produtos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[40vh] overflow-y-auto mb-4">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className={`cursor-pointer border-2 transition-colors ${
                    selectedProduct?.id === product.id 
                      ? 'border-pdv-primary' 
                      : 'hover:border-pdv-accent/50'
                  }`}
                  onClick={() => handleSelectProduct(product)}
                >
                  <CardContent className="p-3 flex flex-col items-center">
                    <h3 className="font-medium text-center">{product.name}</h3>
                    <p className="text-pdv-primary font-bold mt-1">
                      R$ {product.price.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Área de detalhes do produto selecionado */}
            {selectedProduct && (
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{selectedProduct.name}</h3>
                  <span className="font-medium">R$ {selectedProduct.price.toFixed(2)}</span>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Quantidade
                  </label>
                  <div className="flex items-center border rounded-md w-fit">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setProductQuantity(prev => Math.max(1, prev - 1))}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </Button>
                    <span className="w-8 text-center">{productQuantity}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setProductQuantity(prev => prev + 1)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="observation" className="text-sm font-medium">
                    Alguma observação?
                  </label>
                  <Textarea
                    id="observation"
                    placeholder="Ex: Sem cebola, sem tomate, molho à parte, etc."
                    value={productObservation}
                    onChange={(e) => setProductObservation(e.target.value)}
                    className="resize-none"
                  />
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setAddProductDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAddProductToOrder}
              disabled={!selectedProduct}
              className="bg-pdv-primary hover:bg-pdv-primary/80"
            >
              Adicionar ao Pedido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
