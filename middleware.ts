import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token
  const isAuthPage = request.nextUrl.pathname === '/landingpage'
  const isApiAuthRoute = request.nextUrl.pathname.startsWith('/api/auth')

  // Allow auth-related API routes
  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/datastore/browse', request.url))
    }
    return NextResponse.next()
  }

  // Protect all other routes
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/landingpage', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
