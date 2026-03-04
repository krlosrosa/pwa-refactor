import { AddConferenceUseCase } from "@/application/devolucao/conferencia/addConference.usecase";
import { ConferenciaLocalRepository } from "@/infra/devolucao/conferenciaLocal.repository";
import { DemandDevolucaoLocalRepository } from "@/infra/devolucao/demandLocal.repository";
import { DemandDevolucaoApiRepository } from "@/infra/devolucao/apidevolucao.api.repository";
import { makeLocalDb } from "../makeLocalDb";
import { SyncDevolucaoConferenciaRepository } from "@/infra/devolucao/syncdevolucaoConferencia.repository";
import { SyncDevolucaoDatabase } from "@/_shared/db/sync.devolucao.repository";

export function makeAddConferenceUseCase() {
  const api = new DemandDevolucaoApiRepository();
  const cacheRepository = new ConferenciaLocalRepository(makeLocalDb());
  const demandRepository = new DemandDevolucaoLocalRepository(makeLocalDb(), api);
  const syncConferenceCacheRepository = new SyncDevolucaoConferenciaRepository(new SyncDevolucaoDatabase());
  return new AddConferenceUseCase(cacheRepository, demandRepository, syncConferenceCacheRepository);
}