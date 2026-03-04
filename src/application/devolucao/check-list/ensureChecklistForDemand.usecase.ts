import type { ChecklistRecord } from "@/_shared/db/database-local";
import type { IChecklistLocalRepository } from "@/domain/repositories/cache/Checklist-cache.interface";

export class EnsureChecklistForDemandUseCase {
  constructor(
    private checklistLocalRepository: IChecklistLocalRepository
  ) {}

  async execute(demandId: string): Promise<ChecklistRecord> {
    const existing = await this.checklistLocalRepository.getChekListByDemandId(demandId);

    if (existing) {
      return existing;
    }

    const checklist: ChecklistRecord = {
      id: Number(demandId),
      demandaId: demandId,
      status: 'NOT_STARTED',
      currentStep: 'BAU_FECHADO',
      data: {},
      createdAt: Date.now(),
      updatedAt: Date.now(),
      synced: 'NOT_READY',
    };
    await this.checklistLocalRepository.saveChecklist(checklist);
    return checklist;
  }
}