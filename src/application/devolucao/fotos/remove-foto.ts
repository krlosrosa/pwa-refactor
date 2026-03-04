
import type { IFotosDevolucaoCacheRepository } from "@/domain/repositories/cache/fotos-cache.interface";
import type { ISyncImagensCacheRepository } from "@/domain/repositories/cache/sync-imagens.interface";

export class RemoveFotoUseCase {
  constructor(
    private readonly fotosDevolucaoDatabase: IFotosDevolucaoCacheRepository,
    private readonly syncImagensRepository: ISyncImagensCacheRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.fotosDevolucaoDatabase.removeFotoById(id);
    await this.syncImagensRepository.deleteImagenFromSync(Number(id));
  }
}