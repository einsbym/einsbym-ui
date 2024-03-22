import { api } from '@/constants/constants';
import { FIND_COMMENTS_BY_POST } from '@/graphql/queries/post-comment';
import { PostComment } from '@/types/types';
import getElapsedTime from '@/utils/elapsed-time';
import { useLazyQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { FaRegCommentAlt, FaRegHeart } from 'react-icons/fa';

export default function PostComments(props: { postId: string | null; publishedPostCommentId: string }) {
    // States
    const [comments, setComments] = useState<PostComment[]>([]);

    // Queries
    const [findCommentsByPost] = useLazyQuery(FIND_COMMENTS_BY_POST);

    const fetchPostComments = useCallback(async () => {
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
    }, [findCommentsByPost, props.postId]);

    useEffect(() => {
        fetchPostComments();
    }, [props.postId, props.publishedPostCommentId, fetchPostComments]);

    return (
        <>
            {comments?.map((postComment: PostComment) => (
                <div key={postComment.id} className="mt-3 lg:mt-5 flex items-start gap-2">
                    <div className="flex flex-col w-full overflow-hidden break-word p-4 border-gray-200 rounded-e-xl rounded-es-xl bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <a href={`/profile/${postComment.user.username}`}>
                                <img
                                    className="flex-none w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] rounded-full object-cover"
                                    src={api.storageUrl + postComment.user.profilePicture}
                                    alt={postComment.user.username}
                                />
                            </a>
                            <span className="text-sm font-semibold text-white">{postComment.user.firstName}</span>
                            <span className="text-[10px] lg:text-sm font-normal text-gray-400">
                                {getElapsedTime(postComment.createdAt)}
                            </span>
                        </div>

                        <p className="text-sm font-normal py-2.5 text-white">{postComment.comment}</p>

                        <div className="flex gap-2 justify-end">
                            <button className="flex items-center gap-1 lg:gap-2 text-sm lg:bg-gray-800 text-white lg:rounded-full lg:p-2 lg:hover:bg-gray-200 lg:hover:text-black lg:transition lg:duration-200">
                                <FaRegHeart size={13} /> 232
                            </button>
                            <button className="flex items-center gap-1 lg:gap-2 text-sm lg:bg-gray-800 text-white lg:rounded-full lg:p-2 lg:hover:bg-gray-200 lg:hover:text-black lg:transition lg:duration-200">
                                <FaRegCommentAlt size={13} /> 0
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
