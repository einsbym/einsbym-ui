import { Dispatch, SetStateAction } from 'react';

interface UpdateProfilePictureModalProps {
    isChangeProfPicModalActive: boolean;
    setIsChangeProfPicModalActive: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateProfilePictureModal(props: UpdateProfilePictureModalProps) {
    return (
            <div
                id="default-modal"
                className={`${
                    !props.isChangeProfPicModalActive ? 'hidden' : null
                } overflow-y-auto overflow-x-hidden fixed top-0 right-4 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
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
                        <input className="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" id="fileInput" type="file" />
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b border-gray-600">
                            <button
                                data-modal-hide="default-modal"
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                            >
                                Save
                            </button>
                            <button
                                data-modal-hide="default-modal"
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
