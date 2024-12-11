"use client";

import React, { useState } from "react";
import { Wrapper } from "./ui/wrapper";
import { Circle, CircleCheck, Trash } from "lucide-react";
import { appRoute } from "@/lib/constants";
import { useSidebarList } from "@/zustand/sidebarLists";
import { TToDoList } from "@/types/sidebar-list";

type TTodoForm = {
  listId: number;
  data: TToDoList;
};

export function ToDoForm({ listId, data }: TTodoForm) {
  const [items, setItems] = useState(data.items);
  const { refreshData } = useSidebarList();

  async function append() {
    const response = await fetch(`${appRoute}/api/lists/${listId}/items`, {
      method: "POST",
      body: JSON.stringify({ description: "", listId }),
    });

    const result = await response.json();

    if (result.ok) {
      setItems(() => [...items, { description: "", id: result.data.id }]);
    }
  }

  async function remove(listItemId: number) {
    const response = await fetch(
      `${appRoute}/api/lists/${listId}/items/${listItemId}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (result.ok) {
      setItems(() => items.filter((i) => i.id !== listItemId));
    }
  }

  function auto_grow(element: HTMLTextAreaElement) {
    element.style.height = "9px";
    element.style.height = element.scrollHeight + "px";
  }

  const organizedItems = items.sort((i) => (i.finished ? 1 : -1));

  return (
    <div className="flex-1 flex flex-col gap-3 overflow-hidden">
      <Wrapper className="w-full h-16 flex px-5">
        <input
          type="text"
          className="bg-transparent outline-none text-lg w-full"
          defaultValue={data.description}
          onBlur={(e) => {
            const value = e.target.value;
            fetch(`${appRoute}/api/lists/${listId}/update-description`, {
              method: "PATCH",
              body: JSON.stringify({ description: value }),
            }).then(() => {
              refreshData();
            });
          }}
        />
        <button
          type="button"
          className="
            w-32 bg-green-600 hover:brightness-90 focus-visible:brightness-90 active:brightness-[.8]
            outline-none rounded-lg transition-all
          "
          onClick={() => append()}
        >
          Add Item
        </button>
      </Wrapper>
      <Wrapper className="w-full h-full flex flex-col gap-3 overflow-auto">
        {organizedItems.map((item, index, arr) => (
          <div key={item.id} className="flex gap-1 items-center">
            <input
              type="checkbox"
              defaultChecked={item.finished}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => {
                const value = !item.finished;

                fetch(
                  `${appRoute}/api/lists/${listId}/items/${item.id}/update-finished`,
                  {
                    method: "PATCH",
                    body: JSON.stringify({ finished: value }),
                  }
                ).then(() => {
                  setItems(() =>
                    items.map((i) => {
                      if (i.id === item.id) {
                        return {
                          ...i,
                          finished: value,
                        };
                      }

                      return i;
                    })
                  );
                });
              }}
            >
              {item.finished ? (
                <CircleCheck className="text-green-600" />
              ) : (
                <Circle className="text-zinc-500" />
              )}
            </button>
            <textarea
              placeholder="Describe your task"
              defaultValue={item.description}
              rows={1}
              onInput={(e) => auto_grow(e.currentTarget)}
              className="
                w-full border-b border-zinc-500 bg-transparent outline-none border-spacing-2 p-1 resize-none 
                h-[32px] overflow-hidden
              "
              onBlur={(e) => {
                const value = e.target.value;
                fetch(
                  `${appRoute}/api/lists/${listId}/items/${item.id}/update-description`,
                  {
                    method: "PATCH",
                    body: JSON.stringify({ description: value }),
                  }
                );
              }}
            />

            <button
              type="button"
              onClick={() => remove(item.id)}
              disabled={arr.length === 1}
              className="
                  text-zinc-400 w-8 flex justify-center outline-none enabled:hover:text-red-500 
                  enabled:focus-visible:text-red-700 enabled:active:text-red-700 transition-colors
                  disabled:opacity-60
                "
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
      </Wrapper>
    </div>
  );
}
