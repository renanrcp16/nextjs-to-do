import { Wrapper } from "@/components/ui/wrapper";
import { headers } from "next/headers";
import Link from "next/link";

export default async function NotFoundPage() {
  const headersList = await headers();
  const referer = headersList.get("x-url");
  let pathname = "";

  if (referer) {
    pathname = new URL(referer).pathname;
  }

  return (
    <main className="flex-1">
      <Wrapper className="w-full h-full flex justify-center items-center">
        <div className="text-zinc-300 flex flex-col gap-2 items-center -mt-20">
          <h2 className="text-[10rem] font-bold text-zinc-600">404</h2>
          <p className="-mt-10">Ops, could not find the specified page!</p>
          <p
            title={pathname}
            className="p-2 bg-zinc-900 rounded-lg text-center w-96 truncate"
          >
            {pathname}
          </p>
          <Link
            href={"/"}
            className="text-center inline-block w-full hover:text-zinc-400 transition-colors"
          >
            Back to initial page
          </Link>
        </div>
      </Wrapper>
    </main>
  );
}
