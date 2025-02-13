import { create } from 'zustand';

export const useDialogStore = create((set) => ({
    open: false,
    selected: null,
    setOpen: (isOpen) => set({ open: isOpen }),
    setSelected: (data) => set({ selected: data }),
}));
