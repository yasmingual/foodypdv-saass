import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipos
export type OrderItem = {
  name: string;
  quantity: number;
  notes: string;
};

export type DeliveryInfo = {
  clientName: string;
  phone: string;
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  reference?: string;
};

export type Order = {
  id: number;
  type: "Mesa" | "Retirada" | "Delivery";
  identifier: string;
  time: string;
  status: "pending" | "in-progress" | "ready" | "completed" | "paid";
  items: OrderItem[];
  deliveryInfo?: DeliveryInfo;
  hasServiceFee?: boolean;
  totalAmount?: number;
  paymentMethod?: "Dinheiro" | "Crédito" | "Débito" | "Pix";
};

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "time" | "status">) => void;
  updateOrderStatus: (orderId: number, newStatus: Order["status"]) => void;
  getNextOrderId: () => number;
  addItemsToOrder: (orderId: number, newItems: OrderItem[]) => void;
  processPayment: (orderId: number, paymentMethod: Order["paymentMethod"]) => void;
  calculateOrderTotal: (order: Order) => number;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders deve ser usado dentro de um OrderProvider");
  }
  return context;
};

// Mock de pedidos iniciais
const initialOrders: Order[] = [
  {
    id: 1001,
    type: "Mesa",
    identifier: "Mesa 3",
    time: "10:15",
    status: "ready",
    items: [
      { name: "X-Bacon", quantity: 1, notes: "Sem cebola" },
      { name: "Batata Frita M", quantity: 1, notes: "" },
      { name: "Coca-Cola 600ml", quantity: 2, notes: "" }
    ],
    hasServiceFee: true
  },
  {
    id: 1002,
    type: "Retirada",
    identifier: "João",
    time: "10:20",
    status: "ready",
    items: [
      { name: "X-Tudo", quantity: 2, notes: "Um sem tomate" },
      { name: "Batata Frita G", quantity: 1, notes: "Cheddar extra" },
      { name: "Água Mineral", quantity: 2, notes: "" }
    ],
    hasServiceFee: false
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
    ],
    deliveryInfo: {
      clientName: "Maria Silva",
      phone: "(11) 98765-4321",
      address: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Centro",
      reference: "Próximo à farmácia"
    }
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

export const OrderProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // Função para obter o próximo ID de pedido
  const getNextOrderId = () => {
    const maxId = Math.max(...orders.map(order => order.id), 0);
    return maxId + 1;
  };

  // Adicionar novo pedido
  const addOrder = (order: Omit<Order, "id" | "time" | "status">) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newOrder: Order = {
      ...order,
      id: getNextOrderId(),
      time,
      status: "pending",
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);
  };

  // Atualizar status do pedido
  const updateOrderStatus = (orderId: number, newStatus: Order["status"]) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Processar pagamento de pedido
  const processPayment = (orderId: number, paymentMethod: Order["paymentMethod"]) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id !== orderId) return order;
        
        const totalAmount = calculateOrderTotal(order);
        return { 
          ...order, 
          status: "paid",
          paymentMethod,
          totalAmount
        };
      })
    );
  };

  // Calcular valor total do pedido
  const calculateOrderTotal = (order: Order) => {
    // Preços simulados (em uma aplicação real, viriam de um banco de dados)
    const mockPrices: Record<string, number> = {
      "X-Bacon": 20.9,
      "X-Salada": 18.5,
      "X-Tudo": 25.9,
      "Batata Frita P": 10.5,
      "Batata Frita M": 15.9,
      "Batata Frita G": 20.9,
      "Coca-Cola Lata": 6.5,
      "Coca-Cola 600ml": 9.9,
      "Água Mineral": 4.5,
    };

    // Cálculo do subtotal
    const subtotal = order.items.reduce((total, item) => {
      const price = mockPrices[item.name] || 0;
      return total + (price * item.quantity);
    }, 0);

    // Aplicar taxa de serviço de 10% se estiver habilitada
    return order.hasServiceFee ? subtotal * 1.1 : subtotal;
  };

  // Adicionar itens a um pedido existente
  const addItemsToOrder = (orderId: number, newItems: OrderItem[]) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id !== orderId) return order;
        
        // Combinar itens existentes com novos itens
        const updatedItems = [...order.items];
        
        newItems.forEach(newItem => {
          // Verificar se o item já existe com a mesma observação
          const existingItemIndex = updatedItems.findIndex(
            item => item.name === newItem.name && item.notes === newItem.notes
          );
          
          if (existingItemIndex >= 0) {
            // Se existe, apenas incrementa a quantidade
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
            };
          } else {
            // Se não existe, adiciona o novo item
            updatedItems.push(newItem);
          }
        });
        
        return { ...order, items: updatedItems };
      })
    );
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      updateOrderStatus,
      getNextOrderId,
      addItemsToOrder,
      processPayment,
      calculateOrderTotal
    }}>
      {children}
    </OrderContext.Provider>
  );
};
