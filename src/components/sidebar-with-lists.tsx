"use client";

import { List, Plus } from "lucide-react";
import { Sidebar } from "./ui/sidebar";
import { useSidebarList } from "@/zustand/sidebarLists";
import { useRef } from "react";
import { appRoute } from "@/lib/constants";
import { redirect } from "next/navigation";

export function SidebarWithLists() {
  const { sidebarList, refreshData, removeSidebarItem } = useSidebarList();
  const loaded = useRef(false);

  if (!loaded.current) {
    loaded.current = true;
    refreshData();
  }

  return (
    <Sidebar>
      <Sidebar.List className="h-fit">
        <Sidebar.List.Header
          icon={Plus}
          href="/lists/create"
          description="Add List"
        />
      </Sidebar.List>
      <hr className="border-zinc-700 my-1" />
      <Sidebar.List>
        {sidebarList.map((r) => (
          <Sidebar.List.Item
            description={r.description}
            key={r.id}
            icon={List}
            href={`/lists/${r.id}/update`}
            onDelete={() => {
              fetch(`${appRoute}/api/lists/${r.id}`, {
                method: "DELETE",
              }).then(async (response) => {
                const result = await response.json();

                if (result.ok) {
                  removeSidebarItem(r.id);
                  redirect("/");
                }
              });
            }}
          />
        ))}
      </Sidebar.List>
    </Sidebar>
  );
}
