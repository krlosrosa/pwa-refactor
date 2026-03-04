import type { IFotosDevolucaoCacheRepository } from "@/domain/repositories/cache/fotos-cache.interface";


export class GetFotosByDemandaAndProcessoUseCase {
  constructor(
    private readonly fotosDevolucaoDatabase: IFotosDevolucaoCacheRepository,
  ) {}

  async execute(uuid: string): Promise<{ id: string, url: string }[]> {
    const fotos = await this.fotosDevolucaoDatabase.getFotosByUuid(uuid);
    return fotos.map(foto => ({ id: foto.id!, url: foto.localBlob ? URL.createObjectURL(foto.localBlob) : '' }));
  }
}