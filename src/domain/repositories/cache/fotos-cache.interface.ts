import type { FotosDevolucaoRepository } from "@/_shared/db/fotos.devolucao.repository";

export interface IFotosDevolucaoCacheRepository {
  getFotos(): Promise<FotosDevolucaoRepository[]>;
  addFoto(foto: FotosDevolucaoRepository): Promise<void>;
  removeFotoById(id: string): Promise<void>;
  getFotoById(id: string): Promise<FotosDevolucaoRepository | undefined>;
  getFotosByUuid(uuid: string): Promise<FotosDevolucaoRepository[]>;
  deleteFotosByUuid(uuid: string): Promise<void>;
  markFotoAsSynced(id: string): Promise<void>;
  markFotoAsError(id: string): Promise<void>;
  limparItensSincronizadoByDemandaId(demandaId: string): Promise<void>;
}