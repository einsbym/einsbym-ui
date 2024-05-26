'use client';

import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import { FIND_BLOG_POSTS } from '@/graphql/queries/blog';
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
            {data && (
                <div className="mt-16 grid grid-cols-4 w-full gap-2 p-5">
                    {data.findBlogPosts.map((post: any) => (
                        <div
                            key={post.id}
                            className="bg-gray-900 p-5 rounded-lg shadow-lg border-l-4 border-[#cc00ff] hover:border-gray-900 hover:bg-[#cc00ff] group transition-all duration-200"
                        >
                            <span className="text-sm text-[#cc00ff] group-hover:text-black">
                                {getElapsedTime(post.createdAt)}
                            </span>
                            {post.title && (
                                <a href={`/blog/${post.id}`}>
                                    <h1 className="text-4xl text-md mb-5 uppercase font-bold text-[#cc00ff] group-hover:text-black hover:underline">
                                        {post.title}
                                    </h1>
                                </a>
                            )}
                            {post.description && (
                                <p className="italic text-sm font-serif text-white group-hover:text-black">
                                    {post.description}
                                </p>
                            )}
                            <div className="mt-5 w-full overflow-x-hidden flex gap-2">
                                {post.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="bg-[#cc00ff3a] group-hover:bg-black text-[#cc00ff] p-1 px-2 rounded-lg text-center"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
