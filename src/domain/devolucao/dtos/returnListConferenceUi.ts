import type { ItensContabilDtoTipo } from "@/infra/_services/api/model";
import type { ChecklistSyncStatus } from "@/_shared/db/database-local";

export interface ReturnListConferenceUi {
  id: string;
  tipo_dev: 'DEVOLUCAO' | 'REENTREGA' | 'FISICO';
  sku: string;
  descricao: string;
  lote: string;
  caixasContabil: number;
  caixasFisico: number;
  unidadesContabil: number;
  unidadesFisico: number;
  demandaId: number;
  hasDivergence: boolean;
  hasAnomaly: boolean;
  isExtra: boolean;
  isChecked: boolean;
  tipo: ItensContabilDtoTipo;
  synced: ChecklistSyncStatus;
}

export interface ReturnListConferenceGroupedSku {
  tipo_dev: 'DEVOLUCAO' | 'REENTREGA' | 'FISICO';
  id: string;
  sku: string;
  descricao: string;
  lote: string;
  caixasContabil: number;
  caixasFisico: number;
  unidadesContabil: number;
  unidadesFisico: number;
  demandaId: number;
  tipo: ItensContabilDtoTipo;
}