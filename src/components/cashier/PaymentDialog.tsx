
import React, { useState, useRef } from "react";
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
import { Printer } from "lucide-react";

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

  const handlePrintReceipt = () => {
    // Cria uma janela de impressão
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Por favor, permita popups para imprimir o cupom.");
      return;
    }

    // Dados do estabelecimento (normalmente viriam de um contexto global ou configuração)
    const RESTAURANT_INFO = {
      name: "Restaurante Demo",
      address: "Av. Principal, 1000",
      city: "São Paulo",
      phone: "(11) 3000-0000",
      cnpj: "00.000.000/0001-00"
    };

    const getItemPrice = (itemName: string) => {
      // Simulação de preços - em um sistema real, isso viria de uma base de dados
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
      return mockPrices[itemName] || 0;
    };

    const translateOrderType = (type: Order["type"]) => {
      switch (type) {
        case "Mesa": return "Mesa";
        case "Retirada": return "Retirada";
        case "Delivery": return "Entrega";
        default: return type;
      }
    };

    // Adiciona o conteúdo do recibo na janela de impressão
    printWindow.document.write(`
      <html>
        <head>
          <title>Cupom #${order.id}</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              margin: 0;
              padding: 20px;
              max-width: 300px;
            }
            .receipt {
              width: 100%;
            }
            .header {
              text-align: center;
              margin-bottom: 10px;
            }
            .divider {
              border-top: 1px dashed #000;
              margin: 10px 0;
            }
            .item {
              display: flex;
              justify-content: space-between;
              margin: 5px 0;
            }
            .notes {
              font-size: 0.8rem;
              font-style: italic;
              margin-left: 10px;
            }
            .total {
              font-weight: bold;
              margin-top: 10px;
              text-align: right;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 0.8rem;
            }
            h1, h2 {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <h1>${RESTAURANT_INFO.name}</h1>
              <p>${RESTAURANT_INFO.address}</p>
              <p>${RESTAURANT_INFO.city}</p>
              <p>Tel: ${RESTAURANT_INFO.phone}</p>
              <p>CNPJ: ${RESTAURANT_INFO.cnpj}</p>
            </div>
            
            <div class="divider"></div>
            
            <div>
              <h2>CUPOM NÃO FISCAL</h2>
              <p>Pedido #${order.id}</p>
              <p>Data/Hora: ${order.time} - ${new Date().toLocaleDateString()}</p>
              <p>Tipo: ${translateOrderType(order.type)}</p>
              ${order.type === "Mesa" ? `<p>Mesa: ${order.identifier}</p>` : ""}
              ${order.type === "Delivery" && order.deliveryInfo ? 
                `<p>Cliente: ${order.deliveryInfo.clientName}</p>
                 <p>Telefone: ${order.deliveryInfo.phone}</p>
                 <p>Endereço: ${order.deliveryInfo.address}, ${order.deliveryInfo.number}</p>
                 ${order.deliveryInfo.complement ? `<p>Complemento: ${order.deliveryInfo.complement}</p>` : ""}
                 <p>Bairro: ${order.deliveryInfo.neighborhood}</p>
                 ${order.deliveryInfo.reference ? `<p>Referência: ${order.deliveryInfo.reference}</p>` : ""}` 
                : ""}
              ${order.type === "Retirada" ? `<p>Cliente: ${order.identifier}</p>` : ""}
            </div>
            
            <div class="divider"></div>
            
            <div>
              <h2>ITENS DO PEDIDO</h2>
              ${order.items.map(item => `
                <div class="item">
                  <span>${item.quantity}x ${item.name}</span>
                  <span>R$ ${(getItemPrice(item.name) * item.quantity).toFixed(2)}</span>
                </div>
                ${item.notes ? `<div class="notes">Obs: ${item.notes}</div>` : ""}
              `).join('')}
            </div>
            
            <div class="divider"></div>
            
            <div class="total">
              <div class="item">
                <span>Subtotal:</span>
                <span>R$ ${(order.hasServiceFee ? totalAmount / 1.1 : totalAmount).toFixed(2)}</span>
              </div>
              ${order.hasServiceFee ? `
              <div class="item">
                <span>Taxa de Serviço (10%):</span>
                <span>R$ ${(totalAmount - (totalAmount / 1.1)).toFixed(2)}</span>
              </div>
              ` : ''}
              <div class="item">
                <span>TOTAL:</span>
                <span>R$ ${totalAmount.toFixed(2)}</span>
              </div>
              <div class="item">
                <span>Pagamento:</span>
                <span>${paymentMethod}</span>
              </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="footer">
              <p>Obrigado pela preferência!</p>
              <p>Volte sempre!</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
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
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={handlePrintReceipt} 
            className="sm:mr-auto"
          >
            <Printer className="mr-2 h-4 w-4" />
            Imprimir Cupom
          </Button>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={onClose} disabled={isProcessing} className="flex-1 sm:flex-none">
              Cancelar
            </Button>
            <Button onClick={handleProcessPayment} disabled={isProcessing} className="flex-1 sm:flex-none">
              {isProcessing ? "Processando..." : "Finalizar Pagamento"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
