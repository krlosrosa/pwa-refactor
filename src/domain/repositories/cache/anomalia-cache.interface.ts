import type { AnomalyRecord } from "@/_shared/db/database-local";

export interface IAnomalyLocalRepository {
  getAnomalyById(uuid: string): Promise<AnomalyRecord | undefined>;
  findAnomaliasByDemandaId(status: string): Promise<AnomalyRecord[]>;
  saveAnomaly(anomaly: AnomalyRecord): Promise<void>;
  loadAnomaliesByItemAndDemanda(itemId: string, demandaId: string): Promise<AnomalyRecord[]>;
  deleteAnomaly(uuid: string): Promise<void>;
  deleteAnomaliasByDemandaId(demandaId: string): Promise<void>;
  findAnomalyByStatus(status: string): Promise<AnomalyRecord[]>;
  markAnomalyAsSynced(anomalyId: number): Promise<void>;
  limparItensSincronizadoByDemandaId(demandaId: string): Promise<void>;
}