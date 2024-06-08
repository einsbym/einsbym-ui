/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';

interface LoadMoreProps {
    loadMore: any;
}

export const LoadMore: React.FC<LoadMoreProps> = ({ loadMore }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const isScrolledToBottom = scrollTop + winHeight >= docHeight;
            setIsVisible(isScrolledToBottom);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll); // Cleanup
    }, []);

    useEffect(() => {
        if (isVisible) {
            loadMore();
        }
    }, [isVisible]);

    return (
        <div
            className={`loading-more-data fixed bottom-0 w-full h-3 text-center bg-gray-200 text-gray-700 opacity-0 transition-opacity duration-300 ${
                isVisible ? 'opacity-100' : ''
            }`}
        ></div>
    );
};
