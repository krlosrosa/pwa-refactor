import {
  makeSyncAnomaliaUseCase,
  makeSyncCheckListUseCase,
  makeSyncConferenciaUseCase,
  makeSyncDemandaUseCase,
  makeSyncImagemUseCase,
} from "@/factories/devolucao/sync";
import { SyncDevolucaoDatabase } from "@/_shared/db/sync.devolucao.repository";
import { useCallback, useEffect, useState } from "react";
import { FotosDevolucaoDatabase } from "@/_shared/db/fotos.devolucao.repository";
import { makeSyncProdutosUseCase } from "@/factories/devolucao/produtos/SyncProdutos.factory";
import { useAuthStore } from "@/presentation/user/authStore";
import { makeLoadDemandListForceUseCase } from "@/factories/devolucao/demanda/load-demanda-force.factory";
import { makeSyncApiToLocalUseCase } from "@/factories/devolucao/anomalia/syncApiToLocalAnomalia";

export type SyncRecordView = {
  id: number;
  uuid: string;
  operation: "CREATE" | "UPDATE" | "DELETE";
  createdAt: number;
  status: "pending" | "syncing" | "error" | "success";
  retryCount: number;
  category: "anomalies" | "checklists" | "conferences" | "demands" | "finishPhotos";
  errorMessage?: string;
  payload?: any;
};

export type SyncStats = {
  total: number;
  pending: number;
  syncing: number;
  error: number;
  success: number;
};

const db = new SyncDevolucaoDatabase();

const TABLES = [
  { key: "anomalies" as const, table: () => db.anomaliesSyncs },
  { key: "checklists" as const, table: () => db.checklistsSyncs },
  { key: "conferences" as const, table: () => db.conferencesSyncs },
  { key: "demands" as const, table: () => db.demandsSyncs },
  { key: "finishPhotos" as const, table: () => db.finishPhotosSyncs },
] as const;

async function loadRecords(): Promise<SyncRecordView[]> {
  const lists: SyncRecordView[] = [];
  for (const { key, table } of TABLES) {
    const rows = await table().toArray();
    for (const r of rows) {
      lists.push({
        id: r.id!,
        uuid: r.uuid,
        operation: r.operation,
        createdAt: r.createdAt,
        status: r.status as SyncRecordView["status"],
        retryCount: r.retryCount,
        category: key,
        payload: r.payload,
      });
    }
  }

  type Status = 'local' | 'pendingUpload' | 'synced'

  function determineStatus(status: Status): SyncRecordView["status"] {
    switch (status) {
      case 'local':
        return 'pending';
      case 'pendingUpload':
        return 'syncing';
      case 'synced':
        return 'success';
      default:
        return 'pending';
    }
  }

  const fotosDb = new FotosDevolucaoDatabase();
  const fotos = await fotosDb.fotosDevolucao.toArray();
  for (const f of fotos) {
    lists.push({
      id: Number(f.id!),
      uuid: f.uuid,
      category: "finishPhotos",
      payload: f,
      createdAt: new Date().getTime(),
      status: determineStatus(f.status),
      retryCount: 0,
      errorMessage: undefined,
      operation: f.operation,
    });
  }
  lists.sort((a, b) => b.createdAt - a.createdAt);
  return lists;
}

function statsFromRecords(records: SyncRecordView[]): SyncStats {
  const stats: SyncStats = { total: records.length, pending: 0, syncing: 0, error: 0, success: 0 };
  for (const r of records) {
    if (r.status in stats) stats[r.status as keyof SyncStats]++;
  }
  return stats;
}

export function useSyncRetorno() {
  const [records, setRecords] = useState<SyncRecordView[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncProgress, setSyncProgress] = useState<{ current: number; total: number } | null>(null);
  const { centerSelected } = useAuthStore();

  const refetch = useCallback(async () => {
    const list = await loadRecords();
    setRecords(list);
  }, []);

  const syncProdutos = useCallback(async () => {
    const syncProdutos = makeSyncProdutosUseCase();
    await syncProdutos.execute();
  }, []);

  const syncAnomalia = useCallback(async () => {
    const syncAnomaliaApiForLocal = makeSyncApiToLocalUseCase();
    if(!centerSelected) {
      return;
    }
    await syncAnomaliaApiForLocal.execute(centerSelected);
  }, []);

  const syncDemandas = useCallback(async () => {  
    const syncDemandas = makeLoadDemandListForceUseCase();
    if(!centerSelected) {
      return;
    }
    await syncDemandas.execute(centerSelected);
  }, []);

  const syncAll = useCallback(async () => {
    setLoading(true);
    setSyncProgress((prev) => ({ current: 0, total: prev?.total ?? (records.length || 1) }));
    try {
      const syncDemanda = makeSyncDemandaUseCase();
      const syncCheckList = makeSyncCheckListUseCase();
      const syncAnomalia = makeSyncAnomaliaUseCase();
      const syncConferencia = makeSyncConferenciaUseCase();
      const syncImagem = makeSyncImagemUseCase();
      await syncDemanda.execute();
      await syncCheckList.execute();
      await syncAnomalia.execute();
      await syncConferencia.execute();
      await syncImagem.execute();
    } finally {
      await refetch();
      setSyncProgress((p) => (p ? { ...p, current: p.total } : null));
      setLoading(false);
    }
  }, [records.length, refetch]);

  const retryItem = useCallback(
    (_id: number) => {
      void syncAll();
    },
    [syncAll]
  );

  const clearSuccess = useCallback(async () => {
    for (const { table } of TABLES) {
      await table().where("status").equals("success").delete();
    }
    await refetch();
  }, [refetch]);

  useEffect(() => {
    refetch();
    const t = setInterval(refetch, 5000);
    return () => clearInterval(t);
  }, [refetch]);

  useEffect(() => {
    syncAll();
    const t = setInterval(syncAll, 30_000);
    return () => clearInterval(t);
  }, []);

  const stats = statsFromRecords(records);

  return {
    records,
    stats,
    loading,
    syncAll,
    retryItem,
    clearSuccess,
    syncProgress,
    syncProdutos,
    syncDemandas,
    syncAnomalia,
  };
}
