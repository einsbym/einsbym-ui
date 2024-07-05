import { gql } from '@apollo/client';

export const FIND_BLOG_POSTS = gql`
    query FindBlogPosts {
        findBlogPosts {
            id
            title
            slug
            description
            filename
            views
            tags
            createdAt
            updatedAt
        }
    }
`;

export const FIND_BLOG_POST = gql`
    query FindBlogPost($slug: String!) {
        findBlogPost(slug: $slug) {
            id
            title
            slug
            description
            filename
            body {
                time
                version
                blocks {
                    id
                    data {
                        level
                        text
                    }
                    type
                }
            }
            user {
                id
                firstName
                lastName
                username
                profilePicture
            }
            views
            isPublished
            tags
            createdAt
            updatedAt
        }
    }
`;
