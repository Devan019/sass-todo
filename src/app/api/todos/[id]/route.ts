import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest,
  {params}:{
    params: {
      id: string
    }
  }
) {
  try {
    const { userId } = await getAuth(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
        userId: userId,
      }
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
    }, { status: 500 })

  }
}

export async function DELETE(request: NextRequest,
  {params}:{
    params: {
      id: string
    }
  }
) {
  try {
    const { userId } = await getAuth(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const todo = await prisma.todo.delete({
      where: {
        id: id,
        userId: userId,
      }
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
    }, { status: 500 })

  }
}

export async function PUT(request: NextRequest,
  {params}:{
    params: {
      id: string
    }
  }
) {
  try {
    const { userId } = await getAuth(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const {title, completed} =  await request.json();

    const todo = await prisma.todo.update({
      where: {
        id: id,
        userId: userId,
      },
      data:{
        title,
        completed,
      }
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
    }, { status: 500 })

  }
}

