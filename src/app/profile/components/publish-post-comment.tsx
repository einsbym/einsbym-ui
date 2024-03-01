import { CREATE_COMMENT } from '@/graphql/mutations/post-comment';
import { useMutation } from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { MdPostAdd } from 'react-icons/md';

export default function PublishPostComment(props: {
    postId: string;
    userId: string;
    setPostId: Dispatch<SetStateAction<string>>;
    setPublishedPostCommentId: Dispatch<SetStateAction<string>>;
}) {
    // States
    const [comment, setComment] = useState<string | null>();
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);

    // Mutations
    const [createComment] = useMutation(CREATE_COMMENT);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setLoading(true);

        // Clear previous error message
        setErrorMessage(null);

        try {
            if (!comment) {
                throw new Error('Hey! You need to write something first');
            }

            const { data, errors } = await createComment({
                variables: {
                    createCommentInput: {
                        comment: comment,
                        postId: props.postId,
                        userId: props.userId,
                    },
                },
            });

            if (errors) {
                throw new Error('Error when attempting to publish your comment.');
            }

            setComment(null);

            if (data) {
                props.setPostId(props.postId)
                props.setPublishedPostCommentId(data.createComment.id)
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
            <div className="mt-5">
                <form>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <MdPostAdd size={30} color="white" />
                        </div>
                        <input
                            type="post"
                            id="post"
                            className="block w-full p-4 ps-[3rem] text-sm rounded-lg bg-gray-700 placeholder-gray-400 text-white"
                            placeholder="What are your thoughts on this?"
                            value={comment || ''}
                            onChange={(event) => setComment(event.target.value)}
                            required
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
            </div>
        </>
    );
}
