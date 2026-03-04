import { z } from "zod";

export const cadastrarContagemSchema = z.object({
  sku: z.string(),
  quantidadeCaixas: z.number(),
  quantidadeUnidades: z.number(),
  lote: z.string(),
})