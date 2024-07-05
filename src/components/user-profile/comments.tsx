import { FIND_COMMENTS_BY_POST } from '@/graphql/queries/post-comment';
import { CommentType } from '@/types/types';
import { useLazyQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import PostSkeleton from '../skeletons/post';
import Comment from './comment';

export default function Comments(props: { postId: string | null; publishedCommentId: string }) {
    // States
    const [comments, setComments] = useState<CommentType[]>([]);

    // Queries
    const [findCommentsByPost, { loading }] = useLazyQuery(FIND_COMMENTS_BY_POST);

    const fetchComments = useCallback(async () => {
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
        fetchComments();
    }, [props.postId, props.publishedCommentId, fetchComments]);

    if (loading) {
        return <PostSkeleton />;
    }

    if (comments.length === 0) {
        return (
            <div className="mt-2 mx-auto text-[#cc00ff] text-center bg-[#cc00ff1e] p-2 w-fit rounded-lg">
                There are no comments on this post yet
            </div>
        );
    }

    return comments.map((comment: CommentType) => <Comment key={comment.id} comment={comment} />);
}
