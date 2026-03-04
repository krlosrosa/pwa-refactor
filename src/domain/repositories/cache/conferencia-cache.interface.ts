import type { DemandaConferenciaRecord } from "@/_shared/db/database-local";

export interface IConferenciaCacheRepository {
  saveConferences(conferences: DemandaConferenciaRecord[]): Promise<void>;
  getConferencesByDemandId(demandId: string): Promise<DemandaConferenciaRecord[]>;
  addConference(conference: DemandaConferenciaRecord): Promise<void>;
  getItemById(demandaId: string, itemId: string): Promise<DemandaConferenciaRecord | undefined>;
  deleteConference(demandaId: string, itemId: string): Promise<void>;
  updateConference(conference: DemandaConferenciaRecord): Promise<void>;
  findConferenceByDemandaSkuAndLote(demandaId: string, sku: string, lote: string): Promise<DemandaConferenciaRecord | undefined>;
  limparItensSincronizadoByDemandaId(demandaId: string): Promise<void>;
}