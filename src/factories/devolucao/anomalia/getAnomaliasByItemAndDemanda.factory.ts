import { AnomaliaLocalRepository } from "@/infra/devolucao/cache/anomalia.api.repository";
import { GetAnomaliasByItemIdAndDemandaIdUseCase } from "@/application/devolucao/anomalia/getAnomaliasByItemIdAndDemandaId.usecase";
import { makeLocalDb } from "../makeLocalDb";

export function makeGetAnomaliasByItemAndDemandaUseCase() {
  const anomalyLocalRepository = new AnomaliaLocalRepository(makeLocalDb());
  return new GetAnomaliasByItemIdAndDemandaIdUseCase(anomalyLocalRepository);
}
