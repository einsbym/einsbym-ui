import { gql } from '@apollo/client';

export const FIND_POSTS_BY_USER = gql`
    query FindPostsByUser($userId: String!, $page: Int) {
        findPostsByUser(userId: $userId, page: $page) {
            id
            postText
            totalComments
            createdAt
            updatedAt
            images {
                id
                filename
            }
            user {
                id
                firstName
                lastName
                username
                profilePicture
            }
        }
    }
`;
