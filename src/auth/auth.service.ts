import { createAccessTokenCookie, createUserCookie, deleteCookies, getCurrentUserFromCookie } from '@/auth/cookies';
import { SignInType, UserType } from '@/types/types';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, SetStateAction } from 'react';
import { SIGN_IN } from './auth';
import { api } from '@/constants/constants';

export class AuthService {
    protected readonly instance: ApolloClient<unknown>;

    public constructor() {
        this.instance = new ApolloClient({
            uri: api.apiUrl,
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

    getUser = async (setUser: Dispatch<SetStateAction<UserType | null | undefined>>) => {
        const user = await getCurrentUserFromCookie();
        setUser(user);
    };

    signIn = async (
        preventDefault: () => void,
        setIsLoading: Dispatch<SetStateAction<boolean>>,
        setErrorMessage: Dispatch<SetStateAction<string | null | undefined>>,
        signinInput: SignInType,
        router: AppRouterInstance,
    ) => {
        preventDefault;

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
        router.push('/auth/signin', { scroll: false });
    };
}
