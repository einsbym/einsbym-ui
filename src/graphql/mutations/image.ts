import { gql } from '@apollo/client';

export const SAVE_IMAGE_DATA = gql`
    mutation CreateImage($createImageInput: CreateImageInput!) {
        createImage(createImageInput: $createImageInput) {
            id
        }
    }
`;
