
import type { DemandLocalRecord } from "@/_shared/db/database-local";

export interface IDevolucaoDemandCacheRepository {
  saveDemandList(demands: DemandLocalRecord[]): Promise<void>;
  loadDemandList(centerId: string): Promise<DemandLocalRecord[]>;
  findDemandById(demandId: string): Promise<DemandLocalRecord | undefined>;
  saveDemand(demand: DemandLocalRecord): Promise<void>;
  limparItensSincronizadoByDemandaId(demandaId: string): Promise<void>;
  deleteDemandById(demandId: string): Promise<void>;
  removeAllDemands(): Promise<void>;
}