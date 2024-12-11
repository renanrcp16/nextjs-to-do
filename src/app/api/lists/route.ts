import prisma from "@/prisma/client";
import { TToDoList } from "@/types/sidebar-list";
import { NextRequest } from "next/server";

export async function GET() {
  const data = await prisma.list.findMany({
    select: {
      id: true,
      description: true,
    },
  });

  return new Response(JSON.stringify({ ok: true, data }), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body: TToDoList = await req.json();

    const response = await prisma.list.create({
      data: {
        description: body.description,
        items: {
          create: [{ description: "" }],
        },
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
