import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Only protect /keystatic and /api/keystatic routes
    if (request.nextUrl.pathname.startsWith('/keystatic') || request.nextUrl.pathname.startsWith('/api/keystatic')) {
        const adminToken = request.cookies.get('admin-token');

        // If no token, redirect to login page
        if (!adminToken) {
            return NextResponse.redirect(new URL('/admin-login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/keystatic/:path*', '/api/keystatic/:path*'],
};
