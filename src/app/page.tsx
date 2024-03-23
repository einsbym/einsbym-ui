'use client';

import ButtonLoadMore from '@/components/shared/button-load-more';
import Navbar from '@/components/shared/navbar';
import { api } from '@/constants/constants';
import { FILES } from '@/graphql/queries/file';
import { PostFile } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
    // States
    const [files, setFiles] = useState<PostFile[]>([]);
    const [page, setPage] = useState<number>(1);

    // Queries
    const { data, loading, fetchMore } = useQuery(FILES, {
        variables: { fileTypes: ['image/jpeg', 'image/png', 'image/gif'], page: page },
        notifyOnNetworkStatusChange: true,
    });

    const loadMore = useCallback(
        async (offSet?: number) => {
            await fetchMore({
                variables: { fileTypes: ['image/jpeg', 'image/png', 'image/gif'], page: offSet || page + 1 },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    if (offSet) {
                        setFiles(fetchMoreResult.files);
                        return;
                    }

                    setFiles([...files, ...fetchMoreResult.files]);
                },
            });
            setPage(offSet || page + 1); // Update the page state after fetching more images
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

            <div className="mt-20 rounded-t-[2rem] overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {files &&
                    files.map((file) => (
                        <div key={file.id}>
                            <img
                                alt={file.filename}
                                className="transition duration-300 ease-in-out hover:shadow-[0_35px_60px_-15px_#cc00ff69] w-full h-[500px] cursor-pointer object-cover"
                                src={api.storageUrl + file.filename}
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
