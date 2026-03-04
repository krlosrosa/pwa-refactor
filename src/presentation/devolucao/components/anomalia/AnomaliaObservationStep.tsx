import { Package, Box } from 'lucide-react';
import { Card, CardContent } from '@/_shared/components/ui/card';
import { Label } from '@/_shared/components/ui/label';
import { Input } from '@/_shared/components/ui/input';
import { Textarea } from '@/_shared/components/ui/textarea';
import type { AnomalyFormData } from '../../hooks/useAnomalia';

/**
 * Step component for observation and summary
 */
export function AnomaliaObservationStep({
  formData,
  onObservationChange,
  onQuantityBoxChange,
  onQuantityUnitChange,
}: {
  formData: AnomalyFormData;
  onObservationChange: (field: string, value: string) => void;
  onQuantityBoxChange: (field: string, value: string) => void;
  onQuantityUnitChange: (field: string, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Quantity Fields */}
      <Card className="p-0">
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Box Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantityBox" className="flex items-center gap-2">
                <Box className="h-4 w-4" />
                Quantidade em Caixas
              </Label>
              <Input
                id="quantityBox"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={formData.quantityBox}
                onChange={(e) => onQuantityBoxChange('quantityBox', e.target.value)}
                className="h-12"
              />
            </div>

            {/* Unit Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantityUnit" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Quantidade em Unidades
              </Label>
              <Input
                id="quantityUnit"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={formData.quantityUnit}
                onChange={(e) => onQuantityUnitChange('quantityUnit', e.target.value)}
                className="h-12"
              />
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Observation Field */}
      <Card className="p-0">
        <CardContent className="p-4 space-y-4">
          <Label htmlFor="observacao">Observação (opcional)</Label>
          <Textarea
            id="observacao"
            placeholder="Descreva detalhes adicionais sobre a anomalia..."
            value={formData.observacao}
            onChange={(e) => onObservationChange('observacao', e.target.value)}
            className="mt-1.5"
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );
}
