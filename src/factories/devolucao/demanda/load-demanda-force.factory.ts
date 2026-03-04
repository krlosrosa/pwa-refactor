import { DemandDevolucaoLocalRepository } from "@/infra/devolucao/demandLocal.repository";
import { makeLocalDb } from "../makeLocalDb";
import { DemandDevolucaoApiRepository } from "@/infra/devolucao/apidevolucao.api.repository";
import { LoadDemandListForceUseCase } from "@/application/devolucao/demanda/loadDemandListForce.usecase";

export function makeLoadDemandListForceUseCase() {
  const apiRepository = new DemandDevolucaoApiRepository();
  const demandRepository = new DemandDevolucaoLocalRepository(makeLocalDb(), apiRepository);
  return new LoadDemandListForceUseCase(demandRepository, apiRepository);
}