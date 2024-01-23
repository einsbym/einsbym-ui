'use client';

import useAuth from '@/auth/use-auth';
import Navbar from '@/components/navbar';
import { SAVE_IMAGE_DATA } from '@/graphql/mutations/image';
import { User } from '@/interfaces/interfaces';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { storageServiceUrl } from '../constants/constants';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

// Ugly hack to hide the annoying warning from `react-tag-input` lib.
// For more: https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
};

export default function Upload() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [file, setFile] = useState<any>(null);
    const [saveImageData] = useMutation(SAVE_IMAGE_DATA);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>();
    const [imageData, setImageData] = useState({
        name: '',
        description: '',
    });
    const { getUser } = useAuth();
    const [user, setUser] = useState<User>();

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            // Create a blob URL for the selected file
            const blobUrl = URL.createObjectURL(file);

            // Use blobUrl as needed (e.g., display the image)
            setSelectedImageUrl(blobUrl);
        }

        setFile(e.target.files[0]);
    };

    const handleInputChange = (e: any) => {
        setImageData({
            ...imageData,
            [e.id]: e.value
        })
    };

    const [tags, setTags] = useState([{ id: '1', text: 'detailed' }]);

    const handleDelete = (i: any) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag: any) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag: any, currPos: any, newPos: any) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleTagClick = (index: any) => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const handleUpload = async () => {
        setErrorMessage('');
        setSuccessMessage('');

        if (!file) {
            setErrorMessage('You did not load any image. Please, select a file.');
            return;
        }

        if (!user) {
            router.push('/auth/login');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${storageServiceUrl}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.status !== 200) {
                throw new Error(response.statusText);
            }

            // Get response from backend
            const jsonResponse = await response.json();

            // Save image data
            const result = await saveImageData({
                variables: {
                    createImageInput: {
                        filename: jsonResponse.filename,
                        name: imageData.name,
                        description: imageData.description,
                        tags: tags.map((tag) => {return tag.text}),
                        userId: user?.id,
                    },
                },
            });

            if (result.errors) {
                throw new Error('Error when attempting to save image data');
            }

            setSuccessMessage('The image was uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            setErrorMessage('Something went wrong.');
        }
    };

    useEffect(() => {
        const currentUser = getUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

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
                                        className="bg-cover bg-center flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500"
                                        style={{ backgroundImage: `url(${selectedImageUrl})` }}
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
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        Image Name
                                    </label>
                                    <input
                                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800"
                                        id="name"
                                        type="text"
                                        placeholder="Image Name"
                                        onChange={(data) => handleInputChange(data.target)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                        Description
                                    </label>
                                    <textarea
                                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800"
                                        id="description"
                                        placeholder="Description"
                                        onChange={(data) => handleInputChange(data.target)}
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <ReactTags
                                        classNames={{
                                            tagInputField:
                                                'shadow appearance-none rounded w-full py-2 px-3 mt-4 text-gray-100 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800',
                                            tag: 'inline-block w-fit p-2 m-1 text-[#cc00ff] border border-[#cc00ff] rounded-lg',
                                            remove: 'ml-2 text-[#ff0000]',
                                        }}
                                        tags={tags}
                                        delimiters={delimiters}
                                        handleDelete={handleDelete}
                                        handleAddition={handleAddition}
                                        handleDrag={handleDrag}
                                        handleTagClick={handleTagClick}
                                        inputFieldPosition="bottom"
                                        autocomplete
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
