import { Dispatch, SetStateAction } from 'react';
import { MdOutlineCloudUpload } from 'react-icons/md';

interface UpdateImageModalProps {
    userId: string;
    modalName: string;
    modalDescription: string;
    selectedImageUrl: string;
    errorMessage: string | null | undefined;
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
    handleFileChange: any;
    handleSave: any;
}

export default function UpdateImageModal(props: UpdateImageModalProps) {
    return (
        <div
            id="default-modal"
            className={`${
                !props.isModalActive ? 'hidden' : null
            } bg-[#000000be] overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen max-h-full`}
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                {/* Modal content */}
                <div className="relative rounded-lg shadow bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                        <h3 className="text-xl font-semibold text-white">{props.modalName}</h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                            data-modal-hide="default-mnullodal"
                            onClick={() => props.setIsModalActive(false)}
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

                    <p className="mt-2 text-white text-center">{props.modalDescription}</p>

                    {/* Modal body */}
                    <div className="p-4 md:p-5 space-y-4">
                        <label
                            className="block mb-2 text-sm mx-auto w-fit font-medium text-white cursor-pointer"
                            htmlFor="fileInput"
                        >
                            <MdOutlineCloudUpload size={50} />
                        </label>
                        {props.selectedImageUrl && (
                            <img className="w-screen rounded-lg" src={props.selectedImageUrl} />
                        )}
                        <input
                            className="hidden"
                            id="fileInput"
                            type="file"
                            onChange={(event) => props.handleFileChange(event)}
                        />
                    </div>

                    {/* Modal footer */}
                    <div className="flex items-center p-4 md:p-5 border-t rounded-b border-gray-600">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                            onClick={props.handleSave}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="ms-3 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
                            onClick={() => {
                                props.setIsModalActive(false);
                            }}
                        >
                            Cancel
                        </button>
                        {props.errorMessage && (
                            <div className="ml-2 p-2 text-sm font-medium rounded-lg border border-red-400 text-red-400">
                                {props.errorMessage}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
