import { backend } from '@/constants/constants';
import { Dispatch, SetStateAction } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ImageViewerProps {
    selectedImage: string | null;
    setSelectedImage: Dispatch<SetStateAction<string | null>>;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ selectedImage, setSelectedImage }) => {
    return (
        <div
            className={`fixed flex items-center justify-center top-0 left-0 w-full px-2 py-5 h-screen z-10 bg-black/80 transform ${
                selectedImage ? null : 'translate-y-full'
            } transition-transform duration-300`}
        >
            {selectedImage && (
                <>
                    <IoMdClose
                        className="absolute top-5 right-5 bg-[#cc00ff1e] text-[#cc00ff] hover:bg-[#cc00ff] hover:text-black rounded-full cursor-pointer text-2xl transition-all duration-200"
                        onClick={() => setSelectedImage(null)}
                    />
                    <img
                        alt={'selectedImage'}
                        src={backend.storageUrl + selectedImage}
                        className="lg:h-full rounded-lg shadow-lg"
                    />
                </>
            )}
        </div>
    );
};
