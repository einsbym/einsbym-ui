import { LIKE_POST, UNLIKE_POST } from '@/graphql/mutations/post';
import { UserType } from '@/types/types';
import { useMutation } from '@apollo/client';
import { Popover, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const LikeButton = (props: { initialLikes: number; postId: string; liked: boolean; likes: UserType[] }) => {
    const [likes, setLikes] = useState<number>(props.initialLikes);
    const [liked, setLiked] = useState<boolean>(props.liked);
    const [opened, { close, open }] = useDisclosure(false);

    // Mutations
    const [likePost] = useMutation(LIKE_POST);
    const [unlikePost] = useMutation(UNLIKE_POST);

    const handleLikePost = async () => {
        try {
            if (liked) {
                const { errors } = await unlikePost({
                    variables: {
                        postId: props.postId,
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
        <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
            <Popover.Target>
                <button
                    className="flex items-center gap-2 text:lg lg:text-sm lg:bg-transparent text-red-500 lg:rounded-full lg:p-2 lg:hover:bg-red-500/30 lg:transition lg:duration-200"
                    onClick={handleLikePost}
                    onMouseEnter={open}
                    onMouseLeave={close}
                >
                    {liked ? <FaHeart size={13} /> : <FaRegHeart size={13} />} {likes}
                </button>
            </Popover.Target>

            <Popover.Dropdown style={{ pointerEvents: 'none', backgroundColor: 'rgb(17 24 39)', border: '0px' }}>
                {props.likes.map((user) => (
                    <Text key={user.id}>
                        <a href={`/profile/${user.username}`}>{user.username}</a>
                    </Text>
                ))}
                {props.likes.length === 0 && <Text className="text-center">no likes</Text>}
            </Popover.Dropdown>
        </Popover>
    );
};

export default LikeButton;
