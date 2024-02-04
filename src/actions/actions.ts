'use server';

import { cookies } from 'next/headers';

export async function createUserCookie(user: any) {
    cookies().set('currentUser', JSON.stringify(user));
}

export async function createAccessTokenCookie(token: string) {
    cookies().set('accessToken', JSON.stringify(token));
}

export async function getAccessTokenFromCookie() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');

    return accessToken;
}
