import { GetChecklistProgressUseCase } from "@/application/devolucao/check-list/get-checklist-progress.usecase";
import { ChecklistLocalRepository } from "@/infra/devolucao/check-list.local.repository";
import { makeLocalDb } from "../makeLocalDb";

export function makeLoadChecklistUseCase() {
  const checklistLocalRepository = new ChecklistLocalRepository(makeLocalDb());
  return new GetChecklistProgressUseCase(checklistLocalRepository);
}