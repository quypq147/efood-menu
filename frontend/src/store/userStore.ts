import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: number;
  fullname: string;
  email: string;
  roleId: number;
  roleName: string;
};

type UserState = {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'user-store', // ⬅ tên key lưu vào localStorage
    }
  )
);


