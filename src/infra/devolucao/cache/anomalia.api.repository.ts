import type { AnomalyRecord, DemandLocalDatabase } from "@/_shared/db/database-local";
import type { IAnomalyLocalRepository } from "@/domain/repositories/cache/anomalia-cache.interface";

export class AnomaliaLocalRepository implements IAnomalyLocalRepository {
  constructor(
    private localDb: DemandLocalDatabase,
  ) { }
  async saveAnomaly(anomaly: AnomalyRecord): Promise<void> {
    await this.localDb.anomalias.add(anomaly);
  }

  async loadAnomaliesByItemAndDemanda(itemId: string, demandaId: string): Promise<AnomalyRecord[]> {
    return this.localDb.anomalias.where('itemId').equals(itemId).and(anomaly => anomaly.demandaId === demandaId).toArray();
  }

  async deleteAnomaly(uuid: string): Promise<void> {
    await this.localDb.anomalias.where('uuid').equals(uuid).delete();
  }

  async findAnomalyByStatus(status: string): Promise<AnomalyRecord[]> {
    return this.localDb.anomalias.where('synced').equals(status).toArray();
  }

  async findAnomaliasByDemandaId(demandaId: string): Promise<AnomalyRecord[]> {
    return this.localDb.anomalias.where('demandaId').equals(demandaId).toArray();
  }

  async deleteAnomaliasByDemandaId(demandaId: string): Promise<void> {
    await this.localDb.anomalias.where('demandaId').equals(demandaId).delete();
  }

  async markAnomalyAsSynced(anomalyId: number): Promise<void> {
    await this.localDb.anomalias.update(anomalyId, { synced: 'SYNCED' });
  }

  async getAnomalyById(uuid: string): Promise<AnomalyRecord | undefined> {
    return await this.localDb.anomalias.where('uuid').equals(uuid).first();
  }
  async limparItensSincronizadoByDemandaId(demandaId: string): Promise<void> {
    const items = await this.localDb.anomalias.toArray();
    const toDelete = items.filter(
      a => a.demandaId === demandaId
    );
    await this.localDb.anomalias.bulkDelete(toDelete.map(i => i.id!));
  }
}