import { create } from "zustand";

export type User = {
    email: string,
    senha: string,
}

type DataState = {
    user: User;
    setPageOne: (data: Omit<User, "gender" | "objective" | "level">) => void;
}

export const userDataStore = create<DataState>((set) => ({
    user: {
        email: "",
        senha: "",
    },
    setPageOne: (data) => set((state) => ({ user: {...state.user, ...data} })),
}))