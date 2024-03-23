import { gql } from '@apollo/client';

export const CREATE_IMAGE = gql`
    mutation CreateFile($createFileInput: CreateFileInput!) {
        createFile(createFileInput: $createFileInput) {
            id
        }
    }
`;
