import { gql } from '@apollo/client';

export const FILES = gql`
    query Files($fileTypes: [String!]!, $page: Int, $limit: Int) {
        files(fileTypes: $fileTypes, page: $page, limit: $limit) {
            id
            filename
            fileType
            post {
                id
                postText
                createdAt
                user {
                    id
                    username
                    profilePicture
                }
            }
        }
    }
`;

export const FIND_FILES_BY_USER = gql`
    query FindFilesByUser($userId: String!) {
        findFilesByUser(userId: $userId) {
            id
            filename
            fileType
        }
    }
`;

export const FIND_FILE_BY_ID = gql`
    query FindFileById($fileId: String!) {
        findFileById(fileId: $fileId) {
            id
            filename
            fileType
            post {
                id
            }
        }
    }
`;

export const FIND_RANDOM_FILE = gql`
    query FindRandomFile {
        findRandomFile {
            id
            filename
            fileType
            post {
                id
                user {
                    id
                    username
                    profilePicture
                }
            }
        }
    }
`;
