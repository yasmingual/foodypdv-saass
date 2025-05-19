
import React from "react";
import { Order } from "@/context/OrderContext";

interface OrderSummaryProps {
  order: Order;
  totalAmount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order, totalAmount }) => {
  return (
    <div className="border-t pt-2">
      <div className="flex justify-between font-medium text-sm">
        <span>Subtotal:</span>
        <span>R$ {(order.hasServiceFee ? totalAmount / 1.1 : totalAmount).toFixed(2)}</span>
      </div>
      {order.hasServiceFee && (
        <div className="flex justify-between text-sm">
          <span>Taxa de Serviço (10%):</span>
          <span>R$ {(totalAmount - (totalAmount / 1.1)).toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between text-lg font-bold mt-2">
        <span>Total:</span>
        <span>R$ {totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
