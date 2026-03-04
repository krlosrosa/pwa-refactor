import { makeSyncAnomaliaUseCase, makeSyncCheckListUseCase, makeSyncConferenciaUseCase, makeSyncDemandaUseCase, makeSyncImagemUseCase } from "@/factories/devolucao/sync";
import { useEffect } from "react";

export const useSyncDevolucao = () => {
  const syncCheckListUseCase = makeSyncCheckListUseCase();
  const syncAnomaliaUseCase = makeSyncAnomaliaUseCase();
  const syncConferenciaUseCase = makeSyncConferenciaUseCase();
  const syncImagemUseCase = makeSyncImagemUseCase();
  const syncDemandaUseCase = makeSyncDemandaUseCase();

  async function syncDevolucao() {
    await syncCheckListUseCase.execute();
    await syncAnomaliaUseCase.execute();
    await syncConferenciaUseCase.execute();
    await syncImagemUseCase.execute();
    await syncDemandaUseCase.execute();
  }
  useEffect(() => {
    syncDevolucao();
    const interval = setInterval(() => {
      syncDevolucao();
    }, 30_000);
    return () => clearInterval(interval);
  }, []);
}