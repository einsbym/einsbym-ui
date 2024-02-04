import { apiUrl } from '@/app/constants/constants';
import { SIGN_IN } from '@/graphql/mutations/auth';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export class AuthService {
    protected readonly instance: ApolloClient<unknown>;
    public constructor() {
        this.instance = new ApolloClient({
            uri: apiUrl,
            cache: new InMemoryCache(),
        });
    }

    login = async (email: string, password: string) => {
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
}
