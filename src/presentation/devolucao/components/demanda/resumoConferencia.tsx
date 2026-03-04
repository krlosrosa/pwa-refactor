import { Card, CardContent, CardTitle } from "@/_shared/components/ui/card";
import { Package } from "lucide-react";

type ResumoConferenciaProps = {
  total: number;
  checked: number;
  unchecked: number;
  anomaliesCount: number;
}

export function ResumoConferencia({ total, checked, unchecked, anomaliesCount }: ResumoConferenciaProps) {
  return (
    <Card className="p-0">
      <CardContent className="p-2">
        <CardTitle className="text-base mb-2 flex items-center gap-2">
          <Package className="h-4 w-4" />
          Resumo da Conferência
        </CardTitle>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Total de Itens</span>
          <span className="font-semibold">{total}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Itens Conferidos</span>
          <span className="font-semibold text-green-600">{checked}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Itens Pendentes</span>
          <span className="font-semibold text-yellow-600">{unchecked}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Anomalias</span>
          <span className="font-semibold text-destructive">{anomaliesCount}</span>
        </div>
      </CardContent>
    </Card>
  )
}