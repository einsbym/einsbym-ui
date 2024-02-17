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

export const FIND_IMAGES_BY_USER = gql`
    query FindImagesByUser($userId: String!) {
        findImagesByUser(userId: $userId) {
            id
            filename
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
