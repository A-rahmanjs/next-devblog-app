import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const protectedRoutes = ['/blog', '/create'];
const publicRoutes = ['/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('isAuthenticated')?.value;
  const isAuthenticated = authToken === 'true' || 
    (request.headers.get('cookie')?.includes('isAuthenticated=true') || 
     request.headers.get('x-auth-token') === 'true');

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {

      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (publicRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/blog', request.url));
  }
  return NextResponse.next();
}
