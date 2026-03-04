import type { ChecklistRecord, DemandLocalDatabase } from "@/_shared/db/database-local";
import type { IChecklistLocalRepository } from "@/domain/repositories/cache/Checklist-cache.interface";

export class ChecklistLocalRepository implements IChecklistLocalRepository {
  constructor(
    private localDb: DemandLocalDatabase,
  ) { }
  async getChekListByDemandId(demandId: string): Promise<ChecklistRecord | undefined> {
    return this.localDb.checklists.where('id').equals(Number(demandId)).first();
  }
  async saveChecklist(checklist: ChecklistRecord): Promise<number> {
    return this.localDb.checklists.add(checklist);
  }
  async updateChekListByDemandId(demandId: string, checklist: Partial<ChecklistRecord>): Promise<ChecklistRecord> {
    await this.localDb.checklists.where('id').equals(Number(demandId)).modify(checklist);
    const checklistRecord = await this.getChekListByDemandId(demandId);
    console.log({ checklistRecord, demandId });
    if (!checklistRecord) {
      throw new Error('Checklist não encontrado');
    }
    return checklistRecord;
  }
  async findAllCheckListNotSynced(): Promise<ChecklistRecord[]> {
    return this.localDb.checklists.where('synced').equals('NOT_READY').toArray();
  }
  async markChecklistAsSynced(checklistId: number): Promise<void> {
    await this.localDb.checklists.update(checklistId, { synced: 'SYNCED' });
  }

  async limparItensSincronizadoByDemandaId(demandaId: string): Promise<void> {
    const items = await this.localDb.checklists.toArray();
    const toDelete = items.filter(
      a => a.demandaId === demandaId
    );
    await this.localDb.checklists.bulkDelete(toDelete.map(i => i.id!));
  }
}