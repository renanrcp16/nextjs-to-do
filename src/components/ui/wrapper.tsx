import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Wrapper({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={twMerge("p-3 rounded-2xl bg-zinc-800/90 ", className)}
      {...props}
    >
      {children}
    </div>
  );
}
