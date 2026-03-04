import { AnomaliaLocalRepository } from "@/infra/devolucao/cache/anomalia.api.repository";
import { GetAnomaliasByApiUseCase } from "@/application/devolucao/anomalia/getAnomalias.api";
import { DemandDevolucaoApiRepository } from "@/infra/devolucao/apidevolucao.api.repository";
import { ConferenciaLocalRepository } from "@/infra/devolucao/conferenciaLocal.repository";
import { makeLocalDb } from "../makeLocalDb";
import { makeFotoLocalDb } from "../makeFotoLocalDb";
import { ImagensCacheRepository } from "@/infra/devolucao/cache/imagens.cache.repository";
import { GetFotosByDemandaAndProcessoUseCase } from "@/application/devolucao/fotos/get-fotos-by-uuid";

export function makeSyncApiToLocalUseCase() {
  const conferenceLocalRepository = new ConferenciaLocalRepository(makeLocalDb());
  const anomalyLocalRepository = new AnomaliaLocalRepository(makeLocalDb());
  const api = new DemandDevolucaoApiRepository();
  const fotosLocalRepository = new ImagensCacheRepository(makeFotoLocalDb());
  const getFotosByUuid = new GetFotosByDemandaAndProcessoUseCase(fotosLocalRepository);
  return new GetAnomaliasByApiUseCase(anomalyLocalRepository, conferenceLocalRepository, api, getFotosByUuid);
}