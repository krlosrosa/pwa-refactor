import { useForm } from "react-hook-form";
import { addItemConferenciaSchema, initialDataFormAddItemConferencia, type AddItemConferenciaFormData } from "./addItem.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { makeGetProdutoBySkuUseCase } from "@/factories/devolucao/produtos/getProdutoBySku.factory";

const getProdutoBySku = makeGetProdutoBySkuUseCase();

export function useAddItemConferenciaForm() {
  const form = useForm<AddItemConferenciaFormData>({
    resolver: zodResolver(addItemConferenciaSchema),
    defaultValues: initialDataFormAddItemConferencia,
  })

const sku = form.watch("sku");

useEffect(() => {
  if (!sku) return;

  const fetchDescricao = async () => {
    const descricao = await getProdutoBySku.execute(sku);

    if (descricao) {
      form.setValue("descricao", descricao.descricao, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      form.setValue("descricao", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  fetchDescricao();
}, [sku]);

  return {
    form,
  }
}