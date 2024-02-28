import useTimeAgo from '@/actions/elapsed-time';
import { storageUrl } from '@/constants/constants';
import { FIND_COMMENTS_BY_POST } from '@/graphql/queries/post-comment';
import { PostComment } from '@/interfaces/interfaces';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { FaRegCommentAlt, FaRegHeart } from 'react-icons/fa';

export default function PostComments(props: { postId: string | null, publishedPostCommentId: string }) {
    // States
    const [comments, setComments] = useState<PostComment[]>([]);

    // Queries
    const [findCommentsByPost] = useLazyQuery(FIND_COMMENTS_BY_POST);

    const fetchPostComments = async () => {
        try {
            const { data } = await findCommentsByPost({
                variables: {
                    postId: props.postId,
                },
                fetchPolicy: 'no-cache',
            });

            if (data) {
                setComments(data.findCommentsByPost);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        console.log('Mounting component...');
        fetchPostComments();
    }, [props.postId, props.publishedPostCommentId]);

    return (
        <>
            {comments?.map((postComment: PostComment) => (
                <div key={postComment.id} className="mt-5 flex items-start gap-2">
                    <img
                        className="flex-none w-[60px] h-[60px] ring-2 p-1 ring-[#cc00ff] rounded-full object-cover"
                        src={storageUrl + postComment.user.profilePicture}
                        alt={postComment.user.username}
                    />
                    <div className="flex flex-col w-full overflow-hidden break-all p-4 border-gray-200 rounded-e-xl rounded-es-xl bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-white">
                                {postComment.user.firstName} {postComment.user.lastName}
                            </span>
                            <span className="text-sm font-normal text-gray-400">
                                {useTimeAgo(postComment.createdAt)}
                            </span>
                        </div>

                        <p className="text-sm font-normal py-2.5 text-white">{postComment.comment}</p>

                        <div className="flex space-x-2 justify-end">
                            <button className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200">
                                <FaRegHeart size={13} /> 232
                            </button>
                            <button className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200">
                                <FaRegCommentAlt size={13} /> 0
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
