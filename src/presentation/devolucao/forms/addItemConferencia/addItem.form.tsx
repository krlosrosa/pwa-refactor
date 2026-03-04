// features/contagem/components/form-cadastro-item.tsx
import { Check, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/_shared/components/ui/card";
import { FormInput } from "@/_shared/components/forms/form-input"; // Componente que criamos anteriormente
import type { UseFormReturn } from "react-hook-form";
import type { AddItemConferenciaFormData } from "./addItem.schema";
import { BottomActionBar } from "@/_shared/components/layout/BottomActionBar";
import { Button } from "@/_shared/components/ui/button";

type FormAddItemConferenciaProps = {
  form: UseFormReturn<AddItemConferenciaFormData>;
  expectSku?: string;
};

export function FormAddItemConferencia({ form, expectSku }: FormAddItemConferenciaProps) {
  const { control, watch } = form;

  // Observando campos para lógica de UI
  const sku = watch("sku");
  const boxQty = watch("quantidadeCaixas");
  const unitQty = watch("quantidadeUnidades");

  const bothEmpty = (!boxQty || boxQty === 0) && (!unitQty || unitQty === 0);

  const habilitarCadastro = expectSku ? sku !== expectSku : false;

  return (
      <Card className="p-0">
        <CardContent className="p-2 space-y-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Check className="h-4 w-4" />
            Cadastro de contagem
          </CardTitle>

          <div className="space-y-4">
            {/* SKU com descrição dinâmica */}
            <div className="space-y-1">
              <FormInput
                control={control}
                name="sku"
                label="SKU"
                inputProps={{ placeholder: "Informe o SKU" }}
              />
            </div>

            <FormInput
              control={control}
              name="descricao"
              label="Descrição"
              type="text"
              inputProps={{ placeholder: "Informe a descrição", disabled: true }}
            />
            {/* Quantidades */}
            <FormInput
              control={control}
              name="quantidadeCaixas"
              label="Quantidade de Caixas"
              type="number"
              valueAsNumber={true}
            />

            <FormInput
              control={control}
              name="quantidadeUnidades"
              label="Quantidade de Unidades"
              type="number"
              valueAsNumber={true}
            />

            {/* Lote */}
            <FormInput
              control={control}
              name="lote"
              label="Lote *"
              inputProps={{ placeholder: "Informe o lote" }}
            />

            {/* Alerta de validação customizada */}
            {bothEmpty && (
              <div className="flex items-start gap-2 text-destructive text-xs bg-destructive/10 p-2 rounded-md">
                <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                <span>
                  Preencha pelo menos um dos campos: Unidades ou Caixas.
                </span>
              </div>
            )}
          </div>
          <BottomActionBar>
            <div className="space-y-2 w-full">

              <Button disabled={habilitarCadastro} className="w-full" type="submit">
                Cadastrar
              </Button>
            </div>
          </BottomActionBar>
        </CardContent>
      </Card>
  );
}