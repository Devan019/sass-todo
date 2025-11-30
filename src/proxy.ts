import { clerkMiddleware, clerkClient } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const PublicRoutes = ['/sign-in', '/sign-up', "/","/api/webhooks/register"]

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth()

  const path = req.nextUrl.pathname

  if (!userId && !PublicRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }
  
  if (userId) {
    const user = await (await clerkClient()).users.getUser(userId)
    
    const role = user.publicMetadata.role as string | undefined

    if (role === "admin" && PublicRoutes.includes(path)) {
      return NextResponse.redirect(new URL('/admin-dashboard', req.url))
    }

    if(role !== "admin" && path.includes("admin")){
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    if(role === "admin" && path === "/dashboard"){
      return NextResponse.redirect(new URL('/admin-dashboard', req.url))
    }

    if (PublicRoutes.includes(path)) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
