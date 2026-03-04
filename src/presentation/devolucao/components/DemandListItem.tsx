import { Badge } from "@/_shared/components/ui/badge";
import { Card, CardContent } from "@/_shared/components/ui/card";
import type { DemandLocalRecord } from "@/_shared/db/database-local";
import { formattedDate } from "@/_shared/lib/formattedData";
import { cn } from "@/_shared/lib/utils";
import { ChevronRight, Clock, Truck } from "lucide-react";

interface DemandListItemProps {
  demand: DemandLocalRecord;
  onClick: () => void;
}

export function DemandListItem({
  demand,
  onClick,
}: DemandListItemProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer p-0 transition-all hover:shadow-md active:scale-[0.99]',
        'border-l-4',
        demand.status === 'EM_CONFERENCIA' ? 'border-l-primary' : 'border-l-transparent'
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">{demand.id}</span>

              <Badge variant="outline" className="text-xs">
                {demand.status}
              </Badge>

            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Truck className="h-4 w-4" />
                {demand.doca}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formattedDate(demand.criadoEm)}
              </span>
            </div>

            {demand.placa && (
              <p className="mt-1 text-sm">
                Placa: <span className="font-medium">{demand.placa}</span>
              </p>
            )}
          </div>

          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}
