import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
    mutation CreateComment($createCommentInput: CreatePostCommentInput!) {
        createComment(createCommentInput: $createCommentInput) {
            id
        }
    }
`;
