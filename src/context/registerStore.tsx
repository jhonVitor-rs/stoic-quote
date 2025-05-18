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
  dialy: TRegister[];
}

export interface RegisterStore extends RegisterState {
  fill: (register: TRegister) => void;
  new: (name: string) => TRegister;
  editedEvents: (myEvents: string, otherEvents: string) => void;
  editedActions: (
    actionHappend: { desc: string }[],
    actionsWillHappen: { desc: string }[]
  ) => void;
  editedApprenticeship: (text: string) => void;
  getRegister: (id: string) => TRegister | null;
  deleteRegister: (id: string) => void;
}

const defaultInitialState: RegisterState = {
  dialy: [],
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
      (set, get) => ({
        ...initialProps,
        fill: (register) => set(() => ({ register })),
        new: (name) => {
          const newRegister: TRegister = {
            id: uuidv4(),
            name,
            myEvents: "",
            otherEvents: "",
            actionsIWillTake: [],
            actionsThatBroughtMe: [],
            apprenticeship: "",
            createdAt: new Date(),
          };
          set(() => ({
            register: newRegister,
            dialy: [...initialProps.dialy, newRegister],
          }));
          return newRegister;
        },
        editedEvents: (myEvents, otherEvents) =>
          set((state) => {
            const updatedDialy = state.dialy.map((item) =>
              item.id === state.register.id
                ? { ...item, myEvents, otherEvents }
                : item
            );

            return {
              register: {
                ...state.register,
                myEvents,
                otherEvents,
              },
              dialy: updatedDialy,
            };
          }),
        editedActions: (actionsThatBroughtMe, actionsIWillTake) =>
          set((state) => {
            const updatedDialy = state.dialy.map((item) =>
              item.id === state.register.id
                ? { ...item, actionsThatBroughtMe, actionsIWillTake }
                : item
            );

            return {
              register: {
                ...state.register,
                actionsThatBroughtMe,
                actionsIWillTake,
              },
              dialy: updatedDialy,
            };
          }),
        editedApprenticeship: (text) =>
          set((state) => {
            const updatedDialy = state.dialy.map((item) =>
              item.id === state.register.id
                ? { ...item, apprenticeship: text }
                : item
            );

            return {
              register: {
                ...state.register,
                apprenticeship: text,
              },
              dialy: updatedDialy,
            };
          }),
        getRegister: (id) => {
          const currentState = get();
          const register = currentState.dialy.find((r) => r.id === id);

          if (register) {
            set(() => ({ register }));
            return register;
          }
          return null;
        },

        deleteRegister: (id) => {
          const currentState = get();
          const newDialy = currentState.dialy.filter((r) => r.id !== id);
          set(() => ({ dialy: newDialy }));
        },
      }),
      {
        name: "register-store",
      }
    )
  );
};

export type RegisterStoreApi = ReturnType<typeof createRegisterStore>;
