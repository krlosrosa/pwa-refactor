import { SelectDemandUseCase } from "@/application/devolucao/demanda/selectDemand.usecase";
import { DemandDevolucaoApiRepository } from "@/infra/devolucao/apidevolucao.api.repository";
import { DemandDevolucaoLocalRepository } from "@/infra/devolucao/demandLocal.repository";
import { makeLocalDb } from "../makeLocalDb";

export function makeSelectDemandUseCase() {
  const apiRepo = new DemandDevolucaoApiRepository();

  const demandRepository = new DemandDevolucaoLocalRepository(makeLocalDb(), apiRepo);
  return new SelectDemandUseCase(demandRepository);
}