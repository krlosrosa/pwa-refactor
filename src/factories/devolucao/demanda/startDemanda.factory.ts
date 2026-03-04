import { DemandDevolucaoApiRepository } from "@/infra/devolucao/apidevolucao.api.repository";
import { DemandDevolucaoLocalRepository } from "@/infra/devolucao/demandLocal.repository";
import { StartDemandaUseCase } from "@/application/devolucao/demanda/startDemanda.usecase";
import { makeLocalDb } from "../makeLocalDb";
import { SyncDevolucaoDatabase } from "@/_shared/db/sync.devolucao.repository";
import { SyncDevolucaoDemandaRepository } from "@/infra/devolucao/syncdevolucaoDemanda.repository";

export function makeStartDemandaUseCase() {
  const apiRepo = new DemandDevolucaoApiRepository();
  const demandRepository = new DemandDevolucaoLocalRepository(makeLocalDb(), apiRepo);
  const syncDemandCacheRepository = new SyncDevolucaoDemandaRepository(new SyncDevolucaoDatabase());
  return new StartDemandaUseCase(demandRepository, syncDemandCacheRepository);
}