import { createUserCookie } from '@/actions/cookies';
import { storageServiceUrl } from '@/constants/constants';
import { UPDATE_COVER_IMAGE } from '@/graphql/mutations/user';
import { ME } from '@/graphql/queries/user';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import UpdateImageModal from './update-images-modal';

interface UpdateCoverImageProps {
    userId: string;
    isChangeCoverImageActive: boolean;
    setIsChangeCoverImageActive: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateCoverImage(props: UpdateCoverImageProps) {
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
    const [file, setFile] = useState<File>();
    const [updateCoverImage] = useMutation(UPDATE_COVER_IMAGE);
    const [getMe] = useLazyQuery(ME);
    const [errorMessage, setErrorMessage] = useState<string | null>();

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
                throw new Error('No file selected for cover.');
            }

            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${storageServiceUrl}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.status !== 200) {
                const { error } = await response.json();
                throw new Error(error);
            }

            // Get response from backend
            const jsonResponse = await response.json();

            // Save image data
            const { errors } = await updateCoverImage({
                variables: {
                    updateCoverImageInput: {
                        id: props.userId,
                        coverImage: jsonResponse.filename,
                    },
                },
            });

            if (errors) {
                throw new Error('Error when attempting to update the cover image');
            }

            // Update user cookie with the new data
            await getMe({ variables: { id: props.userId } }).then(async (result) => {
                await createUserCookie(result.data.me);
            });

            props.setIsChangeCoverImageActive(false);
        } catch (error) {
            console.error('Something went wrong:', error);
            setErrorMessage(`Oops... ${error}`);
        }
    };

    return (
        props.isChangeCoverImageActive && (
            <UpdateImageModal
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
