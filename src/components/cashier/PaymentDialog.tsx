
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Order, useOrders } from "@/context/OrderContext";
import { OrderReceipt } from "@/components/order/OrderReceipt";
import OrderItems from "./OrderItems";
import OrderSummary from "./OrderSummary";
import PaymentMethodSelector from "./PaymentMethodSelector";
import PaymentActions from "./PaymentActions";

type PaymentDialogProps = {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  onPaymentComplete?: () => void;
};

const PaymentDialog: React.FC<PaymentDialogProps> = ({ 
  order, 
  open, 
  onClose,
  onPaymentComplete 
}) => {
  const { processPayment, calculateOrderTotal } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState<Order["paymentMethod"]>("Dinheiro");
  const [isPrinting, setIsPrinting] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  // Verificar se temos um pedido
  if (!order) return null;

  const totalAmount = calculateOrderTotal(order);

  // Função para processar o pagamento
  const handleProcessPayment = () => {
    processPayment(order.id, paymentMethod);
    toast.success(`Pagamento de R$ ${totalAmount.toFixed(2)} processado com sucesso!`);
    
    // Fechar diálogo e resetar estado
    onClose();
    
    // Chama o callback de pagamento completo se existir
    if (onPaymentComplete) {
      onPaymentComplete();
    }
  };

  // Função para imprimir o cupom
  const handlePrintReceipt = () => {
    setIsPrinting(true);
    setShowReceipt(true);

    // Simulação de impressão real
    setTimeout(() => {
      if (window.print) {
        window.print();
      }
      
      setIsPrinting(false);
      toast.success("Cupom impresso com sucesso!");
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Receber Pagamento</DialogTitle>
          <DialogDescription>
            Pedido #{order.id} • {order.identifier}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-2 space-y-4">
          <OrderItems order={order} />
          <OrderSummary order={order} totalAmount={totalAmount} />
          <PaymentMethodSelector 
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
        </div>
        
        <PaymentActions
          onPrintReceipt={handlePrintReceipt}
          isPrinting={isPrinting}
          onClose={onClose}
          onFinalize={handleProcessPayment}
        />
      </DialogContent>

      {/* Componente de cupom fiscal (invisível, usado apenas para impressão) */}
      {showReceipt && (
        <div className="hidden print:block">
          <OrderReceipt 
            order={order} 
            paymentMethod={paymentMethod}
            showPaymentMethod={true}
          />
        </div>
      )}
    </Dialog>
  );
};

export default PaymentDialog;
