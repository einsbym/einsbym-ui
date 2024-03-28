import { LIKE_POST, UNLIKE_POST } from '@/graphql/mutations/post';
import { UserType } from '@/types/types';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const LikePostButton = (props: {
    initialLikes: number;
    postId: string;
    liked: boolean;
    userId: string;
    likes: UserType[];
}) => {
    const [likes, setLikes] = useState<number>(props.initialLikes);
    const [liked, setLiked] = useState<boolean>(props.liked);
    const [likesPopoverVisible, setLikesPopoverVisible] = useState<boolean>(false);

    // Mutations
    const [likePost] = useMutation(LIKE_POST);
    const [unlikePost] = useMutation(UNLIKE_POST);

    const handleLikePost = async () => {
        try {
            if (liked) {
                const { errors } = await unlikePost({
                    variables: {
                        postId: props.postId,
                        userId: props.userId,
                    },
                });

                if (errors) {
                    throw new Error('Error when attempting to unlike the post.');
                }

                setLikes(likes - 1);
                setLiked(false);

                return;
            }

            const { errors } = await likePost({
                variables: {
                    postId: props.postId,
                    userId: props.userId,
                },
            });

            if (errors) {
                throw new Error('Error when attempting to like the post.');
            }

            setLikes(likes + 1);
            setLiked(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="relative">
            <button
                className="flex items-center gap-2 text-sm lg:bg-gray-800 text-white lg:rounded-full lg:p-2 lg:hover:bg-gray-200 lg:hover:text-black lg:transition lg:duration-200"
                onClick={handleLikePost}
                onMouseEnter={() => setLikesPopoverVisible(true)}
                onMouseLeave={() => setLikesPopoverVisible(false)}
            >
                {liked ? <FaHeart size={13} /> : <FaRegHeart size={13} />} {likes}
            </button>

            <div
                id="popover-top"
                className={
                    likesPopoverVisible
                        ? 'absolute top-10 inline-block z-10 w-40 max-w-40 break-words text-sm text-white rounded-lg shadow-sm backdrop-blur-lg bg-opacity-10 bg-black/30'
                        : 'hidden'
                }
            >
                <div className="px-3 py-2">
                    {props.likes.map((user) => (
                        <p key={user.id}>
                            <a href={`/profile/${user.username}`}>{user.username}</a>
                        </p>
                    ))}
                    {props.likes.length === 0 && <p className='text-center'>no likes</p>}
                </div>
            </div>
        </div>
    );
};

export default LikePostButton;
