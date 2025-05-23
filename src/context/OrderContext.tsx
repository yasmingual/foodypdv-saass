
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProducts } from './ProductContext';
import { getCurrentRestaurantId } from '../utils/settingsUtils';

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
  restaurantId: string;
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
  restaurantId: string;
  startTime: string;
  endTime?: string;
  operatorName: string;
  initialAmount: number;
  closingAmount?: number;
  closingCashAmount?: number;      // Valor em dinheiro no fechamento
  closingDebitAmount?: number;     // Valor em cartão de débito no fechamento
  closingCreditAmount?: number;    // Valor em cartão de crédito no fechamento
  closingPixAmount?: number;       // Valor em PIX no fechamento
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
  addOrder: (order: Omit<Order, "id" | "time" | "status" | "restaurantId">) => void;
  updateOrderStatus: (orderId: number, newStatus: Order["status"]) => void;
  getNextOrderId: () => number;
  addItemsToOrder: (orderId: number, newItems: OrderItem[]) => void;
  processPayment: (orderId: number, paymentMethod: Order["paymentMethod"]) => void;
  calculateOrderTotal: (order: Order) => number;
  openShift: (operatorName: string, initialAmount: number) => void;
  closeShift: (closingValues: {
    total: number;
    cash: number;
    debit: number;
    credit: number;
    pix: number;
  }) => void;
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
    restaurantId: "default",
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
    restaurantId: "default",
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
    restaurantId: "default",
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
    restaurantId: "default",
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
  const [allOrders, setAllOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : initialOrders;
  });
  
  const [allShifts, setAllShifts] = useState<Shift[]>(() => {
    const savedShifts = localStorage.getItem("shifts");
    return savedShifts ? JSON.parse(savedShifts) : initialShifts;
  });

  const [currentShift, setCurrentShift] = useState<Shift | null>(() => {
    const savedShifts = localStorage.getItem("shifts");
    if (savedShifts) {
      const parsedShifts: Shift[] = JSON.parse(savedShifts);
      const restaurantId = getCurrentRestaurantId();
      return parsedShifts.find(
        shift => shift.status === "active" && shift.restaurantId === restaurantId
      ) || null;
    }
    return null;
  });
  
  const { products } = useProducts();
  
  // Filtrar pedidos e turnos apenas do restaurante atual
  const restaurantId = getCurrentRestaurantId();
  const orders = allOrders.filter(order => order.restaurantId === restaurantId);
  const shifts = allShifts.filter(shift => shift.restaurantId === restaurantId);

  // Salvar pedidos e turnos no localStorage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(allOrders));
  }, [allOrders]);

  useEffect(() => {
    localStorage.setItem("shifts", JSON.stringify(allShifts));
  }, [allShifts]);

  // Função para obter o próximo ID de pedido
  const getNextOrderId = () => {
    const maxId = Math.max(...allOrders.map(order => order.id), 0);
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
      id: allShifts.length > 0 ? Math.max(...allShifts.map(shift => shift.id)) + 1 : 1,
      restaurantId,
      startTime: `${formattedDate} ${formattedTime}`,
      operatorName,
      initialAmount,
      status: "active",
      cashTransactions: 0,
      cardTransactions: 0,
      pixTransactions: 0,
      totalTransactions: 0
    };
    
    setAllShifts(prev => [...prev, newShift]);
    setCurrentShift(newShift);
    
    return newShift;
  };

  // Fechar um turno ativo - atualizado para incluir os valores por método de pagamento
  const closeShift = (closingValues: {
    total: number;
    cash: number;
    debit: number;
    credit: number;
    pix: number;
  }) => {
    if (!isShiftActive() || !currentShift) {
      throw new Error("Não há turno ativo para fechar.");
    }
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const closedShift: Shift = {
      ...currentShift,
      endTime: `${formattedDate} ${formattedTime}`,
      closingAmount: closingValues.total,
      closingCashAmount: closingValues.cash,
      closingDebitAmount: closingValues.debit,
      closingCreditAmount: closingValues.credit,
      closingPixAmount: closingValues.pix,
      status: "closed"
    };
    
    setAllShifts(prev => prev.map(shift => 
      shift.id === currentShift.id ? closedShift : shift
    ));
    
    setCurrentShift(null);
    
    return closedShift;
  };

  // Adicionar novo pedido
  const addOrder = (order: Omit<Order, "id" | "time" | "status" | "restaurantId">) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newOrder: Order = {
      ...order,
      restaurantId,
      id: getNextOrderId(),
      time,
      status: "pending",
    };
    
    setAllOrders(prevOrders => [...prevOrders, newOrder]);
  };

  // Atualizar status do pedido
  const updateOrderStatus = (orderId: number, newStatus: Order["status"]) => {
    console.log(`Atualizando pedido ${orderId} para status: ${newStatus}`);
    
    setAllOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId && order.restaurantId === restaurantId) {
          // Se o pedido estiver sendo marcado como completo (completed),
          // automaticamente marca como pronto para pagamento (ready)
          if (newStatus === "completed") {
            console.log(`Pedido ${orderId} completo, marcando como pronto para pagamento`);
            return { ...order, status: "ready" };
          }
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
  };

  // Processar pagamento de pedido
  const processPayment = (orderId: number, paymentMethod: Order["paymentMethod"]) => {
    // Verificar se existe um turno ativo
    if (!isShiftActive() || !currentShift) {
      throw new Error("Não é possível processar pagamentos sem um turno ativo. Por favor, abra um turno primeiro.");
    }
    
    setAllOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id !== orderId || order.restaurantId !== restaurantId) return order;
        
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
      setAllShifts(prev => prev.map(shift => 
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
    setAllOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id !== orderId || order.restaurantId !== restaurantId) return order;
        
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
