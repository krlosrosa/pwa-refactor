import type { AnomalyRecord } from "@/_shared/db/database-local";
import type { SyncDevolucaoDatabase, SyncRecordAnomaly } from "@/_shared/db/sync.devolucao.repository";
import type { ISyncAnomaliaCacheRepository } from "@/domain/repositories/cache/sync-anomalia.interface";

export class SyncDevolucaoAnomaliaRepository implements ISyncAnomaliaCacheRepository {
  constructor(
    private localDb: SyncDevolucaoDatabase,
  ) { }

  async addAnomalyToSync(anomaly: AnomalyRecord): Promise<void> {
    await this.localDb.anomaliesSyncs.add({
      uuid: anomaly.uuid,
      operation: 'CREATE',
      payload: anomaly,
      createdAt: Date.now(),
      status: 'pending',
      retryCount: 0,
    });
  }

  async removeAnomalyFromSync(anomaly: AnomalyRecord): Promise<void> {

    const findAnomaly = await this.localDb.anomaliesSyncs.where('uuid').equals(anomaly.uuid).and(a => a.operation === 'CREATE').first();

    if(findAnomaly) {
      if(findAnomaly.status !== 'syncing') {
        await this.localDb.anomaliesSyncs.delete(findAnomaly.id!);
        return;
      }
    }

    await this.localDb.anomaliesSyncs.add({
      uuid: anomaly.uuid,
      operation: 'DELETE',
      payload: anomaly,
      createdAt: Date.now(),
      status: 'pending',
      retryCount: 0,
    });
  }
  async syncAnomalies(): Promise<void> {
    return Promise.resolve();
  }

  async getAnomaliesToSync(): Promise<SyncRecordAnomaly[]> {
    return await this.localDb.anomaliesSyncs.toArray();
  }

  async markAnomalyAsSynced(id: number): Promise<void> {
    await this.localDb.anomaliesSyncs.update(id, { status: 'syncing', retryCount: 0 });
  }

  async markAnomalyAsError(id: number): Promise<void> {
    const record = await this.localDb.anomaliesSyncs.get(id);
    if(record) {
      await this.localDb.anomaliesSyncs.update(id, { 
        status: 'error', 
        retryCount: record.retryCount + 1,
      });
    }
  }

  async limparItensSincronizadoByDemandaId(demandaId: string): Promise<void> {
    const items = await this.localDb.anomaliesSyncs.toArray();
    const toDelete = items.filter(
      a => a.payload.demandaId === demandaId && a.status === 'syncing'
    );
    await this.localDb.anomaliesSyncs.bulkDelete(toDelete.map(i => i.id!));
  }
}