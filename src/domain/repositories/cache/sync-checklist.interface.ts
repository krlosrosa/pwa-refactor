import type { ChecklistRecord } from "@/_shared/db/database-local";
import type { CheckListSyncRecord } from "@/_shared/db/sync.devolucao.repository";


export interface ISyncCheckListCacheRepository {
  addCheckListToSync(checkList: ChecklistRecord): Promise<void>;
  removeCheckListFromSync(checkList: ChecklistRecord): Promise<void>;
  getCheckListsToSync(): Promise<CheckListSyncRecord[]>;
  syncCheckLists(): Promise<void>;
  markCheckListAsSynced(id: number): Promise<void>;
  markCheckListAsError(id: number): Promise<void>;
  limparItensSincronizadoByDemandaId(demandaId: string): Promise<void>;
}
