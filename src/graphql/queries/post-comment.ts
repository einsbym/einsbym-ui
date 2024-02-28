import { gql } from '@apollo/client';

export const FIND_COMMENTS_BY_POST = gql`
    query FindCommentsByPost($postId: String!) {
        findCommentsByPost(postId: $postId) {
            id
            comment
            createdAt
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
