import type { IDevolucaoDemandCacheRepository } from "@/domain/repositories/cache/IDevolucao-cache.inteface";
import type { DemandDto } from "@/infra/_services/api/model";
import { DemandLocalDatabase, type DemandLocalRecord } from "@/_shared/db/database-local";
import type { IDevolucaoApiRepository } from "@/domain/repositories/api/IDevolucao-api.inteface";

export class DemandDevolucaoLocalRepository implements IDevolucaoDemandCacheRepository {
  constructor(
    private localDb: DemandLocalDatabase,
    private api: IDevolucaoApiRepository
  ) { }
  async loadDemandList(centerId: string): Promise<DemandLocalRecord[]> {
    if (navigator.onLine) {
      try {
        const remoteDemands = await this.api.loadDemandList(centerId);
        await this.syncNewDemandsFromRemote(remoteDemands);
      } catch (error) {
        console.warn('[DemandRepository] Remote fetch failed', error);
      }
    }
    return this.localDb.demands.toArray().then(demands => demands.filter(d => d.centerId === centerId));
  }

  async findDemandById(demandId: string): Promise<DemandLocalRecord | undefined> {
    return this.localDb.demands.where('id').equals(Number(demandId)).first();
  }

  async syncNewDemandsFromRemote(remoteDemands: DemandDto[]): Promise<void> {
    const localDemands = await this.localDb.demands.toArray();
    const localIds = new Set(localDemands.map(d => d.id));

    const newDemands = remoteDemands.filter(
      d => !localIds.has(d.id)
    );

    if (newDemands.length === 0) return;

    await this.localDb.demands.bulkAdd(
      newDemands.map(d => ({
        id: d.id,
        placa: d.placa,
        motorista: d.motorista,
        centerId: d.centerId,
        adicionadoPorId: d.adicionadoPorId,
        conferenteId: d.conferenteId,
        senha: d.senha,
        viagemId: d.viagemId,
        status: d.status,
        criadoEm: d.criadoEm,
        localProgress: 'NOT_STARTED',
      }))
    );
  }

  async removeAllDemands(): Promise<void> {
    await this.localDb.demands.clear();
  }

  async saveDemandList(demands: DemandLocalRecord[]): Promise<void> {
    await this.localDb.demands.bulkAdd(demands);
  }

  async saveDemand(demand: DemandLocalRecord): Promise<void> {
    await this.localDb.demands.put(demand, demand.id);
  }

  async limparItensSincronizadoByDemandaId(demandaId: string): Promise<void> {
    const items = await this.localDb.demands.toArray();
    const toDelete = items.filter(
      a => a.id === Number(demandaId)
    );
    await this.localDb.demands.bulkDelete(toDelete.map(i => i.id!));
  }

  async deleteDemandById(demandId: string): Promise<void> {
    await this.localDb.demands.delete(Number(demandId));
  }
}