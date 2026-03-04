import type { ChecklistRecord } from "@/_shared/db/database-local";
import type { CheckListSyncRecord, SyncDevolucaoDatabase} from "@/_shared/db/sync.devolucao.repository";
import type { ISyncCheckListCacheRepository } from "@/domain/repositories/cache/sync-checklist.interface";

export class SyncDevolucaoCheckListRepository implements ISyncCheckListCacheRepository {
  constructor(
    private localDb: SyncDevolucaoDatabase,
  ) { }

  async addCheckListToSync(checklist: ChecklistRecord): Promise<void> {
    await this.localDb.checklistsSyncs.add({
      uuid: checklist.id!.toString(),
      operation: 'CREATE',
      payload: checklist,
      createdAt: Date.now(),
      status: 'pending',
      retryCount: 0,
    });
  }

  async removeCheckListFromSync(checklist: ChecklistRecord): Promise<void> {

    const findChecklist = await this.localDb.checklistsSyncs.where('uuid').equals(checklist.id!.toString()).and(a => a.operation === 'CREATE').first();

    if(findChecklist) {
      if(findChecklist.status !== 'syncing') {
        await this.localDb.checklistsSyncs.delete(findChecklist.id!);
        return;
      }
    }

    await this.localDb.checklistsSyncs.add({
      uuid: checklist.id!.toString(),
      operation: 'DELETE',
      payload: checklist,
      createdAt: Date.now(),
      status: 'pending',
      retryCount: 0,
    });
  }
  async syncCheckLists(): Promise<void> {
    return Promise.resolve();
  }

  async getCheckListsToSync(): Promise<CheckListSyncRecord[]> {
    return await this.localDb.checklistsSyncs.toArray();
  }

  async markCheckListAsSynced(id: number): Promise<void> {
    await this.localDb.checklistsSyncs.update(id, { status: 'syncing', retryCount: 0 });
  }

  async markCheckListAsError(id: number): Promise<void> {
    const record = await this.localDb.checklistsSyncs.get(id);
    if(record) {
      await this.localDb.checklistsSyncs.update(id, { status: 'error', retryCount: record.retryCount + 1 });
    }
  }

  async limparItensSincronizadoByDemandaId(demandaId: string): Promise<void> {
    const items = await this.localDb.checklistsSyncs.toArray();
    const toDelete = items.filter(
      a => a.payload.id === Number(demandaId) && a.status === 'syncing'
    );
    await this.localDb.checklistsSyncs.bulkDelete(toDelete.map(i => i.id!));
  }
}