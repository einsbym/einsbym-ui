'use client';

import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import { backend } from '@/constants/constants';
import { FIND_BLOG_POST } from '@/graphql/queries/blog';
import { BlogPostBlocks } from '@/types/types';
import getElapsedTime from '@/utils/elapsed-time';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const headerSizes: any = {
    1: 'text-6xl',
    2: 'text-5xl',
    3: 'text-4xl',
    4: 'text-3xl',
    5: 'text-2xl',
    6: 'text-xl',
};

export default function ViewBlogPost() {
    const [selectedFile, setSelectedFile] = useState<string>();
    const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

    const params = useParams<{ slug: string }>();
    const { data, loading } = useQuery(FIND_BLOG_POST, {
        variables: {
            slug: params.slug,
        },
    });

    const openViewer = (file: string) => {
        setSelectedFile(file);
        setIsViewerOpen(true);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            {data && (
                <div className="w-11/12 md:w-1/2 mx-auto mt-20 mb-5">
                    <span className="text-sm text-[#cc00ff] group-hover:text-black">
                        {getElapsedTime(data.findBlogPost.createdAt)}
                    </span>
                    {data.findBlogPost.title && (
                        <h1 className="text-4xl md:text-6xl lg:text-8xl text-md font-bold mb-5 text-[#cc00ff]">
                            {data.findBlogPost.title}
                        </h1>
                    )}
                    {data.findBlogPost.description && (
                        <p className="text-2xl md:text-2xl text-gray-400 mb-5">{data.findBlogPost.description}</p>
                    )}
                    {data.findBlogPost.filename && (
                        <img
                            src={backend.storageUrl + data.findBlogPost.filename}
                            alt={data.findBlogPost.filename}
                            className="block h-[500px] mb-2 mx-auto"
                        />
                    )}
                    {data.findBlogPost.user && (
                        <div className="flex items-center justify-start gap-2 my-5">
                            <img
                                alt={data.findBlogPost.user.username}
                                src={backend.storageUrl + data.findBlogPost.user.profilePicture}
                                className="w-14 h-14 rounded-full object-cover cursor-pointer"
                                onClick={() => openViewer(data.findBlogPost.user.profilePicture)}
                            />
                            <div>
                                <p className="font-bold hover:text-[#cc00ff]">
                                    <a href={`/profile/${data.findBlogPost.user.username}`}>
                                        {data.findBlogPost.user.firstName} {data.findBlogPost.user.lastName}
                                    </a>
                                </p>
                                <p className="text-sm text-gray-400">@{data.findBlogPost.user.username}</p>
                            </div>
                        </div>
                    )}
                    {data.findBlogPost.body.blocks.map((block: BlogPostBlocks) => {
                        if (block.type === 'header') {
                            return (
                                <h1
                                    key={block.id}
                                    className={`text-[#cc00ff] font-bold my-5 ${headerSizes[block.data.level]}`}
                                    dangerouslySetInnerHTML={{ __html: `${block.data.text}` }}
                                ></h1>
                            );
                        }

                        if (block.type === 'paragraph') {
                            return (
                                <p
                                    key={block.id}
                                    className="mb-2 leading-6 text-white"
                                    dangerouslySetInnerHTML={{ __html: `${block.data.text}` }}
                                ></p>
                            );
                        }
                    })}
                    <hr className="my-4 border-slate-800" />
                    <div className="mt-5 w-full overflow-x-hidden flex gap-2">
                        {data.findBlogPost.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="bg-[#cc00ff3a] group-hover:bg-black text-[#cc00ff] p-1 px-2 rounded-lg text-center"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {isViewerOpen && selectedFile && (
                        <div
                            className="fixed px-2 lg-mx-auto inset-0 flex items-center justify-center backdrop-blur-lg bg-black/30"
                            onClick={() => setIsViewerOpen(false)}
                        >
                            <img
                                className="h-auto lg:h-5/6 rounded-lg"
                                src={backend.storageUrl + selectedFile}
                                alt={selectedFile}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
