
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Definição dos tipos
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  active: boolean;
  imageUrl: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
  getProductCategories: () => string[];
}

// Mock inicial para produtos
const initialProducts: Product[] = [
  { id: 1, name: "X-Bacon", category: "Lanches", price: 20.9, stock: 15, active: true, imageUrl: "" },
  { id: 2, name: "X-Salada", category: "Lanches", price: 18.5, stock: 25, active: true, imageUrl: "" },
  { id: 3, name: "X-Tudo", category: "Lanches", price: 25.9, stock: 30, active: true, imageUrl: "" },
  { id: 4, name: "Batata Frita P", category: "Porções", price: 10.5, stock: 50, active: true, imageUrl: "" },
  { id: 5, name: "Batata Frita M", category: "Porções", price: 15.9, stock: 45, active: true, imageUrl: "" },
  { id: 6, name: "Batata Frita G", category: "Porções", price: 20.9, stock: 40, active: true, imageUrl: "" },
  { id: 7, name: "Coca-Cola Lata", category: "Bebidas", price: 6.5, stock: 48, active: true, imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=200" },
  { id: 8, name: "Coca-Cola 600ml", category: "Bebidas", price: 9.9, stock: 24, active: true, imageUrl: "" },
  { id: 9, name: "Água Mineral", category: "Bebidas", price: 4.5, stock: 36, active: true, imageUrl: "https://images.unsplash.com/photo-1616118132534-731ac9b4bbbd?auto=format&fit=crop&q=80&w=200" },
  { id: 10, name: "Hamburguer Veggie", category: "Lanches", price: 22.5, stock: 5, active: false, imageUrl: "" },
];

// Criação do contexto
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Carregar produtos do localStorage ou usar valores iniciais
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  // Salvar no localStorage sempre que os produtos mudarem
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Adicionar novo produto
  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: products.length > 0 ? Math.max(...products.map(item => item.id)) + 1 : 1,
    };

    setProducts(prev => [...prev, newProduct]);
    toast.success(`Produto "${newProduct.name}" adicionado com sucesso`);
  };

  // Atualizar produto
  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts(prev => prev.map(product => {
      if (product.id === id) {
        return { ...product, ...updatedProduct };
      }
      return product;
    }));
    toast.success(`Produto atualizado com sucesso`);
  };

  // Deletar produto
  const deleteProduct = (id: number) => {
    const productName = products.find(product => product.id === id)?.name;
    setProducts(prev => prev.filter(product => product.id !== id));
    if (productName) {
      toast.success(`Produto "${productName}" removido com sucesso`);
    }
  };

  // Obter produto por ID
  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };

  // Obter categorias únicas
  const getProductCategories = () => {
    return ["Todos", ...new Set(products.map(product => product.category))];
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      getProductCategories
    }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts deve ser usado dentro de um ProductProvider");
  }
  return context;
};
