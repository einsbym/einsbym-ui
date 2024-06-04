import { backend } from '@/constants/constants';
import { PostFileType } from '@/types/types';
import React, { useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

interface SlideShowProps {
    files: PostFileType[];
}

export const SlideShow: React.FC<SlideShowProps> = ({ files }) => {
    const [activeIndex, setActiveIndex] = useState(1);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? files.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === files.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        files.length > 0 && (
            <div id="controls-carousel" className="relative w-full md:h-[500px]">
                <div className="relative h-full md:h-[500px] overflow-hidden rounded-lg md:rounded-none">
                    {files.map((file, index) => (
                        <div key={file.id} className={index === activeIndex ? 'block' : 'hidden'}>
                            <img src={backend.storageUrl + file.filename} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={handlePrev}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#cc00ff]/20 group-hover:bg-[#cc00ff]/60 group-focus:ring-4 group-focus:ring-[#cc00ff] group-focus:ring-[#cc00ff]/70 group-focus:outline-none">
                        <IoIosArrowDropleft className="text-xl text-[#cc00ff]" />
                    </span>
                </button>
                <button
                    type="button"
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={handleNext}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#cc00ff]/20 group-hover:bg-[#cc00ff]/60 group-focus:ring-4 group-focus:ring-[#cc00ff] group-focus:ring-[#cc00ff]/70 group-focus:outline-none">
                        <IoIosArrowDropright className="text-xl text-[#cc00ff]" />
                    </span>
                </button>
            </div>
        )
    );
};
