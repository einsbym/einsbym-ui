import { Dispatch, SetStateAction } from 'react';
import { IoIosClose, IoIosSave } from 'react-icons/io';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { TiCancel } from 'react-icons/ti';

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
        props.isModalActive && (
            <div
                id="default-modal"
                className="overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-10 flex justify-center items-center w-full md:inset-0 h-screen max-h-full"
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    {/* Modal content */}
                    <div className="relative rounded-lg shadow z-10 bg-gray-900">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                            <h3 className="text-xl font-semibold text-white">{props.modalName}</h3>
                            <button
                                type="button"
                                className="rounded-lg ms-auto hover:bg-gray-600"
                                onClick={() => props.setIsModalActive(false)}
                            >
                                <IoIosClose className="w-8 h-8" />
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
                                <img
                                    alt={props.selectedImageUrl}
                                    className="w-screen rounded-lg"
                                    src={props.selectedImageUrl}
                                />
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
                                className="flex gap-1 items-center justify-center border-2 border-[#cc00ff] disabled:border-gray-800 text-[#cc00ff] disabled:text-gray-800 hover:text-black uppercase font-bold rounded-lg shadow-lg text-center p-2 hover:bg-[#cc00ff] disabled:hover:bg-transparent transition-all duration-200"
                            >
                                <IoIosSave /> save
                            </button>
                            <button
                                type="button"
                                className="flex gap-1 items-center justify-center border-2 border-[#cc00ff] disabled:border-gray-800 text-[#cc00ff] disabled:text-gray-800 hover:text-black uppercase font-bold rounded-lg shadow-lg text-center p-2 hover:bg-[#cc00ff] disabled:hover:bg-transparent transition-all duration-200"
                                onClick={() => {
                                    props.setIsModalActive(false);
                                }}
                            >
                                <TiCancel /> cancel
                            </button>

                            {props.errorMessage && (
                                <div className="p-2 text-sm font-medium rounded-lg bg-red-950/60 text-red-300 text-center">
                                    {props.errorMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
