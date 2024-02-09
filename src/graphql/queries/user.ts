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
