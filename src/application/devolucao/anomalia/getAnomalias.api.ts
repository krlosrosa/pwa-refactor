import type { IDevolucaoApiRepository } from "@/domain/repositories/api/IDevolucao-api.inteface";
import type { IAnomalyLocalRepository } from "@/domain/repositories/cache/anomalia-cache.interface";
import type { IConferenciaCacheRepository } from "@/domain/repositories/cache/conferencia-cache.interface";
import { v4 as uuidv4 } from 'uuid';
import type { GetFotosByDemandaAndProcessoUseCase } from "../fotos/get-fotos-by-uuid";

export class GetAnomaliasByApiUseCase {
  constructor(
    private anomalyRepository: IAnomalyLocalRepository,
    private conferenceRepository: IConferenciaCacheRepository,
    private api: IDevolucaoApiRepository,
    private fotos: GetFotosByDemandaAndProcessoUseCase,
  ) { }

  async execute(demandaId: string): Promise<void> {
    const getAnomaliasByApi = await this.api.getAnomaliasByDemandaId(demandaId);

    if (getAnomaliasByApi.length > 0) {
      await this.anomalyRepository.deleteAnomaliasByDemandaId(demandaId);
      for (const anomaly of getAnomaliasByApi) {
        const fotos = await this.fotos.execute(anomaly.uuid ?? '');
        const findConference = await this.conferenceRepository.findConferenceByDemandaSkuAndLote(
          demandaId,
          anomaly.sku,
          anomaly.lote ?? '',
        );
        if (findConference) {
          await this.anomalyRepository.saveAnomaly({
            ...anomaly,
            uuid: anomaly.uuid ?? uuidv4(),
            itemId: findConference.id?.toString() ?? '',
            demandaId: demandaId,
            sku: anomaly.sku,
            lote: anomaly.lote,
            quantityBox: anomaly.quantidadeCaixas,
            quantityUnit: anomaly.quantidadeUnidades,
            description: anomaly.descricao,
            tipo: anomaly.tipo ?? '',
            causa: anomaly.causa ?? '',
            photos: fotos.map(foto => new File([foto.url], foto.id)),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            synced: 'SYNCED',
            natureza: anomaly.natureza ?? '',
            type: 'ADD',
          });
        }
      }
    }
  }
}