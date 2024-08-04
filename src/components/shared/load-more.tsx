import React, { useEffect, useRef } from 'react';

interface LoadMoreProps {
    loadMore: any;
}

export const LoadMore: React.FC<LoadMoreProps> = ({ loadMore }) => {
    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        loadMore();
                    }
                });
            },
            {
                root: null, // relative to the viewport
                rootMargin: '0px',
                threshold: 1.0, // trigger when 100% of the target is visible
            },
        );

        const currentRef = observerRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [loadMore]);

    return <div ref={observerRef} className="h-[100px] lg:h-[50px]" />;
};
