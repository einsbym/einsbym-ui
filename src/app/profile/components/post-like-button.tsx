// components/Post.js
import { LIKE_POST } from '@/graphql/mutations/post';
import { Post } from '@/interfaces/interfaces';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const PostLikeButton = (props: { initialLikes: number; post: Post; userId: string }) => {
    const [likes, setLikes] = useState(props.initialLikes);
    const [liked, setLiked] = useState(false);

    // Mutations
    const [likePost] = useMutation(LIKE_POST);

    const handleLike = () => {
        if (liked) return;
        setLikes(likes + 1);
        setLiked(true);
    };

    const handleLikePost = async () => {
        try {
            const { errors } = await likePost({
                variables: {
                    postId: props.post.id,
                    userId: props.userId,
                },
            });

            if (errors) {
                throw new Error('Error when attempting to like the post.');
            }

            if (liked) return;

            setLikes(likes + 1);
            setLiked(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            {props.post.likes.some((like) => like.id === props.userId) && (
                <button
                    className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200"
                    onClick={handleLike}
                >
                    <FaHeart size={13} /> {likes}
                </button>
            )}

            {!props.post.likes.some((like) => like.id === props.userId) && (
                <button
                    className="flex items-center gap-2 text-sm bg-gray-800 text-white rounded-full p-2 hover:bg-gray-200 hover:text-black transition duration-200"
                    onClick={handleLikePost}
                >
                    {liked ? <FaHeart size={13} /> : <FaRegHeart size={13} />} {likes}
                </button>
            )}
        </>
    );
};

export default PostLikeButton;
