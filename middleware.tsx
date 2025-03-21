import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const path = request.nextUrl.pathname

  // Allow public routes
  if (
    path === '/landingpage' ||
    path === '/auth/error' ||
    path.startsWith('/api/auth')
  ) {
    if (token && path === '/landingpage') {
      return NextResponse.redirect(new URL('/datastore/browse', request.url))
    }
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/landingpage', request.url))
  }

  // Check role-based access
  if (!token.role) {
    return NextResponse.redirect(new URL('/auth/error', request.url))
  }

  // Allow authenticated and authorized users to access protected routes
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
