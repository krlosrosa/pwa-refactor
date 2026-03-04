import { SyncDevolucaoDatabase } from "@/_shared/db/sync.devolucao.repository";
import { AddAnomaliaUseCase } from "@/application/devolucao/anomalia/add-anomalia.usecase";
import { AnomaliaLocalRepository } from "@/infra/devolucao/cache/anomalia.api.repository";
import { ConferenciaLocalRepository } from "@/infra/devolucao/conferenciaLocal.repository";
import { SyncDevolucaoAnomaliaRepository } from "@/infra/devolucao/syncdevolucaoAnomalia.repository";
import { makeLocalDb } from "../makeLocalDb";
import { ImagensCacheRepository } from "@/infra/devolucao/cache/imagens.cache.repository";
import { makeFotoLocalDb } from "../makeFotoLocalDb";

export function makeAddAnomaliaUseCase() {
  const syncDb = new SyncDevolucaoDatabase();
  const syncAnomaliaCacheRepository = new SyncDevolucaoAnomaliaRepository(syncDb);
  const anomalyLocalRepository = new AnomaliaLocalRepository(makeLocalDb());
  const conferenceLocalRepository = new ConferenciaLocalRepository(makeLocalDb());
  const fotosLocalRepository = new ImagensCacheRepository(makeFotoLocalDb());
  return new AddAnomaliaUseCase(anomalyLocalRepository, conferenceLocalRepository, syncAnomaliaCacheRepository, fotosLocalRepository);
}
