import { FIND_COMMENTS_BY_POST } from '@/graphql/queries/post-comment';
import { CommentType } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Comment from './comment';

export default function Comments(props: { postId: string }) {
    // States
    const [comments, setComments] = useState<CommentType[]>([]);

    // Queries
    const { data } = useQuery(FIND_COMMENTS_BY_POST, {
        variables: {
            postId: props.postId,
        },
        fetchPolicy: 'no-cache',
    });

    useEffect(() => {
        if (data) {
            setComments(data.findCommentsByPost);
        }
    }, [data]);

    if (comments.length === 0) {
        return (
            <div className="mt-2 mx-auto text-sm text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg">
                There&apos;s no comments here yet
            </div>
        );
    }

    return comments.map((comment) => <Comment key={comment.id} comment={comment} />);
}
