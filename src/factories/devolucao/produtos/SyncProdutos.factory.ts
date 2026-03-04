import { SyncProdutosUseCase } from "@/application/devolucao/produto/syncProdutos.usecase";
import { DemandDevolucaoApiRepository } from "@/infra/devolucao/apidevolucao.api.repository";
import { ProdutoLocalRepository } from "@/infra/devolucao/produtoLocal.repository";
import { makeLocalDb } from "../makeLocalDb";

export function makeSyncProdutosUseCase() {
  const api = new DemandDevolucaoApiRepository();
  const produtoLocalRepository = new ProdutoLocalRepository(makeLocalDb());
  return new SyncProdutosUseCase(produtoLocalRepository, api);
}
