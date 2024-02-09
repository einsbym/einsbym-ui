import { gql } from '@apollo/client';

export const UPDATE_PROFILE_IMAGE = gql`
    mutation UpdateProfilePicture($updateProfilePictureInput: UpdateProfilePictureInput!) {
        updateProfilePicture(updateProfilePictureInput: $updateProfilePictureInput) {
            id
            profilePicture
        }
    }
`;
