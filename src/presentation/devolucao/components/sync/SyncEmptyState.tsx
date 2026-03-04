import { CheckCircle2 } from "lucide-react";

export function SyncEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <CheckCircle2 size={40} className="text-[hsl(var(--sync-success))] mb-3" strokeWidth={1.5} />
      <p className="text-sm font-medium text-foreground">Tudo em dia</p>
      <p className="text-xs text-muted-foreground mt-0.5">Nenhum item pendente</p>
    </div>
  );
}
