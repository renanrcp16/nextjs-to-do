import { ToDoForm } from "@/components/todo-form";
import { appRoute } from "@/lib/constants";
import { TToDoList } from "@/types/sidebar-list";
import { notFound } from "next/navigation";

export default async function UpdateListPage({
  params,
}: {
  params: Promise<{ listId: number }>;
}) {
  const listId = (await params).listId;
  const response = await fetch(`${appRoute}/api/lists/${listId}`);
  const result = await response.json();

  if (!result.ok) {
    notFound();
  }

  return (
    <main className="flex-1 flex flex-col gap-3">
      <ToDoForm listId={listId} data={result.data as TToDoList} />
    </main>
  );
}
