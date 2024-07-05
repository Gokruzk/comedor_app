import { UserSt } from "@/types";
import { create } from "zustand";

const useStore = create<UserSt>((set) => ({
  email: null,
  authUser: (email: string) => set({ email }),
  removeSession: () => set({ email: null }),
}));

export default useStore;
