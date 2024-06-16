import { Dispatch, SetStateAction } from 'react';
import { IoIosSave } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';
import CropImage from './crop-image';

interface UpdateImageModalProps {
    isLoading: boolean;
    userId: string;
    modalName: string;
    modalDescription: string;
    errorMessage: string | null | undefined;
    isModalActive: boolean;
    handleFileChange: any;
    handleSave: any;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateImageModal(props: UpdateImageModalProps) {
    return (
        props.isModalActive && (
            <div
                id="default-modal"
                className="overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-10 flex justify-center items-center w-full md:inset-0 h-screen max-h-full bg-black/40"
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    {/* Modal content */}
                    <div className="relative rounded-lg shadow z-10 bg-gray-900">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                            <h5 className="text-base font-semibold text-white">{props.modalName}</h5>
                        </div>

                        <p className="mt-2 p-4 text-gray-400 text-center text-sm">{props.modalDescription}</p>

                        {/* Modal body */}
                        <CropImage handleFileChange={props.handleFileChange} />

                        {/* Modal footer */}
                        <div className="flex gap-2 p-4 md:p-5 border-t rounded-b border-gray-600">
                            <button
                                type="button"
                                onClick={props.handleSave}
                                className="w-full flex gap-1 items-center justify-center border-2 border-[#cc00ff] disabled:border-gray-800 text-[#cc00ff] disabled:text-gray-800 hover:text-black lowercase rounded-lg shadow-lg text-center py-1 hover:bg-[#cc00ff] disabled:hover:bg-transparent transition-all duration-200"
                                disabled={props.isLoading}
                            >
                                <IoIosSave className="text-xl" /> save
                            </button>
                            <button
                                type="button"
                                className="w-full flex gap-1 items-center justify-center border-2 border-[#cc00ff] disabled:border-gray-800 text-[#cc00ff] disabled:text-gray-800 hover:text-black lowercase rounded-lg shadow-lg text-center py-1 hover:bg-[#cc00ff] disabled:hover:bg-transparent transition-all duration-200"
                                disabled={props.isLoading}
                                onClick={() => {
                                    props.setIsModalActive(false);
                                }}
                            >
                                <TiCancel className="text-xl" /> cancel
                            </button>
                        </div>

                        {props.isLoading && <div className="w-full h-10 text-center text-sm font-mediu text-[#cc00ff]">Saving...</div>}

                        {props.errorMessage && (
                            <div className="w-full h-10 text-center text-sm font-medium text-red-300">{props.errorMessage}</div>
                        )}
                    </div>
                </div>
            </div>
        )
    );
}
