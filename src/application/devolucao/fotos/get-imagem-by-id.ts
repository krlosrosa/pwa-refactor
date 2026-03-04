import type { IFotosDevolucaoCacheRepository } from "@/domain/repositories/cache/fotos-cache.interface";

export class GetImagemByIdUseCase {
  constructor(
    private readonly fotosDevolucaoDatabase: IFotosDevolucaoCacheRepository,
  ) {}

  async execute(id: string): Promise<string | undefined> {
    const image = await this.fotosDevolucaoDatabase.getFotoById(id);
    if (!image) return undefined;
    if (image.localBlob) {
      return URL.createObjectURL(image.localBlob);
    } else {
      '';
    }
  }
}