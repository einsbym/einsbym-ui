import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    mutation Signin($signin: SigninInput!) {
        signin(signin: $signin) {
            accessToken
            user {
                id
                firstName
                lastName
                username
                email
                bio
                profilePicture
                createdAt
            }
        }
    }
`;
