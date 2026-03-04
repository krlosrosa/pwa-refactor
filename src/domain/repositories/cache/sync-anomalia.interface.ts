import type { AnomalyRecord } from "@/_shared/db/database-local";
import type { SyncRecordAnomaly } from "@/_shared/db/sync.devolucao.repository";

export interface ISyncAnomaliaCacheRepository {
  addAnomalyToSync(anomaly: AnomalyRecord): Promise<void>;
  removeAnomalyFromSync(anomaly: AnomalyRecord): Promise<void>;
  getAnomaliesToSync(): Promise<SyncRecordAnomaly[]>;
  syncAnomalies(): Promise<void>;
  markAnomalyAsSynced(id: number): Promise<void>;
  markAnomalyAsError(id: number): Promise<void>;
  limparItensSincronizadoByDemandaId(demandaId: string): Promise<void>;
}