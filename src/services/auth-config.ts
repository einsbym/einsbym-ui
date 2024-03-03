import { createAccessTokenCookie, createUserCookie, deleteCookies, getCurrentUserFromCookie } from '@/actions/cookies';
import { apiUrl } from '@/constants/constants';
import { SIGN_IN } from '@/graphql/mutations/auth';
import { SigninInput, User } from '@/interfaces/interfaces';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
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
    };

    signIn = async (
        event: any,
        setIsLoading: Dispatch<SetStateAction<boolean>>,
        setErrorMessage: Dispatch<SetStateAction<string | null | undefined>>,
        signinInput: SigninInput,
        router: AppRouterInstance,
    ) => {
        event.preventDefault();

        setIsLoading(true);

        // Clear previous error messages
        setErrorMessage(null);

        try {
            const data = await this.getData(signinInput.email, signinInput.password);

            if (!data) {
                setErrorMessage('Invalid credentials. Try again.');
                setIsLoading(false);
                return;
            }

            await createAccessTokenCookie(data.accessToken);
            await createUserCookie(data.user);

            router.push('/profile', { scroll: false });
        } catch (error) {
            setErrorMessage('Something went wrong.');
            setIsLoading(false);
        }
    };

    signOut = async (router: AppRouterInstance) => {
        await deleteCookies();
        router.push('/auth/login', { scroll: false });
    };
}
