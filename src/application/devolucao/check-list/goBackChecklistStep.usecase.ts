import type { IChecklistLocalRepository } from "@/domain/repositories/cache/Checklist-cache.interface";
import type { ChecklistStep } from "@/_shared/db/database-local";

const CHECKLIST_STEPS: ChecklistStep[] = [
  "BAU_FECHADO",
  "BAU_ABERTO",
  "TEMPERATURAS",
  "OBSERVAÇÕES",
  "VALIDACAO",
  "FINALIZADO",
];

export class GoBackChecklistStepUseCase {
  constructor(private checklistRepository: IChecklistLocalRepository) {}

  /**
   * Volta o checklist para a etapa anterior
   * @param demandId ID da demanda
   * @returns Checklist atualizado
   */
  async execute(demandId: string) {
    const checklist = await this.checklistRepository.getChekListByDemandId(demandId);
    if (!checklist) throw new Error("Checklist não encontrado");

    const currentIndex = CHECKLIST_STEPS.indexOf(checklist.currentStep);
    if (currentIndex <= 0) {
      // Já está na primeira etapa, não faz nada
      return checklist;
    }

    const previousStep = CHECKLIST_STEPS[currentIndex - 1];

    const updatedChecklist = await this.checklistRepository.updateChekListByDemandId(demandId, {
      currentStep: previousStep,
      updatedAt: Date.now(),
      synced: 'NOT_READY',
    });

    return updatedChecklist;
  }
}
