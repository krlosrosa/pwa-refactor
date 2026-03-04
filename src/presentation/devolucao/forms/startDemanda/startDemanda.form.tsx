import { BottomActionBar } from "@/_shared/components/layout/BottomActionBar";
import { Button } from "@/_shared/components/ui/button";
import { Card, CardContent, CardTitle } from "@/_shared/components/ui/card";
import { FormInput } from "@/_shared/components/forms/form-input";
import { Play } from "lucide-react";
import type { StartDemandaFormData } from "./startDemanda.schema";
import type { UseFormReturn } from "react-hook-form";

type StartDemandaFormProps = {
  form: UseFormReturn<StartDemandaFormData>;
};

export function StartDemandaForm({ form }: StartDemandaFormProps) {
  const { control } = form;
  return (
    <div className="space-y-4">
      <Card className="p-0">
        <CardContent className="p-4 space-y-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Play className="h-4 w-4" />
            Dados da demanda
          </CardTitle>
          <div className="space-y-4">
            <FormInput
              control={control}
              name="placa"
              label="Placa"
              type="text"
            />
            <FormInput
              control={control}
              name="doca"
              label="Doca"
              type="text"
            />
            <FormInput
              control={control}
              name="qtdPaletes"
              label="Quantidade de Paletes"
              type="number"
              valueAsNumber={true}
            />
          </div>
        </CardContent>
      </Card>
      <BottomActionBar>
        <div className="space-y-2 w-full">
          <Button className="w-full" type="submit">
            Iniciar
          </Button>
        </div>
      </BottomActionBar>
    </div>
  );
}