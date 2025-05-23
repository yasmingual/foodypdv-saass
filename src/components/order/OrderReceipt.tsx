
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/context/OrderContext";
import { Printer } from "lucide-react";
import { 
  loadGeneralSettings, 
  GeneralSettingsType, 
  defaultGeneralSettings,
  loadPrinterSettings,
  PrinterSettingsType,
  defaultPrinterSettings 
} from "@/utils/settingsUtils";

interface OrderReceiptProps {
  order: Order;
  onClose?: () => void;
  paymentMethod?: Order["paymentMethod"];
  showPaymentMethod?: boolean;
}

export const OrderReceipt: React.FC<OrderReceiptProps> = ({ 
  order, 
  onClose,
  paymentMethod,
  showPaymentMethod = false
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [restaurantInfo, setRestaurantInfo] = useState<GeneralSettingsType>(defaultGeneralSettings);
  const [printerSettings, setPrinterSettings] = useState<PrinterSettingsType>(defaultPrinterSettings);

  // Carregar as configurações do restaurante e da impressora ao montar o componente
  useEffect(() => {
    const generalSettings = loadGeneralSettings();
    setRestaurantInfo(generalSettings);
    
    const printerConfig = loadPrinterSettings();
    setPrinterSettings(printerConfig);
  }, []);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    // Cria uma janela de impressão
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Por favor, permita popups para imprimir o cupom.');
      return;
    }

    // Adiciona o conteúdo do recibo na janela de impressão com as configurações salvas
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
              <p>Tipo: ${translateOrderType(order.type)}</p>
              ${showPaymentMethod && paymentMethod ? `<p>Forma de Pagamento: ${paymentMethod}</p>` : ''}
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
              ${order.items.map(item => `
                <div class="item">
                  <span>${item.quantity}x ${item.name}</span>
                  ${printerSettings.printPrices ? `<span>R$ ${(getItemPrice(item.name) * item.quantity).toFixed(2)}</span>` : ''}
                </div>
                ${item.notes ? `<div class="notes">Obs: ${item.notes}</div>` : ""}
              `).join('')}
            </div>
            
            <div class="divider"></div>
            ` : ''}
            
            <div class="total">
              <div class="item">
                <span>Subtotal:</span>
                <span>R$ ${calculateSubtotal(order).toFixed(2)}</span>
              </div>
              ${order.hasServiceFee ? `
              <div class="item">
                <span>Taxa de Serviço (10%):</span>
                <span>R$ ${(calculateSubtotal(order) * 0.1).toFixed(2)}</span>
              </div>
              ` : ''}
              <div class="item">
                <span>TOTAL:</span>
                <span>R$ ${(calculateSubtotal(order) * (order.hasServiceFee ? 1.1 : 1)).toFixed(2)}</span>
              </div>
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
  };

  // Função para traduzir o tipo de pedido
  const translateOrderType = (type: Order["type"]) => {
    switch (type) {
      case "Mesa": return "Mesa";
      case "Retirada": return "Retirada";
      case "Delivery": return "Entrega";
      default: return type;
    }
  };

  // Função para obter o preço do item (normalmente viria de um banco de dados)
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

  // Função para calcular o subtotal do pedido
  const calculateSubtotal = (order: Order) => {
    return order.items.reduce((total, item) => {
      return total + (getItemPrice(item.name) * item.quantity);
    }, 0);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Cupom do Pedido #{order.id}</span>
          <Button variant="outline" size="icon" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div 
          ref={printRef} 
          className="p-4 text-sm"
          style={{
            fontFamily: printerSettings.fontFamily === 'courier' ? "'Courier New', monospace" : 
                        printerSettings.fontFamily === 'arial' ? "Arial, sans-serif" : 
                        printerSettings.fontFamily === 'times' ? "'Times New Roman', serif" : 
                        "'Courier New', monospace",
            fontSize: printerSettings.fontSize === 'small' ? '12px' : 
                      printerSettings.fontSize === 'large' ? '16px' : 
                      '14px'
          }}
        >
          {/* Cabeçalho do Estabelecimento */}
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">{restaurantInfo.restaurantName}</h2>
            <p>{restaurantInfo.address}</p>
            <p>{restaurantInfo.city}</p>
            <p>Tel: {restaurantInfo.phone}</p>
            <p>CNPJ: {restaurantInfo.cnpj}</p>
          </div>
          
          <div className="border-t border-dashed my-4" />
          
          {/* Informações do Pedido */}
          <div>
            <h3 className="font-bold">CUPOM NÃO FISCAL</h3>
            <p>Pedido #{order.id}</p>
            <p>Data/Hora: {order.time} - {new Date().toLocaleDateString()}</p>
            <p>Tipo: {translateOrderType(order.type)}</p>
            {showPaymentMethod && paymentMethod && <p>Forma de Pagamento: {paymentMethod}</p>}
            
            {order.type === "Mesa" && (
              <p>Mesa: {order.identifier}</p>
            )}
            
            {order.type === "Delivery" && order.deliveryInfo && (
              <>
                <p>Cliente: {order.deliveryInfo.clientName}</p>
                <p>Telefone: {order.deliveryInfo.phone}</p>
                <p>Endereço: {order.deliveryInfo.address}, {order.deliveryInfo.number}</p>
                {order.deliveryInfo.complement && <p>Complemento: {order.deliveryInfo.complement}</p>}
                <p>Bairro: {order.deliveryInfo.neighborhood}</p>
                {order.deliveryInfo.reference && <p>Referência: {order.deliveryInfo.reference}</p>}
              </>
            )}
            
            {order.type === "Retirada" && (
              <p>Cliente: {order.identifier}</p>
            )}
          </div>
          
          <div className="border-t border-dashed my-4" />
          
          {/* Itens do Pedido */}
          {printerSettings.printItems && (
            <div>
              <h3 className="font-bold">ITENS DO PEDIDO</h3>
              {order.items.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    {printerSettings.printPrices && (
                      <span>R$ {(getItemPrice(item.name) * item.quantity).toFixed(2)}</span>
                    )}
                  </div>
                  {item.notes && (
                    <p className="text-xs italic ml-4">Obs: {item.notes}</p>
                  )}
                </div>
              ))}
              <div className="border-t border-dashed my-4" />
            </div>
          )}
          
          {/* Total */}
          <div className="font-bold">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>R$ {calculateSubtotal(order).toFixed(2)}</span>
            </div>
            {order.hasServiceFee && (
              <div className="flex justify-between">
                <span>Taxa de Serviço (10%):</span>
                <span>R$ {(calculateSubtotal(order) * 0.1).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg">
              <span>TOTAL:</span>
              <span>R$ {(calculateSubtotal(order) * (order.hasServiceFee ? 1.1 : 1)).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t border-dashed my-4" />
          
          {/* Rodapé */}
          <div className="text-center text-sm mt-6">
            <p>{printerSettings.footerText}</p>
          </div>
          
          {printerSettings.printQRCode && (
            <div className="text-center mt-4">
              <p>Avalie nosso atendimento!</p>
              <p>[QR Code seria exibido aqui]</p>
            </div>
          )}
        </div>

        {onClose && (
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderReceipt;
