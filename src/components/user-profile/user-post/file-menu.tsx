import { backend } from '@/constants/constants';
import { PostFileType } from '@/types/types';
import { Button, Image, Menu, Modal, rem, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dispatch, SetStateAction } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosFlag, IoMdClose } from 'react-icons/io';
import { MdImageSearch } from 'react-icons/md';
import { RemoveFile } from './remove-file';

interface FileMenuProps {
    loggedUserId: string | null | undefined;
    file: PostFileType;
    files: PostFileType[];
    currentFiles: PostFileType[];
    setCurrentFiles: Dispatch<SetStateAction<PostFileType[]>>;
    setSelectedImage?: Dispatch<SetStateAction<string | null>>;
}

export const FileMenu: React.FC<FileMenuProps> = ({ loggedUserId, file, files, currentFiles, setCurrentFiles }) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Menu position="top" withArrow>
                <Menu.Dropdown>
                    <Menu.Item
                        leftSection={<MdImageSearch style={{ width: rem(14), height: rem(14) }} />}
                        onClick={open}
                    >
                        view image
                    </Menu.Item>

                    <Menu.Item
                        leftSection={<IoIosFlag style={{ width: rem(14), height: rem(14) }} />}
                        variant="light"
                        color="yellow"
                    >
                        report image
                    </Menu.Item>

                    {!loggedUserId && (
                        <RemoveFile
                            file={file}
                            files={files}
                            currentFiles={currentFiles}
                            setCurrentFiles={setCurrentFiles}
                        />
                    )}

                    <Menu.Item leftSection={<IoMdClose style={{ width: rem(14), height: rem(14) }} />}>close</Menu.Item>
                </Menu.Dropdown>

                <Menu.Target>
                    <Button
                        variant="transparent"
                        color="white"
                        py={1}
                        px={3}
                        pos="absolute"
                        left={0}
                        right={0}
                        bottom={2}
                    >
                        <BsThreeDots className="text-2xl" />
                    </Button>
                </Menu.Target>
            </Menu>

            <Modal
                opened={opened}
                onClose={close}
                title="View Image"
                centered
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                scrollAreaComponent={ScrollArea.Autosize}
                size="xl"
            >
                <Image
                    alt={'selectedImage'}
                    src={backend.storageUrl + file.filename}
                    className="lg:h-full rounded-lg shadow-lg"
                />
            </Modal>
        </>
    );
};
