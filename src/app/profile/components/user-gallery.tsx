import Footer from '@/components/footer';
import { storageUrl } from '@/constants/constants';
import { FIND_IMAGES_BY_USER } from '@/graphql/queries/image';
import { Image } from '@/interfaces/interfaces';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

export default function UserGallery(props: { userId: string }) {
    // States
    const [isImageViewerActive, setIsImageViewerActive] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>();

    // Queries
    const { data, loading } = useQuery(FIND_IMAGES_BY_USER, {
        variables: {
            userId: props.userId,
        },
        fetchPolicy: 'no-cache',
    });

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
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
                        <img
                            className="h-[200px] w-[300px] rounded-lg object-cover cursor-pointer hover:border-2 hover:border-[#cc00ff]"
                            src={storageUrl + image.filename}
                            alt={image.filename}
                            onClick={() => handleImageClick(storageUrl + image.filename)}
                        />
                    </div>
                ))}
            </div>
            <div
                className={`fixed top-0 right-0 z-40 w-full lg:w-1/2 h-screen flex justify-center items-center p-4 overflow-y-auto ${
                    isImageViewerActive ? null : 'translate-x-full'
                } transition-transform backdrop-filter backdrop-blur-lg bg-opacity-10 z-10 bg-black/30`}
            >
                <IoIosArrowForward
                    className="absolute top-5 left-5 bg-[#cc00ff1e] text-[#cc00ff] p-2 cursor-pointer mb-2"
                    onClick={() => setIsImageViewerActive(false)}
                    size={40}
                />
                <img className="rounded-lg h-1/2 lg:h-full" src={selectedImage} />
            </div>
            
            <Footer />
        </div>
    );
}
