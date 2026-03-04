import type { ProdutoDto } from "@/infra/_services/api/model";
import type { ProdutoRecord } from "@/_shared/db/database-local";

export interface IProdutoCacheRepository {
  getProdutoBySku(sku: string): Promise<ProdutoRecord | undefined>;
  syncProdutos(produtos: ProdutoDto[]): Promise<void>;
}