import type { DemandaConferenciaRecord } from "@/_shared/db/database-local";
import type { ConferenceSyncRecord, SyncDevolucaoDatabase} from "@/_shared/db/sync.devolucao.repository";
import type { ISyncConferenciaCacheRepository } from "@/domain/repositories/cache/sync-conferencia.interface";

export class SyncDevolucaoConferenciaRepository implements ISyncConferenciaCacheRepository {
  constructor(
    private localDb: SyncDevolucaoDatabase,
  ) { }

  async addConferenciaToSync(conferencia: DemandaConferenciaRecord): Promise<void> {
    await this.localDb.conferencesSyncs.add({
      uuid: conferencia.uuid! ,
      operation: 'CREATE',
      payload: conferencia,
      createdAt: Date.now(),
      status: 'pending',
      retryCount: 0,
    });
  }

  async removeConferenciaFromSync(conferencia: DemandaConferenciaRecord): Promise<void> {

    const findConferencia = await this.localDb.conferencesSyncs.where('uuid').equals(conferencia.id!.toString()).and(a => a.operation === 'CREATE').first();

    if(findConferencia) {
      if(findConferencia.status !== 'syncing') {
        await this.localDb.conferencesSyncs.delete(findConferencia.id!);
        return;
      }
    }

    await this.localDb.conferencesSyncs.add({
      uuid: conferencia.uuid!,
      operation: 'DELETE',
      payload: conferencia,
      createdAt: Date.now(),
      status: 'pending',
      retryCount: 0,
    });
  }
  async syncConferencias(): Promise<void> {
    return Promise.resolve();
  }

  async getConferenciasToSync(): Promise<ConferenceSyncRecord[]> {
    return await this.localDb.conferencesSyncs.toArray();
  }

  async markConferenciaAsSynced(id: number): Promise<void> {
    await this.localDb.conferencesSyncs.update(id, { status: 'syncing', retryCount: 0 });
  }

  async markConferenciaAsError(id: number): Promise<void> {
    const record = await this.localDb.conferencesSyncs.get(id);
    if(record) {
      await this.localDb.conferencesSyncs.update(id, { status: 'error', retryCount: record.retryCount + 1 });
    }
  }
  async updateConferenciaToSync(conferencia: DemandaConferenciaRecord): Promise<void> {
    await this.localDb.conferencesSyncs.add({
      uuid: conferencia.uuid!,
      operation: 'UPDATE',
      payload: conferencia,
      createdAt: Date.now(),
      status: 'pending',
      retryCount: 0,
    });
  }

  async limparItensSincronizadoByDemandaId(demandaId: string): Promise<void> {
    const items = await this.localDb.conferencesSyncs.toArray();
    const toDelete = items.filter(
      a => a.payload.demandaId === Number(demandaId) && a.status === 'syncing'
    );
    await this.localDb.conferencesSyncs.bulkDelete(toDelete.map(i => i.id!));
  }
}