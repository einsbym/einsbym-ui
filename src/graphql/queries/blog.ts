import { gql } from '@apollo/client';

export const FIND_BLOG_POSTS = gql`
    query FindBlogPosts {
        findBlogPosts {
            id
            title
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
    query FindBlogPost($findBlogPostId: String!) {
        findBlogPost(id: $findBlogPostId) {
            id
            title
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
            views
            isPublished
            tags
            createdAt
            updatedAt
        }
    }
`;
