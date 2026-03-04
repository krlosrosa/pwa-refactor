import { makeSyncProdutosUseCase } from "@/factories/devolucao/produtos/SyncProdutos.factory";

const syncProdutosUseCase = makeSyncProdutosUseCase();

export function useProfileMenu() {

  async function syncProdutos() {
    await syncProdutosUseCase.execute();
  }

  return {
    syncProdutos,
  }
}