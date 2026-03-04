import { EnsureChecklistForDemandUseCase } from "@/application/devolucao/check-list/ensureChecklistForDemand.usecase";
import { ChecklistLocalRepository } from "@/infra/devolucao/check-list.local.repository";
import { makeLocalDb } from "../makeLocalDb";

export function makeEnsureChecklistUseCase() {
  const checklistLocalRepository = new ChecklistLocalRepository(makeLocalDb());
  return new EnsureChecklistForDemandUseCase(checklistLocalRepository);
}
