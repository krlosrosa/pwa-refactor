import { create } from "zustand";
import { makeGetConferencesByDemandIdUseCase } from "@/factories/devolucao/conferencia/getConferencesByDemandId.factory";
import type { ReturnListConferenceUi } from "@/domain/devolucao/dtos/returnListConferenceUi";

export interface ConferenceStore {
  conferences: ReturnListConferenceUi[]
  isLoading: boolean;
  error: string | null;
  loadConferences: (demandId: string) => Promise<void>;
}

export const useConferenceStore = create<ConferenceStore>((set) => ({
  conferences: [],
  isLoading: false,
  error: null,
  loadConferences: async (demandId: string) => {
    const getConferencesByDemandIdUseCase = makeGetConferencesByDemandIdUseCase();
    const conferences = await getConferencesByDemandIdUseCase.execute(demandId);
    set({ conferences });
  },
}));