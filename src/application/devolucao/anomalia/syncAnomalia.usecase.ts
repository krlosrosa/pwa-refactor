import type { SyncRecordAnomaly } from "@/_shared/db/sync.devolucao.repository";
import type { ISyncAnomaliaCacheRepository } from "@/domain/repositories/cache/sync-anomalia.interface";
import { addAnomaliaDevolucao, deleteAnomaliaDevolucao, type AddAnomaliaDevolucaoMutationBody } from "@/infra/_services/api/service/devolucao/devolucao";

export class SyncAnomaliaUseCase {

  constructor(
    private syncAnomaliaCacheRepository: ISyncAnomaliaCacheRepository,
  ) { }

  async execute(): Promise<void> {
    const anomalies = (await this.syncAnomaliaCacheRepository.getAnomaliesToSync()).filter(a => a.status !== 'syncing').sort((a, b) => a.createdAt - b.createdAt);
    for (const anomaly of anomalies) {
      if (anomaly.operation === 'CREATE') {
        await addAnomaliaDevolucao(mapAnomalyToAddAnomaliaDevolucao(anomaly)).then(async () => {
          await this.syncAnomaliaCacheRepository.markAnomalyAsSynced(anomaly.id!);
        }).catch(async () => {
          await this.syncAnomaliaCacheRepository.markAnomalyAsError(anomaly.id!);
        });
      } else if (anomaly.operation === 'DELETE') {
        await deleteAnomaliaDevolucao(anomaly.uuid).then(async () => {
          await this.syncAnomaliaCacheRepository.markAnomalyAsSynced(anomaly.id!);
        }).catch(async () => {
          await this.syncAnomaliaCacheRepository.markAnomalyAsError(anomaly.id!);
        });
      }
    }
  }
}

function mapAnomalyToAddAnomaliaDevolucao(anomaly: SyncRecordAnomaly): AddAnomaliaDevolucaoMutationBody {
  return {
    causa: anomaly.payload.description,
    descricao: anomaly.payload.description,
    demandaId: Number(anomaly.payload.demandaId),
    quantidadeCaixas: anomaly.payload.quantityBox ?? 0,
    quantidadeUnidades: anomaly.payload.quantityUnit ?? 0,
    uuid: anomaly.uuid,
    sku: anomaly.payload.sku,
    lote: anomaly.payload.lote ?? '',
    imagens: [],
    tipo: anomaly.payload.tipo,
    natureza: anomaly.payload.natureza,
  };
}