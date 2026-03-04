import { Progress } from "@/_shared/components/ui/progress";

interface Props {
  current: number;
  total: number;
}

export function SyncProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="space-y-1">
      <Progress value={pct} className="h-1.5" />
      <p className="text-[10px] text-muted-foreground text-center tabular-nums">
        {current} de {total}
      </p>
    </div>
  );
}
