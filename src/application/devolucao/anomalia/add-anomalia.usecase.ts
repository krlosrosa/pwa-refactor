import type { AnomalyRecord } from "@/_shared/db/database-local";
import type { IAnomalyLocalRepository } from "@/domain/repositories/cache/anomalia-cache.interface";
import type { IConferenciaCacheRepository } from "@/domain/repositories/cache/conferencia-cache.interface";
import type { IFotosDevolucaoCacheRepository } from "@/domain/repositories/cache/fotos-cache.interface";
import type { ISyncAnomaliaCacheRepository } from "@/domain/repositories/cache/sync-anomalia.interface";
import { v4 as uuidv4 } from 'uuid';

export class AddAnomaliaUseCase {
  constructor(
    private readonly anomalyLocalRepository: IAnomalyLocalRepository,
    private readonly conferenceLocalRepository: IConferenciaCacheRepository,
    private readonly syncAnomaliaCacheRepository: ISyncAnomaliaCacheRepository,
    private readonly fotosLocalRepository: IFotosDevolucaoCacheRepository,
  ) {}

  async execute(anomaly: Omit<AnomalyRecord, 'id' | 'createdAt' | 'updatedAt' | 'synced' | 'sku' | 'lote' | 'type' | 'uuid' >): Promise<void> {
    const conference = await this.conferenceLocalRepository.getItemById(anomaly.demandaId, anomaly.itemId);
    if(!conference) {
      throw new Error('Conference not found');
    }

    const uuid = uuidv4();

    const anomalyRecord: AnomalyRecord = {
      ...anomaly,
      uuid: uuid,
      lote: conference.lote, 
      sku: conference.sku ,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      synced: 'READY_TO_SYNC',
      type: 'ADD',
    };
    await this.anomalyLocalRepository.saveAnomaly(anomalyRecord);
    for (const photo of anomaly.photos) {
      await this.fotosLocalRepository.addFoto({
        name: photo.name,
        demandId: anomaly.demandaId,
        processo: 'devolucao-anomalias',
        localBlob: photo,
        status: 'local',
        uuid: uuid,
        operation: 'CREATE',
        sku: conference.sku,
      });
    }
    await this.syncAnomaliaCacheRepository.addAnomalyToSync(anomalyRecord);
  }
}