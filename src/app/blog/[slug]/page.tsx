'use client';

import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import { FIND_BLOG_POST } from '@/graphql/queries/blog';
import { BlogPostBlocks } from '@/types/types';
import getElapsedTime from '@/utils/elapsed-time';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

const headerSizes: any = {
    1: 'text-6xl',
    2: 'text-5xl',
    3: 'text-4xl',
    4: 'text-3xl',
    5: 'text-2xl',
    6: 'text-xl',
};

export default function ViewBlogPost() {
    const params = useParams<{ slug: string }>();
    const { data, loading } = useQuery(FIND_BLOG_POST, {
        variables: {
            slug: params.slug,
        },
        fetchPolicy: 'no-cache'
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            {data && (
                <div className="w-11/12 md:w-1/2 mx-auto mt-20">
                    <span className="text-sm text-[#cc00ff] group-hover:text-black">
                        {getElapsedTime(data.findBlogPost.createdAt)}
                    </span>
                    {data.findBlogPost.title && (
                        <h1 className="text-4xl md:text-6xl lg:text-8xl text-md font-bold mb-5 text-[#cc00ff]">{data.findBlogPost.title}</h1>
                    )}
                    {data.findBlogPost.description && (
                        <p className="mb-2 text-2xl md:text-3xl text-gray-600">{data.findBlogPost.description}</p>
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
                                    className="mb-2 leading-6"
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
                </div>
            )}
        </>
    );
}
