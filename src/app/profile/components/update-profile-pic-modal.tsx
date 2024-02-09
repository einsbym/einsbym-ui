import { storageServiceUrl } from '@/app/constants/constants';
import { UPDATE_PROFILE_IMAGE } from '@/graphql/mutations/user';
import { useMutation } from '@apollo/client';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { MdOutlineCloudUpload } from 'react-icons/md';

interface UpdateProfilePictureModalProps {
    userId: string;
    isChangeProfPicModalActive: boolean;
    setIsChangeProfPicModalActive: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateProfilePictureModal(props: UpdateProfilePictureModalProps) {
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>();
    const [file, setFile] = useState<File>();
    const [updateProfileImage] = useMutation(UPDATE_PROFILE_IMAGE);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            // Create a blob URL for the selected file
            const blobUrl = URL.createObjectURL(file);

            // Use blobUrl as needed (e.g., display the image)
            setSelectedImageUrl(blobUrl);
        }

        setFile(file);
    };

    const handleSave = async () => {
        try {
            if (!file) {
                throw new Error('No file selected.');
            }

            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${storageServiceUrl}/storage-service/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.status !== 200) {
                throw new Error(response.statusText);
            }

            // Get response from backend
            const jsonResponse = await response.json();

            // Save image data
            const result = await updateProfileImage({
                variables: {
                    updateProfilePictureInput: {
                        id: props.userId,
                        profilePicture: jsonResponse.filename,
                    },
                },
            });

            if (result.errors) {
                throw new Error('Error when attempting to save image data');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div
            id="default-modal"
            className={`${
                !props.isChangeProfPicModalActive ? 'hidden' : null
            } bg-[#000000be] overflow-y-auto overflow-x-hidden fixed top-0 right-4 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen max-h-full`}
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                {/* Modal content */}
                <div className="relative rounded-lg shadow bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                        <h3 className="text-xl font-semibold text-white">Update your profile picture</h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                            data-modal-hide="default-modal"
                            onClick={() => props.setIsChangeProfPicModalActive(false)}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-4 md:p-5 space-y-4">
                        <label
                            className="block mb-2 text-sm mx-auto w-fit font-medium text-white cursor-pointer"
                            htmlFor="fileInput"
                        >
                            <MdOutlineCloudUpload size={50} />
                        </label>
                        {selectedImageUrl && <img className="rounded-lg" src={selectedImageUrl} />}
                        <input
                            className="hidden"
                            id="fileInput"
                            type="file"
                            onChange={(event) => handleFileChange(event)}
                        />
                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center p-4 md:p-5 border-t rounded-b border-gray-600">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="ms-3 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
                            onClick={() => props.setIsChangeProfPicModalActive(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
