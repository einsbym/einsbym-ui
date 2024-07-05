import { getAccessTokenFromCookie } from '@/auth/cookies';
import { backend } from '@/constants/constants';
import { ChangeEvent, useState } from 'react';
import { ErrorMessage } from './error-message';
import { Loading } from './loading';
import { PostForm } from './form';
import Posts from './posts';
import { SelectedFilesPreview } from './selected-files-preview';

export default function Management(props: { userId: string; loggedUserId?: string | null }) {
    // States
    const [postText, setPostText] = useState<string | null>();
    const [publishedPostId, setPublishedPostId] = useState<string>('');
    const [files, setFiles] = useState<FileList | null>();
    const [selectedFiles, setSelectedFiles] = useState<{ filename: string; blob?: string }[]>();
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);

    const removeFileFromList = (indexToRemove: number) => {
        const filteredSelectedFiles = selectedFiles?.filter((_, index) => index !== indexToRemove);
        setSelectedFiles(filteredSelectedFiles);

        if (files) {
            const updatedFilesArray = Array.from(files).filter((_, index) => index !== indexToRemove);
            const updatedFiles = new DataTransfer();
            updatedFilesArray.forEach((file) => updatedFiles.items.add(file));
            setFiles(updatedFiles.files);
        }
    };

    const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newFiles = event.target.files;

        if (newFiles) {
            const blobs: { filename: string; blob: string }[] = [];

            Array.from(newFiles).forEach((file) => {
                const blob = URL.createObjectURL(file);
                blobs.push({ filename: file.name, blob: blob });
            });

            setSelectedFiles((prevSelectedFiles) => [...(prevSelectedFiles || []), ...blobs]);

            setFiles((prevFiles) => {
                if (!prevFiles) return newFiles;
                const updatedFiles = new DataTransfer();
                Array.from(prevFiles).forEach((file) => updatedFiles.items.add(file));
                Array.from(newFiles).forEach((file) => updatedFiles.items.add(file));
                return updatedFiles.files;
            });
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setLoading(true);

        // Clear previous error message
        setErrorMessage(null);

        try {
            const formData = new FormData();

            if (postText) {
                formData.append('postText', postText);
            }

            if (files) {
                // Append files to FormData
                for (let i = 0; i < files.length; i++) {
                    const isFileSelected = !!selectedFiles?.find(({ filename }) => filename === files[i].name);

                    if (!isFileSelected) {
                        continue;
                    }

                    formData.append('files', files[i]);
                }
            }

            // Get access token
            const accessToken = await getAccessTokenFromCookie();

            // Save post
            const response = await fetch(`${backend.restApiUrl}/post/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken?.value.replace(/^"(.*)"$/, '$1')}`,
                },
                body: formData,
            });

            if (response.status !== 201) {
                throw new Error(response.statusText);
            }

            const responseJson = await response.json();

            setPublishedPostId(responseJson.id);
            setSelectedFiles([]);
            setFiles(null);
            setPostText(null);
            setLoading(false);
        } catch (error) {
            console.error('Something bad happened:', error);
            setErrorMessage('Oh no! Something went wrong.');
            setLoading(false);
        }
    };

    return (
        <>
            {!props.loggedUserId && (
                <div className="mt-5">
                    <PostForm
                        postText={postText}
                        setPostText={setPostText}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        handleFilesChange={handleFilesChange}
                    />
                    {loading && <Loading />}
                    {errorMessage && <ErrorMessage message={errorMessage} />}
                    {selectedFiles && selectedFiles.length > 0 && (
                        <SelectedFilesPreview selectedFiles={selectedFiles} removeFileFromList={removeFileFromList} />
                    )}
                </div>
            )}

            <Posts userId={props.userId} publishedPostId={publishedPostId} loggedUserId={props.loggedUserId} />
        </>
    );
}
