import type { IAnomalyLocalRepository } from "@/domain/repositories/cache/anomalia-cache.interface";
import type { IFotosDevolucaoCacheRepository } from "@/domain/repositories/cache/fotos-cache.interface";
import type { ISyncAnomaliaCacheRepository } from "@/domain/repositories/cache/sync-anomalia.interface";

export class RemoveAnomaliaUseCase {
  constructor(
    private readonly anomalyLocalRepository: IAnomalyLocalRepository,
    private readonly syncAnomaliaCacheRepository: ISyncAnomaliaCacheRepository,
    private readonly fotosLocalRepository: IFotosDevolucaoCacheRepository,
  ) {}
  async execute(anomalyId: string): Promise<void> {
    console.log('RemoveAnomaliaUseCase', anomalyId);
    const anomaly = await this.anomalyLocalRepository.getAnomalyById(anomalyId);
    if(!anomaly) {
      throw new Error('Anomaly not found');
    }
    await this.anomalyLocalRepository.deleteAnomaly(anomalyId);
    await this.fotosLocalRepository.deleteFotosByUuid(anomaly.uuid ?? '');
    await this.syncAnomaliaCacheRepository.removeAnomalyFromSync(anomaly);
  }
}