import type { DemandaConferenciaRecord } from "@/_shared/db/database-local";
import type { ConferenceSyncRecord } from "@/_shared/db/sync.devolucao.repository";


export interface ISyncConferenciaCacheRepository {
  addConferenciaToSync(conferencia: DemandaConferenciaRecord): Promise<void>;
  updateConferenciaToSync(conferencia: DemandaConferenciaRecord): Promise<void>;
  removeConferenciaFromSync(conferencia: DemandaConferenciaRecord): Promise<void>;
  getConferenciasToSync(): Promise<ConferenceSyncRecord[]>;
  syncConferencias(): Promise<void>;
  markConferenciaAsSynced(id: number): Promise<void>;
  markConferenciaAsError(id: number): Promise<void>;
  limparItensSincronizadoByDemandaId(demandaId: string): Promise<void>;
}
