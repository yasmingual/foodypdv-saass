
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, PackagePlus, Filter, Search as SearchIcon, Edit, Trash, Plus, Minus, Eye } from "lucide-react";
import { useStock, StockItem } from "@/context/StockContext";
import { AddStockItemDialog } from "@/components/stock/AddStockItemDialog";
import { UpdateQuantityDialog } from "@/components/stock/UpdateQuantityDialog";
import { EditStockItemDialog } from "@/components/stock/EditStockItemDialog";
import { DeleteConfirmDialog } from "@/components/stock/DeleteConfirmDialog";
import { StockItemDetailsDialog } from "@/components/stock/StockItemDetailsDialog";

const Stock = () => {
  const { 
    stockItems, 
    addStockItem, 
    updateStockItem, 
    deleteStockItem, 
    updateQuantity,
    getStockStatus,
    getLowStockItems,
    getStockCategories,
    getStockValue
  } = useStock();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [updateQuantityDialogOpen, setUpdateQuantityDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  // Filtrar itens
  const filteredItems = stockItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Categorias disponíveis
  const categories = getStockCategories();

  // Funções para abrir diálogos
  const openUpdateQuantityDialog = (item: StockItem) => {
    setSelectedItem(item);
    setUpdateQuantityDialogOpen(true);
  };

  const openEditDialog = (item: StockItem) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (item: StockItem) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const openDetailsDialog = (item: StockItem) => {
    setSelectedItem(item);
    setDetailsDialogOpen(true);
  };

  // Formatar valor monetário
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Estoque" subtitle="Controle de Estoque" />
        <main className="flex-1 p-6 overflow-auto">
          {/* Cards de estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Itens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center">
                  <Package className="mr-2 h-5 w-5 text-muted-foreground" />
                  {stockItems.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Itens com Estoque Baixo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">
                  {getLowStockItems().length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Categorias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {categories.length - 1} {/* -1 para excluir a opção "Todos" */}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Valor do Estoque</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(getStockValue())}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Área de busca e filtros */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div className="flex gap-2 w-full md:w-1/3">
              <Input
                placeholder="Buscar no estoque..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                prefix={<SearchIcon className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
              <Button onClick={() => setAddDialogOpen(true)}>
                <PackagePlus className="mr-2 h-4 w-4" />
                Adicionar Item
              </Button>
            </div>
          </div>

          {/* Categorias de filtro */}
          {filterOpen && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}

          {/* Tabela de itens */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead>Unidade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => {
                    const { status, color } = getStockStatus(item);
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>
                          <Badge className={`${color}`}>
                            {status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.purchasePrice 
                            ? formatCurrency(item.purchasePrice) 
                            : "-"
                          }
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openDetailsDialog(item)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => openUpdateQuantityDialog(item)}
                              className="text-pdv-primary"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => {
                                setSelectedItem(item);
                                setUpdateQuantityDialogOpen(true);
                              }}
                              className="text-pdv-accent"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => openDeleteDialog(item)}
                              className="text-pdv-danger"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {filteredItems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <Package className="h-12 w-12 mb-2" />
                          <p className="text-lg">Nenhum item encontrado</p>
                          <p className="text-sm">
                            {searchQuery || selectedCategory !== "Todos" 
                              ? "Tente ajustar os filtros de busca" 
                              : "Adicione itens ao estoque para começar"
                            }
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Diálogos */}
      <AddStockItemDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={addStockItem}
      />

      <UpdateQuantityDialog
        open={updateQuantityDialogOpen}
        onOpenChange={setUpdateQuantityDialogOpen}
        item={selectedItem}
        onSubmit={updateQuantity}
      />

      <EditStockItemDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        item={selectedItem}
        onSubmit={updateStockItem}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        item={selectedItem}
        onConfirm={deleteStockItem}
      />

      <StockItemDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        item={selectedItem}
        getStockStatus={getStockStatus}
      />
    </div>
  );
};

export default Stock;
