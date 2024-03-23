'use client';

import ButtonLoadMore from '@/components/shared/button-load-more';
import Navbar from '@/components/shared/navbar';
import { api } from '@/constants/constants';
import { FILES } from '@/graphql/queries/file';
import { PostFile } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

export default function Home() {
    // States
    const [files, setFiles] = useState<PostFile[]>([]);
    const [page, setPage] = useState<number>(1);

    // Other hooks
    const router = useRouter();

    // Queries
    const { data, loading, fetchMore } = useQuery(FILES, {
        variables: { page: page },
        notifyOnNetworkStatusChange: true,
    });

    const viewImage = (file: PostFile) => {
        router.push(`/view-image?image=${file.id}`);
    };

    const loadMore = useCallback(
        async (offSet?: number) => {
            await fetchMore({
                variables: { page: offSet || page + 1 },
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
                    files.map((file, index) => (
                        <div key={file.id}>
                            {file.filename.split('.').pop() === 'mp4' && (
                                <div className="transition duration-300 ease-in-out hover:shadow-[0_35px_60px_-15px_#cc00ff69] overflow-hidden w-full h-[500px] cursor-pointer">
                                    <ReactPlayer width="100%" height="100%" url={api.storageUrl + file.filename} playing muted />
                                </div>
                            )}
                            {file.filename.split('.').pop() !== 'mp4' && (
                                <img
                                    alt={file.filename}
                                    className="transition duration-300 ease-in-out hover:shadow-[0_35px_60px_-15px_#cc00ff69] w-full h-[500px] cursor-pointer object-cover"
                                    src={api.storageUrl + file.filename}
                                    onClick={() => viewImage(file)}
                                />
                            )}
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
