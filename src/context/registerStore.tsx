import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";

export type TRegister = {
  id: string;
  name: string;
  myEvents: string;
  otherEvents: string;
  actionsThatBroughtMe: { desc: string }[];
  actionsIWillTake: { desc: string }[];
  apprenticeship: string;
  createdAt: Date;
};

export interface RegisterState {
  register: TRegister;
}

export interface RegisterStore extends RegisterState {
  fill: (register: TRegister) => void;
  new: (name: string) => void;
  editedEvents: (myEvents: string, otherEvents: string) => void;
  editedActions: (
    actionHappend: { desc: string }[],
    actionsWillHappen: { desc: string }[]
  ) => void;
  editedApprenticeship: (text: string) => void;
}

const defaultInitialState: RegisterState = {
  register: {
    id: "",
    name: "",
    myEvents: "",
    otherEvents: "",
    actionsThatBroughtMe: [{ desc: "" }],
    actionsIWillTake: [{ desc: "" }],
    apprenticeship: "",
    createdAt: new Date(),
  },
};

// Factory de store
export const createRegisterStore = (
  initialProps: RegisterState = defaultInitialState
) => {
  return create<RegisterStore>()(
    persist(
      (set) => ({
        ...initialProps,
        fill: (register) => set(() => ({ register })),
        new: (name) =>
          set(() => ({
            register: {
              id: uuidv4(),
              name,
              myEvents: "",
              otherEvents: "",
              actionsIWillTake: [],
              actionsThatBroughtMe: [],
              apprenticeship: "",
              createdAt: new Date(),
            },
          })),
        editedEvents: (myEvents, otherEvents) =>
          set((state) => ({
            register: {
              ...state.register,
              myEvents,
              otherEvents,
            },
          })),
        editedActions: (actionsThatBroughtMe, actionsIWillTake) =>
          set((state) => ({
            register: {
              ...state.register,
              actionsThatBroughtMe,
              actionsIWillTake,
            },
          })),
        editedApprenticeship: (text) =>
          set((state) => ({
            register: {
              ...state.register,
              apprenticeship: text,
            },
          })),
      }),
      {
        name: "register-store",
      }
    )
  );
};

export type RegisterStoreApi = ReturnType<typeof createRegisterStore>;
