'use client';

import { deleteCookies, getAccessTokenFromCookie } from '@/actions/cookies';
import { apiUrl } from '@/constants/constants';
import { AuthService } from '@/services/auth-config';
import { ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
    ApolloNextAppProvider,
    NextSSRApolloClient,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

function useClient() {
    const router = useRouter();
    const httpLink = new HttpLink({
        uri: apiUrl,
    });

    const authMiddleware = setContext(async (operation) => {
        const cookie = await getAccessTokenFromCookie();

        if (cookie) {
            const token = cookie.value.replace(/^"(.*)"$/, '$1');
            try {
                // Decode the token without verifying signature
                const decodedToken = jwt.decode(token);
                if (typeof decodedToken === 'string') {
                    throw new Error('Token is not valid');
                }

                // Assert the type of decodedToken to access 'exp' property
                const { exp } = decodedToken as { exp: number };
                const currentTime = Math.floor(Date.now() / 1000);

                // Check if the token is expired
                if (exp < currentTime) {
                    await new AuthService().signOut(router);
                }

                return {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            } catch (error) {
                // Delete cookies
                await deleteCookies();

                console.error('Token error:', error);
                throw new Error('Token is not valid or has expired');
            }
        }

        return {};
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      authMiddleware,
                      httpLink,
                  ])
                : ApolloLink.from([authMiddleware, httpLink]),
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return <ApolloNextAppProvider makeClient={useClient}>{children}</ApolloNextAppProvider>;
}
