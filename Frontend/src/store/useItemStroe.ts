import { create } from "zustand";

export const useAddOrSubQuentity = create((set: any,get:any) => ({
  item: 1,

  addQue:  (item: number) => {
    set({item: get().item + 1});
  },
    subQue:  (item: number) => {
    set({ item: get().item - 1 });
  },

}));

