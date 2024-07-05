import { gql } from '@apollo/client';

export const CREATE_IMAGE = gql`
    mutation CreateFile($createFileInput: CreateFileInput!) {
        createFile(createFileInput: $createFileInput) {
            id
        }
    }
`;

export const REMOVE_FILE = gql`
    mutation RemoveFile($removeFileId: String!) {
        removeFile(id: $removeFileId)
    }
`;
