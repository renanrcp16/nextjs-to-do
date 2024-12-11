import Link from "next/link";
import { ComponentProps, ElementType } from "react";
import { twMerge } from "tailwind-merge";
import { Wrapper } from "./wrapper";
import { Trash } from "lucide-react";

type TSidebarListHeader = ComponentProps<"a"> & {
  href: string;
  description: string;
  icon: ElementType;
};

type TSidebarListItem = TSidebarListHeader & {
  onDelete: () => void;
};

export function Sidebar({
  className,
  children,
  ...props
}: ComponentProps<"aside">) {
  return (
    <aside
      className={twMerge("w-60 h-full overflow-hidden", className)}
      {...props}
    >
      <Wrapper className="h-full w-full">{children}</Wrapper>
    </aside>
  );
}

function SidebarList({ className, children, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={twMerge("flex flex-col gap-1 overflow-auto h-full", className)}
      {...props}
    >
      {children}
    </ul>
  );
}

function SidebarListHeader({
  className,
  description,
  href,
  icon: Icon,
  ...props
}: TSidebarListHeader) {
  return (
    <li>
      <Link
        href={href}
        className={twMerge(
          "w-full flex items-center text-nowrap truncate gap-1 p-2 rounded-lg outline-none focus-visible:bg-zinc-700/60 transition-colors hover:bg-zinc-700/60",
          className
        )}
        {...props}
      >
        <Icon size={20} />
        <span>{description}</span>
      </Link>
    </li>
  );
}

function SidebarListItem({
  className,
  description,
  href,
  icon: Icon,
  onDelete,
  ...props
}: TSidebarListItem) {
  return (
    <li className="flex focus-within:bg-zinc-700/60 rounded-lg hover:bg-zinc-700/60">
      <Link
        href={href}
        title={description}
        className={twMerge(
          "w-full flex items-center gap-1 outline-none transition-colors p-2",
          className
        )}
        {...props}
      >
        <Icon size={20} />
        <span className="text-nowrap max-w-32 truncate">{description}</span>
      </Link>
      <button
        type="button"
        className="flex justify-center items-center"
        onClick={onDelete}
      >
        <Trash
          size={16}
          className="
            text-zinc-400 hover:text-red-500 focus-visible:text-red-700 
            active:text-red-700 transition-colors disabled:opacity-60 w-10
          "
        />
      </button>
    </li>
  );
}

SidebarList.Item = SidebarListItem;
SidebarList.Header = SidebarListHeader;
Sidebar.List = SidebarList;
