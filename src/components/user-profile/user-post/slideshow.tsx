import { backend } from '@/constants/constants';
import { PostFileType } from '@/types/types';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import React from 'react';
import { Image } from '@mantine/core';

interface SlideShowProps {
    files: PostFileType[];
    loggedUserId?: string | null | undefined;
}

export const SlideShow: React.FC<SlideShowProps> = ({ files }) => {
    return (
        files.length > 0 && (
            <Carousel loop>
                {files.map((file, index) => {
                    return (
                        <Carousel.Slide key={file.id}>
                            <Image src={backend.storageUrl + file.filename} alt={`Slide ${index + 1}`} />
                        </Carousel.Slide>
                    );
                })}
            </Carousel>
        )
    );
};
