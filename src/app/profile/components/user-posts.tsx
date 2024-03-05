import useTimeAgo from '@/actions/elapsed-time';
import ButtonLoadMore from '@/components/button-load-more';
import { storageUrl } from '@/constants/constants';
import { FIND_POSTS_BY_USER } from '@/graphql/queries/post';
import { Post } from '@/interfaces/interfaces';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { FaRegCommentAlt, FaRegShareSquare } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import PostComments from './post-comments';
import PostLikeButton from './post-like-button';
import PublishPostComment from './publish-post-comment';

export default function UserPosts(props: { userId: string; posts: Post[] }) {
    // States
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(1);
    const [postId, setPostId] = useState<string>('');
    const [publishedPostCommentId, setPublishedPostCommentId] = useState<string>('');

    // Queries
    const [findPostsByUser] = useLazyQuery(FIND_POSTS_BY_USER);

    const fetchPosts = async () => {
        try {
            if (!props.userId) {
                return;
            }

            if (page === 1) {
                setPage(page + 1);
            }

            const { data } = await findPostsByUser({
                variables: {
                    userId: props.userId,
                    page: page,
                },
                fetchPolicy: 'no-cache',
            });

            if (data) {
                setPosts([...posts, ...data.findPostsByUser]);
            }

            setPage(page + 1);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        setPosts(props.posts);

        if (props.posts.length === 0) {
            fetchPosts();
        }
    }, [props.userId, props.posts]);

    return (
        <>
            {posts.map((post: Post, index) => (
                <div key={post.id} className="mt-5 flex items-start gap-2">
                    <img
                        alt={post.user.username}
                        className="flex-none w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] ring-2 p-1 ring-[#cc00ff] rounded-full object-cover"
                        src={storageUrl + post.user.profilePicture}
                    />
                    <div className="flex flex-col w-full overflow-hidden break-all p-4 rounded-e-xl rounded-es-xl bg-gray-800">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-white">
                                {post.user.firstName} {post.user.lastName}
                            </span>
                            <span className="text-sm font-normal text-gray-400">{useTimeAgo(post.createdAt)}</span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-white">{post.postText}</p>

                        {/* Display images (if any) */}
                        {post.images.length > 0 && (
                            <div
                                className={`grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : null} ${
                                    post.images.length > 4 ? 'grid-cols-4' : null
                                } ${post.images.length > 1 && post.images.length <= 4 ? 'grid-cols-2' : null} my-2.5`}
                            >
                                {post.images.map((image) => (
                                    <div key={image.id} className="group relative">
                                        <img
                                            alt={image.filename}
                                            src={storageUrl + image.filename}
                                            className={`w-full h-[200px] ${
                                                post.images.length > 4 ? 'lg:h-[200px]' : 'lg:h-[500px]'
                                            } object-cover rounded-lg`}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex gap-2 justify-end">
                            <PostLikeButton
                                postId={post.id}
                                liked={post.likes.some((like) => like.id === props.userId)}
                                initialLikes={post.totalLikes}
                                userId={props.userId}
                            />
                            <button
                                className="flex items-center gap-2 text-sm lg:bg-gray-800 text-white rounded-full lg:p-2 lg:hover:bg-gray-200 lg:hover:text-black lg:transition lg:duration-200"
                                onClick={() => {
                                    setPostId(post.id);
                                }}
                            >
                                <FaRegCommentAlt size={13} /> {post.totalComments}
                            </button>
                            <button className="flex items-center gap-2 text-sm lg:bg-gray-800 text-white rounded-full lg:p-2 lg:hover:bg-gray-200 lg:hover:text-black lg:transition lg:duration-200">
                                <FaRegShareSquare size={13} /> 0
                            </button>
                        </div>

                        <PublishPostComment
                            postId={post.id}
                            userId={props.userId}
                            setPostId={setPostId}
                            setPublishedPostCommentId={setPublishedPostCommentId}
                        />

                        {/* Conditionally render PostComments */}
                        {postId === post.id && (
                            <PostComments postId={postId} publishedPostCommentId={publishedPostCommentId} />
                        )}
                    </div>
                </div>
            ))}

            {posts.length !== 0 && <ButtonLoadMore handleClick={fetchPosts} />}

            {posts.length === 0 && (
                <div className="mx-auto mt-5 flex items-center gap-1 text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg">
                    Hey! It's time to post something <FcLike />
                </div>
            )}
        </>
    );
}
