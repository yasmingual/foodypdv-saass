
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shift } from '@/context/OrderContext';
import { format } from 'date-fns';

interface ShiftDetailsProps {
  shift: Shift;
}

const ShiftDetails: React.FC<ShiftDetailsProps> = ({ shift }) => {
  // Calculando o tempo decorrido desde a abertura do turno
  const startDate = new Date(shift.startTime);
  const now = new Date();
  const elapsedHours = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60));
  const elapsedMinutes = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60)) % 60;
  
  return (
    <Card className="mb-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Turno Atual</span>
          <span className="text-sm font-normal bg-green-500 text-white px-2 py-1 rounded-full">Ativo</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Operador</p>
            <p className="font-medium">{shift.operatorName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Início</p>
            <p className="font-medium">{shift.startTime}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Duração</p>
            <p className="font-medium">{elapsedHours}h {elapsedMinutes}m</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Valor Inicial</p>
            <p className="font-medium">R$ {shift.initialAmount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Transações</p>
            <p className="font-medium">{shift.totalTransactions}</p>
          </div>
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
      </CardContent>
    </Card>
  );
};

export default ShiftDetails;
