import { gql } from "@apollo/client";

export const CREATE_REPLY = gql`
    mutation CreateResponse($createResponseInput: CreateResponseInput!) {
        createResponse(createResponseInput: $createResponseInput) {
            id
        }
    }
`;
