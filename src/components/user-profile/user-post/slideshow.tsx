import { backend } from '@/constants/constants';
import { PostFileType } from '@/types/types';
import React, { useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { FileMenu } from './file-menu';

interface SlideShowProps {
    files: PostFileType[];
    loggedUserId?: string | null | undefined;
}

export const SlideShow: React.FC<SlideShowProps> = ({ files, loggedUserId }) => {
    const [currentFiles, setCurrentFiles] = useState<PostFileType[]>(files);
    const [activeIndex, setActiveIndex] = useState(1);
    const [direction, setDirection] = useState('next');

    const handlePrev = () => {
        setDirection('next');
        setActiveIndex((prevIndex) => (prevIndex === 0 ? currentFiles.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setDirection('prev');
        setActiveIndex((prevIndex) => (prevIndex === currentFiles.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        currentFiles.length > 0 && (
            <div className="relative w-full h-full md:h-[500px]">
                <div className="flex justify-center overflow-hidden rounded-lg md:rounded-none">
                    {currentFiles.map((file, index) => {
                        let positionClass = 'translate-x-full w-0';

                        if (index === activeIndex) {
                            positionClass = 'translate-x-0 lg:w-full';
                        } else if (index === (activeIndex - 1 + currentFiles.length) % currentFiles.length) {
                            positionClass = direction === 'next' ? '-translate-x-full w-0' : 'translate-x-full w-0';
                        }

                        return (
                            <div
                                key={file.id}
                                className={`flex justify-center items-center transition-all ease-out duration-500 ${positionClass}`}
                            >
                                <div className="relative group">
                                    <img
                                        src={backend.storageUrl + file.filename}
                                        alt={`Slide ${index + 1}`}
                                        className="h-full md:h-[500px]"
                                    />
                                    {index === activeIndex && (
                                        <FileMenu
                                            loggedUserId={loggedUserId}
                                            file={file}
                                            files={files}
                                            currentFiles={currentFiles}
                                            setCurrentFiles={setCurrentFiles}
                                        />
                                    )}
                                </div>
                                <div
                                    className={`${
                                        index === activeIndex
                                            ? 'absolute bottom-2 right-2 p-2 rounded-md bg-[#cc00ff]/20 text-[#cc00ff]'
                                            : 'hidden'
                                    }`}
                                >
                                    {index + 1}/{currentFiles.length}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button
                    type="button"
                    className="absolute top-0 start-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={handlePrev}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#cc00ff]/20 group-focus:ring-4 group-focus:ring-[#cc00ff]/70 group-focus:outline-none">
                        <IoIosArrowDropleft className="text-xl text-[#cc00ff]" />
                    </span>
                </button>
                <button
                    type="button"
                    className="absolute top-0 end-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={handleNext}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#cc00ff]/20 group-focus:ring-4 group-focus:ring-[#cc00ff]/70 group-focus:outline-none">
                        <IoIosArrowDropright className="text-xl text-[#cc00ff]" />
                    </span>
                </button>
            </div>
        )
    );
};
