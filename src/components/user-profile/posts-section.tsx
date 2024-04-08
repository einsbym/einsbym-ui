import { api } from '@/constants/constants';
import { CREATE_POST } from '@/graphql/mutations/post';
import { useMutation } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { GrGallery } from 'react-icons/gr';
import { IoMdCloseCircle } from 'react-icons/io';
import Posts from './posts';

export default function PostsSection(props: { userId: string; loggedUserId?: string | null }) {
    // States
    const [postText, setPostText] = useState<string | null>();
    const [publishedPostId, setPublishedPostId] = useState<string>('');
    const [files, setFiles] = useState<FileList | null>();
    const [selectedFiles, setSelectedFiles] = useState<{ filename: string; blob?: string }[]>();
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);

    // Mutations
    const [createPost] = useMutation(CREATE_POST);

    const removeFileFromList = (indexToRemove: number) => {
        const files = selectedFiles?.filter((_, index) => index !== indexToRemove);
        setSelectedFiles(files);
        setFiles(null);
    };

    const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            const blobs: { filename: string; blob: string }[] = [];

            Array.from(files).forEach(async (file) => {
                // Create a blob URL for the selected file
                const blob = URL.createObjectURL(file);

                blobs.push({ filename: file.name, blob: blob });
            });

            setSelectedFiles(blobs);
        }

        setFiles(files);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setLoading(true);

        // Clear previous error message
        setErrorMessage(null);

        try {
            if (!postText && !files) {
                throw new Error("I mean... you need to write or upload something at least, don't you agree?");
            }

            const postFiles: any[] = [];

            if (files) {
                const arrayFromFiles = Array.from(files);

                for (const file of arrayFromFiles) {
                    const isFileSelected = !!selectedFiles?.find(({ filename }) => filename === file.name);

                    if (!isFileSelected) {
                        continue;
                    }

                    const formData = new FormData();
                    formData.append('file', file);

                    const response = await fetch(`${api.storageServiceUrl}/upload`, {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.status !== 200) {
                        const { error } = await response.json();
                        console.error(`The file ${file.name} could not be uploaded. Reason:`, error);
                        continue;
                    }

                    // Get response from backend
                    const json = await response.json();

                    postFiles.push({ filename: json.filename, fileType: file.type });
                }
            }

            // Save post
            const { data, errors } = await createPost({
                variables: {
                    createPostInput: {
                        files: postFiles,
                        postText: postText,
                    },
                },
            });

            if (errors && errors.length > 0) {
                throw new Error('Error when attempting to publish your post.');
            }

            setPostText(null);

            if (data) {
                setPublishedPostId(data.createPost.id);
                setSelectedFiles([]);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Something bad happened:', error);
            setErrorMessage(`${error instanceof Error ? error.message : error}`);
        }
    };

    return (
        <>
            {!props.loggedUserId && (
                <div className="mt-5">
                    <form>
                        <div className="relative">
                            <textarea
                                id="post"
                                className="block w-full h-40 p-4 resize-none text-sm rounded-lg bg-gray-900 placeholder-gray-400 text-white"
                                placeholder="Write something..."
                                value={postText || ''}
                                onChange={(event) => setPostText(event.target.value)}
                                required
                            />
                            <label
                                className="text-white absolute end-12 bottom-2.5 hover:text-[#cc00ff] focus:outline-none px-4 py-2 cursor-pointer"
                                htmlFor="fileInput"
                                title="Select images"
                            >
                                <GrGallery size={20} />
                            </label>
                            <input
                                multiple={true}
                                className="hidden"
                                id="fileInput"
                                type="file"
                                onChange={(event) => handleFilesChange(event)}
                                disabled={loading ? true : false}
                            />
                            <button
                                type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 hover:text-[#cc00ff] focus:outline-none px-4 py-2 disabled:text-gray-500"
                                onClick={(event) => handleSubmit(event)}
                                disabled={loading ? true : false}
                            >
                                <FiSend size={20} />
                            </button>
                        </div>
                    </form>

                    {loading && (
                        <div className="mt-2 px-3 py-1 text-xs font-medium leading-none text-center text-[#cc00ff] bg-[#cc00ff1e] rounded-full animate-pulse">
                            publishing your post...
                        </div>
                    )}

                    {errorMessage && (
                        <div className="mt-2 p-2 text-sm font-medium rounded-lg border border-red-400 text-red-400 text-center">
                            {errorMessage}
                        </div>
                    )}

                    {selectedFiles && selectedFiles.length !== 0 && (
                        <div className="mt-2 grid gap-2">
                            <p className="text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg text-sm">
                                Selected files: {selectedFiles.length}
                            </p>
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
                                {selectedFiles.map((file, index) => (
                                    <div className="relative" key={index}>
                                        <button
                                            className="absolute top-2 right-2 text-[#cc00ff]"
                                            type="button"
                                            onClick={() => removeFileFromList(index)}
                                        >
                                            <IoMdCloseCircle size={20} />
                                        </button>
                                        <img
                                            alt={file.filename}
                                            className="h-auto max-w-full rounded-lg"
                                            src={file.blob}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* User posts */}
            <Posts userId={props.userId} publishedPostId={publishedPostId} loggedUserId={props.loggedUserId} />
        </>
    );
}
