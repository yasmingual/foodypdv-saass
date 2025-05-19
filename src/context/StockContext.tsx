
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Definição dos tipos
export type StockItemCategory = "Ingredientes" | "Vegetais" | "Bebidas" | "Descartáveis" | "Outros";

export interface StockItem {
  id: number;
  name: string;
  category: StockItemCategory;
  quantity: number;
  unit: string;
  minStock: number;
  purchasePrice?: number;
  lastUpdate?: string;
}

interface StockContextType {
  stockItems: StockItem[];
  addStockItem: (item: Omit<StockItem, "id" | "lastUpdate">) => void;
  updateStockItem: (id: number, item: Partial<StockItem>) => void;
  deleteStockItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number, isIncrement: boolean) => void;
  getStockStatus: (item: StockItem) => { status: string; color: string };
  getLowStockItems: () => StockItem[];
  getStockCategories: () => string[];
  getStockValue: () => number;
}

// Valores iniciais para o estoque
const initialStockItems: StockItem[] = [
  { id: 1, name: "Pão de Hambúrguer", category: "Ingredientes", quantity: 125, unit: "un", minStock: 50, purchasePrice: 0.90, lastUpdate: "2025-05-18" },
  { id: 2, name: "Carne Hambúrguer", category: "Ingredientes", quantity: 80, unit: "un", minStock: 40, purchasePrice: 2.50, lastUpdate: "2025-05-18" },
  { id: 3, name: "Queijo Cheddar", category: "Ingredientes", quantity: 30, unit: "kg", minStock: 5, purchasePrice: 28.00, lastUpdate: "2025-05-17" },
  { id: 4, name: "Alface", category: "Vegetais", quantity: 4, unit: "kg", minStock: 5, purchasePrice: 8.00, lastUpdate: "2025-05-19" },
  { id: 5, name: "Tomate", category: "Vegetais", quantity: 8, unit: "kg", minStock: 5, purchasePrice: 6.50, lastUpdate: "2025-05-19" },
  { id: 6, name: "Cebola", category: "Vegetais", quantity: 10, unit: "kg", minStock: 5, purchasePrice: 4.30, lastUpdate: "2025-05-15" },
  { id: 7, name: "Batata", category: "Vegetais", quantity: 30, unit: "kg", minStock: 20, purchasePrice: 5.90, lastUpdate: "2025-05-17" },
  { id: 8, name: "Coca-Cola Lata", category: "Bebidas", quantity: 48, unit: "un", minStock: 24, purchasePrice: 2.80, lastUpdate: "2025-05-16" },
  { id: 9, name: "Coca-Cola 600ml", category: "Bebidas", quantity: 24, unit: "un", minStock: 12, purchasePrice: 5.50, lastUpdate: "2025-05-16" },
  { id: 10, name: "Água Mineral", category: "Bebidas", quantity: 36, unit: "un", minStock: 20, purchasePrice: 1.20, lastUpdate: "2025-05-16" },
  { id: 11, name: "Copos Descartáveis", category: "Descartáveis", quantity: 150, unit: "un", minStock: 50, purchasePrice: 0.15, lastUpdate: "2025-05-15" },
  { id: 12, name: "Embalagem p/ Delivery", category: "Descartáveis", quantity: 65, unit: "un", minStock: 40, purchasePrice: 0.75, lastUpdate: "2025-05-15" }
];

// Criação do contexto
const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Carregar estoque do localStorage ou usar valores iniciais
  const [stockItems, setStockItems] = useState<StockItem[]>(() => {
    const savedItems = localStorage.getItem("stockItems");
    return savedItems ? JSON.parse(savedItems) : initialStockItems;
  });

  // Salvar no localStorage sempre que o estoque mudar
  useEffect(() => {
    localStorage.setItem("stockItems", JSON.stringify(stockItems));
  }, [stockItems]);

  // Adicionar novo item ao estoque
  const addStockItem = (item: Omit<StockItem, "id" | "lastUpdate">) => {
    const newItem: StockItem = {
      ...item,
      id: stockItems.length > 0 ? Math.max(...stockItems.map(item => item.id)) + 1 : 1,
      lastUpdate: new Date().toISOString().split('T')[0]
    };

    setStockItems(prev => [...prev, newItem]);
    toast.success(`Item "${newItem.name}" adicionado ao estoque`);
  };

  // Atualizar item do estoque
  const updateStockItem = (id: number, updatedItem: Partial<StockItem>) => {
    setStockItems(prev => prev.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          ...updatedItem, 
          lastUpdate: new Date().toISOString().split('T')[0] 
        };
      }
      return item;
    }));
    toast.success(`Item atualizado com sucesso`);
  };

  // Deletar item do estoque
  const deleteStockItem = (id: number) => {
    const itemName = stockItems.find(item => item.id === id)?.name;
    setStockItems(prev => prev.filter(item => item.id !== id));
    if (itemName) {
      toast.success(`Item "${itemName}" removido do estoque`);
    }
  };

  // Atualizar quantidade (adicionar ou subtrair)
  const updateQuantity = (id: number, quantity: number, isIncrement: boolean) => {
    setStockItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = isIncrement ? item.quantity + quantity : item.quantity - quantity;
        // Não permitir quantidade negativa
        const finalQuantity = Math.max(0, newQuantity);
        
        // Se a quantidade for muito baixa, emitir um alerta
        if (finalQuantity <= item.minStock) {
          toast.warning(`Estoque baixo de "${item.name}": ${finalQuantity} ${item.unit} (mínimo: ${item.minStock})`);
        }
        
        return { 
          ...item, 
          quantity: finalQuantity,
          lastUpdate: new Date().toISOString().split('T')[0] 
        };
      }
      return item;
    }));
  };

  // Verificar status do estoque (Ok, Baixo, Crítico, Esgotado)
  const getStockStatus = (item: StockItem) => {
    if (item.quantity <= 0) return { status: "Esgotado", color: "bg-red-500" };
    if (item.quantity < item.minStock) return { status: "Crítico", color: "bg-pdv-accent" };
    if (item.quantity < item.minStock * 1.5) return { status: "Baixo", color: "bg-amber-500" };
    return { status: "Ok", color: "bg-pdv-secondary" };
  };

  // Obter itens com estoque baixo
  const getLowStockItems = () => {
    return stockItems.filter(item => item.quantity < item.minStock);
  };

  // Obter categorias únicas
  const getStockCategories = () => {
    const categories = [...new Set(stockItems.map(item => item.category))];
    return ["Todos", ...categories];
  };

  // Calcular valor total do estoque
  const getStockValue = () => {
    return stockItems.reduce((total, item) => {
      return total + (item.quantity * (item.purchasePrice || 0));
    }, 0);
  };

  return (
    <StockContext.Provider value={{
      stockItems,
      addStockItem,
      updateStockItem,
      deleteStockItem,
      updateQuantity,
      getStockStatus,
      getLowStockItems,
      getStockCategories,
      getStockValue
    }}>
      {children}
    </StockContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStock deve ser usado dentro de um StockProvider");
  }
  return context;
};
