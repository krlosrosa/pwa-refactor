import type { IConferenciaCacheRepository } from "@/domain/repositories/cache/conferencia-cache.interface";
import type { DemandaConferenciaRecord, DemandLocalDatabase } from "@/_shared/db/database-local";

export class ConferenciaLocalRepository implements IConferenciaCacheRepository {
  constructor(
    private localDb: DemandLocalDatabase,
  ) {}
  async saveConferences(conferences: DemandaConferenciaRecord[]): Promise<void> {
    await this.localDb.conferences.bulkAdd(conferences);
  }
  async getConferencesByDemandId(demandId: string): Promise<DemandaConferenciaRecord[]> {
    return await this.localDb.conferences.where('demandaId').equals(Number(demandId)).toArray();
  }
  async addConference(conference: DemandaConferenciaRecord): Promise<void> {
    await this.localDb.conferences.add(conference);
  }

  async getItemById(demandaId: string, itemId: string): Promise<DemandaConferenciaRecord | undefined> {
    return await this.localDb.conferences.where('id').equals(Number(itemId)).and(c => c.demandaId === Number(demandaId)).first();
  }
  async deleteConference(demandaId: string, itemId: string): Promise<void> {
    await this.localDb.conferences.where('id').equals(Number(itemId)).and(c => c.demandaId === Number(demandaId)).delete();
  }
  async updateConference(conference: DemandaConferenciaRecord): Promise<void> {
    await this.localDb.conferences.update(conference.id!, conference);
  }

  async findConferenceByDemandaSkuAndLote(demandaId: string, sku: string, lote: string): Promise<DemandaConferenciaRecord | undefined> {
    return await this.localDb.conferences.where('demandaId').equals(Number(demandaId)).and(c => c.sku === sku && c.lote === lote && c.tipo === 'FISICO').first();
  }

  async limparItensSincronizadoByDemandaId(demandaId: string): Promise<void> {
    const items = await this.localDb.conferences.toArray();
    const toDelete = items.filter(
      a => a.demandaId === Number(demandaId)
    );
    await this.localDb.conferences.bulkDelete(toDelete.map(i => i.id!));
  }
}