
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shift } from '@/context/OrderContext';

interface ShiftCloseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentShift: Shift | null;
  closingAmount: string;
  setClosingAmount: (value: string) => void;
  onConfirm: () => void;
}

const ShiftCloseDialog: React.FC<ShiftCloseDialogProps> = ({
  open,
  onOpenChange,
  currentShift,
  closingAmount,
  setClosingAmount,
  onConfirm
}) => {
  if (!currentShift) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fechar Caixa</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-muted-foreground">Operador:</span>
                <p className="font-medium">{currentShift.operatorName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Abertura:</span>
                <p className="font-medium">{currentShift.startTime}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Valor Inicial:</span>
                <p className="font-medium">R$ {currentShift.initialAmount.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Total Transações:</span>
                <p className="font-medium">{currentShift.totalTransactions}</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="closingCash" className="text-sm font-medium">
                Valor Final em Caixa
              </label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                <Input
                  id="closingCash"
                  type="text"
                  placeholder="0,00"
                  className="pl-9"
                  value={closingAmount}
                  onChange={(e) => {
                    // Aceitar apenas números e vírgula
                    const value = e.target.value.replace(/[^\d,]/g, '');
                    setClosingAmount(value);
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Informe o valor total em dinheiro presente no caixa para fechamento.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar Fechamento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShiftCloseDialog;
