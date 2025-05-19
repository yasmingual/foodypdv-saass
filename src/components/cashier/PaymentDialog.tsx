
import React, { useState, useEffect } from "react";
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
import { useProducts } from "@/context/ProductContext";
import { 
  loadGeneralSettings, 
  loadPrinterSettings, 
  PrinterSettingsType,
  defaultPrinterSettings
} from "@/utils/settingsUtils";

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
  const { products } = useProducts();
  const [paymentMethod, setPaymentMethod] = useState<Order["paymentMethod"]>("Dinheiro");
  const [isPrinting, setIsPrinting] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState(loadGeneralSettings());
  const [printerSettings, setPrinterSettings] = useState<PrinterSettingsType>(defaultPrinterSettings);

  useEffect(() => {
    // Carregar as configurações do restaurante e da impressora ao montar o componente
    setRestaurantInfo(loadGeneralSettings());
    setPrinterSettings(loadPrinterSettings());
  }, []);

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

    // Cria uma janela temporária para exibir o recibo
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      // Função para buscar o preço do produto
      const getProductPrice = (productName: string) => {
        const product = products.find(p => p.name === productName);
        return product ? product.price : 0;
      };

      // Cria o conteúdo do cupom na janela de impressão com as configurações salvas
      printWindow.document.write(`
        <html>
          <head>
            <title>Cupom #${order.id}</title>
            <style>
              body {
                font-family: ${printerSettings.fontFamily === 'courier' ? "'Courier New', monospace" : 
                              printerSettings.fontFamily === 'arial' ? "Arial, sans-serif" : 
                              printerSettings.fontFamily === 'times' ? "'Times New Roman', serif" : 
                              "'Courier New', monospace"};
                margin: 0;
                padding: 20px;
                max-width: 300px;
                font-size: ${printerSettings.fontSize === 'small' ? '12px' : 
                             printerSettings.fontSize === 'large' ? '16px' : 
                             '14px'};
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
              @media print {
                body {
                  width: 100%;
                  margin: 0;
                  padding: 0;
                }
              }
            </style>
          </head>
          <body>
            <div class="receipt">
              <div class="header">
                <h1>${restaurantInfo.restaurantName}</h1>
                <p>${restaurantInfo.address}</p>
                <p>${restaurantInfo.city}</p>
                <p>Tel: ${restaurantInfo.phone}</p>
                <p>CNPJ: ${restaurantInfo.cnpj}</p>
              </div>
              
              <div class="divider"></div>
              
              <div>
                <h2>CUPOM NÃO FISCAL</h2>
                <p>Pedido #${order.id}</p>
                <p>Data/Hora: ${order.time} - ${new Date().toLocaleDateString()}</p>
                <p>Tipo: ${order.type}</p>
                <p>Forma de Pagamento: ${paymentMethod}</p>
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
              
              ${printerSettings.printItems ? `
              <div>
                <h2>ITENS DO PEDIDO</h2>
                ${order.items.map(item => {
                  const price = getProductPrice(item.name);
                  
                  return `
                    <div class="item">
                      <span>${item.quantity}x ${item.name}</span>
                      ${printerSettings.printPrices ? `<span>R$ ${(price * item.quantity).toFixed(2)}</span>` : ''}
                    </div>
                    ${item.notes ? `<div class="notes">Obs: ${item.notes}</div>` : ""}
                  `;
                }).join('')}
              </div>
              
              <div class="divider"></div>
              ` : ''}
              
              <div class="total">
                <div class="item">
                  <span>Subtotal:</span>
                  <span>R$ ${totalAmount.toFixed(2)}</span>
                </div>
                ${order.hasServiceFee ? `
                <div class="item">
                  <span>Taxa de Serviço (10%):</span>
                  <span>R$ ${(totalAmount * 0.1).toFixed(2)}</span>
                </div>
                <div class="item">
                  <span>TOTAL:</span>
                  <span>R$ ${(totalAmount * 1.1).toFixed(2)}</span>
                </div>
                ` : `
                <div class="item">
                  <span>TOTAL:</span>
                  <span>R$ ${totalAmount.toFixed(2)}</span>
                </div>
                `}
              </div>
              
              <div class="divider"></div>
              
              <div class="footer">
                <p>${printerSettings.footerText}</p>
              </div>
              
              ${printerSettings.printQRCode ? `
              <div class="text-center mt-4">
                <p>Avalie nosso atendimento!</p>
                <p>[QR Code seria exibido aqui]</p>
              </div>
              ` : ''}
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
    } else {
      alert('Por favor, permita popups para imprimir o cupom.');
    }
    
    setTimeout(() => {
      setIsPrinting(false);
      toast.success("Cupom impresso com sucesso!");
    }, 1000);
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
    </Dialog>
  );
};

export default PaymentDialog;
