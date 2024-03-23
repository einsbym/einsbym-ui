'use client';

import ButtonLoadMore from '@/components/shared/button-load-more';
import Navbar from '@/components/shared/navbar';
import { api } from '@/constants/constants';
import { FILES } from '@/graphql/queries/file';
import { PostFile } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
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

    const loadMore = useCallback(
        async () => {
            await fetchMore({
                variables: { fileTypes: ['video/mp4'], page: page + 1, limit: 1 },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    setFiles(fetchMoreResult.files);
                },
            });
            setPage(page + 1); // Update the page state after fetching more images
        },
        [page, fetchMore, files],
    );

    // useEffect to load images initially
    useEffect(() => {
        if (data && files.length === 0) {
            setFiles(data.files);
        }
    }, [data, files, loadMore]);

    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center h-screen">
                {files &&
                    files.map((file) => (
                        <div key={file.id} className="w-1/2 rounded-lg">
                            <ReactPlayer
                                width="100%"
                                height="100%"
                                style={{ borderRadius: '0.5rem', overflow: 'hidden' }}
                                url={api.storageUrl + file.filename}
                                playing={false}
                                muted
                                controls
                            />
                        </div>
                    ))}
            </div>

            {data && data.files.length !== 0 && <ButtonLoadMore handleClick={loadMore} />}

            {files.length === 0 && !loading && (
                <div className="mx-auto text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg">
                    There&apos;s nothing to show here
                </div>
            )}
        </>
    );
}
