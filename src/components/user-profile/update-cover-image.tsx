import { createUserCookie, getAccessTokenFromCookie } from '@/auth/cookies';
import { backend } from '@/constants/constants';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import UpdateImageModal from './update-images-modal';

interface UpdateCoverImageProps {
    userId: string;
    currentCoverImage: string;
    isChangeCoverImageActive: boolean;
    setCoverImage: Dispatch<SetStateAction<string>>;
    setIsChangeCoverImageActive: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateCoverImage(props: UpdateCoverImageProps) {
    // States
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
    const [file, setFile] = useState<File>();
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
            setIsLoading(true);
            setErrorMessage(null);

            if (!file) {
                throw new Error('No file selected for cover.');
            }

            const formData = new FormData();
            formData.append('file', file);

            // Get access token
            const accessToken = await getAccessTokenFromCookie();

            const response = await fetch(`${backend.restApiUrl}/user/updateCoverImage`, {
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
            props.setCoverImage(jsonResponse.coverImage);

            // Close modal
            setIsLoading(false);
            props.setIsChangeCoverImageActive(false);
        } catch (error: any) {
            console.error('Something went wrong:', error);
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    return (
        props.isChangeCoverImageActive && (
            <UpdateImageModal
                isLoading={isLoading}
                userId={props.userId}
                modalName="Change your cover image"
                modalDescription="Select an image file from your device and click in save to update your cover."
                errorMessage={errorMessage}
                handleFileChange={handleFileChange}
                handleSave={handleSave}
                isModalActive={props.isChangeCoverImageActive}
                setIsModalActive={props.setIsChangeCoverImageActive}
                selectedImageUrl={selectedImageUrl}
            />
        )
    );
}
