import { SlideShow } from '@/components/user-profile/user-post/slideshow';
import { backend } from '@/constants/constants';
import { PostFileType } from '@/types/types';
import ReactPlayer from 'react-player';

interface DisplayFilesProps {
    files: PostFileType[];
}

export const DisplayFiles: React.FC<DisplayFilesProps> = ({ files }) => {
    return (
        <div
            className={`grid gap-2 ${files.length === 1 || files.length > 4 ? 'grid-cols-1' : null} ${
                files.length > 1 && files.length <= 4 ? 'grid-cols-2' : null
            } my-2.5`}
        >
            {files.length <= 4 &&
                files.map((file) => (
                    <div key={file.id} className="group relative">
                        {file.fileType === 'video/mp4' && (
                            <div className="w-full rounded-lg">
                                <ReactPlayer
                                    width="100%"
                                    height="100%"
                                    style={{ borderRadius: '0.5rem', overflow: 'hidden' }}
                                    url={backend.storageUrl + file.filename}
                                    playing
                                    muted
                                    light={false}
                                />
                            </div>
                        )}
                        {file.fileType !== 'video/mp4' && (
                            <img
                                alt={file.filename}
                                src={backend.storageUrl + file.filename}
                                className={`w-full h-[200px] ${
                                    files.length > 4 ? 'lg:h-[200px]' : 'lg:h-[500px]'
                                } object-cover rounded-lg`}
                            />
                        )}
                    </div>
                ))}

            {files.length > 4 && <SlideShow files={files} />}
        </div>
    );
};
