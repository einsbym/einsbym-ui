'use server';

import { User } from '@/interfaces/interfaces';
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

export async function getCurrentUserFromCookie() {
    const cookieStore = cookies();
    const currentUser = cookieStore.get('currentUser');

    if (currentUser) {
        return JSON.parse(currentUser.value) as User;
    }

    return null;
}
