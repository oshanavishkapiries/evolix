import { create } from "zustand";

interface User {
  localId: string;
  email: string;
  displayName: string;
  photoURL: string;
  roles: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void ;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));

export default useUserStore;
