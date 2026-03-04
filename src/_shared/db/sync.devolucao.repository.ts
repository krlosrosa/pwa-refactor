import Dexie, { type Table } from "dexie";
import type { AnomalyRecord, ChecklistRecord, DemandaConferenciaRecord, DemandLocalRecord } from "./database-local";
import type { FotosDevolucaoRepository } from "./fotos.devolucao.repository";

export interface SyncRecordAnomaly extends SyncRecordBase {
  payload: AnomalyRecord
}

export interface CheckListSyncRecord extends SyncRecordBase {
  payload: ChecklistRecord
}

export interface ConferenceSyncRecord extends SyncRecordBase {
  payload: DemandaConferenciaRecord
}

export interface DemandSyncRecord extends SyncRecordBase {
  payload: DemandLocalRecord
}

export interface FinishPhotoSyncRecord extends SyncRecordBase {
  payload: FotosDevolucaoRepository
}

export class SyncDevolucaoDatabase extends Dexie {
  anomaliesSyncs!: Table<SyncRecordAnomaly, number>;
  checklistsSyncs!: Table<CheckListSyncRecord, number>;
  conferencesSyncs!: Table<ConferenceSyncRecord, number>;
  demandsSyncs!: Table<DemandSyncRecord, number>;
  finishPhotosSyncs!: Table<FinishPhotoSyncRecord, number>;

  constructor() {
    super('Devolucao-Sync-Database');
    this.version(1).stores({
      anomaliesSyncs: '++id, uuid, operation, payload, createdAt, status, retryCount',
    });
    this.version(2).stores({
      anomaliesSyncs: '++id, uuid, operation, payload, createdAt, status, retryCount',
      checklistsSyncs: '++id, uuid, operation, payload, createdAt, status, retryCount',
      conferencesSyncs: '++id, uuid, operation, payload, createdAt, status, retryCount',
      demandsSyncs: '++id, uuid, operation, payload, createdAt, status, retryCount',
      finishPhotosSyncs: '++id, uuid, operation, payload, createdAt, status, retryCount',
    });
  }
}

export type OperationType =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'

export type StatusType =
  | 'pending'
  | 'syncing'
  | 'error'


  export interface SyncRecordBase {
    id?: number;
    uuid: string;
    operation: OperationType
    createdAt: number
    status: StatusType
    retryCount: number
  }