import type { ChecklistRecord } from "@/_shared/db/database-local";

export interface IChecklistLocalRepository {
  saveChecklist(checklist: ChecklistRecord): Promise<number>;
  getChekListByDemandId(demandId: string): Promise<ChecklistRecord | undefined>;
  updateChekListByDemandId(demandId: string, checklist: Partial<ChecklistRecord>): Promise<ChecklistRecord>;
  findAllCheckListNotSynced(): Promise<ChecklistRecord[]>;
  markChecklistAsSynced(checklistId: number): Promise<void>;
  limparItensSincronizadoByDemandaId(demandaId: string): Promise<void>;
}