import { gql } from "@apollo/client";

export const CREATE_REPLY = gql`
    mutation CreateReply($createReplyInput: CreateReplyInput!) {
        createReply(createReplyInput: $createReplyInput) {
            id
        }
    }
`;
