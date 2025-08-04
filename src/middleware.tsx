import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define routes that require authentication
const protectedRoutes = ['/blog', '/create'];
const publicRoutes = ['/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Check for the auth token in cookies first, then fall back to localStorage
  const authToken = request.cookies.get('isAuthenticated')?.value;
  const isAuthenticated = authToken === 'true' || 
    (request.headers.get('cookie')?.includes('isAuthenticated=true') || 
     request.headers.get('x-auth-token') === 'true');

  // Handle protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Handle public routes when already authenticated
  if (publicRoutes.includes(pathname) && isAuthenticated) {
    // Redirect to blog if already authenticated
    return NextResponse.redirect(new URL('/blog', request.url));
  }

  return NextResponse.next();
}

// Configure which routes the middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
