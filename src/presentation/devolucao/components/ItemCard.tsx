import { ChevronRight, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/_shared/components/ui/card';
import { Badge } from '@/_shared/components/ui/badge';
import { cn } from '@/_shared/lib/utils';
import type { ReturnListConferenceUi } from '@/domain/devolucao/dtos/returnListConferenceUi';

export function ItemCardListItem({ 
  item,
  onClick 
}: { 
  item: ReturnListConferenceUi;
  onClick: () => void;
}) {
  return (
    <Card
      className={cn(
        'cursor-pointer p-0 transition-all hover:shadow-md active:scale-[0.99]',
        item.isChecked && 'border-l-4 border-l-primary',
        item.hasDivergence && 'border-l-4 border-l-destructive'
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-foreground shrink-0">{item.sku}</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
                <div className="flex items-center gap-2 shrink-0">
                  {item.isExtra && (
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-300 whitespace-nowrap">
                      Item Extra
                    </Badge>
                  )}
                  {item.tipo_dev === 'REENTREGA' && (
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-300 whitespace-nowrap">
                      Reentrega
                    </Badge>
                  )}
                  {item.isChecked && (
                    <Badge variant="default" className="text-xs whitespace-nowrap">
                      Conferido
                    </Badge>
                  )}
                  {item.hasDivergence && (
                    <Badge variant="destructive" className="text-xs flex items-center gap-1 whitespace-nowrap">
                      <AlertTriangle className="h-3 w-3" />
                      Divergência
                    </Badge>
                  )}
                  {item.hasAnomaly && (
                    <Badge variant="destructive" className="text-xs flex items-center gap-1 whitespace-nowrap bg-orange-500 hover:bg-orange-600">
                      <AlertTriangle className="h-3 w-3" />
                      Anomalia
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.descricao}
            </p>
            {
              item.tipo_dev === 'REENTREGA' && (
                <div className="mt-2 text-xs text-muted-foreground space-y-1">
                  <div>
                    <span className="font-medium">Contabil:</span>{' '}
                    {item.caixasContabil !== undefined && item.caixasContabil > 0 && (
                      <span>{item.caixasContabil} cx</span>
                    )}
                  </div>
                </div>
              )
            }
            {item.isChecked && (
              <div className="mt-2 text-xs text-muted-foreground space-y-1">
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
            )}
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
        </div>
      </CardContent>
    </Card>
  );
}
