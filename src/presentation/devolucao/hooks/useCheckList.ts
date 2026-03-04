import { useNavigate, useParams } from "@tanstack/react-router";
import { useChecklistStore } from "../stores/check-list.store";
import { useEffect } from "react";
import { makeFinishProcessChecklistUseCase } from "@/factories/devolucao/checklist/finish-process-checklist.factory";

const finishProcessChecklistUseCase = makeFinishProcessChecklistUseCase();

export function useCheckList() {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const demandaId = params?.id as string | undefined;
  const checklist = useChecklistStore((s) => s.checklist);
  const isLoading = useChecklistStore((s) => s.isLoading);
  const error = useChecklistStore((s) => s.error);
  const loadChecklist = useChecklistStore((s) => s.loadChecklist);
  const advanceStep = useChecklistStore((s) => s.advanceStep);
  const goBackStep = useChecklistStore((s) => s.goBackStep);
  const updateField = useChecklistStore((s) => s.updateField);

  async function finishProcessChecklist() {
    if (!checklist) return;
    await finishProcessChecklistUseCase.execute(checklist.demandaId);
    navigate({ to: `/demands/${checklist.demandaId}` });
  }

  useEffect(() => {
    if (checklist?.currentStep === 'FINALIZADO') {
      navigate({ to: `/demands/${checklist.demandaId}` }); // ajuste a rota como precisar
    }
  }, [checklist, navigate]);
  

  useEffect(() => {
    if (!demandaId) return;
    loadChecklist(demandaId);
  }, [demandaId]);

  return { checklist, isLoading, error, advanceStep, updateField, goBackStep, finishProcessChecklist };
}