'use client';

import ButtonLoadMore from '@/components/shared/button-load-more';
import Navbar from '@/components/shared/navbar';
import { api } from '@/constants/constants';
import { IMAGES } from '@/graphql/queries/image';
import { Image } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

export default function Home() {
    // States
    const [images, setImages] = useState<Image[]>([]);
    const [page, setPage] = useState<number>(1);

    // Other hooks
    const router = useRouter();

    // Queries
    const { data, loading, fetchMore } = useQuery(IMAGES, {
        variables: { page: page },
        notifyOnNetworkStatusChange: true,
    });

    const viewImage = (image: Image) => {
        router.push(`/view-image?image=${image.id}`);
    };

    const loadMoreImages = useCallback(
        async (offSet?: number) => {
            await fetchMore({
                variables: { page: offSet || page + 1 },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    if (offSet) {
                        setImages(fetchMoreResult.images);
                        return;
                    }

                    setImages([...images, ...fetchMoreResult.images]);
                },
            });
            setPage(offSet || page + 1); // Update the page state after fetching more images
        },
        [page, fetchMore, images],
    );

    // useEffect to load images initially
    useEffect(() => {
        if (data && images.length === 0) {
            setImages(data.images);
        }
    }, [data, images, loadMoreImages]);

    return (
        <>
            <Navbar />

            <div className="mt-20 rounded-t-[2rem] overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {images &&
                    images.map((image, index) => (
                        <div key={image.id}>
                            {image.filename.split('.').pop() === 'mp4' && (
                                <div className="transition duration-300 ease-in-out hover:shadow-[0_35px_60px_-15px_#cc00ff69] overflow-hidden w-full h-[500px] cursor-pointer">
                                    <ReactPlayer width="100%" height="100%" url={api.storageUrl + image.filename} playing muted />
                                </div>
                            )}
                            {image.filename.split('.').pop() !== 'mp4' && (
                                <img
                                    alt={image.filename}
                                    className="transition duration-300 ease-in-out hover:shadow-[0_35px_60px_-15px_#cc00ff69] w-full h-[500px] cursor-pointer object-cover"
                                    src={api.storageUrl + image.filename}
                                    onClick={() => viewImage(image)}
                                />
                            )}
                        </div>
                    ))}
            </div>

            {data && data.images.length !== 0 && <ButtonLoadMore handleClick={loadMoreImages} />}

            {images.length === 0 && !loading && (
                <div className="mx-auto text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg">
                    There&apos;s nothing to show here
                </div>
            )}
        </>
    );
}
