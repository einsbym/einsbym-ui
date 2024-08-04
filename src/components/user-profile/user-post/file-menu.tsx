import { PostFileType } from '@/types/types';
import { Dispatch, SetStateAction, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { RemoveFile } from './remove-file';
import { IoIosFlag, IoMdClose } from 'react-icons/io';
import { MdImageSearch } from 'react-icons/md';

interface FileMenuProps {
    loggedUserId: string | null | undefined;
    file: PostFileType;
    files: PostFileType[];
    currentFiles: PostFileType[];
    setCurrentFiles: Dispatch<SetStateAction<PostFileType[]>>;
    setSelectedImage?: Dispatch<SetStateAction<string | null>>;
}

export const FileMenu: React.FC<FileMenuProps> = ({
    loggedUserId,
    file,
    files,
    currentFiles,
    setCurrentFiles,
    setSelectedImage,
}) => {
    const [displayFileOptions, setDisplayFileOptions] = useState<boolean>(false);

    const viewImage = () => {
        setDisplayFileOptions(!displayFileOptions);
        setSelectedImage && setSelectedImage(file.filename);
    };

    const handleClick = () => {
        setDisplayFileOptions(!displayFileOptions);
    };

    return (
        <>
            {displayFileOptions && (
                <div className="absolute z-10 w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 p-2 text-sm rounded-lg shadow-lg">
                    {setSelectedImage && (
                        <div
                            className="flex items-center justify-start gap-2 p-2 rounded-lg cursor-pointer text-[#cc00ff] hover:bg-[#cc00ff1e]"
                            onClick={viewImage}
                        >
                            <MdImageSearch /> view image
                        </div>
                    )}
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
                        onClick={handleClick}
                    >
                        <IoMdClose /> close
                    </div>
                </div>
            )}

            <div
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 group-hover:bottom-2 group-hover:lg:bottom-5 cursor-pointer transition-all duration-300"
                onClick={handleClick}
            >
                <BsThreeDots className="text-2xl" />
            </div>
        </>
    );
};
