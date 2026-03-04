import { FinishProcessChecklistUseCase } from "@/application/devolucao/check-list/finish-process-checklist.usecase";
import { ChecklistLocalRepository } from "@/infra/devolucao/check-list.local.repository";
import { DemandDevolucaoApiRepository } from "@/infra/devolucao/apidevolucao.api.repository";
import { DemandDevolucaoLocalRepository } from "@/infra/devolucao/demandLocal.repository";
import { makeLocalDb } from "../makeLocalDb";
import { makeFotoLocalDb } from "../makeFotoLocalDb";
import { ImagensCacheRepository } from "@/infra/devolucao/cache/imagens.cache.repository";
import { SyncDevolucaoCheckListRepository } from "@/infra/devolucao/syncdevolucaoCheckList.repository";
import { SyncDevolucaoDatabase } from "@/_shared/db/sync.devolucao.repository";

export function makeFinishProcessChecklistUseCase() {
  const checklistRepository = new ChecklistLocalRepository(makeLocalDb());
  const api = new DemandDevolucaoApiRepository();
  const demandRepository = new DemandDevolucaoLocalRepository(makeLocalDb(), api);
  const fotosLocalRepository = new ImagensCacheRepository(makeFotoLocalDb());
  const syncCheckListCacheRepository = new SyncDevolucaoCheckListRepository(new SyncDevolucaoDatabase());
  return new FinishProcessChecklistUseCase(checklistRepository, demandRepository, fotosLocalRepository, syncCheckListCacheRepository);
}