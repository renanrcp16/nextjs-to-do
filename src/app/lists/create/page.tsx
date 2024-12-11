"use client";

import { Wrapper } from "@/components/ui/wrapper";
import { appRoute } from "@/lib/constants";
import { useSidebarList } from "@/zustand/sidebarLists";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function NewListPage() {
  const { refreshData } = useSidebarList();
  const loaded = useRef(false);
  const router = useRouter();

  if (!loaded.current) {
    loaded.current = true;

    fetch(`${appRoute}/api/lists`, {
      method: "POST",
      body: JSON.stringify({ description: "New list" }),
    }).then(async (response) => {
      const result = await response.json();
      await refreshData();
      router.push(`/lists/${result.data.id}/update`);
    });
  }

  return (
    <main className="flex-1 flex flex-col gap-3">
      <Wrapper className="w-full h-16 animate-pulse"></Wrapper>
      <Wrapper className="w-full h-full animate-pulse"></Wrapper>
    </main>
  );
}
