'use server';

import { cookies } from 'next/headers';

export async function createUserCookie(user: any) {
    cookies().set('currentUser', JSON.stringify(user));
}
