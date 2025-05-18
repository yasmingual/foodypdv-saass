
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for stock items
const mockStockItems = [
  { id: 1, name: "Pão de Hambúrguer", category: "Ingredientes", quantity: 125, unit: "un", minStock: 50 },
  { id: 2, name: "Carne Hambúrguer", category: "Ingredientes", quantity: 80, unit: "un", minStock: 40 },
  { id: 3, name: "Queijo Cheddar", category: "Ingredientes", quantity: 30, unit: "kg", minStock: 5 },
  { id: 4, name: "Alface", category: "Vegetais", quantity: 4, unit: "kg", minStock: 5 },
  { id: 5, name: "Tomate", category: "Vegetais", quantity: 8, unit: "kg", minStock: 5 },
  { id: 6, name: "Cebola", category: "Vegetais", quantity: 10, unit: "kg", minStock: 5 },
  { id: 7, name: "Batata", category: "Vegetais", quantity: 30, unit: "kg", minStock: 20 },
  { id: 8, name: "Coca-Cola Lata", category: "Bebidas", quantity: 48, unit: "un", minStock: 24 },
  { id: 9, name: "Coca-Cola 600ml", category: "Bebidas", quantity: 24, unit: "un", minStock: 12 },
  { id: 10, name: "Água Mineral", category: "Bebidas", quantity: 36, unit: "un", minStock: 20 }
];

const Stock = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = mockStockItems.filter(
    item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStockStatus = (item: typeof mockStockItems[0]) => {
    if (item.quantity <= 0) return { status: "Esgotado", color: "bg-red-500" };
    if (item.quantity < item.minStock) return { status: "Crítico", color: "bg-pdv-accent" };
    if (item.quantity < item.minStock * 1.5) return { status: "Baixo", color: "bg-amber-500" };
    return { status: "Ok", color: "bg-pdv-secondary" };
  };

  const lowStockCount = mockStockItems.filter(item => item.quantity < item.minStock).length;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Estoque" subtitle="Controle de Estoque" />
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Itens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStockItems.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Itens com Estoque Baixo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">{lowStockCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Categorias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Valor do Estoque</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 4.320,00</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 w-1/3">
              <Input
                placeholder="Buscar no estoque..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                Filtrar
              </Button>
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Adicionar Item
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead>Unidade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => {
                    const { status, color } = getStockStatus(item);
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>
                          <Badge className={`${color}`}>
                            {status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-pdv-danger">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Stock;
