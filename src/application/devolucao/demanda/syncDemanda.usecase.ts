import type { ISyncDemandCacheRepository } from "@/domain/repositories/cache/sync-demanda.interface";
import { finalizarDemandaDevolucaoMobile, startDemandaDevolucaoMobile } from "@/infra/_services/api/service/devolucao/devolucao";
import type { LimparItensSincronizadoUseCase } from "./limpar-itens-sincronizado.usecase";

export class SyncDemandaUseCase {

  constructor(
    private syncDemandCacheRepository: ISyncDemandCacheRepository,
    private limparItensSincronizadoUseCase: LimparItensSincronizadoUseCase,
  ) { }

  async execute(): Promise<void> {
    const demands = (await this.syncDemandCacheRepository.getDemandsToSync()).filter(d => d.status !== 'syncing').sort((a, b) => a.createdAt - b.createdAt);

    for (const demand of demands) {
      if (demand.operation === 'CREATE') {
        await startDemandaDevolucaoMobile(demand.payload.id!.toString(), demand.payload.doca ?? '').then(async () => {
          await this.syncDemandCacheRepository.markDemandAsSynced(demand.id!);
        }).catch(async () => {
          await this.syncDemandCacheRepository.markDemandAsError(demand.id!);
        });
      }
      if (demand.operation === 'UPDATE') {
        await finalizarDemandaDevolucaoMobile(demand.payload.id!.toString()).then(async () => {
          if(demand.payload.status === 'CONFERENCIA_FINALIZADA') {
            await this.syncDemandCacheRepository.markDemandAsSynced(demand.id!);
            await this.limparItensSincronizadoUseCase.execute(demand.payload.id!.toString());
          }
        }).catch(async () => {
          await this.syncDemandCacheRepository.markDemandAsError(demand.id!);
        });
      }
    }
  }
}
