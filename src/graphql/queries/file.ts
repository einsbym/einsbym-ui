import { gql } from '@apollo/client';

export const FILES = gql`
    query Files($page: Int) {
        files(page: $page) {
            id
            filename
            fileType
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
