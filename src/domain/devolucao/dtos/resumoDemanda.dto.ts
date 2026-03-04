import type { ReturnListConferenceUi } from "./returnListConferenceUi";

export interface ResumoDemandaDto {
  totalItens: number;
  itensConferidos: number;
  ItenPendentes: number;
  ItensComAnomalias: number;
  divergencias: ReturnListConferenceUi[];
  itensNaoConferidos: ReturnListConferenceUi[];
}