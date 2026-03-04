import type { FotosDevolucaoDatabase, FotosDevolucaoRepository } from "@/_shared/db/fotos.devolucao.repository";
import type { IFotosDevolucaoCacheRepository } from "@/domain/repositories/cache/fotos-cache.interface";

export class ImagensCacheRepository implements IFotosDevolucaoCacheRepository {
  constructor(
    private readonly fotosDevolucaoDatabase: FotosDevolucaoDatabase,
  ) { }

  async addFoto(foto: FotosDevolucaoRepository): Promise<void> {
    await this.fotosDevolucaoDatabase.fotosDevolucao.add(foto);
  }

  async getFotos(): Promise<FotosDevolucaoRepository[]> {
    return this.fotosDevolucaoDatabase.fotosDevolucao.toArray();
  }

  async removeFotoById(id: string): Promise<void> {
    await this.fotosDevolucaoDatabase.fotosDevolucao.where('id').equals(id).delete();
  }
  
  async getFotoById(id: string): Promise<FotosDevolucaoRepository | undefined> {
    return this.fotosDevolucaoDatabase.fotosDevolucao.where('id').equals(id).first();
  }

  async getFotosByUuid(uuid: string): Promise<FotosDevolucaoRepository[]> {
    return this.fotosDevolucaoDatabase.fotosDevolucao.where('uuid').equals(uuid).toArray();
  }

  async deleteFotosByUuid(uuid: string): Promise<void> {
    await this.fotosDevolucaoDatabase.fotosDevolucao.where('uuid').equals(uuid).delete();
  }

  async markFotoAsSynced(id: string): Promise<void> {
    await this.fotosDevolucaoDatabase.fotosDevolucao.update(Number(id), { status: 'synced' });
  }

  async markFotoAsError(id: string): Promise<void> {
    await this.fotosDevolucaoDatabase.fotosDevolucao.update(Number(id), { status: 'pendingUpload' });
  }

  async limparItensSincronizadoByDemandaId(demandaId: string): Promise<void> {
    const items = await this.fotosDevolucaoDatabase.fotosDevolucao.toArray();
    const toDelete = items.filter(
      a => a.demandId === demandaId && a.status === 'synced'
    );
    await this.fotosDevolucaoDatabase.fotosDevolucao.bulkDelete(toDelete.map(i => Number(i.id)));
  }
}