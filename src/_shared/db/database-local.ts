import type { DemandDtoStatus } from '@/infra/_services/api/model';
import Dexie, { type Table } from 'dexie';

export interface DemandLocalRecord {
  id: number;
  placa: string;
  motorista: string;
  idTransportadora?: string | null;
  telefone?: string;
  cargaSegregada?: boolean;
  quantidadePaletes?: number;
  doca?: string;
  centerId: string;
  adicionadoPorId: string;
  conferenteId?: string | null;
  senha: string;
  viagemId?: string | null;
  status: DemandDtoStatus;
  criadoEm: string;
  localProgress: LocalDemandProgress;
}

export interface DemandaConferenciaRecord {
  id?: number;
  uuid: string;
  sku: string;
  descricao: string;
  lote?: string;
  quantidadeCaixas?: number;
  quantidadeUnidades?: number;
  tipo_dev?: 'DEVOLUCAO' | 'REENTREGA';
  tipo: tipoContabilFisico;
  devolucaoNotasId?: string;
  demandaId: number;
  avariaCaixas?: number;
  avariaUnidades?: number;
  nota_id?: number;
  synced: ChecklistSyncStatus
}

export interface ChecklistData {
  fotoBauAberto?: File;
  fotoBauFechado?: File;
  temperaturaBau?: string;
  temperaturaProduto?: string;
  anomalias?: string;
}

export interface ChecklistRecord {
  id: number;
  demandaId: string;
  status: ChecklistStatus;
  currentStep: ChecklistStep;
  data: ChecklistData;
  createdAt: number;
  updatedAt: number;
  synced: ChecklistSyncStatus;
}

export interface ProdutoRecord {
    id?: number;
    codDum: string;
    codEan: string;
    sku: string;
    descricao: string;
    shelf: number;
    pesoLiquidoCaixa: string;
    pesoLiquidoUnidade: string;
    unPorCaixa: number;
    caixaPorPallet: number;
    segmento: string;
    empresa: string;
    criadoEm: string;
}

export interface AnomalyRecord {
  id?: number;
  itemId: string;
  uuid: string;
  demandaId: string;
  causa: string;
  natureza: string;
  tipo: string;
  sku: string;
  photos: File[];
  lote?: string; // Lote da conferência (copiado automaticamente)
  quantityBox?: number; // Quantidade em caixas (opcional)
  quantityUnit?: number; // Quantidade em unidades (opcional, pode usar quantity)
  description: string;
  createdAt: number;
  updatedAt: number;
  grouped?: boolean;
  type: 'ADD' | 'REMOVE';
  synced: ChecklistSyncStatus;
}

export class DemandLocalDatabase extends Dexie {
  demands!: Table<DemandLocalRecord, number>;
  checklists!: Table<ChecklistRecord, number>;
  conferences!: Table<DemandaConferenciaRecord, number>;
  produtos!: Table<ProdutoRecord, number>;
  anomalias!: Table<AnomalyRecord, number>;

  constructor() {
    super('DevolucaoPWA-Local');

    this.version(1).stores({
      demands: 'id, placa, motorista, idTransportadora, telefone, cargaSegregada, quantidadePaletes, doca, centerId, adicionadoPorId, conferenteId, senha, viagemId, status, criadoEm',
    });

    this.version(2).stores({
      demands: 'id, placa, motorista, idTransportadora, telefone, cargaSegregada, quantidadePaletes, doca, centerId, adicionadoPorId, conferenteId, senha, viagemId, status, criadoEm',
      checklists: 'id, demandaId, fotoBauAberto, fotoBauFechado, temperaturaBau, temperaturaProduto, anomalias, createdAt, updatedAt, synced',
      conferences: 'id++, uuid, descricao, lote, demandaId, quantidadeCaixas, quantidadeUnidades, tipo, sku, fabricacao, sif, devolucaoNotasId, tipoDevolucao, notaId, synced',
      produtos: 'id++, codDum, codEan, sku, descricao, shelf, pesoLiquidoCaixa, pesoLiquidoUnidade, unPorCaixa, caixaPorPallet, segmento, empresa, criadoEm',
      anomalias: 'id++, itemId, uuid, demandaId, sku, lote, quantity, quantityBox, quantityUnit, description, replicatedGroupId, createdAt, updatedAt, synced',
    });
  }
}

export type ChecklistStep =
  | 'BAU_FECHADO'
  | 'BAU_ABERTO'
  | 'TEMPERATURAS'
  | 'OBSERVAÇÕES'
  | 'VALIDACAO'
  | 'FINALIZADO';

export type ChecklistStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'COMPLETED';

  export type ChecklistSyncStatus = 
  | 'READY_TO_SYNC'    // Pronto para enviar para o servidor
  | 'SYNCED'           // Já enviado e confirmado
  | 'NOT_READY'        // Ainda não terminou o processo, não pode sincronizar

export type LocalDemandProgress =
  | 'NOT_STARTED'
  | 'CHECKLIST_IN_PROGRESS'
  | 'CHECKLIST_DONE'
  | 'CONFERENCE_IN_PROGRESS'
  | 'CONFERENCE_DONE'
  | 'HAS_UNSYNCED_DATA'
  | 'FINALIZED_LOCAL';

export type tipoDevolucao = 'RETORNO' | 'REENTREGA';
export type tipoContabilFisico = 'CONTABIL' | 'FISICO';