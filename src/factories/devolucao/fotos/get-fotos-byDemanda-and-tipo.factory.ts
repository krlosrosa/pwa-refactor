import { ImagensCacheRepository } from "@/infra/devolucao/cache/imagens.cache.repository";
import { makeFotoLocalDb } from "../makeFotoLocalDb";
import { GetFotosByDemandaAndProcessoUseCase } from "@/application/devolucao/fotos/get-fotos-by-uuid";

export function makeGetFotosByDemandaAndTipoUseCase() {
  const fotosCacheRepository = new ImagensCacheRepository(makeFotoLocalDb());
  return new GetFotosByDemandaAndProcessoUseCase(fotosCacheRepository);
}