import { useState } from 'react';

export default function Slides({ slides }: any) {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((current) => (current + 1 === slides.length ? 0 : current + 1));
    };

    const prevSlide = () => {
        setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
    };

    return (
        <div className="relative w-full h-[200px] bg-[#cc00ff1e] rounded-lg p-5">
            {slides.map((slide: any, index: number) => (
                <div
                    key={index}
                    className={`absolute w-full h-full transition-opacity duration-500 ${
                        index !== activeIndex ? 'opacity-0' : ''
                    }`}
                >
                    <h2 className="text-2xl font-extrabold text-[#cc00ff] mb-5">{slide.title}</h2>
                    <p className='text-[#cc00ff]'>{slide.text}</p>
                </div>
            ))}
            <button
                onClick={prevSlide}
                className="absolute bottom-5 left-5 p-2 rounded-lg"
            >
                <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                    <svg
                        className="rtl:rotate-180 w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 5H1m0 0 4 4M1 5l4-4"
                        />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                onClick={nextSlide}
                className="absolute bottom-5 right-5 p-2 rounded-lg"
            >
                <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                    <svg
                        className="rtl:rotate-180 w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
}
