import type { DemandLocalRecord } from "@/_shared/db/database-local";
import type { DemandSyncRecord, SyncDevolucaoDatabase} from "@/_shared/db/sync.devolucao.repository";
import type { ISyncDemandCacheRepository } from "@/domain/repositories/cache/sync-demanda.interface";

export class SyncDevolucaoDemandaRepository implements ISyncDemandCacheRepository {
  constructor(
    private localDb: SyncDevolucaoDatabase,
  ) { }

  async addDemandToSync(demand: DemandLocalRecord): Promise<void> {
    await this.localDb.demandsSyncs.add({
      uuid: demand.id!.toString(),
      operation: 'CREATE',
      payload: demand,
      createdAt: Date.now(),
      status: 'pending',
      retryCount: 0,
    });
  }

  async updateDemandToSync(demand: DemandLocalRecord): Promise<void> {
    await this.localDb.demandsSyncs.add({
      uuid: demand.id!.toString(),
      operation: 'UPDATE',
      payload: demand,
      createdAt: Date.now(),
      status: 'pending',
      retryCount: 0,
    });
  }

  async deleteDemandFromSync(id: number): Promise<void> {
    await this.localDb.demandsSyncs.delete(id);
  }

  async removeDemandFromSync(demand: DemandLocalRecord): Promise<void> {

    const findDemand = await this.localDb.demandsSyncs.where('uuid').equals(demand.id!.toString()).and(a => a.operation === 'CREATE').first();

    if(findDemand) {
      if(findDemand.status !== 'syncing') {
        await this.localDb.demandsSyncs.delete(findDemand.id!);
        return;
      }
    }

    await this.localDb.demandsSyncs.add({
      uuid: demand.id!.toString(),
      operation: 'DELETE',
      payload: demand,
      createdAt: Date.now(),
      status: 'pending',
      retryCount: 0,
    });
  }
  async syncDemands(): Promise<void> {
    return Promise.resolve();
  }

  async getDemandsToSync(): Promise<DemandSyncRecord[]> {
    return await this.localDb.demandsSyncs.toArray();
  }

  async markDemandAsSynced(id: number): Promise<void> {
    await this.localDb.demandsSyncs.update(id, { status: 'syncing', retryCount: 0 });
  }

  async markDemandAsError(id: number): Promise<void> {
    const record = await this.localDb.demandsSyncs.get(id);
    if(record) {
      await this.localDb.demandsSyncs.update(id, { status: 'error', retryCount: record.retryCount + 1 });
    }
  }
  async limparItensSincronizadoByDemandaId(demandaId: string): Promise<void> {
    const items = await this.localDb.demandsSyncs.toArray();
    const toDelete = items.filter(
      a => a.payload.id === Number(demandaId) && a.status === 'syncing'
    );
    await this.localDb.demandsSyncs.bulkDelete(toDelete.map(i => i.id!));
  }
}