import { backend } from '@/constants/constants';
import { PostFileType } from '@/types/types';
import { Image, Modal, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dispatch, SetStateAction, useState } from 'react';
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
    const [displayFileOptions, setDisplayFileOptions] = useState<boolean>(false);
    const [opened, { open, close }] = useDisclosure(false);

    const viewImage = () => {
        setDisplayFileOptions(!displayFileOptions);
        open();
    };

    const closeFileOptions = () => {
        setDisplayFileOptions(!displayFileOptions);
    };

    return (
        <>
            {displayFileOptions && (
                <div className="absolute z-10 w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 p-2 text-sm rounded-lg shadow-lg">
                    <div
                        className="flex items-center justify-start gap-2 p-2 rounded-lg cursor-pointer text-[#cc00ff] hover:bg-[#cc00ff1e]"
                        onClick={viewImage}
                    >
                        <MdImageSearch /> view image
                    </div>

                    <div className="flex items-center justify-start gap-2 p-2 rounded-lg cursor-pointer text-[#cc00ff] hover:bg-[#cc00ff1e]">
                        <IoIosFlag /> report image
                    </div>

                    {!loggedUserId && (
                        <RemoveFile
                            file={file}
                            files={files}
                            currentFiles={currentFiles}
                            setCurrentFiles={setCurrentFiles}
                        />
                    )}

                    <div
                        className="flex items-center justify-start gap-2 p-2 rounded-lg cursor-pointer text-[#cc00ff] hover:bg-[#cc00ff1e]"
                        onClick={closeFileOptions}
                    >
                        <IoMdClose /> close
                    </div>
                </div>
            )}

            <div
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 group-hover:bottom-2 group-hover:lg:bottom-5 cursor-pointer transition-all duration-300"
                onClick={closeFileOptions}
            >
                <BsThreeDots className="text-2xl" />
            </div>

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
