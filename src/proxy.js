import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "./lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";



// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
const user = session?.user
if(!user){
    return NextResponse.redirect(new URL('/sign-in', request.url))
}


  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/profile', '/products/:path'],
}