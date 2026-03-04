import type { IChecklistLocalRepository } from "@/domain/repositories/cache/Checklist-cache.interface";
import type { IFotosDevolucaoCacheRepository } from "@/domain/repositories/cache/fotos-cache.interface";
import type { IDevolucaoDemandCacheRepository } from "@/domain/repositories/cache/IDevolucao-cache.inteface";
import type { ISyncCheckListCacheRepository } from "@/domain/repositories/cache/sync-checklist.interface";

export class FinishProcessChecklistUseCase {
  constructor(
    private checklistRepository: IChecklistLocalRepository,
    private demandRepository: IDevolucaoDemandCacheRepository,
    private readonly fotosLocalRepository: IFotosDevolucaoCacheRepository,
    private readonly syncCheckListCacheRepository: ISyncCheckListCacheRepository,
  ) {}
  async execute(checklistId: string): Promise<void> {
    const checklist = await this.checklistRepository.getChekListByDemandId(checklistId);
    if (!checklist) {
      throw new Error('Checklist não encontrado');
    }
    await this.checklistRepository.updateChekListByDemandId(checklistId, {
      status: 'COMPLETED',
      currentStep: 'FINALIZADO',
      synced: 'READY_TO_SYNC',
    });

    const demand = await this.demandRepository.findDemandById(checklistId);
    if (!demand) {
      throw new Error('Demanda não encontrada');
    }
    await this.fotosLocalRepository.addFoto({
      demandId: checklistId,
      uuid: checklist.id.toString(),
      name: `bau-fechado-${demand.id}.webp`,
      processo: 'devolucao-check-list',
      status: 'local',
      localBlob: checklist.data.fotoBauFechado,
      operation: 'CREATE',
      sku: '',
    });

    await this.fotosLocalRepository.addFoto({
      demandId: checklistId,
      uuid: checklist.id.toString(),
      name: `bau-aberto-${demand.id}.webp`,
      processo: 'devolucao-check-list',
      status: 'local',
      localBlob: checklist.data.fotoBauAberto,
      operation: 'CREATE',
      sku: '',
    });

    demand.localProgress = 'CONFERENCE_DONE';
    await this.syncCheckListCacheRepository.addCheckListToSync(checklist);
    await this.demandRepository.saveDemand(demand);
  }
}