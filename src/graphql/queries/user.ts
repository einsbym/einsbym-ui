import { gql } from '@apollo/client';

export const ME = gql`
    query Me($id: String!) {
        me(id: $id) {
            id
            firstName
            lastName
            username
            email
            bio
            profilePicture
            coverImage
            createdAt
            updatedAt
        }
    }
`;

export const FIND_USER_BY_USERNAME = gql`
    query FindUserByUsername($username: String!) {
        findUserByUsername(username: $username) {
            id
            firstName
            lastName
            username
            profilePicture
            coverImage
            createdAt
            updatedAt
            bio
        }
    }
`;
