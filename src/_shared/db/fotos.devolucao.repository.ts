import Dexie, { type Table } from 'dexie'

export interface FotosDevolucaoRepository {
  id?: string
  name: string
  uuid: string
  sku: string
  demandId: string
  processo: TipoProcesso
  localBlob?: File
  remoteKey?: string
  status: Status
  operation: OperationType
}

type Status = 'local' | 'pendingUpload' | 'synced'
export type TipoProcesso = 'devolucao-check-list' | 'devolucao-anomalias' | 'devolucao-fim'
export type OperationType =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'

export class FotosDevolucaoDatabase extends Dexie {
  fotosDevolucao!: Table<FotosDevolucaoRepository, number>;

  constructor() {
    super('FotosDevolucao');
    this.version(1).stores({
      fotosDevolucao: '++id, demandId, localBlob, remoteKey, status, uuid, operation, sku',
    });
  }
}