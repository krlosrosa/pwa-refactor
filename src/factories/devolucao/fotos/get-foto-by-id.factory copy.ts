import { ImagensCacheRepository } from "@/infra/devolucao/cache/imagens.cache.repository";
import { GetImagemByIdUseCase } from "@/application/devolucao/fotos/get-imagem-by-id";
import { makeFotoLocalDb } from "../makeFotoLocalDb";

export function makeGetFotoByIdUseCase() {
  const fotosCacheRepository = new ImagensCacheRepository(makeFotoLocalDb());
  return new GetImagemByIdUseCase(fotosCacheRepository);
}