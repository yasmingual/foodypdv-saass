
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface PaymentActionsProps {
  onPrintReceipt: () => void;
  isPrinting: boolean;
  onClose: () => void;
  onFinalize: () => void;
}

const PaymentActions: React.FC<PaymentActionsProps> = ({
  onPrintReceipt,
  isPrinting,
  onClose,
  onFinalize,
}) => {
  return (
    <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={onPrintReceipt}
        disabled={isPrinting}
      >
        {isPrinting ? "Imprimindo..." : "Imprimir Cupom"}
      </Button>
      <div className="space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="button" onClick={onFinalize}>
          Finalizar Pagamento
        </Button>
      </div>
    </DialogFooter>
  );
};

export default PaymentActions;
