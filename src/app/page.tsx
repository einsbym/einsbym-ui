'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { IMAGES } from '@/graphql/queries/image';
import { Image } from '@/interfaces/interfaces';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { storageUrl } from './constants/constants';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<Image[]>([]);
    const router = useRouter();
    const imagesQuery = useQuery(IMAGES);

    const viewImage = (image: Image) => {
        router.push(`/view-image?image=${image.id}`);
    };

    const fetchData = async () => {
        try {
            if (imagesQuery.data) {
                setImages(imagesQuery.data.images);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [imagesQuery]);

    return (
        <>
            <main className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
                <Navbar />

                {loading && (
                    <div className="flex gap-2 md:grid-cols-2 lg:grid-cols-4">
                        <div
                            className={`image-grid w-[500px] h-[500px] animate-pulse cursor-pointer rounded-lg object-cover bg-gray-100`}
                        ></div>
                        <div
                            className={`image-grid w-[500px] h-[500px] animate-pulse cursor-pointer rounded-lg object-cover bg-gray-100`}
                        ></div>
                        <div
                            className={`image-grid w-[500px] h-[500px] animate-pulse cursor-pointer rounded-lg object-cover bg-gray-100`}
                        ></div>
                        <div
                            className={`image-grid w-[500px] h-[500px] animate-pulse cursor-pointer rounded-lg object-cover bg-gray-100`}
                        ></div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                    {images &&
                        images.map((image, index) => (
                            <div key={image.id}>
                                <img
                                    className={`grid-image w-[500px] h-[500px] cursor-pointer rounded-lg object-cover`}
                                    src={storageUrl + image.filename}
                                    onClick={() => viewImage(image)}
                                />
                            </div>
                        ))}
                </div>

                {!images && !loading ? (
                    <div className="flex justify-center">
                        <div className="text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg">
                            There's nothing to show here
                        </div>
                    </div>
                ) : null}
            </main>

            <Footer />
        </>
    );
}
