import { RemoveFotoUseCase } from "@/application/devolucao/fotos/remove-foto.ts";
import { makeFotoLocalDb } from "../makeFotoLocalDb";
import { ImagensCacheRepository } from "@/infra/devolucao/cache/imagens.cache.repository";

export function makeRemoveFotoUseCase() {
  const fotoLocalDb = makeFotoLocalDb();
  const fotosCacheRepository = new ImagensCacheRepository(fotoLocalDb);
  return new RemoveFotoUseCase(fotosCacheRepository);
}