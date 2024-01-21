'use client';

import { apiUrl } from '@/app/constants/constants';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
    const httpLink = new HttpLink({
        uri: apiUrl,
    });

    const authLink = new ApolloLink((operation, forward) => {
        if (typeof window !== 'undefined') {
            // Get the access token from local storage
            const accessToken = localStorage.getItem('accessToken');

            // Set the access token in the headers
            operation.setContext({
                headers: {
                    Authorization: accessToken ? `Bearer ${accessToken}` : '',
                },
            });
        }

        return forward(operation);
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      authLink,
                      httpLink,
                  ])
                : ApolloLink.from([authLink, httpLink]),
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
