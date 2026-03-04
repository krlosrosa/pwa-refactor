import type { IConferenciaCacheRepository } from "@/domain/repositories/cache/conferencia-cache.interface";
import type { IDevolucaoDemandCacheRepository } from "@/domain/repositories/cache/IDevolucao-cache.inteface";
import type { ISyncConferenciaCacheRepository } from "@/domain/repositories/cache/sync-conferencia.interface";

export class DeleteConferenteUseCase {
  constructor(
    private cacheRepository: IConferenciaCacheRepository,
    private demandRepository: IDevolucaoDemandCacheRepository,
    private syncConferenceCacheRepository: ISyncConferenciaCacheRepository
  ) {}

  async execute(demandaId: string, itemId: string): Promise<void> {
    const demand = await this.demandRepository.findDemandById(demandaId);
    const conferencia = await this.cacheRepository.getItemById(demandaId, itemId);
    if(!demand || !conferencia) {
      throw new Error('Demanda ou conferência não encontrada');
    }
    demand.localProgress = 'CONFERENCE_IN_PROGRESS';
    await this.demandRepository.saveDemand(demand);
    await this.syncConferenceCacheRepository.removeConferenciaFromSync(conferencia);
    await this.cacheRepository.deleteConference(demandaId, itemId);
  }
}