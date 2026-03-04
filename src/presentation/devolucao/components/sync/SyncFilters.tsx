import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/_shared/components/ui/dropdown-menu";
import { cn } from "@/_shared/lib/utils";

export type StatusFilter = "all" | "pending" | "syncing" | "error";
export type CategoryFilter = "all" | "anomalies" | "checklists" | "conferences" | "demands" | "finishPhotos";

interface Props {
  statusFilter: StatusFilter;
  categoryFilter: CategoryFilter;
  onStatusChange: (s: StatusFilter) => void;
  onCategoryChange: (c: CategoryFilter) => void;
}

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "pending", label: "Pendentes" },
  { value: "syncing", label: "Sync" },
  { value: "error", label: "Erros" },
];

const categoryOptions: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "anomalies", label: "Anomalias" },
  { value: "checklists", label: "Checklists" },
  { value: "conferences", label: "Conferências" },
  { value: "demands", label: "Demandas" },
  { value: "finishPhotos", label: "Fotos" },
];

function SelectDropdown<T extends string>({
  options,
  value,
  onChange,
  label,
  placeholder = "Selecionar",
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  placeholder?: string;
}) {
  const currentLabel = options.find((o) => o.value === value)?.label ?? placeholder;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center justify-between gap-2 w-full rounded-lg border bg-background px-3 py-2 text-sm",
          "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring"
        )}
      >
        <span className="text-muted-foreground shrink-0">{label}:</span>
        <span className="truncate text-foreground">{currentLabel}</span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-(--radix-dropdown-menu-trigger-width)">
        <DropdownMenuRadioGroup value={value} onValueChange={(v) => onChange(v as T)}>
          {options.map((o) => (
            <DropdownMenuRadioItem key={o.value} value={o.value}>
              {o.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SyncFilters({ statusFilter, categoryFilter, onStatusChange, onCategoryChange }: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      <SelectDropdown
        label="Status"
        options={statusOptions}
        value={statusFilter}
        onChange={onStatusChange}
      />
      <SelectDropdown
        label="Categoria"
        options={categoryOptions}
        value={categoryFilter}
        onChange={onCategoryChange}
      />
    </div>
  );
}
