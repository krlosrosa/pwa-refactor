import type { ProdutoDto } from "@/infra/_services/api/model";
import type { DemandLocalDatabase, ProdutoRecord } from "@/_shared/db/database-local";
import type { IProdutoCacheRepository } from "@/domain/repositories/cache/produto-cache.interface";

export class ProdutoLocalRepository implements IProdutoCacheRepository {
  constructor(
    private localDb: DemandLocalDatabase
  ) { }
  async getProdutoBySku(sku: string): Promise<ProdutoRecord | undefined> {
    return this.localDb.produtos.where('sku').equals(sku).first();
  }
  async syncProdutos(produtos: ProdutoDto[]): Promise<void> {
    const produtosRecords: ProdutoRecord[] = produtos.map(produto => ({
      ...produto,
      codDum: produto.codDum ?? '',
      codEan: produto.codEan ?? '',
      criadoEm: produto.criadoEm ?? new Date().toISOString(),
    }))
    await this.localDb.produtos.bulkAdd(produtosRecords);
  }
}