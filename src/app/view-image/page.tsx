'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Slides from '@/components/slide-info';
import { useEffect, useState } from 'react';

const slides = [
    { title: 'Title 1', text: 'Text 1' },
    { title: 'Title 2', text: 'Text 2' },
    { title: 'Title 3', text: 'Text 3' },
    { title: 'Title 4', text: 'Text 4' },
];

export default function ViewImage() {
    // Set the value received from the local storage to a local state
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        // Get the value from local storage if it exists
        const value = localStorage.getItem('selectedImage') || '';
        setSelectedImage(value);
    }, []);

    return (
        <>
            <main className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
                <Navbar />

                <h2 className="mb-5 text-4xl font-extrabold dark:text-white underline underline-offset-3 decoration-8 decoration-[#cc00ff]">
                    Image title
                </h2>
                <p className="mb-5">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        Default
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">
                        Dark
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-1 rounded-full dark:bg-red-900 dark:text-red-300">
                        Red
                    </span>
                </p>

                <div className="flex justify-center">
                    <img className="rounded-lg object-cover" src={selectedImage} />
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
                    <div className="inline-flex text-xs items-center font-semibold text-gray-500">Há dois dias</div>
                </div>

                <h4 className="mb-5 text-2xl font-extrabold dark:text-white underline underline-offset-3 decoration-6 decoration-[#cc00ff]">
                    Details
                </h4>
                <div className="bg-gray-900 rounded-lg p-5 mb-5">
                    <p>
                        The paragraph element is one of the most commonly used HTML tags on a document page because it
                        is used to write longer blocks of text separated by a blank line and can massively improve the
                        on-page SEO of the page when used correctly.
                    </p>
                </div>

                <Slides slides={slides} />
            </main>

            <Footer />
        </>
    );
}
