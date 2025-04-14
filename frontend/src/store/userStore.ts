import { create } from 'zustand';

type User = {
  id: number;
  name: string;
  email: string;
  role?: {
    id: number;
    name: string;
  };
};

interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  user: null,
  setUser: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

