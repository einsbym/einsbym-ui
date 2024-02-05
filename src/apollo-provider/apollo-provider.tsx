'use client';

import { apiUrl } from '@/app/constants/constants';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { setContext } from '@apollo/client/link/context';
import { getAccessTokenFromCookie } from '@/actions/actions';

function makeClient() {
    const httpLink = new HttpLink({
        uri: apiUrl,
    });

    const authMiddleware = setContext(async (operation) => {
        const cookie = await getAccessTokenFromCookie();

        return {
            // Make sure to actually set the headers here
            headers: {
                Authorization: cookie ? `Bearer ${cookie.value}` : '',
            },
        };
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
    return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
