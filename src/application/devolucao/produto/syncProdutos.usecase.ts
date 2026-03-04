import type { IDevolucaoApiRepository } from "@/domain/repositories/api/IDevolucao-api.inteface";
import type { IProdutoCacheRepository } from "@/domain/repositories/cache/produto-cache.interface";

export class SyncProdutosUseCase {
  constructor(
    private produtoLocalRepository: IProdutoCacheRepository,
    private api: IDevolucaoApiRepository
  ) {}
  async execute() {
    const produtos = await this.api.findAllProdutos();
    await this.produtoLocalRepository.syncProdutos(produtos);
  }
}