// components/Post.js
import { LIKE_POST, UNLIKE_POST } from '@/graphql/mutations/post';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const PostLikeButton = (props: { initialLikes: number; postId: string; liked: boolean; userId: string }) => {
    const [likes, setLikes] = useState<number>(props.initialLikes);
    const [liked, setLiked] = useState<boolean>(props.liked);

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
        <button
            className="flex items-center gap-2 text-sm lg:bg-gray-800 text-white lg:rounded-full lg:p-2 lg:hover:bg-gray-200 lg:hover:text-black lg:transition lg:duration-200"
            onClick={handleLikePost}
        >
            {liked ? <FaHeart size={13} /> : <FaRegHeart size={13} />} {likes}
        </button>
    );
};

export default PostLikeButton;
