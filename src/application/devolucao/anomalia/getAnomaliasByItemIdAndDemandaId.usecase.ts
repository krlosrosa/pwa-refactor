import type { AnomalyRecord } from "@/_shared/db/database-local";
import type { IAnomalyLocalRepository } from "@/domain/repositories/cache/anomalia-cache.interface";

export class GetAnomaliasByItemIdAndDemandaIdUseCase {
  constructor(private readonly anomalyLocalRepository: IAnomalyLocalRepository) {}

  async execute(itemId: string, demandaId: string): Promise<AnomalyRecord[]> {
    return this.anomalyLocalRepository.loadAnomaliesByItemAndDemanda(itemId, demandaId);
  }
}