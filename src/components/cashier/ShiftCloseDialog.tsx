
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shift } from '@/context/OrderContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Banknote, CreditCard, DollarSign } from 'lucide-react';

interface ShiftCloseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentShift: Shift | null;
  onConfirm: (values: {
    total: number;
    cash: number;
    debit: number;
    credit: number;
    pix: number;
  }) => void;
}

const ShiftCloseDialog: React.FC<ShiftCloseDialogProps> = ({
  open,
  onOpenChange,
  currentShift,
  onConfirm
}) => {
  const [values, setValues] = useState({
    total: '',
    cash: '',
    debit: '',
    credit: '',
    pix: ''
  });
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (field: string, value: string) => {
    // Aceitar apenas números e vírgula
    const sanitizedValue = value.replace(/[^\d,]/g, '');
    setValues(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  const calculateTotal = () => {
    const cash = parseFloat(values.cash.replace(',', '.')) || 0;
    const debit = parseFloat(values.debit.replace(',', '.')) || 0;
    const credit = parseFloat(values.credit.replace(',', '.')) || 0;
    const pix = parseFloat(values.pix.replace(',', '.')) || 0;
    
    return cash + debit + credit + pix;
  };

  useEffect(() => {
    const total = calculateTotal().toFixed(2).replace('.', ',');
    setValues(prev => ({ ...prev, total }));
  }, [values.cash, values.debit, values.credit, values.pix]);

  const handleConfirm = () => {
    const parsedValues = {
      total: parseFloat(values.total.replace(',', '.')) || 0,
      cash: parseFloat(values.cash.replace(',', '.')) || 0,
      debit: parseFloat(values.debit.replace(',', '.')) || 0,
      credit: parseFloat(values.credit.replace(',', '.')) || 0,
      pix: parseFloat(values.pix.replace(',', '.')) || 0,
    };
    
    onConfirm(parsedValues);
  };

  if (!currentShift) return null;
  
  const renderContent = () => (
    <>
      <div className="py-4">
        <div className="space-y-6">
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
          
          <div className="space-y-4">
            <h3 className="font-medium text-base">Informe os valores por forma de pagamento:</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="closingCash" className="text-sm font-medium flex items-center gap-2">
                  <Banknote className="h-4 w-4" />
                  Dinheiro em Caixa
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                  <Input
                    id="closingCash"
                    type="text"
                    placeholder="0,00"
                    className="pl-9"
                    value={values.cash}
                    onChange={(e) => handleChange('cash', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="closingDebit" className="text-sm font-medium flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Cartão de Débito
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                  <Input
                    id="closingDebit"
                    type="text"
                    placeholder="0,00"
                    className="pl-9"
                    value={values.debit}
                    onChange={(e) => handleChange('debit', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="closingCredit" className="text-sm font-medium flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Cartão de Crédito
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                  <Input
                    id="closingCredit"
                    type="text"
                    placeholder="0,00"
                    className="pl-9"
                    value={values.credit}
                    onChange={(e) => handleChange('credit', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="closingPix" className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Pix
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                  <Input
                    id="closingPix"
                    type="text"
                    placeholder="0,00"
                    className="pl-9"
                    value={values.pix}
                    onChange={(e) => handleChange('pix', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="closingTotal" className="text-sm font-medium">
                  Valor Total em Caixa
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                  <Input
                    id="closingTotal"
                    type="text"
                    placeholder="0,00"
                    className="pl-9 bg-muted"
                    value={values.total}
                    readOnly
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Soma dos valores informados acima.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm}>Confirmar Fechamento</Button>
      </DialogFooter>
    </>
  );
  
  // Renderiza como Dialog em desktop e Sheet em mobile
  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90%] flex flex-col">
        <SheetHeader>
          <SheetTitle>Fechar Caixa</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fechar Caixa</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default ShiftCloseDialog;
