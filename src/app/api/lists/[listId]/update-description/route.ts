import prisma from "@/prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ listId: number }> }
) {
  let listId = (await params).listId;

  if (!Number.isInteger(+listId)) {
    return new Response(
      JSON.stringify({ ok: false, message: "Invalid id type." }),
      {
        status: 400,
      }
    );
  }

  listId = +listId;
  const list = await prisma.list.findUnique({
    where: {
      id: listId,
    },
  });

  if (!list) {
    return new Response(
      JSON.stringify({ ok: false, message: "Could not find specified id." }),
      {
        status: 404,
      }
    );
  }

  const body = await req.json();
  const description = body.description;

  if (!description) {
    return new Response(
      JSON.stringify({ ok: false, message: "Bad request." }),
      {
        status: 400,
      }
    );
  }

  await prisma.list.update({
    where: { id: listId },
    data: {
      description: body.description,
    },
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
  });
}
