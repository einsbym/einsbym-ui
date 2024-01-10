'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { useEffect, useState } from 'react';

export default function ViewImage() {
    // Set the value received from the local storage to a local state
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        // Get the value from local storage if it exists
        const value = localStorage.getItem('selectedImage') || '';
        setSelectedImage(value);
    }, []);

    return (
        <main className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
            <Navbar />

            <h2 className="mb-10 text-4xl font-extrabold dark:text-white underline underline-offset-3 decoration-8 decoration-[#cc00ff]">
                Image title
            </h2>
            <img className="rounded-lg object-cover" src={selectedImage} />

            <div className="flex items-center mt-5 p-5 border border-1 border-gray-500 rounded-lg">
                <div className="flex-shrink-0">
                    <img
                        className="w-10 h-10 rounded-full"
                        src="/profpic.jpeg"
                        alt="Neil image"
                    />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium truncate text-[#cc00ff]">Bianca Neri</p>
                    <p className="text-sm text-gray-500 truncate">@biancaneri</p>
                </div>
                <div className="inline-flex text-xs items-center font-semibold text-gray-500">
                    Há dois dias
                </div>
            </div>

            <Footer />
        </main>
    );
}
