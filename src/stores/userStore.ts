
import { create } from "zustand";
import { UserData } from "@/components/user/UserProfile";

interface UserStore {
  user: UserData | null;
  isAuthenticated: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
  updateProfile: (userData: Partial<UserData>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false, // Começar como não autenticado
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => {
    // Limpar dados do usuário e redirecionar
    set({ user: null, isAuthenticated: false });
    window.location.href = "/landing";
  },
  updateProfile: (userData) =>
    set((state) => ({ 
      user: state.user ? { ...state.user, ...userData } : null 
    })),
}));
