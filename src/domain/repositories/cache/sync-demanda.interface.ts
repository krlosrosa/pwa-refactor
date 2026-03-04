import type { DemandLocalRecord } from "@/_shared/db/database-local";
import type { DemandSyncRecord } from "@/_shared/db/sync.devolucao.repository";


export interface ISyncDemandCacheRepository {
  addDemandToSync(demand: DemandLocalRecord): Promise<void>;
  updateDemandToSync(demand: DemandLocalRecord): Promise<void>;
  removeDemandFromSync(demand: DemandLocalRecord): Promise<void>;
  getDemandsToSync(): Promise<DemandSyncRecord[]>;
  syncDemands(): Promise<void>;
  markDemandAsSynced(id: number): Promise<void>;
  markDemandAsError(id: number): Promise<void>;
  limparItensSincronizadoByDemandaId(demandaId: string): Promise<void>;
  deleteDemandFromSync(id: number): Promise<void>;
}
