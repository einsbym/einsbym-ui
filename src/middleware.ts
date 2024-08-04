import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = [
    /^\/profile(?:\/.*)?$/, // Matches /profile and any sub-paths like /profile/settings
    /^\/videos$/, // Matches /videos
    /^\/blog\/management$/, // Matches /blog and any sub-paths like /blog/management
    /^\/view-image(?:\/.*)?$/, // Matches /view-image and any sub-paths
];
const authRoutes = ['/auth/signin'];
const publicRoutes = ['/', '/about', '/blog'];

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('currentUser')?.value;

    const isProtectedRoute = protectedRoutes.some((route) => route.test(request.nextUrl.pathname));
    const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

    if (isProtectedRoute && (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)) {
        request.cookies.delete('currentUser');

        const response = NextResponse.redirect(new URL('/auth/signin', request.url));

        response.cookies.set({ name: 'lastAccessedUrl', value: request.nextUrl.pathname });
        response.cookies.delete('currentUser');

        return response;
    }

    if (isAuthRoute && currentUser) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }
}
