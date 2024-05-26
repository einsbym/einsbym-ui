import { gql } from '@apollo/client';

export const FIND_REPLIES_BY_POST_COMMENT = gql`
    query FindRepliesByPostComment($commentId: String!) {
        findRepliesByPostComment(commentId: $commentId) {
            id
            reply
            createdAt
            updatedAt
            user {
                id
                username
                profilePicture
            }
        }
    }
`;
