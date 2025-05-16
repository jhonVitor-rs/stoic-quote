"use client";

import { useStore } from "zustand";
import { createContext, useContext, useRef } from "react";
import {
  createRegisterStore,
  RegisterStore,
  RegisterStoreApi,
} from "./registerStore";

const RegisterStoreContext = createContext<RegisterStoreApi | undefined>(
  undefined
);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const store = useRef<RegisterStoreApi | null>(null);
  if (store.current === null) {
    store.current = createRegisterStore();
  }

  return (
    <RegisterStoreContext.Provider value={store.current}>
      {children}
    </RegisterStoreContext.Provider>
  );
}

export const useRegisterStore = <T,>(
  selector: (store: RegisterStore) => T
): T => {
  const registerStoreContext = useContext(RegisterStoreContext);

  if (!registerStoreContext) {
    throw new Error("useRegisterStore must bu used within ContextProvider");
  }

  return useStore(registerStoreContext, selector);
};
