import { backend } from '@/constants/constants';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ImageViewerProps {
    selectedImage: string;
    setSelectedImage: Dispatch<SetStateAction<string | null>>;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ selectedImage, setSelectedImage }) => {
    const viewerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (viewerRef.current && !viewerRef.current.contains(event.target as Node)) {
                setSelectedImage(null);
            }
        },
        [viewerRef, setSelectedImage],
    );

    useEffect(() => {
        // Add event listener on document click when menu is open
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup function to remove listener on unmount
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [selectedImage, handleClickOutside]);
    
    return (
        <div ref={viewerRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <IoMdClose
                className="absolute top-2 right-2 bg-[#cc00ff1e] text-[#cc00ff] hover:bg-[#cc00ff] hover:text-black rounded-full cursor-pointer text-2xl transition-all duration-200"
                onClick={() => setSelectedImage(null)}
            />
            <img
                alt={'selectedImage'}
                src={backend.storageUrl + selectedImage}
                className="w-full rounded-lg shadow-lg"
            />
        </div>
    );
};
