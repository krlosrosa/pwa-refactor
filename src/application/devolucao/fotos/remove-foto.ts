
import type { IFotosDevolucaoCacheRepository } from "@/domain/repositories/cache/fotos-cache.interface";
export class RemoveFotoUseCase {
  constructor(
    private readonly fotosDevolucaoDatabase: IFotosDevolucaoCacheRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.fotosDevolucaoDatabase.removeFotoById(id);
  }
}