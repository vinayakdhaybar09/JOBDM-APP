import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Custom JWT Authentication Middleware
 * Note: Since tokens are stored in localStorage (client-side only),
 * the actual authentication check is handled in the dashboard layout component.
 * This middleware only ensures the route matcher is configured correctly.
 * 
 * The dashboard layout will check localStorage and redirect if needed.
 */
export function middleware(request: NextRequest) {
  // All authentication logic is handled client-side in dashboard layout
  // This middleware just ensures the route is matched
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*'
  ]
};
