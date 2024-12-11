'use client';

import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import Post from '@/components/shared/post';
import { backend } from '@/constants/constants';
import { FILES } from '@/graphql/queries/file';
import { PostFileType } from '@/types/types';
import { useQuery } from '@apollo/client';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

export default function Videos() {
    // States
    const [files, setFiles] = useState<PostFileType[]>([]);
    const [page, setPage] = useState<number>(1);

    // Queries
    const { data, loading, fetchMore } = useQuery(FILES, {
        variables: { fileTypes: ['video/mp4'], page: page, limit: 1 },
        notifyOnNetworkStatusChange: true,
    });

    // Fetch previous video
    const loadPrevious = useCallback(async () => {
        if (page === 1) {
            return;
        }

        await fetchMore({
            variables: { fileTypes: ['video/mp4'], page: page - 1, limit: 1 },
            updateQuery: ({ fetchMoreResult }) => {
                if (fetchMoreResult.files.length > 0) setFiles(fetchMoreResult.files);
            },
        });
        setPage(page - 1);
    }, [page, fetchMore]);

    // Fetch next video
    const loadNext = useCallback(async () => {
        await fetchMore({
            variables: { fileTypes: ['video/mp4'], page: page + 1, limit: 1 },
            updateQuery: ({ fetchMoreResult }) => {
                if (fetchMoreResult.files.length > 0) setFiles(fetchMoreResult.files);
            },
        });
        setPage(page + 1);
    }, [page, fetchMore]);

    // useEffect to load files initially
    useEffect(() => {
        if (data && files.length === 0) {
            setFiles(data.files);
        }
    }, [data, files, loadNext, loadPrevious]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <title>Videos</title>

            <Navbar />
            <Carousel orientation="horizontal" onNextSlide={loadNext} onPreviousSlide={loadPrevious}>
                {files &&
                    files.map((file) => (
                        <div key={file.id} className="flex items-center justify-center h-screen">
                            <div className="relative w-4/5 h-full">
                                <ReactPlayer
                                    width="100%"
                                    height="100%"
                                    url={backend.storageUrl + file.filename}
                                    playing
                                    muted
                                    loop
                                    light={false}
                                />
                            </div>
                            <Post postId={file.post.id} />
                        </div>
                    ))}
            </Carousel>
        </>
    );
}
