import { Button } from "@/_shared/components/ui/button";

type SyncAnomaliaApiForLocalProps = {
  handleSyncAnomaliaApiForLocal: () => void;
}

export function SyncAnomaliaApiForLocal({ handleSyncAnomaliaApiForLocal }: SyncAnomaliaApiForLocalProps) {
  return (
    <div>
      <Button onClick={handleSyncAnomaliaApiForLocal}>
        Sincronizar Anomalias
      </Button>
    </div>
  )
}