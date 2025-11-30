import prisma from "@/lib/prisma";
import {  getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const { userId } = await getAuth(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const query = request.nextUrl.searchParams;

    const page = parseInt(query.get("page") ?? "1");
    const limit = parseInt(query.get("limit") ?? "10");
    const search = query.get("serach") ?? "";

    const todos = await prisma.todo.findMany(
      {
        where: {
          userId: userId,
          title: {
            contains: search,
            mode: "insensitive"
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }
    )

    const totalCount = await prisma.todo.count({
      where: {
        userId: userId,
      }
    });

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      todos,
      totalCount,
      totalPages,
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({
      message: error.messsage ?? "Internal Server Error",
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await getAuth(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title } = await request.json();
    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isSubscribe = user.isSubscribe;
    const todosCount = await prisma.todo.count({
      where: {
        userId: userId
      }
    })

    if (!isSubscribe && todosCount >= 3) {
      return NextResponse.json({ message: "Upgrade your plan to add more todos" }, { status: 403 });
    }

    const newTodo = await prisma.todo.create({
      data: {
        title,
        userId,
      }
    })

    return NextResponse.json(newTodo, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({
      message: error.message ?? "Internal Server Error",
    }, { status: 500 })
  }
}