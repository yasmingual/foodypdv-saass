
import { create } from "zustand";
import { UserData } from "@/components/user/UserProfile";

interface UserStore {
  user: UserData;
  isAuthenticated: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
  updateProfile: (userData: Partial<UserData>) => void;
}

// Dados do usuário padrão (em produção, isso viria do backend)
const defaultUser: UserData = {
  id: "1",
  name: "Administrador",
  email: "admin@foodpos.com",
  role: "Gerente",
  createdAt: "2025-01-01T00:00:00Z",
};

export const useUserStore = create<UserStore>((set) => ({
  user: defaultUser,
  isAuthenticated: true, // Por padrão iniciamos como autenticado para demonstração
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => {
    // Em produção, aqui limparíamos tokens e dados de sessão
    // Redirecionamos para a página de login após logout
    window.location.href = "/landing";
    set({ isAuthenticated: false });
  },
  updateProfile: (userData) =>
    set((state) => ({ user: { ...state.user, ...userData } })),
}));
