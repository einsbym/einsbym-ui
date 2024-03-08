import ButtonLoadMore from '@/components/button-load-more';
import { FIND_POSTS_BY_USER } from '@/graphql/queries/post';
import { Post } from '@/interfaces/interfaces';
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { FcLike } from 'react-icons/fc';
import PostItem from './post-item';

export default function Posts(props: { userId: string; publishedPostId: string }) {
    // States
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(1);
    const [publishedPostId, setPublishedPostId] = useState<string>('');

    const { data, loading, fetchMore } = useQuery(FIND_POSTS_BY_USER, {
        variables: { userId: props.userId, page: page },
        notifyOnNetworkStatusChange: true,
    });

    const loadMorePosts = useCallback(
        async (offSet?: number) => {
            if (!props.userId) {
                return;
            }

            await fetchMore({
                variables: { userId: props.userId, page: offSet || page + 1 },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    if (offSet) {
                        setPosts(fetchMoreResult.findPostsByUser);
                        return;
                    }

                    setPosts([...posts, ...fetchMoreResult.findPostsByUser]);
                },
            });

            setPage(offSet || page + 1);
        },
        [props.userId, page, fetchMore, posts],
    );

    useEffect(() => {
        if (data && posts.length === 0) {
            setPosts(data.findPostsByUser);
        }

        if (props.publishedPostId !== publishedPostId) {
            loadMorePosts(1);
            setPublishedPostId(props.publishedPostId);
        }
    }, [data, posts, props.publishedPostId, publishedPostId, loadMorePosts]);

    return (
        <>
            {posts.map((post: Post, index) => (
                <PostItem key={post.id} post={post} userId={props.userId} />
            ))}

            {posts.length !== 0 && data && data.findPostsByUser.length !== 0 && (
                <ButtonLoadMore handleClick={loadMorePosts} />
            )}

            {posts.length === 0 && (
                <div className="mx-auto mt-5 flex items-center gap-1 text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg">
                    Hey! It&apos;s time to post something <FcLike />
                </div>
            )}
        </>
    );
}
