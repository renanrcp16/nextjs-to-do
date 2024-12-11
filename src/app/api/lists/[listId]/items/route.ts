import prisma from "@/prisma/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: { description: string; listId: number } = await req.json();

    let listId = body.listId;

    if (!Number.isInteger(+listId)) {
      return new Response(
        JSON.stringify({ ok: false, message: "Invalid id type." }),
        {
          status: 400,
        }
      );
    }

    listId = +listId;

    const response = await prisma.listItem.create({
      data: {
        description: body.description,
        listId,
      },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        data: { id: response.id, description: response.description },
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: error,
      }),
      {
        status: 500,
      }
    );
  }
}
