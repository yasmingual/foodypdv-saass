
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { OrderReceipt } from "@/components/order/OrderReceipt";
import { Order, useOrders } from "@/context/OrderContext";

type PaymentDialogProps = {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  onPaymentComplete?: () => void;  // Nova propriedade para callback após pagamento
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
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Forma de pagamento</h3>
            <RadioGroup defaultValue="Dinheiro" onValueChange={(value) => setPaymentMethod(value as Order["paymentMethod"])}>
              <div className="grid grid-cols-2 gap-2">
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
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrintReceipt}
            disabled={isPrinting}
          >
            {isPrinting ? "Imprimindo..." : "Imprimir Cupom"}
          </Button>
          <div className="space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleProcessPayment}>
              Finalizar Pagamento
            </Button>
          </div>
        </DialogFooter>
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
