import { z } from "zod";

export const cadastrarAnomaliaSchema = z.object({
  natureza: z.string(),
  description: z.string(),
  tipoNaoConformidade: z.string(),
  causaAvaria: z.string(),
  observacao: z.string(),
  quantityBox: z.string(),
  quantityUnit: z.string(),
});