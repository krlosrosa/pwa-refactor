import { ConferenciaLocalRepository } from "@/infra/devolucao/conferenciaLocal.repository";
import { DeleteConferenteUseCase } from "@/application/devolucao/conferencia/deleteConferente.use";
import { DemandDevolucaoApiRepository } from "@/infra/devolucao/apidevolucao.api.repository";
import { DemandDevolucaoLocalRepository } from "@/infra/devolucao/demandLocal.repository";
import { makeLocalDb } from "../makeLocalDb";
import { SyncDevolucaoDatabase } from "@/_shared/db/sync.devolucao.repository";
import { SyncDevolucaoConferenciaRepository } from "@/infra/devolucao/syncdevolucaoConferencia.repository";

export function makeDeleteConferenceUseCase() {
  const api = new DemandDevolucaoApiRepository();
  const cacheRepository = new ConferenciaLocalRepository(makeLocalDb());
  const demandRepository = new DemandDevolucaoLocalRepository(makeLocalDb(), api);
  const syncConferenceCacheRepository = new SyncDevolucaoConferenciaRepository(new SyncDevolucaoDatabase());
  return new DeleteConferenteUseCase(cacheRepository, demandRepository, syncConferenceCacheRepository);
}