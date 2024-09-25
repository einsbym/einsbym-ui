import { UPDATE_POST } from '@/graphql/mutations/post';
import { PostType } from '@/types/types';
import { useMutation } from '@apollo/client';
import { Button, Modal, Textarea } from '@mantine/core';
import { Dispatch, SetStateAction, useState } from 'react';

interface EditPostProps {
    isEditModalOpen: boolean;
    post: PostType;
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
    setPost: Dispatch<SetStateAction<PostType | undefined>>;
}

export const EditPost: React.FC<EditPostProps> = ({ isEditModalOpen, setIsEditModalOpen, post, setPost }) => {
    const [updatedText, setUpdatedText] = useState<string>();

    // Mutations
    const [updatePost] = useMutation(UPDATE_POST);

    const save = async () => {
        if (!updatedText) return;

        try {
            const { data } = await updatePost({
                variables: {
                    updatePostInput: {
                        postId: post.id,
                        postText: updatedText,
                    },
                },
            });

            setPost(data.updatePost);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal opened={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit this post" centered>
            <Textarea
                placeholder="Write your thoughts here..."
                defaultValue={post.postText}
                onChange={(e) => setUpdatedText(e.target.value)}
            />
            <Button type="button" mt={10} w="100%" color="#cc00ff" variant="light" onClick={save}>
                save
            </Button>
        </Modal>
    );
};
