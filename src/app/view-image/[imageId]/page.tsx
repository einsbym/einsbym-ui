'use client';

import Loading from '@/components/shared/loading';
import Navbar from '@/components/shared/navbar';
import Post from '@/components/shared/post';
import { backend } from '@/constants/constants';
import { FIND_FILE_BY_ID } from '@/graphql/queries/file';
import { PostFileType } from '@/types/types';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Videos() {
    const params = useParams<{ imageId: string }>();

    // States
    const [file, setFile] = useState<PostFileType>();

    // Queries
    const { data, loading } = useQuery(FIND_FILE_BY_ID, {
        variables: { fileId: params.imageId },
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        if (data) setFile(data.findFileById);
    }, [data]);

    if (loading || !file) {
        return <Loading />;
    }

    return (
        <>
            <title>Einsbym - View image</title>

            <Navbar />

            <div className="flex flex-col lg:flex-row items-center justify-center lg:h-screen">
                <div className="relative px-5 lg:px-0 lg:h-4/5 shadow-xl mt-20 lg:mt-0">
                    <img
                        src={backend.storageUrl + file.filename}
                        alt={file.filename}
                        className="h-full mx-auto rounded-lg"
                    />
                </div>
                <Post postId={file.post.id} />
            </div>
        </>
    );
}
