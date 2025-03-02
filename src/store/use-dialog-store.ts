import { create } from "zustand";
import { StateCreator } from "zustand";

interface DialogState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

type DialogStore = StateCreator<DialogState>;

export const useDialogStore = create<DialogState>(
  (set: (fn: (state: DialogState) => DialogState) => void) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set((state) => ({ ...state, isOpen })),
  })
);
