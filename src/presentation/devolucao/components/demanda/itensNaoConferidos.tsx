import { Card, CardContent, CardTitle } from "@/_shared/components/ui/card";
import type { ReturnListConferenceUi } from "@/domain/devolucao/dtos/returnListConferenceUi";
import { AlertTriangle } from "lucide-react";

type DivergenciasConferenciaProps = {
  divergentItems: ReturnListConferenceUi[];
}

export function ItensNaoConferidos({ divergentItems }: DivergenciasConferenciaProps) {
  return (
    <Card className="border-warning/50 p-0">
    <CardContent className='p-2'>
      <CardTitle className="text-base text-warning flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        Itens Não Conferidos
      </CardTitle>
      <p className="text-sm text-muted-foreground mb-3">
        Existem {divergentItems.length} item(s) que ainda não foram conferidos.
      </p>
      <div className="space-y-2">
        {divergentItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
            <div className="flex-1">
              <p className="font-mono text-sm font-medium">{item.sku}</p>
              <p className="text-xs text-muted-foreground">
                {item.descricao}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
  )
}