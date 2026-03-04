import type { ChecklistRecord, ChecklistStep } from '@/_shared/db/database-local';
import type { IChecklistLocalRepository } from '@/domain/repositories/cache/Checklist-cache.interface';

export class AdvanceChecklistStepUseCase {
  constructor(
    private checklistRepository: IChecklistLocalRepository
  ) {}

  async execute(checklistId: string): Promise<ChecklistRecord> {
    const checklist = await this.checklistRepository.getChekListByDemandId(checklistId);

    if (!checklist) {
      throw new Error('Checklist não encontrado');
    }

    this.validateStep(checklist);

    const nextStep = this.getNextStep(checklist.currentStep);

    const updatedChecklist: ChecklistRecord = {
      ...checklist,
      currentStep: nextStep,
      status: nextStep === 'FINALIZADO' ? 'COMPLETED' : 'IN_PROGRESS',
      updatedAt: Date.now(),
      synced: 'NOT_READY',
    };

    await this.checklistRepository.updateChekListByDemandId(checklist.demandaId, updatedChecklist);

    return updatedChecklist;
  }

  // 🔐 valida se pode avançar
  private validateStep(checklist: ChecklistRecord) {
    const { currentStep, data } = checklist;

    switch (currentStep) {
      case 'BAU_FECHADO':
        break;

      case 'BAU_ABERTO':
        if (!data.fotoBauAberto) {
          throw new Error('Foto do baú aberto é obrigatória');
        }
        break;

      case 'TEMPERATURAS':
        if (!data.temperaturaBau || !data.temperaturaProduto) {
          throw new Error('Temperaturas são obrigatórias');
        }
        break;

      case 'OBSERVAÇÕES':
        // opcional
        break;
      case 'VALIDACAO':
        break;

      case 'FINALIZADO':
        throw new Error('Checklist já finalizado');
    }
  }

  // 🧭 define o próximo passo
  private getNextStep(current: ChecklistStep): ChecklistStep {
    const flow: ChecklistStep[] = [
      'BAU_FECHADO',
      'BAU_ABERTO',
      'TEMPERATURAS',
      'OBSERVAÇÕES',
      'VALIDACAO',
      'FINALIZADO',
    ];

    const index = flow.indexOf(current);

    return flow[index + 1] ?? 'FINALIZADO';
  }
}
