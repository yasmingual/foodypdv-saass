
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shift } from '@/context/OrderContext';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

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

  // Formata data/hora para exibição mais legível
  const formatDateTime = (dateTimeString: string | undefined) => {
    if (!dateTimeString) return "-";
    
    try {
      // Tentativa de formatar a data/hora para exibição mais amigável
      const [datePart, timePart] = dateTimeString.split(" ");
      return `${datePart} às ${timePart}`;
    } catch (error) {
      return dateTimeString;
    }
  };

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
    if (!shift.closingAmount) return "0,00";
    
    return shift.closingAmount.toFixed(2).replace('.', ',');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info size={18} />
            Detalhes do Turno #{shift.id}
          </DialogTitle>
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
            <p className="font-medium">{formatDateTime(shift.startTime)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Fim</p>
            <p className="font-medium">{formatDateTime(shift.endTime)}</p>
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
            {shift.closingAmount && (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Dinheiro</p>
                  <p className="font-medium">R$ {shift.closingCashAmount?.toFixed(2).replace('.', ',') || "0,00"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Débito</p>
                  <p className="font-medium">R$ {shift.closingDebitAmount?.toFixed(2).replace('.', ',') || "0,00"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Crédito</p>
                  <p className="font-medium">R$ {shift.closingCreditAmount?.toFixed(2).replace('.', ',') || "0,00"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pix</p>
                  <p className="font-medium">R$ {shift.closingPixAmount?.toFixed(2).replace('.', ',') || "0,00"}</p>
                </div>
              </>
            )}
          </div>
          
          <h3 className="font-medium mt-6">Estatísticas de Transações</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Dinheiro</p>
              <p className="font-medium">{shift.cashTransactions} transações</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cartão</p>
              <p className="font-medium">{shift.cardTransactions} transações</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pix</p>
              <p className="font-medium">{shift.pixTransactions} transações</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShiftDetailsDialog;
