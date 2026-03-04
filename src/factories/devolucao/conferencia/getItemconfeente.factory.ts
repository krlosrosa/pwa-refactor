import { GetItemConferenceUseCase } from "@/application/devolucao/conferencia/buscarItem.usecase";
import { ConferenciaLocalRepository } from "@/infra/devolucao/conferenciaLocal.repository";
import { makeLocalDb } from "../makeLocalDb";

export function makeGetItemConferenceUseCase() {
  const cacheRepository = new ConferenciaLocalRepository(makeLocalDb());
  return new GetItemConferenceUseCase(cacheRepository);
}
