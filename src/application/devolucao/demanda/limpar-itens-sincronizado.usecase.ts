import type { IAnomalyLocalRepository } from "@/domain/repositories/cache/anomalia-cache.interface";
import type { IChecklistLocalRepository } from "@/domain/repositories/cache/Checklist-cache.interface";
import type { IConferenciaCacheRepository } from "@/domain/repositories/cache/conferencia-cache.interface";
import type { IFotosDevolucaoCacheRepository } from "@/domain/repositories/cache/fotos-cache.interface";
import type { IDevolucaoDemandCacheRepository } from "@/domain/repositories/cache/IDevolucao-cache.inteface";
import type { ISyncAnomaliaCacheRepository } from "@/domain/repositories/cache/sync-anomalia.interface";
import type { ISyncCheckListCacheRepository } from "@/domain/repositories/cache/sync-checklist.interface";
import type { ISyncConferenciaCacheRepository } from "@/domain/repositories/cache/sync-conferencia.interface";
import type { ISyncDemandCacheRepository } from "@/domain/repositories/cache/sync-demanda.interface";

export class LimparItensSincronizadoUseCase {
  constructor(
    private syncCheckListCacheRepository: ISyncCheckListCacheRepository,
    private syncAnomaliaCacheRepository: ISyncAnomaliaCacheRepository,
    private syncConferenciaCacheRepository: ISyncConferenciaCacheRepository,
    private syncDemandaCacheRepository: ISyncDemandCacheRepository,
    private syncImagemCacheRepository: IFotosDevolucaoCacheRepository,
    private checklistCacheRepository: IChecklistLocalRepository,
    private conferenciaCacheRepository: IConferenciaCacheRepository,
    private demandaCacheRepository: IDevolucaoDemandCacheRepository,
    private anomalyCacheRepository: IAnomalyLocalRepository,
  ) {}

  async execute(demandaId: string): Promise<void> {
    try {
    await this.syncCheckListCacheRepository.limparItensSincronizadoByDemandaId(demandaId);
    await this.syncAnomaliaCacheRepository.limparItensSincronizadoByDemandaId(demandaId);
    await this.syncConferenciaCacheRepository.limparItensSincronizadoByDemandaId(demandaId);
    await this.syncDemandaCacheRepository.limparItensSincronizadoByDemandaId(demandaId);
    await this.syncImagemCacheRepository.limparItensSincronizadoByDemandaId(demandaId);
    await this.checklistCacheRepository.limparItensSincronizadoByDemandaId(demandaId);
    await this.conferenciaCacheRepository.limparItensSincronizadoByDemandaId(demandaId);
    await this.demandaCacheRepository.limparItensSincronizadoByDemandaId(demandaId);
    await this.anomalyCacheRepository.limparItensSincronizadoByDemandaId(demandaId);
    await this.demandaCacheRepository.deleteDemandById(demandaId);
  } catch (error) {
    console.error('Erro ao limpar itens sincronizados:', error);
  }
  }
}