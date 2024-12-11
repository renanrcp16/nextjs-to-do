import prisma from "@/prisma/client";

export async function GET(
  _: Request,
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
    select: {
      id: true,
      description: true,
      items: {
        select: {
          id: true,
          description: true,
          finished: true,
        },
      },
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

  return new Response(JSON.stringify({ ok: true, data: list }), {
    status: 200,
  });
}

export async function DELETE(
  _: Request,
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

  await prisma.list.delete({ where: { id: listId } });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
  });
}
