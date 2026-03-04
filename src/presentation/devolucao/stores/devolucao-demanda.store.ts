import { create } from 'zustand';

import type { DemandLocalRecord } from '@/_shared/db/database-local';

interface DemandListState {
  demands: DemandLocalRecord[];
  isLoading: boolean;
  error: string | null;
  loadDemands: (centerId: DemandLocalRecord[]) => Promise<void>;
}

export const useDemandListStore = create<DemandListState>((set) => ({
  demands: [],
  isLoading: false,
  error: null,
  loadDemands: async (data: DemandLocalRecord[]) => {
    set({ isLoading: false, demands: data });
  },
}));