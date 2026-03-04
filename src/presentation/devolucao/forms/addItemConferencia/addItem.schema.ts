import { z } from "zod";

export const addItemConferenciaSchema = z
  .object({
    sku: z.string().min(1, { message: "SKU é obrigatório" }),
    descricao: z.string().optional(),
    quantidadeCaixas: z.number(),
    quantidadeUnidades: z.number(),
    lote: z.string().min(1, { message: "Lote é obrigatório" }),
  })
  .refine(
    (data) => data.quantidadeCaixas > 0 || data.quantidadeUnidades > 0,
    { message: "Preencha pelo menos um dos campos: Quantidade de Caixas ou Quantidade de Unidades (maior que 0).", path: ["quantidadeCaixas"] }
  )

export type AddItemConferenciaFormData = z.infer<typeof addItemConferenciaSchema>;

export const initialDataFormAddItemConferencia: AddItemConferenciaFormData = {
  sku: '',
  quantidadeCaixas: 0,
  quantidadeUnidades: 0,
  lote: '',
}