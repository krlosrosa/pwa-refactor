import { DemandDevolucaoApiRepository } from "@/infra/devolucao/apidevolucao.api.repository";
import { DemandDevolucaoLocalRepository } from "@/infra/devolucao/demandLocal.repository";
import { FinalizarDemandaUseCase } from "@/application/devolucao/demanda/finalizarDemanda.usecase";
import { makeLocalDb } from "../makeLocalDb";
import { SyncDevolucaoDemandaRepository } from "@/infra/devolucao/syncdevolucaoDemanda.repository";
import { SyncDevolucaoDatabase } from "@/_shared/db/sync.devolucao.repository";

export function makeFinalizarDemandaUseCase() {
  const api = new DemandDevolucaoApiRepository();
  const demandRepository = new DemandDevolucaoLocalRepository(makeLocalDb(), api);
  const syncDemandCacheRepository = new SyncDevolucaoDemandaRepository(new SyncDevolucaoDatabase());
  return new FinalizarDemandaUseCase(demandRepository, syncDemandCacheRepository);
}
