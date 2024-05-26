import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ["/", "/profile", "/videos", "/blog"];
const authRoutes = ["/auth/signin"];
const publicRoutes = ["/about"];

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('currentUser')?.value;

    if (
        protectedRoutes.includes(request.nextUrl.pathname) &&
        (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
    ) {
        request.cookies.delete('currentUser');
        const response = NextResponse.redirect(new URL('/auth/signin', request.url));
        response.cookies.delete('currentUser');

        return response;
    }

    if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }
}
