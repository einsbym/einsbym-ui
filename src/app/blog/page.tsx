'use client';

import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import { backend } from '@/constants/constants';
import { FIND_BLOG_POSTS } from '@/graphql/queries/blog';
import { BlogPost } from '@/types/types';
import getElapsedTime from '@/utils/elapsed-time';
import { useQuery } from '@apollo/client';

export default function Blog() {
    const { data, loading } = useQuery(FIND_BLOG_POSTS);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            <div className="mt-20 mb-2 ml-5 p-5 w-fit text-8xl bg-[#cc00ff] text-black font-bold uppercase underline-offset-8">
                Blog
            </div>
            {data && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2 p-5">
                    {data.findBlogPosts.map((post: BlogPost) => (
                        <div
                            key={post.id}
                            className="flex gap-4 flex-col bg-gray-900 p-5 rounded-lg shadow-lg border-l-4 border-[#cc00ff] hover:border-gray-900 hover:bg-[#cc00ff] group transition-all duration-200"
                        >
                            <img src={backend.storageUrl + post.filename} alt={post.filename} className="w-full h-[300px] object-cover" />
                            <div>
                                <span className="text-sm text-[#cc00ff] group-hover:text-black">
                                    {getElapsedTime(post.createdAt)}
                                </span>
                                {post.title && (
                                    <a href={`/blog/${post.slug}`}>
                                        <h1 className="text-4xl text-md mb-5 uppercase font-bold text-[#cc00ff] group-hover:text-black hover:underline">
                                            {post.title}
                                        </h1>
                                    </a>
                                )}
                                {post.description && (
                                    <p className="text-white group-hover:text-black">{post.description}</p>
                                )}
                                <div className="mt-5 w-full overflow-x-scroll flex gap-2">
                                    {post.tags.map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="bg-[#cc00ff3a] group-hover:bg-black text-[#cc00ff] p-1 px-2 rounded-lg text-center text-nowrap"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
