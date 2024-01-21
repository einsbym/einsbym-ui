'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Slides from '@/components/slide-info';
import { useEffect, useState } from 'react';
import { storageUrl } from '../constants/constants';
import { Image } from '@/interfaces/interfaces';

const slides = [
    { title: 'Title 1', text: 'Text 1' },
    { title: 'Title 2', text: 'Text 2' },
    { title: 'Title 3', text: 'Text 3' },
    { title: 'Title 4', text: 'Text 4' },
];

export default function ViewImage() {
    // Set the value received from the local storage to a local state
    const [selectedImage, setSelectedImage] = useState<Image>({
        id: '',
        name: '',
        filename: '',
        description: '',
        tags: [''],
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    useEffect(() => {
        // Get the value from local storage if it exists
        const value = localStorage.getItem('selectedImage') || '';
        setSelectedImage(JSON.parse(value));
    }, []);

    return (
        <>
            <main className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
                <Navbar />

                <h2 className="mb-5 text-4xl font-extrabold text-white underline underline-offset-3 decoration-8 decoration-[#cc00ff]">
                    {selectedImage.name}
                </h2>
                <p className="mb-5">
                    {selectedImage.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                            {tag}
                        </span>
                    ))}
                </p>

                <div className="flex justify-center">
                    <img className="rounded-lg object-cover" src={storageUrl + selectedImage.filename} />
                </div>

                <button
                    type="button"
                    className="w-full md:w-fit text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-3 mb-3"
                    onClick={() => console.log(`${selectedImage} should be deleted`)}
                >
                    Delete
                </button>

                <div className="flex items-center mb-5 p-5 border border-1 border-gray-500 rounded-lg">
                    <div className="flex-shrink-0">
                        <img className="w-10 h-10 rounded-full" src="/profpic.jpeg" alt="Bianca Neri" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium truncate text-[#cc00ff]">Bianca Neri</p>
                        <p className="text-sm text-gray-500 truncate">@biancaneri</p>
                    </div>
                    <div className="inline-flex text-xs items-center font-semibold text-gray-500">{selectedImage.createdAt.toString()}</div>
                </div>

                <h4 className="mb-5 text-2xl font-extrabold text-white underline underline-offset-3 decoration-6 decoration-[#cc00ff]">
                    Details
                </h4>
                <div className="bg-gray-900 rounded-lg p-5 mb-5 text-white">
                    <p>
                        {selectedImage.description}
                    </p>
                </div>

                <Slides slides={slides} />
            </main>

            <Footer />
        </>
    );
}
