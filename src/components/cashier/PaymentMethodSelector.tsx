
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Order } from "@/context/OrderContext";

interface PaymentMethodSelectorProps {
  paymentMethod: Order["paymentMethod"];
  onPaymentMethodChange: (value: Order["paymentMethod"]) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethod,
  onPaymentMethodChange
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Forma de pagamento</h3>
      <RadioGroup 
        defaultValue={paymentMethod} 
        value={paymentMethod} 
        onValueChange={(value) => onPaymentMethodChange(value as Order["paymentMethod"])}
      >
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
  );
};

export default PaymentMethodSelector;
