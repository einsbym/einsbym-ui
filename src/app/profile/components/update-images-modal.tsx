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
            } transition-all transform duration-200 overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-10 flex justify-center items-center w-full md:inset-0 h-screen max-h-full`}
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                {/* Modal content */}
                <div className="relative rounded-lg shadow backdrop-filter backdrop-blur-lg bg-opacity-10 z-10 bg-black/30">
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

                    <p className="mt-2 p-4 text-white text-center">{props.modalDescription}</p>

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
                    <div className="flex gap-2 items-center p-4 md:p-5 border-t rounded-b border-gray-600">
                        <button
                            type="button"
                            onClick={props.handleSave}
                            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-purple-800"
                        >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                save
                            </span>
                        </button>
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-cyan-800"
                            onClick={() => {
                                props.setIsModalActive(false);
                            }}
                        >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                cancel
                            </span>
                        </button>

                        {props.errorMessage && (
                            <div className="p-2 text-sm font-medium rounded-lg border border-red-400 text-red-400">
                                {props.errorMessage}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
