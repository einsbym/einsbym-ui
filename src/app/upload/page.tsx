'use client';

import Navbar from '@/components/navbar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { storageUrl } from '../constants/constants';

export default function Upload() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [formData, setFormData] = useState({
        imageName: '',
        prompt: '',
        negativePrompt: '',
        aiModelUsed: '',
    });
    const [file, setFile] = useState<any>(null);

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        setErrorMessage('');
        setSuccessMessage('');

        if (!file) {
            setErrorMessage('You did not load any image. Please, select a file.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);

            await fetch(`${storageUrl}/upload`, {
                method: 'POST',
                body: formData,
            });

            console.log('File uploaded successfully');
            setSuccessMessage('The image was uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            setErrorMessage('Something went wrong.');
        }
    };

    const setMetadata = (e: any) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <main className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
            <Navbar />

            <div className="fixed z-10 inset-0 overflow-y-auto bg-black-100">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 bg-black-100">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-[700px]">
                        <form>
                            <div className="bg-[black] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex items-center justify-center w-full mb-4">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e)}
                                        />
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageName">
                                        Image Name
                                    </label>
                                    <input
                                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800"
                                        id="imageName"
                                        type="text"
                                        placeholder="Image Name"
                                        onChange={(data) => setMetadata(data)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prompt">
                                        Prompt
                                    </label>
                                    <textarea
                                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800"
                                        id="prompt"
                                        placeholder="Prompt"
                                        onChange={(data) => setMetadata(data)}
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="negativePrompt"
                                    >
                                        Negative Prompt
                                    </label>
                                    <textarea
                                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800"
                                        id="negativePrompt"
                                        placeholder="Negative Prompt"
                                        onChange={(data) => setMetadata(data)}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aiModelUsed">
                                        AI Model Used
                                    </label>
                                    <input
                                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800"
                                        id="aiModelUsed"
                                        type="text"
                                        placeholder="AI Model Used"
                                        onChange={(data) => setMetadata(data)}
                                    />
                                </div>
                                {errorMessage.length !== 0 ? (
                                    <div className="flex justify-center mt-5">
                                        <div className="w-fit p-4 text-[#ff0000] border border-[#ff0000] bg-[#ff00001a] rounded-lg">
                                            {errorMessage}
                                        </div>
                                    </div>
                                ) : null}
                                {successMessage.length !== 0 ? (
                                    <div className="flex justify-center mt-5">
                                        <div className="w-fit p-4 text-[#66ff00] border border-[#66ff00] bg-[#13500036] rounded-lg">
                                            {successMessage}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                            <div className="bg-[black] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    onClick={handleUpload}
                                >
                                    Upload Image
                                </button>
                                <button
                                    type="button"
                                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    onClick={() => router.push('/')}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
