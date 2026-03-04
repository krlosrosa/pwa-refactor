import type { ChecklistData, ChecklistRecord } from "@/_shared/db/database-local";
import { makeAdvanceChecklistStepUseCase } from "@/factories/devolucao/checklist/advanceChecklistStep.factory";
import { makeEnsureChecklistUseCase } from "@/factories/devolucao/checklist/ensureChecklist.factory";
import { makeGoBackChecklistStepUseCase } from "@/factories/devolucao/checklist/goBackChecklistStep.factory";
import { makeUpdateChecklistFieldUseCase } from "@/factories/devolucao/checklist/updateChecklistFieldUseCase";
import { create } from "zustand";

interface ChecklistStore {
  checklist: ChecklistRecord | null;
  isLoading: boolean;
  error: string | null;
  
  loadChecklist: (demandId: string) => Promise<void>;
  updateField: <K extends keyof ChecklistData>(
    field: K,
    value: ChecklistData[K]
  ) => Promise<void>;
  advanceStep: () => Promise<void>;
  goBackStep: () => Promise<void>;
}


export const useChecklistStore = create<ChecklistStore>((set, get) => {

  const ensureChecklistUseCase = makeEnsureChecklistUseCase();
  const updateChecklistFieldUseCase = makeUpdateChecklistFieldUseCase();
  const goBackChecklistStepUseCase = makeGoBackChecklistStepUseCase();


  return {
    checklist: null,
    isLoading: false,
    error: null,
    steps: [],
    loadChecklist: async (demandId: string) => {
      const state = get();
      // Se já estiver carregando ou se o checklist atual já for desse ID, ignore
      if (state.isLoading || state.checklist?.demandaId === demandId) return;
    
      set({ isLoading: true });
      try {
        const checklist = await ensureChecklistUseCase.execute(demandId);
        set({ checklist, isLoading: false, error: null });
      } catch {
        set({ isLoading: false, error: 'Erro ao carregar checklist' });
      }
    },

    async updateField(field, value) {
      const checklist = get().checklist;
      if (!checklist) return;
  
      const updatedChecklist = await updateChecklistFieldUseCase.execute({
        demandId: checklist.demandaId,
        field,
        value,
      });
  
      set({ checklist: updatedChecklist });
    },

    async advanceStep() {
      const checklist = get().checklist;
      if (!checklist) return;

      const advanceChecklistStepUseCase = makeAdvanceChecklistStepUseCase();
      const updatedChecklist = await advanceChecklistStepUseCase.execute(checklist.demandaId);
      set({ checklist: updatedChecklist });
    },
    goBackStep: async () => {
      const checklist = get().checklist;
      if (!checklist) return;

      try {
        const updatedChecklist = await goBackChecklistStepUseCase.execute(checklist.demandaId);
        set({ checklist: updatedChecklist });
      } catch (err) {
        console.error(err);
        set({ error: "Erro ao voltar etapa" });
      }
    },
  }
})