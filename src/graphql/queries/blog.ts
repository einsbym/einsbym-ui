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
