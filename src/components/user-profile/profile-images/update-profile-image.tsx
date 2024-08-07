import { createUserCookie, getAccessTokenFromCookie } from '@/auth/cookies';
import { backend } from '@/constants/constants';
import { Dispatch, SetStateAction, useState } from 'react';
import UpdateImageModal from './update-images-modal';

interface UpdateProfileImageProps {
    userId: string;
    currentProfileImage: string;
    isChangeProfPicActive: boolean;
    setProfileImage: Dispatch<SetStateAction<string>>;
    setIsChangeProfPicActive: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateProfileImage(props: UpdateProfileImageProps) {
    // States
    const [file, setFile] = useState<File>();
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileChange = (file: File) => {
        setFile(file);
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
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

            // Update user cookie with the new data
            await createUserCookie(jsonResponse);

            // Update state
            props.setProfileImage(jsonResponse.profilePicture);

            // Close modal
            setIsLoading(false);
            props.setIsChangeProfPicActive(false);
        } catch (error: any) {
            console.error('Something went wrong:', error);
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    return (
        props.isChangeProfPicActive && (
            <UpdateImageModal
                isLoading={isLoading}
                userId={props.userId}
                modalName="Change your profile image"
                modalDescription="Select an image file from your device and click in save to update your profile image."
                errorMessage={errorMessage}
                handleFileChange={handleFileChange}
                handleSave={handleSave}
                isModalActive={props.isChangeProfPicActive}
                setIsModalActive={props.setIsChangeProfPicActive}
            />
        )
    );
}
