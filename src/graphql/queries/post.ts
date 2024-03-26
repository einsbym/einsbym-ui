import { gql } from '@apollo/client';

export const FIND_POSTS_BY_USER = gql`
    query FindPostsByUser($userId: String!, $page: Int) {
        findPostsByUser(userId: $userId, page: $page) {
            id
            postText
            totalComments
            totalLikes
            createdAt
            updatedAt
            files {
                id
                filename
                fileType
            }
            user {
                id
                firstName
                lastName
                username
                profilePicture
            }
            likes {
                id
                username
            }
        }
    }
`;

export const FIND_POST_BY_ID = gql`
    query FindPostById($postId: String!) {
        findPostById(postId: $postId) {
            id
            postText
            totalComments
            totalLikes
            createdAt
            updatedAt
            user {
                id
                firstName
                lastName
                username
                profilePicture
            }
            likes {
                id
                profilePicture
                username
            }
        }
    }
`;
