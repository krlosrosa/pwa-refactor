import type { AnomalyRecord } from "@/_shared/db/database-local";
import type { IAnomalyLocalRepository } from "@/domain/repositories/cache/anomalia-cache.interface";
import type { IConferenciaCacheRepository } from "@/domain/repositories/cache/conferencia-cache.interface";
import type { IFotosDevolucaoCacheRepository } from "@/domain/repositories/cache/fotos-cache.interface";
import { v4 as uuidv4 } from 'uuid';

export class ReplicarAnomaliaUseCase {
  constructor(
    private readonly anomalyLocalRepository: IAnomalyLocalRepository,
    private readonly conferenceLocalRepository: IConferenciaCacheRepository,
    private readonly fotosLocalRepository: IFotosDevolucaoCacheRepository,
  ) { }

  async execute(anomaly: Omit<AnomalyRecord, 'id' | 'createdAt' | 'updatedAt' | 'synced' | 'sku' | 'lote' | 'type' | 'uuid' >): Promise<void> {
    const itensConferente = await this.conferenceLocalRepository.getConferencesByDemandId(anomaly.demandaId);
    const filterItensFisicos = itensConferente.filter(item => item.tipo === 'FISICO');
    for (const item of filterItensFisicos) {
      const anomaliasItens = await this.anomalyLocalRepository.loadAnomaliesByItemAndDemanda(item.id!.toString(), anomaly.demandaId);
      console.log('Anomalias itens', anomaliasItens);
      console.log('Item', item);
      const somaCaixas = anomaliasItens.reduce((acc, anomaly) => acc + (anomaly.quantityBox ?? 0) || 0, 0);
      const somaUnidades = anomaliasItens.reduce((acc, anomaly) => acc + (anomaly.quantityUnit ?? 0) || 0, 0);
      const saldoCaixas = (item.quantidadeCaixas ?? 0) - somaCaixas;
      const saldoUnidades = (item.quantidadeUnidades ?? 0) - somaUnidades;
      const  uuid = uuidv4();
      const saldoValido =
        saldoCaixas >= 0 &&
        saldoUnidades >= 0 &&
        (saldoCaixas > 0 || saldoUnidades > 0);
      if (saldoValido) {
        await this.anomalyLocalRepository.saveAnomaly({
          ...anomaly,
          itemId: item.id!.toString(),
          uuid,
          lote: item.lote,
          sku: item.sku,
          grouped: true,
          quantityBox: anomaly.itemId === item.id!.toString() ? anomaly.quantityBox : saldoCaixas,
          quantityUnit: anomaly.itemId === item.id!.toString() ? anomaly.quantityUnit : saldoUnidades,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          synced: 'READY_TO_SYNC',
          type: 'ADD',
        });
      }
      for (const photo of anomaly.photos) {
        await this.fotosLocalRepository.addFoto({
          demandId: anomaly.demandaId,
          localBlob: photo,
          name: photo.name,
          uuid: uuid,
          processo: 'devolucao-anomalias',
          status: 'local',
          operation: 'CREATE',
          sku: item.sku,
        });
      }
    }
  }
}