import { UpdateChecklistFieldUseCase } from "@/application/devolucao/check-list/UpdateChecklistField.usecase";
import { ChecklistLocalRepository } from "@/infra/devolucao/check-list.local.repository";
import { makeLocalDb } from "../makeLocalDb";

export function makeUpdateChecklistFieldUseCase() {
  const checklistLocalRepository = new ChecklistLocalRepository(makeLocalDb());
  return new UpdateChecklistFieldUseCase(checklistLocalRepository);
}