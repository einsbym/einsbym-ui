import { SlideShow } from '@/components/user-profile/user-post/slideshow';
import { backend } from '@/constants/constants';
import { REMOVE_FILE } from '@/graphql/mutations/file';
import { PostFileType } from '@/types/types';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import ReactPlayer from 'react-player';

interface DisplayFilesProps {
    files: PostFileType[];
}

export const DisplayFiles: React.FC<DisplayFilesProps> = ({ files }) => {
    const [currentFiles, setCurrentFiles] = useState<PostFileType[]>(files);

    // Mutations
    const [removeFile] = useMutation(REMOVE_FILE);

    const handleClickRemove = async (id: string) => {
        try {
            await removeFile({
                variables: {
                    removeFileId: id,
                },
            });

            // Optimistically update the UI
            setCurrentFiles(currentFiles.filter((file) => file.id !== id));
        } catch (error) {
            console.error(error);

            // Revert the UI update if the mutation fails
            setCurrentFiles(files);
        }
    };

    return (
        <div
            className={`grid gap-2 ${currentFiles.length === 1 || currentFiles.length > 4 ? 'grid-cols-1' : null} ${
                currentFiles.length > 1 && currentFiles.length <= 4 ? 'grid-cols-2' : null
            } my-2.5`}
        >
            {currentFiles.length <= 4 &&
                currentFiles.map((file) => (
                    <div key={file.id} className="group relative">
                        {file.fileType === 'video/mp4' && (
                            <div className="relative w-full rounded-lg">
                                <ReactPlayer
                                    width="100%"
                                    height="100%"
                                    style={{ borderRadius: '0.5rem', overflow: 'hidden' }}
                                    url={backend.storageUrl + file.filename}
                                    playing
                                    muted
                                    light={false}
                                />
                                <div
                                    className="absolute z-10 bottom-5 right-5 cursor-pointer text-xl text-[#cc00ff]"
                                    onClick={() => handleClickRemove(file.id)}
                                >
                                    <MdDelete />
                                </div>
                            </div>
                        )}
                        {file.fileType !== 'video/mp4' && (
                            <div className="relative">
                                <img
                                    alt={file.filename}
                                    src={backend.storageUrl + file.filename}
                                    className={`w-full h-[200px] ${
                                        currentFiles.length > 4 ? 'lg:h-[200px]' : 'lg:h-[500px]'
                                    } object-cover rounded-lg`}
                                />
                                <div
                                    className="absolute z-10 bottom-5 right-5 cursor-pointer text-xl text-[#cc00ff]"
                                    onClick={() => handleClickRemove(file.id)}
                                >
                                    <MdDelete />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

            {currentFiles.length > 4 && <SlideShow files={currentFiles} />}
        </div>
    );
};
