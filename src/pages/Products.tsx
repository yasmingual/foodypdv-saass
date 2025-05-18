
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
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

const Products = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
    toast.success("Novo produto", {
      description: "Função para adicionar novo produto acionada",
    });
    // Aqui seria redirecionado para o formulário de novo produto
    // navigate("/products/new");
  };

  // Handler para o botão de Editar
  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    toast.info("Editar produto", {
      description: `Editando produto: ${product.name}`,
    });
    // Aqui seria redirecionado para o formulário de edição
    // navigate(`/products/edit/${product.id}`);
  };

  // Handler para o botão de Visualizar
  const handleView = (product: any) => {
    setSelectedProduct(product);
    toast.info("Visualizar produto", {
      description: `Visualizando detalhes do produto: ${product.name}`,
    });
    // Aqui seria redirecionado para a página de detalhes
    // navigate(`/products/${product.id}`);
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleView(product)}
                          title="Visualizar produto"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-pdv-danger"
                          onClick={() => handleDeleteClick(product)}
                          title="Excluir produto"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
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
