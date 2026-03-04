import type { FotosDevolucaoRepository } from "@/_shared/db/fotos.devolucao.repository";
import type { FinishPhotoSyncRecord } from "@/_shared/db/sync.devolucao.repository";

export interface ISyncImagensCacheRepository {
  addImagenToSync(imagen: FotosDevolucaoRepository): Promise<void>;
  updateImagenToSync(imagen: FotosDevolucaoRepository): Promise<void>;
  getFinishPhotosToSync(): Promise<FinishPhotoSyncRecord[]>;
  markImagenAsSynced(id: number): Promise<void>;
  markImagenAsError(id: number): Promise<void>;
  deleteImagenFromSync(id: number): Promise<void>;
  limparItensSincronizadoByDemandaId(demandaId: string): Promise<void>;
}