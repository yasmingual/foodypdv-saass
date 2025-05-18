
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Pencil, EyeIcon, Trash2 } from "lucide-react";

// Mock data for products
const mockProducts = [
  { id: 1, name: "X-Bacon", category: "Lanches", price: 20.9, stock: 0, active: true },
  { id: 2, name: "X-Salada", category: "Lanches", price: 18.5, stock: 25, active: true },
  { id: 3, name: "X-Tudo", category: "Lanches", price: 25.9, stock: 30, active: true },
  { id: 4, name: "Batata Frita P", category: "Porções", price: 10.5, stock: 50, active: true },
  { id: 5, name: "Batata Frita M", category: "Porções", price: 15.9, stock: 45, active: true },
  { id: 6, name: "Batata Frita G", category: "Porções", price: 20.9, stock: 40, active: true },
  { id: 7, name: "Coca-Cola Lata", category: "Bebidas", price: 6.5, stock: 48, active: true },
  { id: 8, name: "Coca-Cola 600ml", category: "Bebidas", price: 9.9, stock: 24, active: true },
  { id: 9, name: "Água Mineral", category: "Bebidas", price: 4.5, stock: 36, active: true },
  { id: 10, name: "Hamburguer Veggie", category: "Lanches", price: 22.5, stock: 5, active: false },
];

// Mock data para categorias (extraído das categorias usadas nos produtos)
const mockCategories = [
  { id: 1, name: "Lanches", productsCount: 12, active: true },
  { id: 2, name: "Porções", productsCount: 8, active: true },
  { id: 3, name: "Bebidas", productsCount: 15, active: true },
  { id: 4, name: "Combos", productsCount: 6, active: true },
  { id: 5, name: "Sobremesas", productsCount: 9, active: true },
  { id: 6, name: "Entradas", productsCount: 4, active: false },
  { id: 7, name: "Vegano", productsCount: 3, active: true },
];

const Products = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isNewProductDialogOpen, setIsNewProductDialogOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState<any>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    active: true
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    active: true
  });

  // Filter products based on search query and active filter
  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = 
        activeFilter === "all" ||
        (activeFilter === "active" && product.active) ||
        (activeFilter === "inactive" && !product.active) ||
        (activeFilter === "out-of-stock" && product.stock === 0);
      
      return matchesSearch && matchesFilter;
    }
  );

  // Handler para o botão Novo Produto
  const handleNewProduct = () => {
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      active: true
    });
    setIsNewProductDialogOpen(true);
    toast.info("Novo produto", {
      description: "Adicionando um novo produto ao catálogo",
    });
  };

  // Handler para salvar novo produto
  const handleSaveNewProduct = () => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    const productToAdd = {
      ...newProduct,
      id: newId
    };
    
    setProducts([...products, productToAdd]);
    setIsNewProductDialogOpen(false);
    toast.success("Produto adicionado", {
      description: `O produto ${newProduct.name} foi adicionado com sucesso.`,
    });
  };

  // Handler para o botão de Editar
  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setEditedProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      active: product.active
    });
    setIsEditDialogOpen(true);
    toast.info("Editar produto", {
      description: `Editando produto: ${product.name}`,
    });
  };

  // Handler para salvar edição de produto
  const handleSaveEdit = () => {
    if (!selectedProduct) return;
    
    const updatedProducts = products.map(p => {
      if (p.id === selectedProduct.id) {
        return { ...p, ...editedProduct };
      }
      return p;
    });
    
    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    toast.success("Produto atualizado", {
      description: `O produto ${editedProduct.name} foi atualizado com sucesso.`,
    });
  };

  // Handler para o botão de Visualizar
  const handleView = (product: any) => {
    setSelectedProduct(product);
    setIsViewDialogOpen(true);
    toast.info("Visualizar produto", {
      description: `Visualizando detalhes do produto: ${product.name}`,
    });
  };

  // Handler para o botão de Excluir
  const handleDeleteClick = (product: any) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Handler para confirmar exclusão
  const handleConfirmDelete = () => {
    if (selectedProduct) {
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      toast.success("Produto excluído", {
        description: `O produto ${selectedProduct.name} foi removido com sucesso.`,
      });
      setIsDeleteDialogOpen(false);
    }
  };

  // Handler para mudança de campo de edição
  const handleEditFieldChange = (field: string, value: any) => {
    setEditedProduct({
      ...editedProduct,
      [field]: value
    });
  };

  // Handler para mudança de campo do novo produto
  const handleNewProductFieldChange = (field: string, value: any) => {
    setNewProduct({
      ...newProduct,
      [field]: value
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Produtos" subtitle="Gerenciamento de Produtos" />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2 w-1/3">
              <Input
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    {activeFilter === "all" && "Todos"}
                    {activeFilter === "active" && "Ativos"}
                    {activeFilter === "inactive" && "Inativos"}
                    {activeFilter === "out-of-stock" && "Sem estoque"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveFilter("all")}>
                    Todos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveFilter("active")}>
                    Ativos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveFilter("inactive")}>
                    Inativos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveFilter("out-of-stock")}>
                    Sem estoque
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={handleNewProduct}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Novo Produto
              </Button>
            </div>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                  <TableHead className="text-right">Estoque</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded bg-muted mr-2 flex items-center justify-center text-muted-foreground">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 20V10m-6 10V6M6 20v-4"></path>
                          </svg>
                        </div>
                        <span>{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right">R$ {product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      {product.stock === 0 ? (
                        <span className="text-pdv-danger font-medium">{product.stock}</span>
                      ) : product.stock < 10 ? (
                        <span className="text-pdv-accent font-medium">{product.stock}</span>
                      ) : (
                        <span>{product.stock}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={product.active ? "bg-pdv-secondary" : "bg-muted"}>
                        {product.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEdit(product)}
                          title="Editar produto"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleView(product)}
                          title="Visualizar produto"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-pdv-danger"
                          onClick={() => handleDeleteClick(product)}
                          title="Excluir produto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </main>
      </div>

      {/* Diálogo de adição de novo produto */}
      <Dialog open={isNewProductDialogOpen} onOpenChange={setIsNewProductDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Produto</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para adicionar um novo produto ao catálogo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Nome</label>
              <Input 
                className="col-span-3" 
                value={newProduct.name} 
                onChange={(e) => handleNewProductFieldChange("name", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Categoria</label>
              <Select 
                value={newProduct.category}
                onValueChange={(value) => handleNewProductFieldChange("category", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories
                    .filter(category => category.active)
                    .map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Preço (R$)</label>
              <Input 
                type="number" 
                step="0.01" 
                className="col-span-3" 
                value={newProduct.price} 
                onChange={(e) => handleNewProductFieldChange("price", parseFloat(e.target.value))}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Estoque</label>
              <Input 
                type="number" 
                className="col-span-3" 
                value={newProduct.stock} 
                onChange={(e) => handleNewProductFieldChange("stock", parseInt(e.target.value))}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Status</label>
              <div className="col-span-3 flex items-center space-x-2">
                <input
                  type="checkbox" 
                  checked={newProduct.active}
                  onChange={(e) => handleNewProductFieldChange("active", e.target.checked)}
                  className="h-4 w-4"
                />
                <span>Ativo</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewProductDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveNewProduct}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de edição de produto */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogDescription>
              Faça as alterações desejadas no produto e clique em Salvar para aplicá-las.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Nome</label>
              <Input 
                className="col-span-3" 
                value={editedProduct.name} 
                onChange={(e) => handleEditFieldChange("name", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Categoria</label>
              <Select 
                value={editedProduct.category}
                onValueChange={(value) => handleEditFieldChange("category", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories
                    .filter(category => category.active)
                    .map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Preço (R$)</label>
              <Input 
                type="number" 
                step="0.01" 
                className="col-span-3" 
                value={editedProduct.price} 
                onChange={(e) => handleEditFieldChange("price", parseFloat(e.target.value))}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Estoque</label>
              <Input 
                type="number" 
                className="col-span-3" 
                value={editedProduct.stock} 
                onChange={(e) => handleEditFieldChange("stock", parseInt(e.target.value))}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium">Status</label>
              <div className="col-span-3 flex items-center space-x-2">
                <input
                  type="checkbox" 
                  checked={editedProduct.active}
                  onChange={(e) => handleEditFieldChange("active", e.target.checked)}
                  className="h-4 w-4"
                />
                <span>Ativo</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveEdit}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de visualização de produto */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Produto</DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">ID:</span>
                <span className="col-span-3">{selectedProduct.id}</span>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Nome:</span>
                <span className="col-span-3">{selectedProduct.name}</span>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Categoria:</span>
                <span className="col-span-3">{selectedProduct.category}</span>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Preço:</span>
                <span className="col-span-3">R$ {selectedProduct.price.toFixed(2)}</span>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Estoque:</span>
                <span className="col-span-3">{selectedProduct.stock}</span>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Status:</span>
                <span className="col-span-3">
                  <Badge className={selectedProduct.active ? "bg-pdv-secondary" : "bg-muted"}>
                    {selectedProduct.active ? "Ativo" : "Inativo"}
                  </Badge>
                </span>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmação de exclusão */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o produto "{selectedProduct?.name}"? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-pdv-danger hover:bg-pdv-danger/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Products;
