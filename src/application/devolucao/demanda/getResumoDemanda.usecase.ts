import type { ResumoDemandaDto } from "@/domain/devolucao/dtos/resumoDemanda.dto";
import type { IAnomalyLocalRepository } from "@/domain/repositories/cache/anomalia-cache.interface";
import type { IConferenciaCacheRepository } from "@/domain/repositories/cache/conferencia-cache.interface";
import { mapperItemToViewUi } from "../utils/mapperItemToViewUi";
import type { ReturnListConferenceUi } from "@/domain/devolucao/dtos/returnListConferenceUi";
import { retornarQuantidadePorTipo } from "../utils/retornarQuantidadePorTipo";

export class GetResumoDemandaUseCase {
  constructor(
    private cacheRepository: IConferenciaCacheRepository,
    private anomalyLocalRepository: IAnomalyLocalRepository
  ) { }

  async execute(demandId: string): Promise<ResumoDemandaDto> {
    const conferences = await this.cacheRepository.getConferencesByDemandId(demandId);
    const itensMapped = mapperItemToViewUi(conferences);
    const seen = new Set<string>();
    const itensUi: ReturnListConferenceUi[] = [];
    for (const item of itensMapped) {
      const hasConferences = conferences.filter(c => c.sku === item.sku && c.tipo === 'FISICO');
      const hasExtra = conferences.filter(c => c.sku === item.sku && c.tipo === 'CONTABIL');
      const anomalies = await this.anomalyLocalRepository.loadAnomaliesByItemAndDemanda(item.id, demandId);

      const { caixas: caixasFisico, unidades: unidadesFisico } = retornarQuantidadePorTipo(
        conferences,
        item.sku,
        "FISICO"
      );

      const { caixas: caixasContabil, unidades: unidadesContabil } = retornarQuantidadePorTipo(
        conferences,
        item.sku,
        "CONTABIL"
      );

      if (item.tipo === 'CONTABIL' && hasConferences.length > 0) continue;
      if (seen.has(item.sku + item.lote)) continue;
      seen.add(item.sku + item.lote);
      itensUi.push({
        ...item,
        hasDivergence: (caixasContabil !== caixasFisico || unidadesContabil !== unidadesFisico) && item.tipo === 'FISICO',
        hasAnomaly: anomalies.length > 0,
        isExtra: hasExtra.length === 0 && item.tipo === 'FISICO',
        isChecked: item.tipo === 'FISICO',
        synced: 'NOT_READY',
        tipo_dev: item.tipo_dev ?? 'DEVOLUCAO',
      });
    }

    return {
      totalItens: itensUi.length,
      itensConferidos: itensUi.filter(item => item.isChecked).length,
      ItenPendentes: itensUi.filter(item => !item.isChecked).length,
      ItensComAnomalias: itensUi.filter(item => item.hasAnomaly).length,
      divergencias: itensUi.filter(item => item.hasDivergence),
      itensNaoConferidos: itensUi.filter(item => !item.isChecked),
    }
  }
}