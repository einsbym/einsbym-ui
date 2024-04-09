import { gql } from '@apollo/client';

export const CREATE_POST = gql`
    mutation CreatePost($createPostInput: CreatePostInput!) {
        createPost(createPostInput: $createPostInput) {
            id
        }
    }
`;

export const LIKE_POST = gql`
    mutation LikePost($postId: String!) {
        likePost(postId: $postId)
    }
`;

export const UNLIKE_POST = gql`
    mutation UnlikePost($postId: String!) {
        unlikePost(postId: $postId)
    }
`;

export const REMOVE_POST = gql`
    mutation RemovePost($id: String!) {
        removePost(id: $id) {
            message
        }
    }
`;
