import type { DemandLocalRecord } from "@/_shared/db/database-local";
import type { IDevolucaoDemandCacheRepository } from "@/domain/repositories/cache/IDevolucao-cache.inteface";
import type { ISyncDemandCacheRepository } from "@/domain/repositories/cache/sync-demanda.interface";

export class StartDemandaUseCase {
  constructor(
    private demandRepository: IDevolucaoDemandCacheRepository,
    private readonly syncDemandCacheRepository: ISyncDemandCacheRepository,
  ) {}

  async execute(demandId: string, data: Partial<DemandLocalRecord>): Promise<void> {
    const demand = await this.demandRepository.findDemandById(demandId);
    if (!demand) {
      throw new Error('Demanda não encontrada');
    }
    demand.localProgress = 'CHECKLIST_IN_PROGRESS';
    demand.status = 'EM_CONFERENCIA';
    demand.placa = data.placa ?? '';
    demand.doca = data.doca;
    demand.quantidadePaletes = data.quantidadePaletes;
    await this.demandRepository.saveDemand(demand);
    await this.syncDemandCacheRepository.addDemandToSync(demand);
  }
}