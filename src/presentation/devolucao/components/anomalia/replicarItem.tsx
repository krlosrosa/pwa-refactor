import { Card, CardContent } from "@/_shared/components/ui/card";
import { Checkbox } from "@/_shared/components/ui/checkbox";
import { Label } from "@/_shared/components/ui/label";
import { Copy } from "lucide-react";

type ReplicarItemProps = {
  onReplicateToAllItemsChange: (value: boolean) => void;
  replicate: boolean;
}

export function ReplicarItem({
  onReplicateToAllItemsChange,
  replicate,
}: ReplicarItemProps) {
  return (
    <div>
      {onReplicateToAllItemsChange && (
        <Card className="p-0">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="replicateToAll"
                checked={replicate}
                onCheckedChange={(v) => onReplicateToAllItemsChange(v === true)}
              />
              <div className="space-y-1">
                <Label htmlFor="replicateToAll" className="flex items-center gap-2 cursor-pointer font-medium">
                  <Copy className="h-4 w-4" />
                  Replicar esta anomalia para todos os itens da demanda
                </Label>
                <p className="text-xs text-muted-foreground">
                  Serão usadas todas as fotos e a mesma descrição em todos os itens. A quantidade será a conferida de cada item.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}