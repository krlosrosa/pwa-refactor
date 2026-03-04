import { Check, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/_shared/components/ui/card";
import { Input } from "@/_shared/components/ui/input";
import { Label } from "@/_shared/components/ui/label";
import type { cadastrarContagemSchema } from "../forms/schemas/cadastrarContagem";
import { Controller, type UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { ProdutoRecord } from "@/_shared/db/database-local";
import { useEffect, useState } from "react";

type FormCadastroItemProps = {
  getProdutoBySku: (sku: string) => Promise<ProdutoRecord | undefined>;
  tipo?: "FISICO" | "CONTABIL";
  form: UseFormReturn<z.infer<typeof cadastrarContagemSchema>>;
  extraItem?: boolean;
};

export function FormCadastroItem({
  getProdutoBySku,
  form,
}: FormCadastroItemProps) {
  const [descProduto, setDescProduto] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (form.getValues("sku")) {
      getProdutoBySku(form.getValues("sku")).then((produto) =>
        setDescProduto(produto?.descricao)
      );
    }
  }, [form.watch("sku"), getProdutoBySku]);

  const boxQty = form.watch("quantidadeCaixas");
  const unitQty = form.watch("quantidadeUnidades");
  const bothEmpty =
    (boxQty === undefined || boxQty === 0) &&
    (unitQty === undefined || unitQty === 0);

  return (
    <Card className="p-0">
      <CardContent className="p-2 space-y-4">
        <CardTitle className="text-base flex items-center gap-2">
          <Check className="h-4 w-4" />
          Cadastro de contagem
        </CardTitle>
        <div className="space-y-4">
          <Controller
            name="sku"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label htmlFor="form-rhf-demo-sku">SKU</Label>
                <Input
                  {...field}
                  id="form-rhf-demo-sku"
                  aria-invalid={fieldState.invalid}
                  placeholder="Informe o SKU"
                  autoComplete="off"
                  className="text-lg font-semibold"
                />
                {fieldState.invalid && fieldState.error?.message && (
                  <p className="text-xs text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
                {descProduto && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    {descProduto}
                  </p>
                )}
              </div>
            )}
          />

          <div className="space-y-2">
            <Label htmlFor="form-rhf-demo-quantidadeCaixas">
              Quantidade de Caixas
            </Label>
            <Input
              id="form-rhf-demo-quantidadeCaixas"
              type="number"
              placeholder="0"
              autoComplete="off"
              inputMode="numeric"
              min={0}
              aria-invalid={!!form.formState.errors.quantidadeCaixas}
              className="text-lg font-semibold"
              {...form.register("quantidadeCaixas", { valueAsNumber: true })}
            />
            {form.formState.errors.quantidadeCaixas && (
              <p className="text-xs text-destructive">
                {form.formState.errors.quantidadeCaixas.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-rhf-demo-quantidadeUnidades">
              Quantidade de Unidades
            </Label>
            <Input
              id="form-rhf-demo-quantidadeUnidades"
              type="number"
              placeholder="0"
              autoComplete="off"
              inputMode="numeric"
              min={0}
              aria-invalid={!!form.formState.errors.quantidadeUnidades}
              className="text-lg font-semibold"
              {...form.register("quantidadeUnidades", { valueAsNumber: true })}
            />
            {form.formState.errors.quantidadeUnidades && (
              <p className="text-xs text-destructive">
                {form.formState.errors.quantidadeUnidades.message}
              </p>
            )}
          </div>

          <Controller
            name="lote"
            control={form.control}
            render={({ fieldState }) => (
              <div className="space-y-2">
                <Label htmlFor="form-rhf-demo-lote">
                  Lote <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="form-rhf-demo-lote"
                  aria-invalid={fieldState.invalid}
                  placeholder="Informe o lote"
                  autoComplete="off"
                  {...form.register("lote")}
                  className="text-lg font-semibold"
                />
                {form.formState.errors.lote && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.lote?.message}
                  </p>
                )}
              </div>
            )}
          />

          {bothEmpty && (
            <div className="flex items-center gap-2 text-destructive text-xs">
              <AlertTriangle className="h-3 w-3" />
              <span>
                Preencha pelo menos um dos campos: Quantidade de Unidades ou
                Quantidade de Caixas
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
