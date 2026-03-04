import { Label } from '@/_shared/components/ui/label';
import { Thermometer } from 'lucide-react';
import { Input } from '@/_shared/components/ui/input';
import { cn } from '@/_shared/lib/utils';
import { useCheckList } from '../../hooks/useCheckList';
import { useEffect, useState } from 'react';

type TemperaturaStepProps = {
  setValidateStep: (validate: boolean) => void;
}

export function TemperaturaStep({ setValidateStep }: TemperaturaStepProps) {

  const { updateField } = useCheckList();
  const [compartmentTemperature, setCompartmentTemperature] = useState('');
  const [productTemperature, setProductTemperature] = useState('');

  async function handleUpdateField() {
    await updateField('temperaturaBau', compartmentTemperature);
    await updateField('temperaturaProduto', productTemperature);
  }

  useEffect(() => {
    setValidateStep(false);
  }, []);

  useEffect(() => {
    handleUpdateField();
    if(compartmentTemperature && productTemperature) {
      setValidateStep(true);
    }
  }, [compartmentTemperature, productTemperature]);

  return (
    <div>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Preencha a temperatura do baú e do produto para continuar. Ambos são obrigatórios.
        </p>
        <div>
          <Label htmlFor="compartmentTemp" className="flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            Temperatura do Baú (°C) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="compartmentTemp"
            type="number"
            step="0.1"
            placeholder="Ex: -18"
            value={compartmentTemperature}
            onChange={(e) => setCompartmentTemperature(e.target.value)}
            className={cn(!compartmentTemperature && 'border-destructive/50')}
          />
          {!compartmentTemperature && (
            <p className="text-xs text-destructive mt-1">Obrigatório</p>
          )}
        </div>
        <div>
          <Label htmlFor="productTemp" className="flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            Temperatura do Produto (°C) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="productTemp"
            type="number"
            step="0.1"
            placeholder="Ex: -15"
            value={productTemperature}
            onChange={(e) => setProductTemperature(e.target.value)}
            className={cn(!productTemperature && 'border-destructive/50')}
          />
          {!productTemperature && (
            <p className="text-xs text-destructive mt-1">Obrigatório</p>
          )}
        </div>
      </div>
    </div>
  );
}