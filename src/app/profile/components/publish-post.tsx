import { CREATE_POST } from '@/graphql/mutations/post';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { MdPostAdd } from 'react-icons/md';

export default function PublishPost(props: { userId: string }) {
    const [postText, setPostText] = useState<string | null>();
    const [createPost] = useMutation(CREATE_POST);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            if (!postText) {
                throw new Error("I mean... you need to write something, don't you agree?");
            }

            // Save image data
            const { errors } = await createPost({
                variables: {
                    createPostInput: {
                        userId: props.userId,
                        images: [],
                        postText: postText,
                    },
                },
            });

            if (errors) {
                throw new Error('Error when attempting to publish the post.');
            }

            setPostText(null);
        } catch (error) {
            console.error('Something bad happened:', error);
        }
    };

    return (
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
                    <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 hover:text-[#cc00ff] focus:outline-none px-4 py-2"
                        onClick={(event) => handleSubmit(event)}
                    >
                        <FiSend size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
}
