import type { ChecklistRecord } from "@/_shared/db/database-local";
import type { IChecklistLocalRepository } from "@/domain/repositories/cache/Checklist-cache.interface";

export class GetChecklistProgressUseCase {
  constructor(
    private checklistLocalRepository: IChecklistLocalRepository
  ) {}

  async execute(demandId: string): Promise<ChecklistRecord | undefined> {
    const checklist = await this.checklistLocalRepository.getChekListByDemandId(demandId);
    if (!checklist) {
      return undefined;
    }
    return checklist;
  }
}