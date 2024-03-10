import { gql } from '@apollo/client';

export const IMAGES = gql`
    query Images($page: Int) {
        images(page: $page) {
            id
            filename
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

export const FIND_RANDOM_IMAGE = gql`
    query FindRandomImage {
        findRandomImage {
            id
            filename
            post {
                id
                user {
                    id
                    username
                    profilePicture
                }
            }
        }
    }
`;
