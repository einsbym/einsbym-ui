import { storageServiceUrl } from '@/constants/constants';
import { CREATE_POST } from '@/graphql/mutations/post';
import { FIND_POSTS_BY_USER } from '@/graphql/queries/post';
import { Post } from '@/interfaces/interfaces';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { GrGallery } from 'react-icons/gr';
import { MdPostAdd } from 'react-icons/md';
import UserPosts from './user-posts';

export default function PublishPost(props: { userId: string }) {
    // States
    const [postText, setPostText] = useState<string | null>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [files, setFiles] = useState<FileList | null>();
    const [selectedImages, setSelectedImages] = useState<string[]>();
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);

    // Mutations
    const [createPost] = useMutation(CREATE_POST);

    // Queries
    const [findPostsByUser] = useLazyQuery(FIND_POSTS_BY_USER);

    const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            const blobs: string[] = [];

            Array.from(files).forEach(async (file) => {
                // Create a blob URL for the selected file
                const blob = URL.createObjectURL(file);

                blobs.push(blob);
            });

            setSelectedImages(blobs);
        }

        setFiles(files);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setLoading(true);

        // Clear previous error message
        setErrorMessage(null);

        try {
            if (!postText) {
                throw new Error("I mean... you need to write or upload something at least, don't you agree?");
            }

            const images: any[] = [];

            if (files) {
                Array.from(files).forEach(async (file) => {
                    const formData = new FormData();
                    formData.append('file', file);

                    const response = await fetch(`${storageServiceUrl}/upload`, {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.status !== 200) {
                        const { error } = await response.json();
                        console.error(`The file ${file.name} could not be uploaded. Reason:`, error);
                        return;
                    }

                    // Get response from backend
                    const responseInJson = await response.json();

                    images.push({ filename: responseInJson.filename, name: 'blah', description: 'foobar', tags: [''] });
                });
            }

            // Save post
            const { errors } = await createPost({
                variables: {
                    createPostInput: {
                        userId: props.userId,
                        images: images,
                        postText: postText,
                    },
                },
            });

            if (errors) {
                throw new Error('Error when attempting to publish your post.');
            }

            setPostText(null);

            const { data } = await findPostsByUser({
                variables: {
                    userId: props.userId,
                },
                fetchPolicy: 'no-cache',
            });

            setPosts(data?.findPostsByUser);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Something bad happened:', error);
            setErrorMessage(`${error instanceof Error ? error.message : error}`);
        }
    };

    return (
        <>
            <div className="mt-5">
                <form>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <MdPostAdd size={30} color="white" />
                        </div>
                        <input
                            type="post"
                            id="post"
                            className="block w-full p-4 ps-[3rem] text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
                        />
                        <button
                            type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 hover:text-[#cc00ff] focus:outline-none px-4 py-2"
                            onClick={(event) => handleSubmit(event)}
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

                {selectedImages && (
                    <div className="mt-2 grid gap-4">
                        <p className="text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg text-sm">
                            Selected images: {selectedImages.length}
                        </p>
                        <div className="grid grid-cols-5 gap-2">
                            {selectedImages.map((image, index) => (
                                <div key={index}>
                                    <img className="h-auto max-w-full rounded-lg" src={image} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* User posts */}
            <UserPosts userId={props.userId} posts={posts} />
        </>
    );
}
