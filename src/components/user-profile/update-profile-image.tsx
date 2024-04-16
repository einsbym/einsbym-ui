import { createUserCookie, getAccessTokenFromCookie } from '@/auth/cookies';
import { UPDATE_PROFILE_IMAGE } from '@/graphql/mutations/user';
import { ME } from '@/graphql/queries/user';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import UpdateImageModal from './update-images-modal';
import { backend } from '@/constants/constants';

interface UpdateProfileImageProps {
    userId: string;
    currentProfileImage: string;
    isChangeProfPicActive: boolean;
    setProfileImage: Dispatch<SetStateAction<string>>;
    setIsChangeProfPicActive: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateProfileImage(props: UpdateProfileImageProps) {
    // States
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
    const [file, setFile] = useState<File>();
    const [errorMessage, setErrorMessage] = useState<string | null>();

    // Queries
    const [getMe] = useLazyQuery(ME);

    // Mutations
    const [updateProfileImage] = useMutation(UPDATE_PROFILE_IMAGE);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            // Create a blob URL for the selected file
            const blobUrl = URL.createObjectURL(file);

            // Use blobUrl as needed (e.g., display the image)
            setSelectedImageUrl(blobUrl);
        }

        setFile(file);
    };

    const handleSave = async () => {
        try {
            setErrorMessage(null);

            if (!file) {
                throw new Error('No file selected for profile.');
            }

            const formData = new FormData();
            formData.append('file', file);

            // Get access token
            const accessToken = await getAccessTokenFromCookie();

            const response = await fetch(`${backend.restApiUrl}/user/updateProfilePicture`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken?.value.replace(/^"(.*)"$/, '$1')}`,
                },
                body: formData,
            });
            
            if (response.status !== 200) {
                const { error } = await response.json();
                throw new Error(error);
            }
            
            // Get response from backend
            const jsonResponse = await response.json();

            console.log(jsonResponse);

            // Update user cookie with the new data
            await createUserCookie(jsonResponse);

            // Update state
            props.setProfileImage(jsonResponse.profilePicture);

            // Close modal
            props.setIsChangeProfPicActive(false);
        } catch (error) {
            console.error('Something went wrong:', error);
            setErrorMessage(`Oops... ${error}`);
        }
    };

    return (
        props.isChangeProfPicActive && (
            <UpdateImageModal
                userId={props.userId}
                modalName="Change your profile image"
                modalDescription="Select an image file from your device and click in save to update your profile image."
                errorMessage={errorMessage}
                handleFileChange={handleFileChange}
                handleSave={handleSave}
                isModalActive={props.isChangeProfPicActive}
                setIsModalActive={props.setIsChangeProfPicActive}
                selectedImageUrl={selectedImageUrl}
            />
        )
    );
}
