import { useState, useEffect, useCallback, useMemo } from "react";
import { RefreshCw, Trash2, Wifi, WifiOff } from "lucide-react";
import { useSyncRetorno } from "@/presentation/devolucao/hooks/useSync";
import { SyncStatsCards } from "@/presentation/devolucao/components/sync/StatPill";
import { SyncProgressBar } from "@/presentation/devolucao/components/sync/SyncProgressBar";
import { SyncFilters, type StatusFilter, type CategoryFilter } from "@/presentation/devolucao/components/sync/SyncFilters";
import { SyncItemCard } from "@/presentation/devolucao/components/sync/SyncItemCard";
import { SyncEmptyState } from "@/presentation/devolucao/components/sync/SyncEmptyState";
import { OfflineBanner } from "@/presentation/devolucao/components/sync/OfflineBanner";
import { cn } from "@/_shared/lib/utils";
import { HeaderMobile } from "@/_shared/components/headerMobile";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/_shared/components/ui/button";

export default function SyncDashboard() {
  const { records, stats, loading, syncAll, retryItem, clearSuccess, syncProgress, syncProdutos, syncDemandas, syncAnomalia } = useSyncRetorno();
  const [online, setOnline] = useState(navigator.onLine);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const router = useRouter();

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  const handleSync = useCallback(async () => {
    if (!online) {
      return;
    }
    await syncAll();
  }, [online, syncAll]);

  const handleClear = useCallback(() => {
    clearSuccess();
  }, [clearSuccess]);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (categoryFilter !== "all" && r.category !== categoryFilter) return false;
      return true;
    });
  }, [records, statusFilter, categoryFilter]);

  const hasPending = stats.pending > 0 || stats.error > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderMobile
        backButtonAction={() => router.history.back()}
        title="Sincronização de dados"
        showBackButton={true}
      />
      {!online && <OfflineBanner />}

      {/* Header */}
      <header className="px-5 pt-12 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Sync</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {stats.total} registro{stats.total !== 1 ? "s" : ""} na fila
          </p>
        </div>
        {online ? (
          <Wifi size={18} className="text-[hsl(var(--sync-success))]" />
        ) : (
          <WifiOff size={18} className="text-destructive" />
        )}
      </header>

      {/* Stats row */}
      <div className="px-5 pb-5">
        <SyncStatsCards stats={stats} />
      </div>

      {/* Sync Anomalia Api For Local */}
      <div className="px-5 pb-4 flex gap-2 w-full items-center justify-center ">
        <Button onClick={syncDemandas}>Demandas</Button>
        <Button onClick={syncAnomalia}>Anomalia</Button>
        <Button onClick={syncProdutos}>Produtos</Button>
      </div>

      {/* Sync button */}
      <div className="px-5 pb-4">
        <button
          onClick={handleSync}
          disabled={loading || !online || !hasPending}
          className={cn(
            "w-full flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-semibold transition-all active:scale-[0.98]",
            "bg-foreground text-background disabled:opacity-40"
          )}
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          {loading ? "Sincronizando…" : "Sincronizar"}
        </button>

        {syncProgress && (
          <div className="mt-3">
            <SyncProgressBar current={syncProgress.current} total={syncProgress.total} />
          </div>
        )}
      </div>

      {/* Filters + List */}
      <div className="flex-1 bg-muted/30 rounded-t-3xl px-5 pt-5 pb-24">
        <SyncFilters
          statusFilter={statusFilter}
          categoryFilter={categoryFilter}
          onStatusChange={setStatusFilter}
          onCategoryChange={setCategoryFilter}
        />

        <div className="mt-4">
          {filtered.length === 0 ? (
            <SyncEmptyState />
          ) : (
            filtered.map((r) => <SyncItemCard key={`${r.category}-${r.id}`} record={r} onRetry={retryItem} />)
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t px-5 py-3 flex gap-2 z-20">
        <button
          onClick={handleSync}
          disabled={loading || !online}
          className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background rounded-xl py-3.5 text-sm font-semibold disabled:opacity-40 active:scale-[0.98] transition-transform"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Sincronizar
        </button>
        {stats.success > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center justify-center gap-1.5 bg-muted text-muted-foreground rounded-xl px-4 py-3.5 text-sm font-medium active:scale-[0.98] transition-transform"
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
