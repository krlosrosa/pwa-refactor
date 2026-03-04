import type { DemandaConferenciaRecord } from "@/_shared/db/database-local";
import type { IConferenciaCacheRepository } from "@/domain/repositories/cache/conferencia-cache.interface";
import type { IDevolucaoDemandCacheRepository } from "@/domain/repositories/cache/IDevolucao-cache.inteface";
import type { ISyncConferenciaCacheRepository } from "@/domain/repositories/cache/sync-conferencia.interface";
import { v4 as uuidv4 } from 'uuid';

export class AddConferenceUseCase {
  constructor(
    private cacheRepository: IConferenciaCacheRepository,
    private demandRepository: IDevolucaoDemandCacheRepository,
    private syncConferenceCacheRepository: ISyncConferenciaCacheRepository
  ) {}

  async execute(demandaId: string, conference: Omit<DemandaConferenciaRecord, 'createdAt' | 'updatedAt' | 'uuid'>): Promise<void> {

    if(conference.id) {
      const existingItem = await this.cacheRepository.getItemById(demandaId, conference.id?.toString() ?? '');
      if(existingItem && conference.tipo === 'FISICO') {
        await this.cacheRepository.updateConference({
          ...existingItem,
          ...conference,
          synced: 'NOT_READY'
        });
        await this.syncConferenceCacheRepository.updateConferenciaToSync({
          ...existingItem,
          ...conference,
          synced: 'NOT_READY'
        });
        return;
      }
    }

    const demand = await this.demandRepository.findDemandById(demandaId);
    if(!demand) {
      throw new Error('Demanda não encontrada');
    }

    demand.localProgress = 'CONFERENCE_IN_PROGRESS';
    await this.demandRepository.saveDemand(demand);
    const uuid= uuidv4();

    const dataConferencia = {
      ...conference, 
      demandaId: Number(demandaId), 
      uuid,
      descricao: conference.descricao,
      synced: 'NOT_READY'
    } as DemandaConferenciaRecord;

    await this.syncConferenceCacheRepository.addConferenciaToSync(dataConferencia);
    return await this.cacheRepository.addConference(dataConferencia);
  }
}
