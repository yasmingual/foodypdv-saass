
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Mock data for products
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

// Mock data for categories
const mockCategories = ["Todos", "Lanches", "Porções", "Bebidas"];

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  observation: string;
};

const PDV = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState("mesa");
  const [tableNumber, setTableNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [observationDialogOpen, setObservationDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<typeof mockProducts[0] | null>(null);
  const [observation, setObservation] = useState("");

  // Filter products based on active category and search query
  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openObservationDialog = (product: typeof mockProducts[0]) => {
    setCurrentProduct(product);
    setObservation("");
    setObservationDialogOpen(true);
  };

  const addToCartWithObservation = () => {
    if (!currentProduct) return;
    
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => 
          item.id === currentProduct.id && 
          item.observation === observation
      );
      
      if (existingItemIndex >= 0) {
        // Se o item já existe com a mesma observação, aumente a quantidade
        return prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Adicionar novo item com observação
      return [
        ...prevCart, 
        { 
          ...currentProduct, 
          quantity: 1, 
          observation 
        }
      ];
    });
    
    setObservationDialogOpen(false);
    toast.success(`${currentProduct.name} adicionado ao carrinho`);
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) =>
      prevCart.filter((_, i) => i !== index)
    );
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const updateObservation = (index: number, newObservation: string) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, observation: newObservation } : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleFinishOrder = () => {
    console.log("Pedido finalizado:", {
      items: cart,
      type: orderType,
      table: tableNumber,
      total: calculateTotal(),
    });
    // Aqui você adicionaria a lógica para enviar o pedido para o backend
    
    // Limpa o carrinho após finalizar o pedido
    setCart([]);
    
    toast.success("Pedido finalizado com sucesso!");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="PDV" subtitle="Ponto de Venda" />
        <div className="flex-1 flex overflow-hidden">
          {/* Products Section */}
          <div className="flex-1 flex flex-col overflow-hidden border-r">
            <div className="p-4 border-b">
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span className="ml-2">Filtros</span>
                </Button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {mockCategories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => openObservationDialog(product)}
                  >
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="w-full aspect-square bg-muted rounded-md mb-3 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
                          <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
                          <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
                          <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
                          <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
                          <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
                        </svg>
                      </div>
                      <h3 className="font-medium text-center">{product.name}</h3>
                      <p className="text-pdv-primary font-bold mt-2">
                        R$ {product.price.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Section */}
          <div className="w-96 flex flex-col overflow-hidden bg-card">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium mb-2">Detalhes do Pedido</h2>
              <Tabs defaultValue="mesa" value={orderType} onValueChange={setOrderType}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="mesa">Mesa</TabsTrigger>
                  <TabsTrigger value="retirada">Retirada</TabsTrigger>
                  <TabsTrigger value="delivery">Delivery</TabsTrigger>
                </TabsList>
                <TabsContent value="mesa" className="mt-2">
                  <Input
                    placeholder="Número da Mesa"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                  />
                </TabsContent>
                <TabsContent value="retirada" className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Pedido para retirada no balcão
                  </p>
                </TabsContent>
                <TabsContent value="delivery" className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Adicione os dados de entrega na próxima tela
                  </p>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <p className="mt-4">Carrinho vazio</p>
                  <p className="text-sm">Adicione itens ao pedido</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex flex-col pb-4 border-b">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{item.name}</p>
                            <button 
                              onClick={() => removeFromCart(index)}
                              className="text-pdv-danger hover:text-red-700 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                            </button>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            R$ {item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center ml-4">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                            </Button>
                          </div>
                          <p className="ml-4 font-medium">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      {/* Área de observação */}
                      <div className="mt-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        
                        <Input 
                          placeholder="Adicionar observação" 
                          value={item.observation} 
                          onChange={(e) => updateObservation(index, e.target.value)}
                          className="text-sm h-8 flex-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>R$ {calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxa de serviço (10%)</span>
                <span>R$ {(calculateTotal() * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t">
                <span>Total</span>
                <span>R$ {(calculateTotal() * 1.1).toFixed(2)}</span>
              </div>
              <Button 
                className="w-full"
                disabled={cart.length === 0}
                onClick={handleFinishOrder}
              >
                Finalizar Pedido
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Diálogo de Observação */}
      <Dialog open={observationDialogOpen} onOpenChange={setObservationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <span>Preço</span>
              <span className="font-medium">R$ {currentProduct?.price.toFixed(2)}</span>
            </div>
            <div>
              <label htmlFor="observation" className="text-sm font-medium">
                Alguma observação?
              </label>
              <Textarea
                id="observation"
                placeholder="Ex: Sem cebola, sem tomate, molho à parte, etc."
                className="mt-1"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setObservationDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={addToCartWithObservation}>
              Adicionar ao Pedido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PDV;
