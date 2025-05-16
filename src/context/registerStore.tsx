import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type TRegister = {
  id: string;
  name: string;
  myEvents: string;
  otherEvents: string;
  actionsThatBroughtMe: { desc: string }[];
  actionsIWillTake: { desc: string }[];
  createdAt: Date;
};

interface RegisterState {
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
}

const defaultInitialState: RegisterState = {
  register: {
    id: "",
    name: "",
    myEvents: "",
    otherEvents: "",
    actionsThatBroughtMe: [{ desc: "" }],
    actionsIWillTake: [{ desc: "" }],
    createdAt: new Date(),
  },
};

// Factory de store
export const createRegisterStore = (
  initialProps: RegisterState = defaultInitialState
) => {
  return createStore<RegisterStore>((set) => ({
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
  }));
};

export type RegisterStoreApi = ReturnType<typeof createRegisterStore>;
