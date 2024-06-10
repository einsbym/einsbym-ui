'use client';

import { Gallery } from '@/components/homepage/gallery';
import ButtonGroup from '@/components/shared/button-group';
import Navbar from '@/components/shared/navbar';
import GallerySkeleton from '@/components/skeletons/gallery';
import { FILES } from '@/graphql/queries/file';
import { PostFileType } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { LoadMore } from '../components/shared/load-more';

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
        setPage(page + 1);
    }, [page, fetchMore, files]);

    // useEffect to load images initially
    useEffect(() => {
        if (data && files.length === 0) {
            setFiles(data.files);
        }
    }, [data, files]);

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

            {data && data.files.length !== 0 && <LoadMore loadMore={loadMore} />}

            <div className='w-full h-20 md:hidden lg:hidden'></div>

            {files.length === 0 && !loading && (
                <div className="mx-auto text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg">
                    There&apos;s nothing to show here
                </div>
            )}
        </>
    );
}
