import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    mutation Signin($signin: SigninInput!) {
        signin(signin: $signin) {
            access_token
        }
    }
`;
