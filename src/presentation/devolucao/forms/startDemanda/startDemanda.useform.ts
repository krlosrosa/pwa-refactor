import { useForm } from "react-hook-form";
import type { StartDemandaFormData } from "./startDemanda.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startDemandaSchema } from "./startDemanda.schema";
import { initialStartDemandaFormData } from "./startDemanda.schema";

export function useStartDemandaForm() {
  const form = useForm<StartDemandaFormData>({
    resolver: zodResolver(startDemandaSchema),
    defaultValues: initialStartDemandaFormData,
  })

  return {
    form,
  }
}