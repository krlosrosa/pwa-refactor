import { WifiOff } from "lucide-react";

export function OfflineBanner() {
  return (
    <div className="flex items-center justify-center gap-2 bg-destructive px-4 py-2 text-destructive-foreground text-xs font-medium">
      <WifiOff size={14} />
      Sem conexão
    </div>
  );
}
