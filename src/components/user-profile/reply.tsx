import { backend } from '@/constants/constants';
import { FIND_REPLIES_BY_POST_COMMENT } from '@/graphql/queries/reply';
import { ReplyType } from '@/types/types';
import getElapsedTime from '@/utils/elapsed-time';
import { useLazyQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';

export default function Reply(props: { commentId: string }) {
    // States
    const [replies, setReplies] = useState<ReplyType[]>([]);

    // Queries
    const [findRepliesByPostComment, { loading }] = useLazyQuery(FIND_REPLIES_BY_POST_COMMENT);

    const fetchReplies = useCallback(async () => {
        try {
            const { data } = await findRepliesByPostComment({
                variables: {
                    commentId: props.commentId,
                },
                fetchPolicy: 'no-cache',
            });

            if (data) {
                setReplies(data.findResponsesByPostComment);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [props.commentId]);

    useEffect(() => {
        fetchReplies();
    }, [props.commentId, fetchReplies]);

    return (
        replies &&
        replies.map((reply) => (
            <div key={reply.id} className="flex flex-col items-end">
                <div className="flex flex-col w-11/12 overflow-hidden break-word p-4 border-l-2 border-l-[#cc00ff]">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <a href={`/profile/${reply.user.username}`}>
                            <img
                                className="flex-none w-[30px] h-[30px] lg:w-[30px] lg:h-[30px] rounded-full object-cover"
                                src={backend.storageUrl + reply.user.profilePicture}
                                alt={reply.user.username}
                            />
                        </a>
                        <span className="text-sm font-semibold text-white">{reply.user.username}</span>
                        <span className="text-[10px] lg:text-sm font-normal text-gray-400">
                            {getElapsedTime(reply.createdAt)}
                        </span>
                    </div>

                    <p className="text-sm font-normal py-2.5 text-white">{reply.response}</p>
                </div>
            </div>
        ))
    );
}
