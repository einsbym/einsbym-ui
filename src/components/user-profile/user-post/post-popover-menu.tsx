import { REMOVE_POST } from '@/graphql/mutations/post';
import { useMutation } from '@apollo/client';
import { Button, Menu, rem } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { IoIosFlag, IoMdClose } from 'react-icons/io';
import { MdDelete, MdOutlinePrivacyTip } from 'react-icons/md';

const MenuButton = () => {
    return (
        <Menu.Target>
            <Button
                variant="transparent"
                color="white"
                fz="lg"
                p={0}
                pos="absolute"
                right={0}
                top={0}
                className="hover:text-[#e100ff]"
            >
                <BsThreeDotsVertical />
            </Button>
        </Menu.Target>
    );
};

export default function PostPopoverMenu(props: {
    postId: string;
    loggedUserId?: string | null;
    setRemoved: Dispatch<SetStateAction<boolean>>;
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
    // Mutations
    const [removePost, { loading }] = useMutation(REMOVE_POST);

    const handleRemovePost = async () => {
        try {
            const { errors } = await removePost({
                variables: {
                    id: props.postId,
                },
            });

            if (errors) {
                throw new Error(errors[0].message);
            }

            props.setRemoved(true);
        } catch (error) {
            console.error('Could not remove the post:', error);
        }
    };

    return (
        <>
            {!props.loggedUserId && (
                <Menu position="bottom" radius={8} withArrow>
                    <Menu.Dropdown>
                        <Menu.Item
                            leftSection={<FaRegEdit style={{ width: rem(14), height: rem(14) }} />}
                            onClick={() => props.setIsEditModalOpen(true)}
                        >
                            edit
                        </Menu.Item>
                        <Menu.Item leftSection={<MdOutlinePrivacyTip style={{ width: rem(14), height: rem(14) }} />}>
                            change visibility
                        </Menu.Item>
                        <Menu.Item
                            leftSection={
                                loading ? (
                                    <AiOutlineLoading
                                        style={{ width: rem(14), height: rem(14) }}
                                        className="animate-spin fill-red-300"
                                    />
                                ) : (
                                    <MdDelete style={{ width: rem(14), height: rem(14) }} />
                                )
                            }
                            onClick={handleRemovePost}
                            color="#f03e3e"
                            variant="light"
                            disabled={loading}
                        >
                            delete
                        </Menu.Item>
                        <Menu.Item leftSection={<IoMdClose style={{ width: rem(14), height: rem(14) }} />}>
                            close
                        </Menu.Item>
                    </Menu.Dropdown>
                    <MenuButton />
                </Menu>
            )}

            {props.loggedUserId && (
                <Menu position="bottom" radius={8} withArrow>
                    <Menu.Dropdown>
                        <Menu.Item
                            leftSection={<IoIosFlag style={{ width: rem(14), height: rem(14) }} />}
                            variant="light"
                            color="yellow"
                        >
                            report post
                        </Menu.Item>
                    </Menu.Dropdown>
                    <MenuButton />
                </Menu>
            )}
        </>
    );
}
