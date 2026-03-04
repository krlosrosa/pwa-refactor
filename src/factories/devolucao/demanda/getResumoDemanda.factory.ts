import { GetResumoDemandaUseCase } from "@/application/devolucao/demanda/getResumoDemanda.usecase";
import { AnomaliaLocalRepository } from "@/infra/devolucao/cache/anomalia.api.repository";
import { ConferenciaLocalRepository } from "@/infra/devolucao/conferenciaLocal.repository";
import { makeLocalDb } from "../makeLocalDb";

export function makeGetResumoDemandaUseCase() {
  const cacheRepository = new ConferenciaLocalRepository(makeLocalDb());
  const anomalyLocalRepository = new AnomaliaLocalRepository(makeLocalDb());
  return new GetResumoDemandaUseCase(cacheRepository, anomalyLocalRepository);
}
