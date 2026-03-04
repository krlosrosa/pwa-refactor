import type { IDevolucaoDemandCacheRepository } from "@/domain/repositories/cache/IDevolucao-cache.inteface";

export enum DemandFlowStep {
  START = 'start',
  CHECKLIST = 'checklist',
  CONFERENCE = 'conference',
  FINALIZATION = 'finalization',
}

export interface SelectDemandResult {
  nextStep: DemandFlowStep;
}

export class SelectDemandUseCase {
  constructor(
    private demandRepository: IDevolucaoDemandCacheRepository
  ) {}

  async execute(demandId: string): Promise<SelectDemandResult> {
    const demand = await this.demandRepository.findDemandById(demandId);

    if (!demand) {
      throw new Error('Demanda não encontrada');
    }

    if (demand.localProgress === 'NOT_STARTED') {
      return { nextStep: DemandFlowStep.START };
    }

    if (demand.localProgress === 'CHECKLIST_IN_PROGRESS') {
      return { nextStep: DemandFlowStep.CHECKLIST };
    }
    if (demand.localProgress === 'CHECKLIST_DONE' || demand.localProgress === 'CONFERENCE_IN_PROGRESS') {
      return { nextStep: DemandFlowStep.CONFERENCE };
    }

    return { nextStep: DemandFlowStep.FINALIZATION };
  }
}
