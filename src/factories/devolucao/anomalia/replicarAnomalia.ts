import { AnomaliaLocalRepository } from "@/infra/devolucao/cache/anomalia.api.repository";
import { ConferenciaLocalRepository } from "@/infra/devolucao/conferenciaLocal.repository";
import { ReplicarAnomaliaUseCase } from "@/application/devolucao/anomalia/replicarAnomalia.usecase";
import { makeLocalDb } from "../makeLocalDb";
import { ImagensCacheRepository } from "@/infra/devolucao/cache/imagens.cache.repository";
import { makeFotoLocalDb } from "../makeFotoLocalDb";

export function makeReplicarAnomaliaUseCase() {
  const anomalyLocalRepository = new AnomaliaLocalRepository(makeLocalDb());
  const conferenceLocalRepository = new ConferenciaLocalRepository(makeLocalDb());
  const fotosLocalRepository = new ImagensCacheRepository(makeFotoLocalDb());
  return new ReplicarAnomaliaUseCase(anomalyLocalRepository, conferenceLocalRepository, fotosLocalRepository);
}
