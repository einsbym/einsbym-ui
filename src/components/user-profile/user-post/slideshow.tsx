import { backend } from '@/constants/constants';
import { PostFileType } from '@/types/types';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Image, rem } from '@mantine/core';
import React from 'react';

interface SlideShowProps {
    files: PostFileType[];
    loggedUserId?: string | null | undefined;
}

export const SlideShow: React.FC<SlideShowProps> = ({ files }) => {
    return (
        files.length > 0 && (
            <Carousel loop height={500}>
                {files.map((file, index) => {
                    return (
                        <Carousel.Slide key={file.id}>
                            <Image
                                src={backend.storageUrl + file.filename}
                                alt={`Slide ${index + 1}`}
                                style={{ width: '100%', height: rem(500), objectFit: 'contain' }}
                            />
                        </Carousel.Slide>
                    );
                })}
            </Carousel>
        )
    );
};
