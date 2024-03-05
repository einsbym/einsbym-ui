'use client';

import ButtonLoadMore from '@/components/button-load-more';
import Navbar from '@/components/navbar';
import { IMAGES } from '@/graphql/queries/image';
import { Image } from '@/interfaces/interfaces';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { storageUrl } from '../constants/constants';

const skeleton = new Array(6).fill(null);

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

    const loadMoreImages = useCallback(() => {
        fetchMore({
            variables: { page: page + 1 },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                setImages([...images, ...fetchMoreResult.images]);
            },
        });
        setPage(page + 1); // Update the page state after fetching more images
    }, [page, fetchMore, images]); // Add fetchMore as a dependency

    // useEffect to load images initially
    useEffect(() => {
        if (page === 1) {
            loadMoreImages();
        }
    }, [page, loadMoreImages]); // Include loadMoreImages in the dependency array

    return (
        <>
            <Navbar />

            {loading && (
                <div className="flex justify-center flex-wrap gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {skeleton.map((_, index) => (
                        <div key={index} className="w-[500px] h-[500px] animate-pulse bg-gray-100"></div>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {images &&
                    images.map((image, index) => (
                        <div key={image.id}>
                            <img
                                alt={image.filename}
                                className="transition duration-300 ease-in-out hover:shadow-[0_35px_60px_-15px_#cc00ff69] w-[500px] h-[500px] cursor-pointer object-cover"
                                src={storageUrl + image.filename}
                                onClick={() => viewImage(image)}
                            />
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
