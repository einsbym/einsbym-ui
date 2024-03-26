'use client';

import Navbar from '@/components/shared/navbar';
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
                        <div
                            className="relative w-4/5 shadow-[0_35px_60px_-15px_#cc00ff69] bg-red-800"
                        >
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
                        <div className="w-2/6 h-screen pt-20 px-5">
                            <div className="inline-block w-full text-sm rounded-lg shadow-sm text-gray-400 bg-black">
                                <div className="p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2 text-base font-semibold leading-none text-white">
                                            <a href="#">
                                                <img
                                                    className="w-10 h-10 rounded-full object-cover"
                                                    src=""
                                                    alt="John Doe"
                                                />
                                            </a>
                                            <a href="#">John Doe</a>
                                            <a href="#" className="hover:underline text-sm font-normal">
                                                @johndoe
                                            </a>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                className="text-white bg-[#040d12] hover:bg-[#cc00ff] hover:text-[#040d12] focus:ring-2 focus:ring-[#cc00ff] font-medium rounded-lg text-xs px-3 py-1.5 focus:outline-none"
                                            >
                                                Follow
                                            </button>
                                        </div>
                                    </div>
                                    <p className="mb-4 text-sm">Post text or something</p>
                                    <ul className="flex text-sm">
                                        <li className="me-2">
                                            <a href="#" className="hover:underline">
                                                <span className="font-semibold text-white mr-1">799</span>
                                                <span>likes</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="hover:underline">
                                                <span className="font-semibold text-white mr-1">3,7k</span>
                                                <span>comments</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
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
