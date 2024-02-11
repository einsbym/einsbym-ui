import { gql } from '@apollo/client';

export const FIND_POSTS_BY_USER = gql`
    query FindPostsByUser($userId: String!) {
        findPostsByUser(userId: $userId) {
            id
            postText
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
