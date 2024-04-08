import { gql } from '@apollo/client';

export const CREATE_POST = gql`
    mutation CreatePost($createPostInput: CreatePostInput!) {
        createPost(createPostInput: $createPostInput) {
            id
        }
    }
`;

export const LIKE_POST = gql`
    mutation LikePost($postId: String!, $userId: String!) {
        likePost(postId: $postId, userId: $userId)
    }
`;

export const UNLIKE_POST = gql`
    mutation UnlikePost($postId: String!, $userId: String!) {
        unlikePost(postId: $postId, userId: $userId)
    }
`;

export const REMOVE_POST = gql`
    mutation RemovePost($id: String!) {
        removePost(id: $id) {
            message
        }
    }
`;
