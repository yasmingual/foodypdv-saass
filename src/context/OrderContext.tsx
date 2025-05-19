
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProducts } from './ProductContext';

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
  shiftId?: number; // ID do turno em que o pedido foi pago
};

export type Shift = {
  id: number;
  startTime: string;
  endTime?: string;
  operatorName: string;
  initialAmount: number;
  closingAmount?: number;
  status: "active" | "closed";
  cashTransactions: number;
  cardTransactions: number;
  pixTransactions: number;
  totalTransactions: number;
};

type OrderContextType = {
  orders: Order[];
  shifts: Shift[];
  currentShift: Shift | null;
  addOrder: (order: Omit<Order, "id" | "time" | "status">) => void;
  updateOrderStatus: (orderId: number, newStatus: Order["status"]) => void;
  getNextOrderId: () => number;
  addItemsToOrder: (orderId: number, newItems: OrderItem[]) => void;
  processPayment: (orderId: number, paymentMethod: Order["paymentMethod"]) => void;
  calculateOrderTotal: (order: Order) => number;
  openShift: (operatorName: string, initialAmount: number) => void;
  closeShift: (closingAmount: number) => void;
  isShiftActive: () => boolean;
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

// Mock de turnos iniciais (vazio)
const initialShifts: Shift[] = [];

export const OrderProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : initialOrders;
  });
  
  const [shifts, setShifts] = useState<Shift[]>(() => {
    const savedShifts = localStorage.getItem("shifts");
    return savedShifts ? JSON.parse(savedShifts) : initialShifts;
  });

  const [currentShift, setCurrentShift] = useState<Shift | null>(() => {
    const savedShifts = localStorage.getItem("shifts");
    if (savedShifts) {
      const parsedShifts: Shift[] = JSON.parse(savedShifts);
      return parsedShifts.find(shift => shift.status === "active") || null;
    }
    return null;
  });
  
  const { products } = useProducts();

  // Salvar pedidos e turnos no localStorage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("shifts", JSON.stringify(shifts));
  }, [shifts]);

  // Função para obter o próximo ID de pedido
  const getNextOrderId = () => {
    const maxId = Math.max(...orders.map(order => order.id), 0);
    return maxId + 1;
  };

  // Função para verificar se existe um turno ativo
  const isShiftActive = () => {
    return currentShift !== null && currentShift.status === "active";
  };

  // Abrir um novo turno
  const openShift = (operatorName: string, initialAmount: number) => {
    // Verificar se já existe um turno ativo
    if (isShiftActive()) {
      throw new Error("Já existe um turno ativo. Feche o turno atual antes de abrir um novo.");
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Criar novo turno
    const newShift: Shift = {
      id: shifts.length > 0 ? Math.max(...shifts.map(shift => shift.id)) + 1 : 1,
      startTime: `${formattedDate} ${formattedTime}`,
      operatorName,
      initialAmount,
      status: "active",
      cashTransactions: 0,
      cardTransactions: 0,
      pixTransactions: 0,
      totalTransactions: 0
    };
    
    setShifts(prev => [...prev, newShift]);
    setCurrentShift(newShift);
    
    return newShift;
  };

  // Fechar um turno ativo
  const closeShift = (closingAmount: number) => {
    if (!isShiftActive() || !currentShift) {
      throw new Error("Não há turno ativo para fechar.");
    }
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const closedShift: Shift = {
      ...currentShift,
      endTime: `${formattedDate} ${formattedTime}`,
      closingAmount,
      status: "closed"
    };
    
    setShifts(prev => prev.map(shift => 
      shift.id === currentShift.id ? closedShift : shift
    ));
    
    setCurrentShift(null);
    
    return closedShift;
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
    // Verificar se existe um turno ativo
    if (!isShiftActive() || !currentShift) {
      throw new Error("Não é possível processar pagamentos sem um turno ativo. Por favor, abra um turno primeiro.");
    }
    
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id !== orderId) return order;
        
        const totalAmount = calculateOrderTotal(order);
        
        // Associar o pedido ao turno atual
        return { 
          ...order, 
          status: "paid",
          paymentMethod,
          totalAmount,
          shiftId: currentShift.id
        };
      })
    );

    // Atualizar as estatísticas do turno atual
    if (currentShift) {
      const updatedShift = { ...currentShift };
      
      // Incrementar contadores com base no método de pagamento
      if (paymentMethod === "Dinheiro") {
        updatedShift.cashTransactions += 1;
      } else if (paymentMethod === "Crédito" || paymentMethod === "Débito") {
        updatedShift.cardTransactions += 1;
      } else if (paymentMethod === "Pix") {
        updatedShift.pixTransactions += 1;
      }
      
      updatedShift.totalTransactions += 1;
      
      // Atualizar o estado do turno
      setShifts(prev => prev.map(shift => 
        shift.id === currentShift.id ? updatedShift : shift
      ));
      
      setCurrentShift(updatedShift);
    }
  };

  // Calcular valor total do pedido
  const calculateOrderTotal = (order: Order) => {
    // Usar preços dos produtos cadastrados
    const subtotal = order.items.reduce((total, item) => {
      const product = products.find(p => p.name === item.name);
      const price = product ? product.price : 0;
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
      shifts,
      currentShift,
      addOrder, 
      updateOrderStatus,
      getNextOrderId,
      addItemsToOrder,
      processPayment,
      calculateOrderTotal,
      openShift,
      closeShift,
      isShiftActive
    }}>
      {children}
    </OrderContext.Provider>
  );
};
