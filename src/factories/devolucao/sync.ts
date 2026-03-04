import { SyncDevolucaoDatabase } from "@/_shared/db/sync.devolucao.repository";
import { SyncAnomaliaUseCase } from "@/application/devolucao/anomalia/syncAnomalia.usecase";
import { SyncCheckListUseCase } from "@/application/devolucao/check-list/syncCheckList.usecase";
import { SyncDevolucaoAnomaliaRepository } from "@/infra/devolucao/syncdevolucaoAnomalia.repository";
import { SyncDevolucaoCheckListRepository } from "@/infra/devolucao/syncdevolucaoCheckList.repository";
import { SyncDevolucaoDemandaRepository } from "@/infra/devolucao/syncdevolucaoDemanda.repository";
import { SyncDemandaUseCase } from "@/application/devolucao/demanda/syncDemanda.usecase";
import { SyncDevolucaoConferenciaRepository } from "@/infra/devolucao/syncdevolucaoConferencia.repository";
import { SyncConferenciaUseCase } from "@/application/devolucao/conferencia/syncConferencia.usecase";
import { ImagensCacheRepository } from "@/infra/devolucao/cache/imagens.cache.repository";
import { FotosDevolucaoDatabase } from "@/_shared/db/fotos.devolucao.repository";
import { SyncImagemUseCase } from "@/application/devolucao/fotos/sync-imagem";
import { LimparItensSincronizadoUseCase } from "@/application/devolucao/demanda/limpar-itens-sincronizado.usecase";
import { AnomaliaLocalRepository } from "@/infra/devolucao/cache/anomalia.api.repository";
import { ConferenciaLocalRepository } from "@/infra/devolucao/conferenciaLocal.repository";
import { DemandDevolucaoLocalRepository } from "@/infra/devolucao/demandLocal.repository";
import { ChecklistLocalRepository } from "@/infra/devolucao/check-list.local.repository";
import { DemandLocalDatabase } from "@/_shared/db/database-local";
import { DemandDevolucaoApiRepository } from "@/infra/devolucao/apidevolucao.api.repository";

export const makeSyncAnomaliaUseCase = () => {
  const syncAnomaliaCacheRepository = new SyncDevolucaoDatabase();
  const syncDevolucaoRepository = new SyncDevolucaoAnomaliaRepository(syncAnomaliaCacheRepository);
  return new SyncAnomaliaUseCase(syncDevolucaoRepository);
}

export const makeSyncCheckListUseCase = () => {
  const syncDb = new SyncDevolucaoDatabase();
  const syncCheckListCacheRepository = new SyncDevolucaoCheckListRepository(syncDb);
  return new SyncCheckListUseCase(syncCheckListCacheRepository);
}

export const makeSyncDemandaUseCase = () => {
  const syncDb = new SyncDevolucaoDatabase();
  const syncDemandaCacheRepository = new SyncDevolucaoDemandaRepository(syncDb);
  const syncCheckListCacheRepository = new SyncDevolucaoCheckListRepository(syncDb);
  const syncAnomaliaCacheRepository = new SyncDevolucaoAnomaliaRepository(syncDb);
  const syncConferenciaCacheRepository = new SyncDevolucaoConferenciaRepository(syncDb);
  const localDb = new DemandLocalDatabase();
  const api = new DemandDevolucaoApiRepository();
  const anomalyCacheRepository = new AnomaliaLocalRepository(localDb);
  const conferenciaCacheRepository = new ConferenciaLocalRepository(localDb);
  const demandaCacheRepository = new DemandDevolucaoLocalRepository(localDb, api);
  const checklistCacheRepository = new ChecklistLocalRepository(localDb);


  const fotosDb = new FotosDevolucaoDatabase();
  const syncImagemCacheRepository = new ImagensCacheRepository(fotosDb);
  const limparItensSincronizadoUseCase = new LimparItensSincronizadoUseCase(
    syncCheckListCacheRepository, syncAnomaliaCacheRepository, syncConferenciaCacheRepository, syncDemandaCacheRepository, syncImagemCacheRepository,
    checklistCacheRepository, conferenciaCacheRepository, demandaCacheRepository, anomalyCacheRepository
  );
  return new SyncDemandaUseCase(syncDemandaCacheRepository, limparItensSincronizadoUseCase);
}

export const makeSyncConferenciaUseCase = () => {
  const syncDb = new SyncDevolucaoDatabase();
  const syncConferenciaCacheRepository = new SyncDevolucaoConferenciaRepository(syncDb);
  return new SyncConferenciaUseCase(syncConferenciaCacheRepository);
}

export const makeSyncImagemUseCase = () => {
  const fotosDb = new FotosDevolucaoDatabase();
  const fotosCacheRepository = new ImagensCacheRepository(fotosDb);
  return new SyncImagemUseCase(fotosCacheRepository);
}
