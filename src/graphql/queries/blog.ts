import { gql } from '@apollo/client';

export const FIND_BLOG_POSTS = gql`
    query FindBlogPosts {
        findBlogPosts {
            id
            title
            description
            filename
            body {
                time
                blocks {
                    id
                    type
                    data {
                        text
                        level
                    }
                }
                version
            }
            views
            isPublished
            tags
            createdAt
            updatedAt
        }
    }
`;
