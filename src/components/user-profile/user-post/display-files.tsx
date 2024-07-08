import { SlideShow } from '@/components/user-profile/user-post/slideshow';
import { backend } from '@/constants/constants';
import { PostFileType } from '@/types/types';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { ImageViewer } from './image-viewer';
import { RemoveFile } from './remove-file';
import { MdDelete } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';

interface DisplayFilesProps {
    files: PostFileType[];
    loggedUserId?: string | null | undefined;
}

export const DisplayFiles: React.FC<DisplayFilesProps> = ({ files, loggedUserId }) => {
    const [currentFiles, setCurrentFiles] = useState<PostFileType[]>(files);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [displayFileOptions, setDisplayFileOptions] = useState<boolean>(false);

    return (
        <div
            className={`grid gap-2 ${currentFiles.length === 1 || currentFiles.length > 4 ? 'grid-cols-1' : null} ${
                currentFiles.length > 1 && currentFiles.length <= 4 ? 'grid-cols-2' : null
            } my-2.5`}
        >
            {currentFiles.length <= 4 &&
                currentFiles.map((file) => (
                    <div key={file.id}>
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
                                {!loggedUserId && (
                                    <RemoveFile
                                        file={file}
                                        files={files}
                                        currentFiles={currentFiles}
                                        setCurrentFiles={setCurrentFiles}
                                    />
                                )}
                            </div>
                        )}
                        {file.fileType !== 'video/mp4' && (
                            <div className={`relative group overflow-hidden ${selectedImage && 'blur-sm'}`}>
                                <img
                                    alt={file.filename}
                                    src={backend.storageUrl + file.filename}
                                    className={`w-full h-[200px] ${
                                        currentFiles.length > 4 ? 'lg:h-[200px]' : 'lg:h-[500px]'
                                    } object-cover rounded-lg`}
                                    onClick={() => setSelectedImage(file.filename)}
                                />

                                {!loggedUserId && displayFileOptions && (
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 p-2 rounded-lg shadow-lg">
                                        <p>report image</p>
                                        <p>delete this image</p>
                                    </div>
                                )}

                                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 group-hover:bottom-5 cursor-pointer transition-all duration-300" onClick={() => setDisplayFileOptions(true)}>
                                    <BsThreeDots className="text-2xl" />
                                </div>
                                {!loggedUserId && (
                                    <RemoveFile
                                        file={file}
                                        files={files}
                                        currentFiles={currentFiles}
                                        setCurrentFiles={setCurrentFiles}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                ))}

            {selectedImage && <ImageViewer selectedImage={selectedImage} setSelectedImage={setSelectedImage} />}

            {currentFiles.length > 4 && <SlideShow files={currentFiles} loggedUserId={loggedUserId} />}
        </div>
    );
};
