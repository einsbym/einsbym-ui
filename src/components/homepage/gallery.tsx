import { backend } from '@/constants/constants';
import { PostFileType } from '@/types/types';
import getElapsedTime from '@/utils/elapsed-time';
import { useState } from 'react';
import { CiCalendarDate } from 'react-icons/ci';

interface GalleryProps {
    files: PostFileType[];
}

export const Gallery: React.FC<GalleryProps> = ({ files }) => {
    const [selectedFile, setSelectedFile] = useState<PostFileType>();
    const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

    const openViewer = (file: PostFileType) => {
        setSelectedFile(file);
        setIsViewerOpen(true);
    };

    return (
        <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {files.map((file) => (
                <div key={file.id} className="relative">
                    <img
                        alt={file.filename}
                        className="w-full h-[500px] object-cover"
                        src={backend.storageUrl + file.filename}
                    />
                    <div
                        className="parent absolute top-0 left-0 w-full h-full cursor-pointer hover:bg-black/30 transition-all duration-300"
                        onClick={() => openViewer(file)}
                    >
                        <div className="child absolute flex items-center gap-1 top-5 left-5 text-sm">
                            <CiCalendarDate className="text-lg" /> {getElapsedTime(file.post.createdAt)}
                        </div>

                        {file.post.postText && (
                            <div className="child absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 italic">
                                {file.post.postText}
                            </div>
                        )}

                        <div className="child absolute flex items-center gap-1 bottom-5 left-5 text-sm">
                            <img
                                alt={file.post.user.username}
                                src={backend.storageUrl + file.post.user.profilePicture}
                                className="w-12 h-12 bg-slate-50 rounded-full"
                            />
                            <span>@{file.post.user.username}</span>
                        </div>
                    </div>
                </div>
            ))}

            {isViewerOpen && selectedFile && (
                <div
                    className="fixed px-2 lg-mx-auto inset-0 flex items-center justify-center backdrop-blur-lg bg-black/30"
                    onClick={() => setIsViewerOpen(false)}
                >
                    <img
                        className="h-auto lg:h-5/6 rounded-lg"
                        src={backend.storageUrl + selectedFile.filename}
                        alt={selectedFile.filename}
                    />
                </div>
            )}
        </div>
    );
};
