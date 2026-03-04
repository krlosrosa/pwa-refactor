import type { DemandaConferenciaRecord } from "@/_shared/db/database-local";
import type { IConferenciaCacheRepository } from "@/domain/repositories/cache/conferencia-cache.interface";

export class GetItemConferenceUseCase {
  constructor(
    private cacheRepository: IConferenciaCacheRepository
  ) { }

  async execute(demandaId: string, itemId: string): Promise<DemandaConferenciaRecord | undefined> {
    const item = await this.cacheRepository.getItemById(demandaId, itemId);
    return item;
  }
}