import type { ISyncImagensCacheRepository } from "@/domain/repositories/cache/sync-imagens.interface";

export class SyncImagensDemandaUseCase {

  constructor(
    private syncImagensCacheRepository: ISyncImagensCacheRepository,
  ) { }

  async execute(): Promise<void> {
    const demands = (await this.syncImagensCacheRepository.getFinishPhotosToSync()).filter(d => d.status !== 'syncing').sort((a, b) => a.createdAt - b.createdAt);
  
    for (const demand of demands) {
      if (demand.operation === 'CREATE') {
        
      }
  }
}
}

