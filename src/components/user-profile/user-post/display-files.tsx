import { SlideShow } from '@/components/user-profile/user-post/slideshow';
import { backend } from '@/constants/constants';
import { PostFileType } from '@/types/types';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { RemoveFile } from './remove-file';

interface DisplayFilesProps {
    files: PostFileType[];
    loggedUserId?: string | null | undefined;
}

export const DisplayFiles: React.FC<DisplayFilesProps> = ({ files, loggedUserId }) => {
    const [currentFiles, setCurrentFiles] = useState<PostFileType[]>(files);

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
                            <div className="relative">
                                <img
                                    alt={file.filename}
                                    src={backend.storageUrl + file.filename}
                                    className={`w-full h-[200px] ${
                                        currentFiles.length > 4 ? 'lg:h-[200px]' : 'lg:h-[500px]'
                                    } object-cover rounded-lg`}
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
                    </div>
                ))}

            {currentFiles.length > 4 && <SlideShow files={currentFiles} loggedUserId={loggedUserId} />}
        </div>
    );
};
