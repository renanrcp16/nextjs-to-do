import prisma from "@/prisma/client";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ listId: number; listItemId: number }> }
) {
  let listId = (await params).listId;
  let listItemId = (await params).listItemId;

  if (!Number.isInteger(+listId) || !Number.isInteger(+listItemId)) {
    return new Response(
      JSON.stringify({ ok: false, message: "Invalid id type." }),
      {
        status: 400,
      }
    );
  }

  listId = +listId;
  listItemId = +listItemId;

  const list = await prisma.listItem.findUnique({
    where: {
      id: listItemId,
      AND: {
        listId,
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

  await prisma.listItem.delete({
    where: {
      id: listItemId,
      AND: {
        listId,
      },
    },
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
  });
}
