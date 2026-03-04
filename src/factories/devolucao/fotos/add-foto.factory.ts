import { AddNovaImagemUseCase } from "@/application/devolucao/fotos/add-nova-imagem";
import { makeFotoLocalDb } from "../makeFotoLocalDb";
import { ImagensCacheRepository } from "@/infra/devolucao/cache/imagens.cache.repository";

export function makeAddFotoUseCase() {
  const fotoLocalDb = makeFotoLocalDb();
  const fotosCacheRepository = new ImagensCacheRepository(fotoLocalDb);
  return new AddNovaImagemUseCase(fotosCacheRepository);
}