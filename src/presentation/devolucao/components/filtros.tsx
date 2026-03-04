import { Input } from "@/_shared/components/ui/input";
import { Label } from "@/_shared/components/ui/label";
import { Switch } from "@/_shared/components/ui/switch";

type FiltrosConferenceProps = {
  hasAnomaly: boolean;
  setHasAnomaly: (hasAnomaly: boolean) => void;
  notChecked: boolean;
  setNotChecked: (notChecked: boolean) => void;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  sku: string;
  setSku: (sku: string) => void;
  tipoDevolucao: 'DEVOLUCAO' | 'REENTREGA';
  setReentrega: (reentrega: boolean) => void;
}

export function FiltrosConference({ hasAnomaly, setHasAnomaly, notChecked, setNotChecked, isChecked, setIsChecked, sku, setSku, tipoDevolucao, setReentrega }: FiltrosConferenceProps) {
  return (
    <div className="space-y-1 w-full">
      <Input
        id="sku"
        placeholder="SKU"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
      />
    <div className="flex w-full justify-between p-2 bg-secondary rounded-md items-center gap-2">
      <Label htmlFor="hasAnomaly">Com anomalias</Label>
      <Switch
        id="hasAnomaly"
        checked={hasAnomaly}
        onCheckedChange={setHasAnomaly}
      />
    </div>

    <div className="flex w-full justify-between p-2 bg-secondary rounded-md items-center gap-2">
      <Label htmlFor="notChecked">Não conferido</Label>
      <Switch
        id="hasDivergence"
        checked={notChecked}
        onCheckedChange={setNotChecked}
      />
    </div>
    <div className="flex w-full justify-between p-2 bg-secondary rounded-md items-center gap-2">
      <Label htmlFor="tipoDevolucao">Reentrega</Label>
      <Switch
        id="tipoDevolucao"
        checked={tipoDevolucao === 'REENTREGA'}
        onCheckedChange={setReentrega}
      />
    </div>
    <div className="flex w-full justify-between p-2 bg-secondary rounded-md items-center gap-2">
      <Label htmlFor="isChecked">Conferido</Label>
      <Switch
        id="isChecked"
        checked={isChecked}
        onCheckedChange={setIsChecked}
      />
    </div>
  </div>
  )
}