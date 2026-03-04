import type { ProdutoRecord } from "@/_shared/db/database-local";
import type { IProdutoCacheRepository } from "@/domain/repositories/cache/produto-cache.interface";

export class GetProdutoBySkuUseCase {
  constructor(
    private produtoLocalRepository: IProdutoCacheRepository
  ) {}

  async execute(sku: string): Promise<ProdutoRecord | undefined> {
    const produto = await this.produtoLocalRepository.getProdutoBySku(sku);
    return produto;
  }
}