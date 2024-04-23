import { gql } from '@apollo/client';

export const FIND_REPLIES_BY_POST_COMMENT = gql`
    query FindResponsesByPostComment($commentId: String!) {
        findResponsesByPostComment(commentId: $commentId) {
            id
            response
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
