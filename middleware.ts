import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  // Check if user has required role
  const hasValidRole = token?.role !== null
  const isAuthPage = request.nextUrl.pathname === '/landingpage'
  const isApiAuthRoute = request.nextUrl.pathname.startsWith('/api/auth')

  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  if (isAuthPage) {
    if (token && hasValidRole) {
      return NextResponse.redirect(new URL('/datastore/browse', request.url))
    }
    return NextResponse.next()
  }

  if (!token || !hasValidRole) {
    return NextResponse.redirect(new URL('/landingpage', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
