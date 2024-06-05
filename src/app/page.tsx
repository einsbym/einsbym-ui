'use client';

import { Gallery } from '@/components/homepage/gallery';
import ButtonGroup from '@/components/shared/button-group';
import ButtonLoadMore from '@/components/shared/button-load-more';
import Navbar from '@/components/shared/navbar';
import GallerySkeleton from '@/components/skeletons/gallery';
import { FILES } from '@/graphql/queries/file';
import { PostFileType } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
    // States
    const [files, setFiles] = useState<PostFileType[]>([]);
    const [page, setPage] = useState<number>(1);

    // Queries
    const { data, loading, fetchMore } = useQuery(FILES, {
        variables: { fileTypes: ['image/jpeg', 'image/png', 'image/gif'], page: page },
        notifyOnNetworkStatusChange: true,
    });

    const loadMore = useCallback(async () => {
        await fetchMore({
            variables: { fileTypes: ['image/jpeg', 'image/png', 'image/gif'], page: page + 1 },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                setFiles([...files, ...fetchMoreResult.files]);
            },
        });
        setPage(page + 1); // Update the page state after fetching more images
    }, [page, fetchMore, files]);

    // useEffect to load images initially
    useEffect(() => {
        if (data && files.length === 0) {
            setFiles(data.files);
        }
    }, [data, files, loadMore]);

    return (
        <>
            <Navbar />

            <ButtonGroup />

            {files.length === 0 && loading && (
                <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    <GallerySkeleton items={4} width="w-full" height="h-[500px]" />
                </div>
            )}

            <Gallery files={files} />

            {files.length > 0 && loading && (
                <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    <GallerySkeleton items={4} width="w-full" height="h-[500px]" margin="mt-2" />
                </div>
            )}

            {data && data.files.length !== 0 && <ButtonLoadMore handleClick={loadMore} />}

            {files.length === 0 && !loading && (
                <div className="mx-auto text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg">
                    There&apos;s nothing to show here
                </div>
            )}
        </>
    );
}
