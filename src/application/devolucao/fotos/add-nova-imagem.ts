import type { FotosDevolucaoRepository } from "@/_shared/db/fotos.devolucao.repository";
import type { IFotosDevolucaoCacheRepository } from "@/domain/repositories/cache/fotos-cache.interface";

export class AddNovaImagemUseCase {
  constructor(
    private readonly fotosDevolucaoDatabase: IFotosDevolucaoCacheRepository,
  ) {}

  async execute(foto: FotosDevolucaoRepository): Promise<void> {
    await this.fotosDevolucaoDatabase.addFoto(foto);
  }
}