import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ["/profile"];
const authRoutes = ["/auth/login"];
const publicRoutes = ["/about", "/"];

export function middleware(request: NextRequest) {
    console.log("MIDDLEWARE IS WORKING:", request);

    const currentUser = request.cookies.get('currentUser')?.value;

    if (
        protectedRoutes.includes(request.nextUrl.pathname) &&
        (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
    ) {
        request.cookies.delete('currentUser');
        const response = NextResponse.redirect(new URL('/auth/login', request.url));
        response.cookies.delete('currentUser');

        return response;
    }

    if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }
}
