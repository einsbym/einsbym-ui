'use client';

import Navbar from '@/components/shared/navbar';
import VideoParentPost from '@/components/videos/video-parent-post';
import { api } from '@/constants/constants';
import { FILES } from '@/graphql/queries/file';
import { PostFile } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import ReactPlayer from 'react-player';

export default function Videos() {
    // States
    const [files, setFiles] = useState<PostFile[]>([]);
    const [page, setPage] = useState<number>(1);

    // Queries
    const { data, loading, fetchMore } = useQuery(FILES, {
        variables: { fileTypes: ['video/mp4'], page: page, limit: 1 },
        notifyOnNetworkStatusChange: true,
    });

    const loadMore = useCallback(async () => {
        await fetchMore({
            variables: { fileTypes: ['video/mp4'], page: page + 1, limit: 1 },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                setFiles(fetchMoreResult.files);
            },
        });
        setPage(page + 1); // Update the page state after fetching more images
    }, [page, fetchMore]);

    // useEffect to load images initially
    useEffect(() => {
        if (data && files.length === 0) {
            setFiles(data.files);
        }
    }, [data, files, loadMore]);

    return (
        <>
            <Navbar />

            {files &&
                files.map((file) => (
                    <div key={file.id} className="flex items-center justify-center h-screen">
                        <div className="relative w-4/5 shadow-[0_35px_60px_-15px_#cc00ff69] bg-red-800">
                            <ReactPlayer
                                width="100%"
                                height="100%"
                                url={api.storageUrl + file.filename}
                                playing={false}
                                muted
                                controls
                            />
                            {files.length !== 0 && (
                                <button
                                    className="absolute top-2/4 right-5 text-[2rem] text-[#cc00ff] bg-[#040d12] hover:bg-[#cc00ff] hover:text-[#040d12] rounded-full transition-all duration-200"
                                    type="button"
                                    onClick={loadMore}
                                >
                                    <IoIosArrowDroprightCircle />
                                </button>
                            )}
                        </div>
                        <VideoParentPost postId={file.post.id} />
                    </div>
                ))}

            {files.length === 0 && !loading && (
                <div className="mx-auto text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg">
                    There&apos;s nothing to show here
                </div>
            )}
        </>
    );
}
