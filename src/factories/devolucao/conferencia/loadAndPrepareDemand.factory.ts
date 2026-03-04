import { LoadAndPrepareDemandUseCase } from "@/application/devolucao/demanda/loadAndPrepareDemand.usecase";
import { DemandDevolucaoApiRepository } from "@/infra/devolucao/apidevolucao.api.repository";
import { ConferenciaLocalRepository } from "@/infra/devolucao/conferenciaLocal.repository";
import { makeLocalDb } from "../makeLocalDb";

export function makeLoadAndPrepareDemandUseCase() {
  const apiRepository = new DemandDevolucaoApiRepository();
  const cacheRepository = new ConferenciaLocalRepository(makeLocalDb());
  return new LoadAndPrepareDemandUseCase(apiRepository, cacheRepository);
}
