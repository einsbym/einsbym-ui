import { REMOVE_POST } from '@/graphql/mutations/post';
import { useMutation } from '@apollo/client';
import { Dispatch, SetStateAction } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete, MdOutlinePrivacyTip } from 'react-icons/md';

export default function PostPopoverMenu(props: {
    postId: string;
    setRemoved: Dispatch<SetStateAction<boolean>>;
    loggedUserId?: string | null;
}) {
    // Mutations
    const [removePost, { loading }] = useMutation(REMOVE_POST);

    const handleRemovePost = async () => {
        try {
            const { errors } = await removePost({
                variables: {
                    id: props.postId,
                },
            });

            if (errors) {
                throw new Error('Error when attempting to like the post.');
            }

            props.setRemoved(true);
        } catch (error) {
            console.error('Could not remove the post:', error);
        }
    };

    return (
        <>
            {!props.loggedUserId && (
                <div className="absolute right-0 mt-40 origin-top-right divide-y divide-gray-100 rounded-lg shadow-md shadow-black w-44 z-10 bg-gray-900">
                    <ul className="p-2 text-sm text-gray-200">
                        <li>
                            <a
                                href="#"
                                className="flex gap-1 items-center rounded-lg p-2 text-[#cc00ff] hover:bg-[#cc00ff1e]"
                            >
                                <FaRegEdit className="text-lg" /> edit
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex gap-1 items-center rounded-lg p-2 text-[#cc00ff] hover:bg-[#cc00ff1e]"
                            >
                                <MdOutlinePrivacyTip className="text-lg" /> change visibility
                            </a>
                        </li>
                        <li
                            className="flex gap-1 items-center rounded-lg p-2 hover:bg-red-950/60 text-red-300 cursor-pointer"
                            onClick={handleRemovePost}
                        >
                            <MdDelete className="text-lg" /> delete
                            {loading && (
                                <AiOutlineLoading className="text-sm text-transparent animate-spin fill-red-300" />
                            )}
                        </li>
                    </ul>
                </div>
            )}

            {props.loggedUserId && (
                <div className="absolute right-0 mt-20 origin-top-right divide-y divide-gray-100 rounded-lg shadow-md shadow-black w-44 z-10 bg-gray-900">
                    <ul className="py-2 text-sm text-gray-200">
                        <li>
                            <a href="#" className="block px-4 py-2 text-[#cc00ff] hover:bg-[#cc00ff1e]">
                                report post
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}
