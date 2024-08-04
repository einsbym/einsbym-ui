import { backend } from '@/constants/constants';
import { PostFileType } from '@/types/types';
import getElapsedTime from '@/utils/elapsed-time';
import { CiCalendarDate } from 'react-icons/ci';
import GallerySkeleton from '../skeletons/gallery';

interface GalleryProps {
    files: PostFileType[];
    loading: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({ files, loading }) => {
    return (
        <>
            {files.length === 0 && loading && (
                <div className="overflow-hidden mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    <GallerySkeleton items={4} width="w-full" height="h-[500px]" />
                </div>
            )}

            <div className="mt-20 overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
                {files.map((file) => (
                    <a key={file.id} href={`/view-image/${file.id}`}>
                        <div className="relative">
                            <img
                                alt={file.filename}
                                className="w-full h-[500px] object-cover"
                                src={backend.storageUrl + file.filename}
                            />
                            <div className="parent absolute top-0 left-0 w-full h-full cursor-pointer hover:bg-black/30 transition-all duration-300 text-white">
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
                                        className="w-12 h-12 bg-slate-50 rounded-full object-cover"
                                    />
                                    <span>@{file.post.user.username}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {files.length > 0 && loading && (
                <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    <GallerySkeleton items={4} width="w-full" height="h-[500px]" margin="mt-2" />
                </div>
            )}
        </>
    );
};
