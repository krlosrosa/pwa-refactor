import { useState } from "react";
import { AlertCircle, CheckSquare, ClipboardList, FileText, ImageIcon, Plus, Pencil, Trash2, RefreshCw, ChevronDown } from "lucide-react";
import { cn } from "@/_shared/lib/utils";
export type OperationType = "CREATE" | "UPDATE" | "DELETE";
export type StatusType = "pending" | "syncing" | "error" | "success";
export type CategoryType = "anomalies" | "checklists" | "conferences" | "demands" | "finishPhotos";

export interface SyncItemRecord {
  id: number;
  uuid: string;
  operation: OperationType;
  createdAt: number;
  status: StatusType;
  retryCount: number;
  payload?: any;
  category: CategoryType;
  errorMessage?: string;
}

interface Props {
  record: SyncItemRecord;
  onRetry: (id: number) => void;
}

const catIcon: Record<CategoryType, typeof FileText> = {
  anomalies: AlertCircle,
  checklists: CheckSquare,
  conferences: ClipboardList,
  demands: FileText,
  finishPhotos: ImageIcon,
};

const catLabel: Record<CategoryType, string> = {
  anomalies: "Anomalia",
  checklists: "Checklist",
  conferences: "Conferência",
  demands: "Demanda",
  finishPhotos: "Foto",
};

const opIcon: Record<OperationType, typeof Plus> = { CREATE: Plus, UPDATE: Pencil, DELETE: Trash2 };
const opColor: Record<OperationType, string> = {
  CREATE: "text-[hsl(var(--sync-create))]",
  UPDATE: "text-[hsl(var(--sync-update))]",
  DELETE: "text-[hsl(var(--sync-delete))]",
};

const statusDot: Record<string, string> = {
  pending: "bg-[hsl(var(--sync-pending))]",
  syncing: "bg-[hsl(var(--sync-syncing))] animate-pulse",
  error: "bg-[hsl(var(--sync-error))]",
  success: "bg-[hsl(var(--sync-success))]",
};

function timeAgo(ts: number) {
  const diff = Math.floor((Date.now() - ts) / 60000);
  if (diff < 1) return "agora";
  if (diff < 60) return `${diff}min`;
  const h = Math.floor(diff / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

export function SyncItemCard({ record, onRetry }: Props) {
  const [expanded, setExpanded] = useState(false);
  const CatIcon = catIcon[record.category];
  const OpIcon = opIcon[record.operation];

  return (
    <div className={cn("border-b border-border/60 py-3 last:border-0", record.status === "syncing" && "opacity-70")}>
      <div className="flex items-center gap-3">
        {/* Left icons */}
        <div className="relative">
          <CatIcon size={20} className="text-muted-foreground" />
          <OpIcon size={10} className={cn("absolute -bottom-0.5 -right-1", opColor[record.operation])} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{catLabel[record.category]}</span>
            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", statusDot[record.status])} />
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">{record.uuid.slice(0, 12)}… · {timeAgo(record.createdAt)}</span>
        </div>

        {/* Actions */}
        {record.status === "error" && (
          <button
            onClick={() => onRetry(record.id)}
            className="p-2 rounded-full active:bg-muted transition-colors"
          >
            <RefreshCw size={16} className="text-[hsl(var(--sync-error))]" />
          </button>
        )}

        {record.payload && (
          <button onClick={() => setExpanded(!expanded)} className="p-2 rounded-full active:bg-muted transition-colors">
            <ChevronDown size={16} className={cn("text-muted-foreground transition-transform", expanded && "rotate-180")} />
          </button>
        )}
      </div>
      {expanded && record.payload && (
        <div className="mt-2 ml-8 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          <pre>{JSON.stringify(record.payload, null, 2)}</pre>
          {record.retryCount > 0 && <span className="block mt-1 font-medium">Tentativas: {record.retryCount}</span>}
        </div>
      )}
    </div>
  );
}
