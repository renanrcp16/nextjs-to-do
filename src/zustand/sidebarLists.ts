import { create } from "zustand";
import { appRoute } from "@/lib/constants";
import { TToDoList } from "@/types/sidebar-list";

type SidebarListStore = {
  sidebarList: TToDoList[];
  removeSidebarItem: (id: number) => void;
  refreshData: () => Promise<void>;
};

export const useSidebarList = create<SidebarListStore>((set) => ({
  sidebarList: [],

  removeSidebarItem: (id) =>
    set((state) => ({
      sidebarList: state.sidebarList.filter((item) => item.id !== id),
    })),

  refreshData: async () => {
    const response = await fetch(appRoute + "/api/lists", {
      cache: "no-cache",
    });
    const result = await response.json();

    if (result.ok) {
      set({ sidebarList: result.data });
    } else {
      set({ sidebarList: [] });
    }
  },
}));
