'use client';

import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import { FIND_BLOG_POST } from '@/graphql/queries/blog';
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
            findBlogPostId: params.slug,
        },
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            {data && (
                <div className="w-1/2 mx-auto mt-20">
                    {data.findBlogPost.title && (
                        <h1 className="text-9xl text-md mb-5 font-serif text-[#cc00ff]">{data.findBlogPost.title}</h1>
                    )}
                    {data.findBlogPost.description && (
                        <p className="italic mb-2 font-serif text-white">{data.findBlogPost.description}</p>
                    )}
                    {data.findBlogPost.body.blocks.map((block: any) => {
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
            )}
        </>
    );
}
