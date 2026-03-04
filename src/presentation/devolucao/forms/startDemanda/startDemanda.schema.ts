import z from "zod";

export const startDemandaSchema = z.object({
  placa: z.string().min(1),
  doca: z.string().min(1),
  qtdPaletes: z.number().min(0),
})

export type StartDemandaFormData = z.infer<typeof startDemandaSchema>;

export const initialStartDemandaFormData: StartDemandaFormData = {
  placa: '',
  doca: '',
  qtdPaletes: 0,
}