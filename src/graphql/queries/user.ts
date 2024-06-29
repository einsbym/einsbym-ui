import { gql } from '@apollo/client';

export const ME = gql`
    query Me($id: String!) {
        me(id: $id) {
            id
            role
            firstName
            lastName
            username
            email
            bio
            profilePicture
            coverImage
            createdAt
            updatedAt
        }
    }
`;

export const FIND_USER_BY_USERNAME = gql`
    query FindUserByUsername($username: String!) {
        findUserByUsername(username: $username) {
            id
            role
            firstName
            lastName
            username
            profilePicture
            coverImage
            createdAt
            updatedAt
            bio
            isPrivate
        }
    }
`;

export const FIND_USER_STATS = gql`
    query FindUserStats($username: String!) {
        findUserStats(username: $username) {
            username
            totalPosts
            totalFiles
            totalComments
            totalLikes
        }
    }
`;

export const FIND_ACTIVITIES = gql`
    query FindActivities($userId: String, $take: Int) {
        findActivities(userId: $userId, take: $take) {
            id
            description
            createdAt
        }
    }
`;

export const IS_CURRENTLY_ONLINE = gql`
    query IsCurrentlyOnline($username: String!) {
        isCurrentlyOnline(username: $username)
    }
`;

export const ONLINE_INSTANCES = gql`
    query OnlineInstances {
        onlineInstances
    }
`;
