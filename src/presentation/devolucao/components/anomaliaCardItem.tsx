import { Button } from "@/_shared/components/ui/button";
import type { AnomalyRecord } from "@/_shared/db/database-local";
import { Trash2 } from "lucide-react";

export function AnomaliaCardItem({ anomaly, onDelete }: { anomaly: AnomalyRecord, onDelete: (id: string) => void }) {
  return (
    <div>
      <div key={anomaly.id} className="text-sm p-2 bg-muted rounded-md flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="font-medium">Caixas: {anomaly?.quantityBox || 0} | Unidades: {anomaly?.quantityUnit || 0}</p>
          <p className="text-muted-foreground">{anomaly.description}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          aria-label="Excluir anomalia"
          onClick={() => onDelete(anomaly.uuid)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}