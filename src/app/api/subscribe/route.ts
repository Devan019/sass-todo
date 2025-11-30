import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await getAuth(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    // TODO: Implement subscription retrieval logic here

    const newDate = new Date();
    newDate.setMonth(newDate.getMonth() + 1); // Set subscription to expire in 1 month

    const user = await prisma.user.update({
      where:{
        id: userId
      },
      data:{
        isSubscribe: true,
        SubscriptionEnd: newDate
      }
    })


    return NextResponse.json(user, {status:200});

  } catch (error:any) {
    return NextResponse.json({
      message: "Internal Server Error",
    }, { status: 500 })
  }
}