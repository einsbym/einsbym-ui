'use server';

import { UserType } from '@/types/types';
import { cookies } from 'next/headers';

export async function createUserCookie(user: any) {
    const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000; // Milliseconds in 2 days

    cookies().set('currentUser', JSON.stringify(user), {
        maxAge: twoDaysInMilliseconds,
    });
}

export async function createAccessTokenCookie(token: string) {
    const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000; // Milliseconds in 2 days

    cookies().set('accessToken', JSON.stringify(token), {
        maxAge: twoDaysInMilliseconds,
    });
}

export async function getAccessTokenFromCookie() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');

    return accessToken;
}

export async function getCurrentUserFromCookie() {
    const cookieStore = cookies();
    const currentUser = cookieStore.get('currentUser');

    if (currentUser) {
        return JSON.parse(currentUser.value) as UserType;
    }

    return null;
}

export async function deleteCookies() {
    cookies().delete('currentUser');
    cookies().delete('accessToken');
}
