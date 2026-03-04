import type { DemandaConferenciaRecord } from "@/_shared/db/database-local";
import type { ReturnListConferenceGroupedSku } from "@/domain/devolucao/dtos/returnListConferenceUi";

export function mapperItemToViewUi(items: DemandaConferenciaRecord[]): ReturnListConferenceGroupedSku[] {
  return items.map((item) => {
    return {
      caixasContabil: item.tipo === 'CONTABIL' ? item.quantidadeCaixas ?? 0 : 0,
      caixasFisico: item.tipo === 'FISICO' ? item.quantidadeCaixas ?? 0 : 0,
      unidadesContabil: item.tipo === 'CONTABIL' ? item.quantidadeUnidades ?? 0 : 0,
      unidadesFisico: item.tipo === 'FISICO' ? item.quantidadeUnidades ?? 0 : 0,
      descricao: item.descricao,
      sku: item.sku,
      tipo_dev: item.tipo_dev ?? 'DEVOLUCAO',
      demandaId: item.demandaId,
      id: item.id?.toString() ?? '',
      lote: item.lote ?? '',
      tipo: item.tipo,
    }
  }) 
}