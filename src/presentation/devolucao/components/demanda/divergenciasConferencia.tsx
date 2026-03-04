import { Card, CardContent, CardTitle } from "@/_shared/components/ui/card";
import type { ReturnListConferenceUi } from "@/domain/devolucao/dtos/returnListConferenceUi";
import { AlertTriangle } from "lucide-react";

type DivergenciasConferenciaProps = {
  divergentItems: ReturnListConferenceUi[];
}

export function DivergenciasConferencia({ divergentItems }: DivergenciasConferenciaProps) {
  return (
    <Card className="border-warning/50 p-0">
    <CardContent className='p-2'>
      <CardTitle className="text-base text-warning flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        Divergências Encontradas
      </CardTitle>
      <p className="text-sm text-muted-foreground mb-3">
        Os seguintes produtos apresentam diferença entre quantidade esperada e conferida:
      </p>
      <div className="space-y-2">
        {divergentItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
            <div className="flex-1">
              <p className="font-mono text-sm font-medium">{item.sku}</p>
              <p className="text-xs text-muted-foreground">
                {item.descricao}
              </p>
              <div className="text-xs text-warning mt-1 space-y-0.5">
                <div>
                  <span className="font-medium">Conferido:</span>{' '}
                  {item.caixasFisico !== undefined && item.caixasFisico > 0 && (
                    <span>{item.caixasFisico} cx</span>
                  )}
                  {item.caixasFisico !== undefined && item.caixasFisico > 0 && item.unidadesFisico > 0 && ' • '}
                  {item.unidadesFisico > 0 && <span>{item.unidadesFisico} un</span>}
                  {(!item.caixasFisico || item.caixasFisico === 0) && item.unidadesFisico === 0 && (
                    <span className="text-muted-foreground">-</span>
                  )}
                </div>
                {item.lote && (
                  <div>
                    <span className="font-medium">Lote:</span> <span>{item.lote}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
  )
}