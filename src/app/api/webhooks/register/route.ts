import { NextRequest, NextResponse } from "next/server";
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const evt = await verifyWebhook(req);

    if(!evt){
      return NextResponse.json({
        message : "Event not occure",
      },{status:400});
    }

    const { id } = evt.data
    const eventType = evt.type


    if(eventType === "user.created"){
      const data = evt.data;

      const  {primary_email_address_id, email_addresses} = data;
      const email = email_addresses.find((email) => email.id === primary_email_address_id);
      console.log("email founded ", email)
      
      if(!email){
        return NextResponse.json({mess : "User not found"}, {status:400})
      }

      const newUser = await prisma.user.create({
        data : {
          id : data.id,
          email : email?.email_address 
        }
      })

      return NextResponse.json(newUser, {status:201})
    }

    return NextResponse.json(evt)
  } catch (error:any) {
    console.log(error)
    return NextResponse.json({
      error: error.message,
    },{status:500})
  }
}