import { AdvanceChecklistStepUseCase } from "@/application/devolucao/check-list/advanceChecklistStep.usecase";
import { ChecklistLocalRepository } from "@/infra/devolucao/check-list.local.repository";
import { makeLocalDb } from "../makeLocalDb";

export function makeAdvanceChecklistStepUseCase() {
  const checklistLocalRepository = new ChecklistLocalRepository(makeLocalDb());
  return new AdvanceChecklistStepUseCase(checklistLocalRepository);
}