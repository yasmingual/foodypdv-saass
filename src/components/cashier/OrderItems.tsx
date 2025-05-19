
import React from "react";
import { Order } from "@/context/OrderContext";

interface OrderItemsProps {
  order: Order;
}

const OrderItems: React.FC<OrderItemsProps> = ({ order }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Itens do pedido</h3>
      <div className="text-sm max-h-[20vh] overflow-y-auto pr-2">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between py-1">
            <span>{item.quantity}x {item.name}</span>
            <span className="font-medium">R$ {(20.9 * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
