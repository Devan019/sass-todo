import prisma from "@/lib/prisma";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await getAuth(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const admin = (await clerkClient()).users.getUser(userId);
    const {role} = (await admin).publicMetadata;

    if(role !== "admin"){
      return NextResponse.json({message : "Forbidden"}, {status:403});
    }

    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
    }, { status: 500 })
  }
}