'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Slides from '@/components/slide-info';
import { useSearchParams } from 'next/navigation';

const slides = [
    { title: 'Title 1', text: 'Text 1' },
    { title: 'Title 2', text: 'Text 2' },
    { title: 'Title 3', text: 'Text 3' },
    { title: 'Title 4', text: 'Text 4' },
];

export default function ViewImage() {
    const searchParams = useSearchParams();
    const imageId = searchParams.get('image') || '';

    // Regular expression to check if string is a valid UUID
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    if (!regexExp.test(imageId)) {
        console.error('This is not a valid uuid');
        return;
    }

    return (
        <>
            <main className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
                <Navbar />

                <h2 className="mb-5 text-4xl font-extrabold text-white underline underline-offset-3 decoration-8 decoration-[#cc00ff]"></h2>
                <p className="mb-5">
                    <span
                        key={1}
                        className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300"
                    >
                        TEST
                    </span>
                </p>

                <div className="flex justify-center">
                    <img alt="" className="rounded-lg object-cover" src={''} />
                </div>

                <button
                    type="button"
                    className="w-full md:w-fit text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-3 mb-3"
                    onClick={() => console.log(`should be deleted`)}
                >
                    Delete
                </button>

                <div className="flex items-center mb-5 p-5 border border-1 border-gray-500 rounded-lg">
                    <div className="flex-shrink-0">
                        <img alt="" className="w-10 h-10 rounded-full" src={''} />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium truncate text-[#cc00ff]">Name</p>
                        <p className="text-sm text-gray-500 truncate">@username</p>
                    </div>
                    <div className="inline-flex text-xs items-center font-semibold text-gray-500">a day ago</div>
                </div>

                <h4 className="mb-5 text-2xl font-extrabold text-white underline underline-offset-3 decoration-6 decoration-[#cc00ff]">
                    Details
                </h4>
                <div className="bg-gray-900 rounded-lg p-5 mb-5 text-white">
                    <p>description</p>
                </div>

                <Slides slides={slides} />
            </main>

            <Footer />
        </>
    );
}
