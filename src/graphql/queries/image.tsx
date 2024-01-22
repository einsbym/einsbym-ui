import { gql } from '@apollo/client';

export const IMAGES = gql`
    query Images {
        images {
            id
            filename
            name
            description
            tags
            createdAt
            updatedAt
        }
    }
`;

export const GET_IMAGE_DATA = gql`
    query FindImage($id: String!) {
        findImage(id: $id) {
            id
            filename
            name
            description
            tags
            likes
            views
            user {
                id
                firstName
                lastName
                username
                profilePicture
            }
            createdAt
        }
    }
`;
