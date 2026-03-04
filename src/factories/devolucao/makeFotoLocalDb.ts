import { FotosDevolucaoDatabase } from "@/_shared/db/fotos.devolucao.repository";

export function makeFotoLocalDb() {
  return new FotosDevolucaoDatabase();
}