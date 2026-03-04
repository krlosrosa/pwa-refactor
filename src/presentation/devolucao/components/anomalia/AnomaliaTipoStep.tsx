import { Card, CardContent } from '@/_shared/components/ui/card';
import { Label } from '@/_shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shared/components/ui/select';
import { tipoNaoConformidadeOptions, type TipoNaoConformidade } from '../../consts/causas-check-list';

/**
 * Step component for selecting non-conformity type
 */
export function AnomaliaTipoStep({
  tipo,
  updateField,
}: {
  tipo: string | null;
  updateField: (field: string, value: string) => void;
}) {
  return (
    <Card className="p-0">
      <CardContent className="p-4 space-y-4">
        <div>
          <Label>Tipo de Não Conformidade</Label>
          <Select
            value={tipo ?? ''}
            onValueChange={(value) => updateField('tipoNaoConformidade', value as TipoNaoConformidade)}
          >
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {tipoNaoConformidadeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
