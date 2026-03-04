export interface SyncStats {
  total: number;
  pending: number;
  syncing: number;
  error: number;
  success: number;
}


interface Props {
  stats: SyncStats;
}

export function SyncStatsCards({ stats }: Props) {
  return (
    <div className="flex items-center justify-between px-2">
      <StatPill value={stats.pending} label="Pendente" dotClass="bg-[hsl(var(--sync-pending))]" />
      <StatPill value={stats.syncing} label="Sync" dotClass="bg-[hsl(var(--sync-syncing))]" />
      <StatPill value={stats.error} label="Erro" dotClass="bg-[hsl(var(--sync-error))]" />
      <StatPill value={stats.success} label="OK" dotClass="bg-[hsl(var(--sync-success))]" />
    </div>
  );
}

function StatPill({ value, label, dotClass }: { value: number; label: string; dotClass: string }) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[60px]">
      <div className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${dotClass}`} />
        <span className="text-xl font-bold text-foreground tabular-nums">{value}</span>
      </div>
      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{label}</span>
    </div>
  );
}
