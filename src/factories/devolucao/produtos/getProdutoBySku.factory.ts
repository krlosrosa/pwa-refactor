import { GetProdutoBySkuUseCase } from "@/application/devolucao/produto/getProdutoBySku.usecase";
import { ProdutoLocalRepository } from "@/infra/devolucao/produtoLocal.repository";
import { makeLocalDb } from "../makeLocalDb";

export function makeGetProdutoBySkuUseCase() {
  const produtoLocalRepository = new ProdutoLocalRepository(makeLocalDb()); 
  return new GetProdutoBySkuUseCase(produtoLocalRepository);
}
