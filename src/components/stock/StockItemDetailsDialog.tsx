
import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StockItem } from "@/context/StockContext";

interface StockItemDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: StockItem | null;
  getStockStatus: (item: StockItem) => { status: string; color: string };
}

export const StockItemDetailsDialog: React.FC<StockItemDetailsDialogProps> = ({
  open,
  onOpenChange,
  item,
  getStockStatus,
}) => {
  if (!item) return null;

  const { status, color } = getStockStatus(item);
  
  // Formatar data de última atualização
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      return dateString;
    }
  };

  // Formatar valor monetário
  const formatCurrency = (value?: number) => {
    if (value === undefined) return "N/A";
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do Item</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-1">{item.name}</h3>
            <Badge className="bg-muted text-foreground">{item.category}</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Quantidade Atual</p>
              <div className="flex items-center mt-1">
                <Badge className={`${color} mr-2`}>{status}</Badge>
                <span className="text-lg font-medium">
                  {item.quantity} {item.unit}
                </span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Estoque Mínimo</p>
              <p className="text-lg font-medium mt-1">
                {item.minStock} {item.unit}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Preço de Compra</p>
              <p className="text-lg font-medium mt-1">
                {formatCurrency(item.purchasePrice)}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Valor em Estoque</p>
              <p className="text-lg font-medium mt-1">
                {formatCurrency((item.purchasePrice || 0) * item.quantity)}
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Última Atualização</p>
            <p className="text-base mt-1">{formatDate(item.lastUpdate)}</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
