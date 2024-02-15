import { getCurrentUserFromCookie } from '@/actions/cookies';
import { apiUrl } from '@/constants/constants';
import { SIGN_IN } from '@/graphql/mutations/auth';
import { User } from '@/interfaces/interfaces';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Dispatch, SetStateAction } from 'react';

export class AuthService {
    protected readonly instance: ApolloClient<unknown>;
    public constructor() {
        this.instance = new ApolloClient({
            uri: apiUrl,
            cache: new InMemoryCache(),
        });
    }

    getData = async (email: string, password: string) => {
        try {
            const result = await this.instance.mutate({
                mutation: SIGN_IN,
                variables: { signin: { email, password } },
            });

            return result.data.signin;
        } catch (error) {
            return null;
        }
    };

    getUser = async (setUser: Dispatch<SetStateAction<User | null | undefined>>) => {
        const user = await getCurrentUserFromCookie();
        setUser(user);
    }
}
