'use client';

import { FIND_BLOG_POSTS } from '@/graphql/queries/blog';
import { useQuery } from '@apollo/client';

const headerSizes: any = {
    1: 'text-6xl',
    2: 'text-5xl',
    3: 'text-4xl',
    4: 'text-3xl',
    5: 'text-2xl',
    6: 'text-xl',
};

export default function Blog() {
    const { data, loading } = useQuery(FIND_BLOG_POSTS);

    if (loading) {
        return <p>loading...</p>;
    }

    return (
        data &&
        data.findBlogPosts.map((post: any) => (
            <div key={post.id} className="w-1/3 mt-10 ml-5 bg-gray-900 p-5 rounded-lg shadow-lg border-l-4 border-[#cc00ff]">
                {post.title && <h1 className="text-5xl text-md mb-5 font-serif text-[#cc00ff]">{post.title}</h1>}
                {post.description && <p className="italic text-sm mb-2 font-serif text-white">{post.description}</p>}
                {post.body.blocks.map((block: any) => {
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
            </div>
        ))
    );
}
