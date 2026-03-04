import { create } from "zustand";

export interface FiltroStore {
  hasAnomaly: boolean;
  hasDivergence: boolean;
  isChecked: boolean;
  notChecked: boolean;
  isExtra: boolean;
  sku: string;
  tipoDevolucao: 'DEVOLUCAO' | 'REENTREGA';

  setHasAnomaly: (hasAnomaly: boolean) => void;
  setHasDivergence: (hasDivergence: boolean) => void;
  setIsChecked: (isChecked: boolean) => void;
  setNotChecked: (notChecked: boolean) => void;
  setIsExtra: (isExtra: boolean) => void;
  setSku: (sku: string) => void;
  setReentrega: (reentrega: boolean) => void;
}

export const useDevolucaoItensFiltroStore = create<FiltroStore>((set) => ({
  hasAnomaly: false,
  hasDivergence: false,
  isChecked: false,
  notChecked: false,
  isExtra: false,
  sku: '',
  tipoDevolucao: 'DEVOLUCAO',
  setReentrega: (reentrega: boolean) => set({ tipoDevolucao: reentrega ? 'REENTREGA' : 'DEVOLUCAO' }),
  setHasAnomaly: (hasAnomaly: boolean) => set({ hasAnomaly }),
  setHasDivergence: (hasDivergence: boolean) => set({ hasDivergence }),
  setIsChecked: (isChecked: boolean) => set({ isChecked }),
  setNotChecked: (notChecked: boolean) => set({ notChecked }),
  setIsExtra: (isExtra: boolean) => set({ isExtra }),
  setSku: (sku: string) => set({ sku }),
}));
