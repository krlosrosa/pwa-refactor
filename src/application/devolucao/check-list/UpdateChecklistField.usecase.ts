import type { ChecklistData, ChecklistRecord } from "@/_shared/db/database-local";
import type { IChecklistLocalRepository } from "@/domain/repositories/cache/Checklist-cache.interface";

interface UpdateChecklistFieldInput {
  demandId: string;
  field: keyof ChecklistData;
  value: unknown;
}

export class UpdateChecklistFieldUseCase {
  constructor(
    private checklistRepository: IChecklistLocalRepository
  ) {}

  async execute(input: UpdateChecklistFieldInput): Promise<ChecklistRecord> {
    const { demandId, field, value } = input;

    const checklist = await this.checklistRepository.getChekListByDemandId(demandId);
    console.log({ checklist, demandId });
    if (!checklist) {
      throw new Error('Checklist não encontrado');
    }

    const updatedData = {
      ...checklist.data,
      [field]: value,
    };

    return this.checklistRepository.updateChekListByDemandId(demandId, {
      data: updatedData,
      updatedAt: Date.now(),
      synced: 'NOT_READY',
    });
  }
}