'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { minioClient } from '@/minio-client/minio-client';
import { BucketItem } from 'minio';
import { useRouter } from 'next/navigation';
import { SetStateAction, useEffect, useState } from 'react';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<string[]>([]);
    const router = useRouter();

    const viewImage = (image: string) => {
        localStorage.setItem('selectedImage', image);
        router.push('/view-image');
    };

    const getImages = async () => {
        const data: BucketItem[] = [];
        const stream = minioClient.listObjects('stable-diffusion', '', true);

        stream.on('data', function (obj) {
            data.push(obj);
        });
        stream.on('end', function () {
            const presignedUrls: SetStateAction<string[]> = [];

            data.forEach((obj) => {
                if (obj.name !== undefined) {
                    minioClient.presignedUrl('GET', 'stable-diffusion', obj.name, 24 * 60 * 60, (err, presignedUrl) => {
                        if (err) return console.error(err);
                        presignedUrls.push(presignedUrl);
                    });
                }
            });

            setImages(presignedUrls);
            setLoading(false);
        });
        stream.on('error', function (err) {
            console.error(err);
            setLoading(false);
        });
    };

    useEffect(() => {
        getImages();
    }, []);

    return (
        <>
            <main className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
                <Navbar />

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                    {loading ? (
                        <>
                            <div>
                                <img
                                    className={`grid-image w-[500px] h-[500px] cursor-pointer rounded-lg object-cover animate-pulse bg-gray-100`}
                                    src={''}
                                />
                            </div>
                            <div>
                                <img
                                    className={`grid-image w-[500px] h-[500px] cursor-pointer rounded-lg object-cover animate-pulse bg-gray-100`}
                                    src={''}
                                />
                            </div>
                            <div>
                                <img
                                    className={`grid-image w-[500px] h-[500px] cursor-pointer rounded-lg object-cover animate-pulse bg-gray-100`}
                                    src={''}
                                />
                            </div>
                            <div>
                                <img
                                    className={`grid-image w-[500px] h-[500px] cursor-pointer rounded-lg object-cover animate-pulse bg-gray-100`}
                                    src={''}
                                />
                            </div>
                        </>
                    ) : null}

                    {images &&
                        images.map((image, index) => (
                            <div key={index}>
                                <img
                                    className={`grid-image w-[500px] h-[500px] cursor-pointer rounded-lg object-cover`}
                                    src={image}
                                    onClick={() => viewImage(image)}
                                />
                            </div>
                        ))}
                </div>

                {images.length === 0 && !loading ? (
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
