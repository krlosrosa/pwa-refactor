
import { AnomaliaLocalRepository } from "@/infra/devolucao/cache/anomalia.api.repository";
import { RemoveAnomaliaUseCase } from "@/application/devolucao/anomalia/remove-anomalia.usecase";
import { SyncDevolucaoAnomaliaRepository } from "@/infra/devolucao/syncdevolucaoAnomalia.repository";
import { SyncDevolucaoDatabase } from "@/_shared/db/sync.devolucao.repository";
import { makeLocalDb } from "../makeLocalDb";
import { makeFotoLocalDb } from "../makeFotoLocalDb";
import { ImagensCacheRepository } from "@/infra/devolucao/cache/imagens.cache.repository";

export function makeDeleteAnomaliaUseCase() {
  const syncDb = new SyncDevolucaoDatabase();
  const syncAnomaliaCacheRepository = new SyncDevolucaoAnomaliaRepository(syncDb);
  const anomalyLocalRepository = new AnomaliaLocalRepository(makeLocalDb());
  const fotosLocalRepository = new ImagensCacheRepository(makeFotoLocalDb());
  return new RemoveAnomaliaUseCase(anomalyLocalRepository, syncAnomaliaCacheRepository, fotosLocalRepository);
}