'use client';

import Navbar from '@/components/shared/navbar';
import Post from '@/components/videos/post';
import { api } from '@/constants/constants';
import { FILES } from '@/graphql/queries/file';
import { PostFileType } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
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
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                setFiles(fetchMoreResult.files);
            },
        });
        setPage(page - 1);
    }, [page, fetchMore]);

    // Fetch next video
    const loadNext = useCallback(async () => {
        await fetchMore({
            variables: { fileTypes: ['video/mp4'], page: page + 1, limit: 1 },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                setFiles(fetchMoreResult.files);
            },
        });
        setPage(page + 1);
    }, [page, fetchMore]);

    // useEffect to load images initially
    useEffect(() => {
        if (data && files.length === 0) {
            setFiles(data.files);
        }
    }, [data, files, loadNext, loadPrevious]);

    return (
        <>
            <Navbar />

            {files &&
                files.map((file) => (
                    <div key={file.id} className="flex items-center justify-center h-screen">
                        <div className="relative w-4/5 animated-shadow">
                            <ReactPlayer
                                width="100%"
                                height="100%"
                                url={api.storageUrl + file.filename}
                                playing
                                muted
                                loop
                            />
                            {data && data.files.length !== 0 && (
                                <button
                                    className="absolute top-2/4 right-5 text-[3em] text-[#00000071] hover:text-[#040d12] rounded-full transition-all duration-200"
                                    type="button"
                                    onClick={loadNext}
                                >
                                    <IoIosArrowDroprightCircle />
                                </button>
                            )}
                            {files.length !== 0 && page > 1 && (
                                <button
                                    className="absolute top-2/4 left-5 text-[3em] text-[#00000071] hover:text-[#040d12] rounded-full transition-all duration-200"
                                    type="button"
                                    onClick={loadPrevious}
                                >
                                    <IoIosArrowDropleftCircle />
                                </button>
                            )}
                        </div>
                        <Post postId={file.post.id} />
                    </div>
                ))}
        </>
    );
}
