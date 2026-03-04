import { Card, CardContent } from '@/_shared/components/ui/card';
import { Label } from '@/_shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shared/components/ui/select';
import { naturezaAnomaliaOptions } from '../../consts/causas-check-list';

/**
 * Step component for selecting anomaly nature
 */
export function AnomaliaNaturezaStep({
  natureza,
  updateField,
}: {
  natureza: string | null;
  updateField: (field: string, value: string) => void;
}) {
  return (
    <Card className="p-0">
      <CardContent className="p-4 space-y-4">
        <div>
          <Label>Natureza da Anomalia</Label>
          <Select
            value={natureza ?? ''}
            onValueChange={(value) => updateField('natureza', value)}
          >
            <SelectTrigger className="mt-1.5 w-full">
              <SelectValue placeholder="Selecione a natureza" />
            </SelectTrigger>
            <SelectContent>
              {naturezaAnomaliaOptions.map((option) => (
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
