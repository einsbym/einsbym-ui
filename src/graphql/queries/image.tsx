import { gql } from '@apollo/client';

export const IMAGES = gql`
    query Images {
        images {
            id
            filename
            name
            description
            tags
            createdAt
            updatedAt
        }
    }
`;
