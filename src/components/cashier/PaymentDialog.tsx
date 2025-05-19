
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useOrders, Order } from "@/context/OrderContext";
import { toast } from "sonner";

interface PaymentDialogProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ 
  order, 
  open, 
  onClose,
  onSuccess
}) => {
  const { processPayment, calculateOrderTotal } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState<Order["paymentMethod"]>("Dinheiro");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!order) return null;

  const totalAmount = calculateOrderTotal(order);

  const handleProcessPayment = () => {
    setIsProcessing(true);
    
    // Simular processamento de pagamento
    setTimeout(() => {
      processPayment(order.id, paymentMethod);
      setIsProcessing(false);
      toast.success(`Pagamento recebido: R$ ${totalAmount.toFixed(2)} via ${paymentMethod}`);
      onClose();
      if (onSuccess) onSuccess();
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Receber Pagamento</DialogTitle>
          <DialogDescription>
            Pedido #{order.id} - {order.type} {order.identifier}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Itens do pedido</h3>
            <div className="text-sm">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span>{item.quantity}x {item.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-2">
            <div className="flex justify-between font-medium">
              <span>Subtotal:</span>
              <span>R$ {(order.hasServiceFee ? totalAmount / 1.1 : totalAmount).toFixed(2)}</span>
            </div>
            {order.hasServiceFee && (
              <div className="flex justify-between">
                <span>Taxa de Serviço (10%):</span>
                <span>R$ {(totalAmount - (totalAmount / 1.1)).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-1">
              <span>Total:</span>
              <span>R$ {totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Forma de pagamento</h3>
            <RadioGroup defaultValue="Dinheiro" onValueChange={(value) => setPaymentMethod(value as Order["paymentMethod"])}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Dinheiro" id="payment-cash" />
                <Label htmlFor="payment-cash">Dinheiro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Crédito" id="payment-credit" />
                <Label htmlFor="payment-credit">Cartão de Crédito</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Débito" id="payment-debit" />
                <Label htmlFor="payment-debit">Cartão de Débito</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Pix" id="payment-pix" />
                <Label htmlFor="payment-pix">Pix</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancelar
          </Button>
          <Button onClick={handleProcessPayment} disabled={isProcessing}>
            {isProcessing ? "Processando..." : "Finalizar Pagamento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
