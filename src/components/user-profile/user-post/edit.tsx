import { UPDATE_POST } from '@/graphql/mutations/post';
import { PostType } from '@/types/types';
import { useMutation } from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';

interface EditProps {
    post: PostType;
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
    setPost: Dispatch<SetStateAction<PostType | undefined>>;
}

export const Edit: React.FC<EditProps> = ({ post, setIsEditModalOpen, setPost }) => {
    const [updatedText, setUpdatedText] = useState<string>();

    // Mutations
    const [updatePost] = useMutation(UPDATE_POST);

    const save = async () => {
        if (!updatedText) return;

        try {
            const { data } = await updatePost({
                variables: {
                    updatePostInput: {
                        postId: post.id,
                        postText: updatedText,
                    },
                },
            });

            setPost(data.updatePost);
            setIsEditModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] bg-gray-900 z-30 rounded-lg shadow-lg p-5">
            <form>
                <textarea
                    id="bio"
                    name="bio"
                    className="resize-y rounded-md w-full bg-transparent placeholder-gray-400 text-white outline-none"
                    placeholder="Write your thoughts here..."
                    defaultValue={post.postText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                />
                <div className="flex gap-2 justify-end mt-2 w-full">
                    <button
                        type="button"
                        onClick={() => setIsEditModalOpen(false)}
                        className="flex gap-1 items-center justify-center border-2 border-[#cc00ff] disabled:border-gray-800 text-[#cc00ff] disabled:text-gray-800 hover:text-black lowercase font-bold rounded-lg shadow-lg text-center px-2 py-1 hover:bg-[#cc00ff] disabled:hover:bg-transparent transition-all duration-200"
                    >
                        cancel
                    </button>
                    <button
                        type="button"
                        className="flex gap-1 items-center justify-center border-2 border-[#cc00ff] disabled:border-gray-800 text-[#cc00ff] disabled:text-gray-800 hover:text-black lowercase font-bold rounded-lg shadow-lg text-center px-2 py-1 hover:bg-[#cc00ff] disabled:hover:bg-transparent transition-all duration-200"
                        onClick={save}
                    >
                        save
                    </button>
                </div>
            </form>
        </div>
    );
};
