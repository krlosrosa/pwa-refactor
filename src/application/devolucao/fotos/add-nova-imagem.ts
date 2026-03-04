import type { FotosDevolucaoRepository } from "@/_shared/db/fotos.devolucao.repository";
import type { IFotosDevolucaoCacheRepository } from "@/domain/repositories/cache/fotos-cache.interface";
import type { ISyncImagensCacheRepository } from "@/domain/repositories/cache/sync-imagens.interface";

export class AddNovaImagemUseCase {
  constructor(
    private readonly fotosDevolucaoDatabase: IFotosDevolucaoCacheRepository,
    private readonly syncImagensRepository: ISyncImagensCacheRepository,
  ) {}

  async execute(foto: FotosDevolucaoRepository): Promise<void> {
    await this.fotosDevolucaoDatabase.addFoto(foto);
    await this.syncImagensRepository.addImagenToSync(foto);
  }
}