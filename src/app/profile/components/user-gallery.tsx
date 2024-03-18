import Footer from '@/components/footer';
import { storageUrl } from '@/constants/constants';
import { FIND_IMAGES_BY_USER } from '@/graphql/queries/image';
import { Image } from '@/interfaces/interfaces';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import ReactPlayer from 'react-player';

export default function UserGallery(props: { userId: string }) {
    // States
    const [isImageViewerActive, setIsImageViewerActive] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<{ url: string; fileExtension: string } | null>();

    // Queries
    const { data, loading } = useQuery(FIND_IMAGES_BY_USER, {
        variables: {
            userId: props.userId,
        },
        fetchPolicy: 'no-cache',
    });

    const handleGalleryItemClick = (url: string) => {
        setSelectedFile(null);
        setSelectedFile({ url: url, fileExtension: url.split('.').pop() || '' });
        setIsImageViewerActive(true);
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
                        {data.findImagesByUser.length} images
                    </span>
                )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {data?.findImagesByUser.map((image: Image) => (
                    <div key={image.id}>
                        {image.filename.split('.').pop() === 'mp4' && (
                            <div
                                className="h-[200px] w-full overflow-hidden object-contain cursor-pointer rounded-lg hover:border-2 hover:border-[#cc00ff]"
                                onClick={() => handleGalleryItemClick(storageUrl + image.filename)}
                            >
                                <ReactPlayer url={storageUrl + image.filename} playing muted />
                            </div>
                        )}
                        {image.filename.split('.').pop() !== 'mp4' && (
                            <img
                                alt={image.filename}
                                className="h-[200px] w-full rounded-lg object-cover cursor-pointer hover:border-2 hover:border-[#cc00ff]"
                                src={storageUrl + image.filename}
                                onClick={() => handleGalleryItemClick(storageUrl + image.filename)}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div
                className={`fixed top-0 right-0 z-40 w-full lg:rounded-l-[2rem] lg:w-1/2 h-screen flex justify-center items-center p-4 overflow-y-auto ${
                    isImageViewerActive ? null : 'translate-x-full'
                } transition-transform backdrop-blur-lg bg-opacity-10 z-10 bg-black/30`}
            >
                <IoIosArrowForward
                    className="absolute z-10 top-5 lg:top-auto left-5 bg-[#cc00ff1e] text-[#cc00ff] p-2 cursor-pointer mb-2"
                    onClick={() => setIsImageViewerActive(false)}
                    size={40}
                />
                {selectedFile && selectedFile.fileExtension !== 'mp4' && (
                    <img alt={selectedFile.url} className="rounded-lg h-full object-contain" src={selectedFile.url} />
                )}
                {selectedFile && selectedFile.fileExtension === 'mp4' && (
                    <ReactPlayer
                        width="100%"
                        height="fit-content"
                        style={{ borderRadius: '10px', overflow: 'hidden' }}
                        url={selectedFile.url}
                        controls
                        playing
                    />
                )}
            </div>

            <Footer />
        </div>
    );
}
