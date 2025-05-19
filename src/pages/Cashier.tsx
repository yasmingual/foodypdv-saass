import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useOrders, Order } from "@/context/OrderContext";
import PaymentDialog from "@/components/cashier/PaymentDialog";

// Mock data for transactions - agora será atualizado dinamicamente
const initialTransactions = [
  { id: "T1001", orderId: 1001, value: 56.90, type: "Crédito", time: "10:15", status: "completed" },
  { id: "T1002", orderId: 1002, value: 87.80, type: "Dinheiro", time: "10:25", status: "completed" },
  { id: "T1003", orderId: 1003, value: 102.50, type: "Débito", time: "11:05", status: "completed" },
  { id: "T1004", orderId: 1004, value: 45.00, type: "Pix", time: "11:10", status: "completed" },
  { id: "T1005", orderId: 1005, value: 73.90, type: "Crédito", time: "11:45", status: "completed" },
  { id: "T1006", orderId: 1006, value: 25.50, type: "Dinheiro", time: "12:00", status: "completed" },
  { id: "T1007", orderId: 1007, value: 67.80, type: "Pix", time: "12:15", status: "completed" },
  { id: "T1008", orderId: 1008, value: 42.90, type: "Débito", time: "12:30", status: "completed" },
  { id: "T1009", orderId: 1009, value: 105.70, type: "Crédito", time: "13:00", status: "pending" },
];

const Cashier = () => {
  const { orders, calculateOrderTotal } = useOrders();
  const [activeTab, setActiveTab] = useState("summary");
  const [isCashierOpen, setIsCashierOpen] = useState(false);
  const [openCashDialogOpen, setOpenCashDialogOpen] = useState(false);
  const [initialCashAmount, setInitialCashAmount] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);

  const readyOrders = orders.filter(order => order.status === "ready");
  const paidOrders = orders.filter(order => order.status === "paid");

  useEffect(() => {
    // Atualiza as transações com base apenas nos pedidos pagos
    const newTransactions = [];
    
    // Adiciona as transações dos pedidos pagos
    paidOrders.forEach(order => {
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      newTransactions.push({
        id: `T${order.id}`,
        orderId: order.id,
        value: calculateOrderTotal(order),
        type: order.paymentMethod || "Dinheiro",
        time: order.time || time,
        status: "completed"
      });
    });
    
    setTransactions(newTransactions);
  }, [paidOrders, calculateOrderTotal]);

  // Calculate totals from transactions
  const totalCash = transactions
    .filter(t => t.status === "completed" && t.type === "Dinheiro")
    .reduce((sum, t) => sum + t.value, 0);

  const totalCard = transactions
    .filter(t => t.status === "completed" && (t.type === "Crédito" || t.type === "Débito"))
    .reduce((sum, t) => sum + t.value, 0);

  const totalPix = transactions
    .filter(t => t.status === "completed" && t.type === "Pix")
    .reduce((sum, t) => sum + t.value, 0);

  const totalSales = transactions
    .filter(t => t.status === "completed")
    .reduce((sum, t) => sum + t.value, 0);

  const handleOpenCashier = () => {
    if (!initialCashAmount || isNaN(Number(initialCashAmount))) {
      toast.error("Por favor, informe um valor inicial válido");
      return;
    }

    setIsCashierOpen(true);
    setOpenCashDialogOpen(false);
    toast.success(`Caixa aberto com sucesso! Valor inicial: R$ ${Number(initialCashAmount).toFixed(2)}`);
  };

  const handleOpenPaymentDialog = (order: Order) => {
    setSelectedOrder(order);
    setPaymentDialogOpen(true);
  };

  const handlePaymentComplete = () => {
    // Fecha o diálogo após o pagamento ser processado
    setPaymentDialogOpen(false);
    setSelectedOrder(null);
    
    // Notificação de sucesso
    toast.success("Pagamento processado com sucesso!");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Caixa" subtitle="Controle Financeiro" />
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total do Dia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalSales.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {transactions.filter(t => t.status === "completed").length} transações
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Dinheiro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-pdv-secondary">R$ {totalCash.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {transactions.filter(t => t.status === "completed" && t.type === "Dinheiro").length} transações
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Cartão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-pdv-primary">R$ {totalCard.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {transactions.filter(t => t.status === "completed" && (t.type === "Crédito" || t.type === "Débito")).length} transações
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-pdv-accent">R$ {totalPix.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {transactions.filter(t => t.status === "completed" && t.type === "Pix").length} transações
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList>
                <TabsTrigger value="summary">Resumo</TabsTrigger>
                <TabsTrigger value="transactions">Transações</TabsTrigger>
                <TabsTrigger value="pending" className={readyOrders.length > 0 ? "relative" : ""}>
                  Pedidos Pendentes
                  {readyOrders.length > 0 && (
                    <Badge className="ml-2 bg-red-500">{readyOrders.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="reports">Relatórios</TabsTrigger>
                <TabsTrigger value="shifts">Turnos</TabsTrigger>
              </TabsList>
            
              <div className="mt-4">
                <TabsContent value="summary">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Resumo de Vendas</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between pb-2 border-b">
                              <span className="text-muted-foreground">Total Bruto</span>
                              <span className="font-medium">R$ {totalSales.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b">
                              <span className="text-muted-foreground">Descontos</span>
                              <span className="font-medium">R$ 0.00</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b">
                              <span className="text-muted-foreground">Taxa de Serviço (10%)</span>
                              <span className="font-medium">R$ {(totalSales * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                              <span>Total Líquido</span>
                              <span>R$ {(totalSales * 1.1).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-4">Formas de Pagamento</h3>
                          <div className="space-y-1">
                            <div className="flex items-center h-8">
                              <div className="w-3 h-3 bg-pdv-primary rounded-full mr-3"></div>
                              <span className="w-24">Cartão</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-pdv-primary h-2 rounded-full" style={{ width: `${totalSales > 0 ? (totalCard / totalSales) * 100 : 0}%` }}></div>
                              </div>
                              <span className="ml-4 font-medium w-24 text-right">
                                {totalSales > 0 ? Math.round((totalCard / totalSales) * 100) : 0}%
                              </span>
                            </div>
                            <div className="flex items-center h-8">
                              <div className="w-3 h-3 bg-pdv-secondary rounded-full mr-3"></div>
                              <span className="w-24">Dinheiro</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-pdv-secondary h-2 rounded-full" style={{ width: `${totalSales > 0 ? (totalCash / totalSales) * 100 : 0}%` }}></div>
                              </div>
                              <span className="ml-4 font-medium w-24 text-right">
                                {totalSales > 0 ? Math.round((totalCash / totalSales) * 100) : 0}%
                              </span>
                            </div>
                            <div className="flex items-center h-8">
                              <div className="w-3 h-3 bg-pdv-accent rounded-full mr-3"></div>
                              <span className="w-24">Pix</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-pdv-accent h-2 rounded-full" style={{ width: `${totalSales > 0 ? (totalPix / totalSales) * 100 : 0}%` }}></div>
                              </div>
                              <span className="ml-4 font-medium w-24 text-right">
                                {totalSales > 0 ? Math.round((totalPix / totalSales) * 100) : 0}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="transactions">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Pedido</TableHead>
                            <TableHead>Horário</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="font-medium">{transaction.id}</TableCell>
                              <TableCell>#{transaction.orderId}</TableCell>
                              <TableCell>{transaction.time}</TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="bg-muted">
                                  {transaction.type}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                R$ {transaction.value.toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <Badge className={transaction.status === "completed" ? "bg-pdv-secondary" : "bg-pdv-accent text-black"}>
                                  {transaction.status === "completed" ? "Concluído" : "Pendente"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                      <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                      <polyline points="7 10 12 15 17 10"></polyline>
                                      <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="pending">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pedidos Prontos para Pagamento</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {readyOrders.length === 0 ? (
                        <div className="flex items-center justify-center h-40 text-muted-foreground">
                          Não há pedidos prontos para pagamento
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Pedido</TableHead>
                              <TableHead>Tipo</TableHead>
                              <TableHead>Cliente/Mesa</TableHead>
                              <TableHead>Itens</TableHead>
                              <TableHead className="text-right">Valor</TableHead>
                              <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {readyOrders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell className="font-medium">#{order.id}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-muted">
                                    {order.type}
                                  </Badge>
                                </TableCell>
                                <TableCell>{order.identifier}</TableCell>
                                <TableCell>
                                  {order.items.length} itens
                                  <span className="text-muted-foreground text-xs block">
                                    {order.items.slice(0, 2).map(item => 
                                      `${item.quantity}x ${item.name}`
                                    ).join(", ")}
                                    {order.items.length > 2 && "..."}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  R$ {calculateOrderTotal(order).toFixed(2)}
                                  {order.hasServiceFee && (
                                    <span className="text-xs block text-muted-foreground">
                                      Inclui 10% taxa
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button 
                                    onClick={() => handleOpenPaymentDialog(order)}
                                    variant="default" 
                                    size="sm"
                                  >
                                    Receber
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reports">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center h-40 border rounded-md border-dashed">
                        <p className="text-muted-foreground">Relatórios serão exibidos aqui</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="shifts">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center h-40 border rounded-md border-dashed">
                        <p className="text-muted-foreground">Informações de turnos serão exibidas aqui</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
            
            <div className="flex gap-2 ml-4">
              <Button 
                onClick={() => setOpenCashDialogOpen(true)} 
                disabled={isCashierOpen}
                className={isCashierOpen ? "bg-gray-400" : ""}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                {isCashierOpen ? "Caixa Aberto" : "Abrir Caixa"}
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Diálogo de Abertura de Caixa */}
      <Dialog open={openCashDialogOpen} onOpenChange={setOpenCashDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Abrir Caixa</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="initialCash" className="text-sm font-medium">
                  Valor Inicial em Caixa
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                  <Input
                    id="initialCash"
                    type="text"
                    placeholder="0,00"
                    className="pl-9"
                    value={initialCashAmount}
                    onChange={(e) => {
                      // Aceitar apenas números e vírgula
                      const value = e.target.value.replace(/[^\d,]/g, '');
                      setInitialCashAmount(value);
                    }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="cashierName" className="text-sm font-medium">
                  Operador
                </label>
                <Input id="cashierName" type="text" defaultValue="Administrador" className="mt-1" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenCashDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleOpenCashier}>Confirmar Abertura</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Pagamento */}
      <PaymentDialog 
        order={selectedOrder}
        open={paymentDialogOpen}
        onClose={() => {
          setPaymentDialogOpen(false);
          setSelectedOrder(null);
        }}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
};

export default Cashier;
