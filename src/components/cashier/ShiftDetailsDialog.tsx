
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shift } from '@/context/OrderContext';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface ShiftDetailsDialogProps {
  shift: Shift | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShiftDetailsDialog: React.FC<ShiftDetailsDialogProps> = ({
  shift,
  open,
  onOpenChange
}) => {
  if (!shift) return null;

  // Calcula duração do turno se tiver data de início e fim
  const calculateDuration = () => {
    if (!shift.startTime || !shift.endTime) return "N/A";
    
    try {
      const start = new Date(shift.startTime);
      const end = new Date(shift.endTime);
      
      const diffMs = end.getTime() - start.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      return `${diffHours}h ${diffMinutes}m`;
    } catch (error) {
      return "Erro no cálculo";
    }
  };

  // Calcula total financeiro do turno
  const calculateTotal = () => {
    if (!shift.closingAmounts) return "0,00";
    
    return shift.closingAmounts.total.toFixed(2).replace('.', ',');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Turno #{shift.id}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
          <div>
            <p className="text-sm text-muted-foreground">Operador</p>
            <p className="font-medium">{shift.operatorName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge className={shift.status === "active" ? "bg-green-500" : "bg-gray-500"}>
              {shift.status === "active" ? "Ativo" : "Fechado"}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Duração</p>
            <p className="font-medium">{calculateDuration()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Início</p>
            <p className="font-medium">{shift.startTime}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Fim</p>
            <p className="font-medium">{shift.endTime || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Transações</p>
            <p className="font-medium">{shift.totalTransactions}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Valores Financeiros</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Valor Inicial</p>
              <p className="font-medium">R$ {shift.initialAmount.toFixed(2).replace('.', ',')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor Total</p>
              <p className="font-medium">R$ {calculateTotal()}</p>
            </div>
            {shift.closingAmounts && (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Dinheiro</p>
                  <p className="font-medium">R$ {shift.closingAmounts.cash.toFixed(2).replace('.', ',')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Débito</p>
                  <p className="font-medium">R$ {shift.closingAmounts.debit.toFixed(2).replace('.', ',')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Crédito</p>
                  <p className="font-medium">R$ {shift.closingAmounts.credit.toFixed(2).replace('.', ',')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pix</p>
                  <p className="font-medium">R$ {shift.closingAmounts.pix.toFixed(2).replace('.', ',')}</p>
                </div>
              </>
            )}
          </div>
          
          {/* Se houver transações do turno, podemos exibi-las aqui */}
          <h3 className="font-medium mt-6">Observações</h3>
          <p className="text-sm text-muted-foreground">
            {shift.notes || "Nenhuma observação disponível para este turno."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShiftDetailsDialog;
