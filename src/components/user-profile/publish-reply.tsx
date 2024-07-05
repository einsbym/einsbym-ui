import { CREATE_REPLY } from '@/graphql/mutations/reply';
import { useMutation } from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { FiSend } from 'react-icons/fi';

export default function PublishReply(props: {
    commentId: string;
    setPublishedReplyId: Dispatch<SetStateAction<string>>;
}) {
    // States
    const [reply, setReply] = useState<string | null>();
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);

    // Mutations
    const [createReply] = useMutation(CREATE_REPLY);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setLoading(true);

        // Clear previous error message
        setErrorMessage(null);

        try {
            if (!reply) {
                throw new Error('🖐️ Hey! You need to write something first');
            }

            const { data, errors } = await createReply({
                variables: {
                    createReplyInput: {
                        reply: reply,
                        commentId: props.commentId,
                    },
                },
            });

            if (errors) {
                throw new Error('Error when attempting to publish your reply.');
            }

            if (data) {
                props.setPublishedReplyId(data.createReply.id);
            }

            setReply(null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Something bad happened:', error);
            setErrorMessage('Something bad happened 😭');
        }
    };

    return (
        <>
            <form>
                <div className="relative">
                    <input
                        type="post"
                        className="block w-full p-2 lg:p-4 text-sm rounded-lg bg-gray-800 placeholder-gray-400 text-white placeholder:text-[12px] lg:placeholder:text-sm focus:outline-none focus:border-2 focus:border-[#cc00ff]"
                        placeholder="What are your thoughts on this?"
                        value={reply || ''}
                        onChange={(event) => setReply(event.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute top-1/2 right-3 transform -translate-y-1/2 hover:text-[#cc00ff] focus:outline-none disabled:text-gray-500"
                        onClick={(event) => handleSubmit(event)}
                        disabled={loading ? true : false}
                    >
                        <FiSend size={20} />
                    </button>
                </div>
            </form>

            {loading && (
                <div className="mt-2 px-3 py-1 text-xs font-medium leading-none text-center text-[#cc00ff] bg-[#cc00ff1e] rounded-full animate-pulse">
                    publishing your reply...
                </div>
            )}

            {errorMessage && (
                <div className="mt-2 p-2 text-sm font-medium rounded-lg bg-red-800/20 text-red-600 text-center">
                    {errorMessage}
                </div>
            )}
        </>
    );
}
