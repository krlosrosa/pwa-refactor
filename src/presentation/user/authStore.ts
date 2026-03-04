import { create } from "zustand";
import type { AuthUser } from "@/domain/auth/model/AuthUser";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  centerSelected: string | null;
  setUser(user: AuthUser | null): void;
  setCenterSelected(center: string): void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  centerSelected: null,
  setCenterSelected: (center) =>
    set({
      centerSelected: center,
    }),
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
}));
