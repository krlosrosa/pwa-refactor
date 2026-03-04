import type { IDevolucaoDemandCacheRepository } from "@/domain/repositories/cache/IDevolucao-cache.inteface";
import type { ISyncDemandCacheRepository } from "@/domain/repositories/cache/sync-demanda.interface";

export class FinalizarDemandaUseCase {
  constructor(
    private demandRepository: IDevolucaoDemandCacheRepository,
    private syncDemandCacheRepository: ISyncDemandCacheRepository
  ) {}

  async execute(demandaId: string): Promise<void> {
    const demand = await this.demandRepository.findDemandById(demandaId);
    if(!demand) {
      throw new Error('Demanda não encontrada');
    }
    demand.localProgress = 'FINALIZED_LOCAL';
    demand.status = 'CONFERENCIA_FINALIZADA';
    await this.demandRepository.saveDemand(demand);
    await this.syncDemandCacheRepository.updateDemandToSync(demand);
  }
}