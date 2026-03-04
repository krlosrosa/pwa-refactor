
import type { ISyncCheckListCacheRepository } from "@/domain/repositories/cache/sync-checklist.interface";
import { addCheckListDevolucaoMobile } from "@/infra/_services/api/service/devolucao/devolucao";
export class SyncCheckListUseCase {

  constructor(
    private syncCheckListCacheRepository: ISyncCheckListCacheRepository,
  ) { }

  async execute(): Promise<void> {
    const checklists = (await this.syncCheckListCacheRepository.getCheckListsToSync()).filter(c => c.status !== 'syncing').sort((a, b) => a.createdAt - b.createdAt);

    for (const checklist of checklists) {
      await addCheckListDevolucaoMobile(checklist.payload.id!.toString(), {
        demandaId: checklist.payload.demandaId,
        temperaturaBau: checklist.payload.data.temperaturaBau ?? '',
        temperaturaProduto: checklist.payload.data.temperaturaProduto ?? '',
        anomalias: checklist.payload.data.anomalias,
      }).then(async () => {
        await this.syncCheckListCacheRepository.markCheckListAsSynced(checklist.id!);
      }).catch(async () => {
        await this.syncCheckListCacheRepository.markCheckListAsError(checklist.id!);
      });
    }
  }
}
