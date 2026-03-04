import { GoBackChecklistStepUseCase } from "@/application/devolucao/check-list/goBackChecklistStep.usecase";
import { ChecklistLocalRepository } from "@/infra/devolucao/check-list.local.repository";
import { makeLocalDb } from "../makeLocalDb";

export function makeGoBackChecklistStepUseCase() {
  const checklistLocalRepository = new ChecklistLocalRepository(makeLocalDb());
  return new GoBackChecklistStepUseCase(checklistLocalRepository);
}