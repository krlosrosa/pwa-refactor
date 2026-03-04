import type { DemandaConferenciaRecord } from "@/_shared/db/database-local";
import type { IDevolucaoApiRepository } from "@/domain/repositories/api/IDevolucao-api.inteface";
import type { IConferenciaCacheRepository } from "@/domain/repositories/cache/conferencia-cache.interface";

export class LoadAndPrepareDemandUseCase {
  constructor(
    private apiRepository: IDevolucaoApiRepository,
    private cacheRepository: IConferenciaCacheRepository
  ) {}

  async execute(demandId: string): Promise<DemandaConferenciaRecord[]> {
    const demand = await this.apiRepository.findConferencesByDemandId(demandId);
    if (!demand) {
      throw new Error('Demanda não encontrada');
    }

    const conferences: DemandaConferenciaRecord[] = demand.map(item => ({
      ...item,
      uuid: crypto.randomUUID(),
      quantidadeUnidades: item.quantidadeUnidades ?? 0,
      tipo_dev: item.tipoDevolucao as 'DEVOLUCAO' | 'REENTREGA',
      quantidadeCaixas: item.quantidadeCaixas ?? 0,
      synced: 'NOT_READY',
    }));
    const hasItems = await this.cacheRepository.getConferencesByDemandId(demandId);
    if (hasItems.length > 0) {
      return conferences;
    }
    await this.cacheRepository.saveConferences(conferences);
    return conferences;
  }
}