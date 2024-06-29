import { backend } from '@/constants/constants';
import { FIND_FILES_BY_USER } from '@/graphql/queries/file';
import { PostFileType } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import Footer from '../shared/footer';
import GallerySkeleton from '../skeletons/gallery';
import GallerySideViewer from './gallery-side-viewer';
import { Activity } from './activity';

export default function Gallery(props: { userId: string }) {
    // States
    const [isFileViewerActive, setIsFileViewerActive] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<{ url: string; fileExtension: string } | null>();

    // Queries
    const { data, loading } = useQuery(FIND_FILES_BY_USER, {
        variables: {
            userId: props.userId,
        },
        fetchPolicy: 'no-cache',
    });

    const handleGalleryItemClick = (url: string) => {
        setSelectedFile(null);
        setSelectedFile({ url: url, fileExtension: url.split('.').pop() || '' });
        setIsFileViewerActive(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-2 text-lg lg:text-2xl font-bold tracking-tight text-white">
                Gallery{' '}
                {loading && (
                    <span className="text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg text-base">loading...</span>
                )}
                {data && (
                    <span className="text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg text-sm">
                        {data.findFilesByUser.length} images
                    </span>
                )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {loading && <GallerySkeleton items={6} width="w-full" height="h-[200px]" />}

                {data &&
                    data.findFilesByUser.map((file: PostFileType) => (
                        <div key={file.id}>
                            {file.fileType === 'video/mp4' && (
                                <div
                                    className="h-[200px] w-full bg-black overflow-hidden object-contain cursor-pointer rounded-lg hover:border-2 hover:border-[#cc00ff]"
                                    onClick={() => handleGalleryItemClick(backend.storageUrl + file.filename)}
                                >
                                    <ReactPlayer
                                        url={backend.storageUrl + file.filename}
                                        width="100%"
                                        height="100%"
                                        light={false}
                                        pip={false}
                                    />
                                </div>
                            )}
                            {file.fileType !== 'video/mp4' && (
                                <img
                                    alt={file.filename}
                                    className="h-[200px] w-full rounded-lg object-cover cursor-pointer hover:border-2 hover:border-[#cc00ff]"
                                    src={backend.storageUrl + file.filename}
                                    onClick={() => handleGalleryItemClick(backend.storageUrl + file.filename)}
                                />
                            )}
                        </div>
                    ))}
            </div>

            <Activity userId={props.userId} />
            
            <GallerySideViewer
                isFileViewerActive={isFileViewerActive}
                setIsFileViewerActive={setIsFileViewerActive}
                selectedFile={selectedFile}
            />

            <Footer />
        </div>
    );
}
