import { GetConferencesByDemandIdUseCase } from "@/application/devolucao/conferencia/buscarItens.usecase";
import { AnomaliaLocalRepository } from "@/infra/devolucao/cache/anomalia.api.repository";
import { ConferenciaLocalRepository } from "@/infra/devolucao/conferenciaLocal.repository";
import { makeLocalDb } from "../makeLocalDb";

export function makeGetConferencesByDemandIdUseCase() {
  const anomalyLocalRepository = new AnomaliaLocalRepository(makeLocalDb());
  const cacheRepository = new ConferenciaLocalRepository(makeLocalDb());
  return new GetConferencesByDemandIdUseCase(cacheRepository, anomalyLocalRepository);
}